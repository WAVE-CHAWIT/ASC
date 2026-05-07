export const budgetData = [
  {
    budgetCode: 'EB-2026-001',
    budgetName: 'Digital Finance Platform',
    department: 'Finance',
    fiscalYear: 2026,
    totalBudget: 1250000,
    approvedBudget: 1100000,
    usedAmount: 685000,
    status: 'In Progress',
  },
  {
    budgetCode: 'EB-2026-002',
    budgetName: 'Public Service Portal Upgrade',
    department: 'IT',
    fiscalYear: 2026,
    totalBudget: 980000,
    approvedBudget: 940000,
    usedAmount: 940000,
    status: 'Completed',
  },
  {
    budgetCode: 'EB-2026-003',
    budgetName: 'Regional Operations Support',
    department: 'Operations',
    fiscalYear: 2026,
    totalBudget: 760000,
    approvedBudget: 720000,
    usedAmount: 450000,
    status: 'Approved',
  },
  {
    budgetCode: 'EB-2026-004',
    budgetName: 'Workforce Training Program',
    department: 'Human Resources',
    fiscalYear: 2026,
    totalBudget: 320000,
    approvedBudget: 280000,
    usedAmount: 89000,
    status: 'Planned',
  },
  {
    budgetCode: 'EB-2026-005',
    budgetName: 'Compliance Monitoring Tools',
    department: 'Compliance',
    fiscalYear: 2026,
    totalBudget: 410000,
    approvedBudget: 390000,
    usedAmount: 435000,
    status: 'Over Budget',
  },
  {
    budgetCode: 'EB-2026-006',
    budgetName: 'Infrastructure Maintenance',
    department: 'Operations',
    fiscalYear: 2026,
    totalBudget: 670000,
    approvedBudget: 620000,
    usedAmount: 305000,
    status: 'In Progress',
  },
  {
    budgetCode: 'EB-2026-007',
    budgetName: 'Annual Audit Readiness',
    department: 'Finance',
    fiscalYear: 2026,
    totalBudget: 215000,
    approvedBudget: 200000,
    usedAmount: 120000,
    status: 'Approved',
  },
];

export const getBudgetMetrics = (items) => {
  const totals = items.reduce(
    (summary, item) => {
      summary.totalBudget += item.totalBudget;
      summary.approvedBudget += item.approvedBudget;
      summary.usedBudget += item.usedAmount;
      return summary;
    },
    { totalBudget: 0, approvedBudget: 0, usedBudget: 0 },
  );

  const remainingBudget = totals.approvedBudget - totals.usedBudget;
  const spendingProgress = totals.approvedBudget
    ? (totals.usedBudget / totals.approvedBudget) * 100
    : 0;

  return {
    ...totals,
    remainingBudget,
    spendingProgress,
  };
};

export const getRemainingAmount = (item) => item.approvedBudget - item.usedAmount;

export const getProgressPercentage = (item) => {
  if (!item.approvedBudget) {
    return 0;
  }

  return (item.usedAmount / item.approvedBudget) * 100;
};
