import asyncio
from pyppeteer import launch
import pandas as pd
from datetime import datetime

# URL and inputs
url = "https://www.airasia.com/flights/search/?origin=DMK&destination=CNX&departDate=17%2F01%2F2025&tripType=O&adult=1&child=0&infant=0&locale=th-th&currency=THB&airlineProfile=all&type=paired&cabinClass=economy&upsellWidget=true&upsellPremiumFlatbedWidget=true&isOC=false&isDC=false&uce=true&ancillaryAbTest=false&isAirasiaFlightOnly=true&providers=&taIDs="
input_values = ["DMK", "CNX", "BKK"]
all_flights = []

async def scrape_flights():
    # Launch browser
    browser = await launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox'])
    page = await browser.newPage()

    for input_value in input_values:
        try:
            # Navigate to the URL
            await page.goto(url)

            # Locate input field
            input_selector = 'input#flight-place-picker'
            await page.waitForSelector(input_selector)

            # Input value and submit
            await page.type(input_selector, input_value)
            await page.keyboard.press('Enter')
            await asyncio.sleep(5)

            # Scrape flight data
            flight_results_selector = '.flight-result-class'
            await page.waitForSelector(flight_results_selector, timeout=10000)
            flight_results = await page.querySelectorAll(flight_results_selector)

            for flight in flight_results:
                flight_info = await page.evaluate('(element) => element.textContent', flight)
                all_flights.append({"Origin": input_value, "FlightInfo": flight_info})

        except Exception as e:
            print(f"Error processing input {input_value}: {e}")

    await browser.close()

# Main block to handle event loop
if __name__ == "__main__":
    import nest_asyncio
    nest_asyncio.apply()  # Allow nested event loops
    loop = asyncio.get_event_loop()
    loop.run_until_complete(scrape_flights())

    # Save results to CSV
    now = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"airasia_flights_{now}.csv"
    df = pd.DataFrame(all_flights)
    df.to_csv(output_file, index=False)
    print(f"Data saved to {output_file}")
