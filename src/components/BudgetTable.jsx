import StatusBadge from './StatusBadge';
import { getProgressPercentage, getRemainingAmount } from '../data/budgetData';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

function BudgetTable({ budgets }) {
  return (
    <section className="table-card" aria-labelledby="budget-table-title">
      <div className="table-card__header">
        <div>
          <p className="eyebrow">Budget monitoring</p>
          <h2 id="budget-table-title">Department budget status</h2>
        </div>
        <span>{budgets.length} records</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Budget Code</th>
              <th>Budget Name</th>
              <th>Department</th>
              <th>Fiscal Year</th>
              <th>Total Budget</th>
              <th>Approved Budget</th>
              <th>Used Amount</th>
              <th>Remaining Amount</th>
              <th>Progress %</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => {
              const progress = getProgressPercentage(budget);
              const remainingAmount = getRemainingAmount(budget);

              return (
                <tr key={budget.budgetCode}>
                  <td className="budget-code">{budget.budgetCode}</td>
                  <td>{budget.budgetName}</td>
                  <td>{budget.department}</td>
                  <td>{budget.fiscalYear}</td>
                  <td>{currencyFormatter.format(budget.totalBudget)}</td>
                  <td>{currencyFormatter.format(budget.approvedBudget)}</td>
                  <td>{currencyFormatter.format(budget.usedAmount)}</td>
                  <td className={remainingAmount < 0 ? 'amount-negative' : ''}>
                    {currencyFormatter.format(remainingAmount)}
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div
                        className="progress-track"
                        aria-label={`${budget.budgetName} spending progress`}
                      >
                        <span
                          className={progress > 100 ? 'progress-bar progress-bar--over' : 'progress-bar'}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <span>{percentFormatter.format(progress)}%</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={budget.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BudgetTable;
