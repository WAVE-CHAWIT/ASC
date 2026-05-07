function KPICard({ label, value, helperText, tone = 'neutral' }) {
  return (
    <article className={`kpi-card kpi-card--${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      {helperText ? <span>{helperText}</span> : null}
    </article>
  );
}

export default KPICard;
