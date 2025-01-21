import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
from datetime import datetime, timedelta, timezone

# File containing the list of URLs
url_file = "_Flight Radat Aircraft URL TEST.txt"

# List to store all flight data
all_flights = []
failed_urls = []

# Load URLs from the file
with open(url_file, 'r') as file:
    urls = [line.strip() for line in file if line.strip()]

# User-Agent pool
user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
]

# Function to convert a timestamp to UTC+7 and format as AM/PM
def add_utc7_and_format(timestamp):
    try:
        dt = datetime.fromtimestamp(int(timestamp), tz=timezone.utc)
        dt_utc7 = dt + timedelta(hours=7)
        return dt_utc7.strftime("%I:%M %p")  # Format as HH:MM AM/PM
    except (ValueError, TypeError):
        return 'N/A'

def scrape_url(url):
    headers = {'User-Agent': random.choice(user_agents)}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract Callsign from <h1>
        callsign = 'N/A'
        h1_tag = soup.find('h1')
        if h1_tag and "Flight history for aircraft - " in h1_tag.text:
            callsign = h1_tag.text.replace("Flight history for aircraft - ", "").strip()




        # Parse Aircraft Information
        aircraft, type_code, mode_s, airline, code, operator, code2 = 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'
        aircraft_info = soup.find('div', {'id': 'cnt-aircraft-info'})
        if aircraft_info:
            aircraft = aircraft_info.find('label', string='AIRCRAFT').find_next('span', class_='details').text.strip() if aircraft_info.find('label', string='AIRCRAFT') else 'N/A'
            type_code = aircraft_info.find('label', string='TYPE CODE').find_next('span', class_='details').text.strip() if aircraft_info.find('label', string='TYPE CODE') else 'N/A'
            mode_s = aircraft_info.find('label', string='MODE S').find_next('span', class_='details').text.strip() if aircraft_info.find('label', string='MODE S') else 'N/A'
            airline = aircraft_info.find('label', string='AIRLINE').find_next('span', class_='details').text.strip() if aircraft_info.find('label', string='AIRLINE') else 'N/A'
            code = aircraft_info.find('label', string='Code').find_next('span', class_='details').text.strip() if aircraft_info.find('label', string='Code') else 'N/A'
            operator = aircraft_info.find('label', string='OPERATOR').find_next('span', class_='details').text.strip() if aircraft_info.find('label', string='OPERATOR') else 'N/A'

            # Handle second "Code" label
            code_labels = aircraft_info.find_all('label', string='Code')
            if len(code_labels) > 1:
                code2 = code_labels[1].find_next('span', class_='details').text.strip()

        # Parse flight data from the table
        tbody = soup.find('tbody')
        if not tbody:
            print(f"No flight data found for URL: {url}")
            return None

        flights = []
        for row in tbody.find_all('tr', class_='data-row'):
            # Existing parsing logic for flight details
            flight_number = row.find('a', class_='fbold').text.strip() if row.find('a', class_='fbold') else 'N/A'
            date = row.find('td', {'data-time-format': 'DD MMM YYYY'}).text.strip() if row.find('td', {'data-time-format': 'DD MMM YYYY'}) else 'N/A'
            departure_airport = row.find('td', title=True).text.strip() if row.find('td', title=True) else 'N/A'
            arrival_airport = row.find_all('td', title=True)[1].text.strip() if len(row.find_all('td', title=True)) > 1 else 'N/A'

            # Flight Time
            flight_time = 'N/A'
            flight_time_tags = row.find_all('td', class_='hidden-xs hidden-sm')
            if flight_time_tags:
                for tag in flight_time_tags:
                    text = tag.text.strip()
                    if text and (':' in text or text == '—'):
                        flight_time = text
                        break

            # Times and Status
            std, atd, sta, status, status_text, status_time = 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'
            std_tag = row.find('span', {'data-timestamp': True})
            if std_tag:
                std = add_utc7_and_format(std_tag['data-timestamp'])
            atd_tag = row.find_all('span', {'data-timestamp': True})
            if len(atd_tag) > 1:
                atd = add_utc7_and_format(atd_tag[1]['data-timestamp'])
            sta_tag = row.find_all('span', {'data-timestamp': True})
            if len(sta_tag) > 2:
                sta = add_utc7_and_format(sta_tag[2]['data-timestamp'])

            status_tag = row.find('td', {'data-prefix': True})
            if status_tag and status_tag.has_attr('data-timestamp'):
                prefix = status_tag.get('data-prefix', '').strip()
                formatted_time = add_utc7_and_format(status_tag['data-timestamp'])
                status = f"{prefix} {formatted_time}"
                status_text = prefix
                status_time = formatted_time

                # Rearrange the headers in flight_data
                flight_data = {
                    'Date': date,
                    'Departure Airport': departure_airport,
                    'Arrival Airport': arrival_airport,
                    'Flight Number': flight_number,
                    'Flight Time': flight_time,
                    'STD': std,
                    'ATD': atd,
                    'STA': sta,
                    'Status': status,
                    'StatusText': status_text,
                    'StatusTime': status_time,
                    'Callsign': callsign,
                    'AIRCRAFT': aircraft,
                    'TYPE CODE': type_code,
                    'MODE S': mode_s,
                    'AIRLINE': airline,
                    'Code': code,
                    'OPERATOR': operator,
                    'Code2': code2
                }

            flights.append(flight_data)

        return flights

    except Exception as e:
        print(f"Error processing URL {url}: {e}")
        return None


# Process all URLs
for i, url in enumerate(urls, start=1):
    print(f"Processing {i}/{len(urls)}: {url}")
    flights = scrape_url(url)
    if flights:
        all_flights.extend(flights)
    else:
        failed_urls.append(url)

    # Wait between requests
    time.sleep(random.randint(7, 15))

    # Pause after every 15 requests
    if i % 15 == 0:
        time.sleep(random.randint(60, 120))

# Retry failed URLs
max_retries = 3
for retry in range(max_retries):
    if not failed_urls:
        break
    current_failed_urls = failed_urls
    failed_urls = []
    for url in current_failed_urls:
        flights = scrape_url(url)
        if flights:
            all_flights.extend(flights)
        else:
            failed_urls.append(url)
        time.sleep(random.randint(7, 15))

# Save the data to a CSV with today's date and timestamp
now = datetime.now().strftime("%m%d%Y_%H%M%S")
output_file = f'flightradar_flights_{now}.csv'
df = pd.DataFrame(all_flights)
df.to_csv(output_file, index=False)
print(f"\nData saved to {output_file}")

# Save remaining failed URLs to a file
if failed_urls:
    failed_file = f'failed_urls_{now}.txt'
    with open(failed_file, 'w') as f:
        f.write('\n'.join(failed_urls))
    print(f"Failed URLs saved to {failed_file}")
