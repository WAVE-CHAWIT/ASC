import { useMemo, useState } from 'react';

import BudgetTable from '../components/BudgetTable';
import KPICard from '../components/KPICard';
import { budgetData, getBudgetMetrics } from '../data/budgetData';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

const allDepartments = ['All Departments', ...new Set(budgetData.map((item) => item.department))];
const allStatuses = ['All Statuses', 'Planned', 'Approved', 'In Progress', 'Completed', 'Over Budget'];

function Dashboard() {
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const filteredBudgets = useMemo(
    () =>
      budgetData.filter((budget) => {
        const departmentMatches =
          departmentFilter === 'All Departments' || budget.department === departmentFilter;
        const statusMatches = statusFilter === 'All Statuses' || budget.status === statusFilter;

        return departmentMatches && statusMatches;
      }),
    [departmentFilter, statusFilter],
  );

  const metrics = useMemo(() => getBudgetMetrics(filteredBudgets), [filteredBudgets]);

  return (
    <main className="dashboard-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Internal budget monitoring</p>
          <h1>E-budget Dashboard</h1>
          <p className="hero-card__summary">
            Track budget planning, approvals, spending, remaining funds, payment progress,
            and execution status using mock data for the first version.
          </p>
        </div>
        <div className="hero-card__meta">
          <span>Fiscal Year 2026</span>
          <strong>Mock data only</strong>
        </div>
      </section>

      <section className="filters-card" aria-label="Budget filters">
        <label>
          Department
          <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
            {allDepartments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="kpi-grid" aria-label="Budget KPI summary">
        <KPICard label="Total Budget" value={currencyFormatter.format(metrics.totalBudget)} helperText="Planned allocation" />
        <KPICard label="Approved Budget" value={currencyFormatter.format(metrics.approvedBudget)} helperText="Authorized funding" tone="success" />
        <KPICard label="Used Budget" value={currencyFormatter.format(metrics.usedBudget)} helperText="Payment progress" tone="warning" />
        <KPICard label="Remaining Budget" value={currencyFormatter.format(metrics.remainingBudget)} helperText="Available balance" tone={metrics.remainingBudget < 0 ? 'danger' : 'info'} />
        <KPICard label="Spending Progress %" value={`${percentFormatter.format(metrics.spendingProgress)}%`} helperText="Used vs approved" tone={metrics.spendingProgress > 100 ? 'danger' : 'neutral'} />
      </section>

      <BudgetTable budgets={filteredBudgets} />
    </main>
  );
}

export default Dashboard;
