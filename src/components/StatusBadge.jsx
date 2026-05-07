const statusClassMap = {
  Planned: 'status-badge--planned',
  Approved: 'status-badge--approved',
  'In Progress': 'status-badge--in-progress',
  Completed: 'status-badge--completed',
  'Over Budget': 'status-badge--over-budget',
};

function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${statusClassMap[status] ?? 'status-badge--planned'}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
