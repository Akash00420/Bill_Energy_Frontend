const SavingsCard = ({ data }) => {
  const saved = data.amount - data.optimizedCost;
  const percent = Math.round((saved / data.amount) * 100);

  return (
    <div className="dash-card">
      <h3>💰 Projected Savings</h3>
      <div className="dash-row"><span>Current Bill</span><strong>₹{data.amount.toLocaleString()}</strong></div>
      <div className="dash-row"><span>Optimized Cost</span><strong className="green">₹{data.optimizedCost.toLocaleString()}</strong></div>
      <div className="dash-row"><span>Monthly Saving</span><strong className="green">₹{saved}</strong></div>
      <div className="dash-row"><span>Yearly Saving</span><strong className="green">₹{data.yearlySavings.toLocaleString()}</strong></div>
      <div className="savings-badge-lg">🎯 {percent}% savings possible this month!</div>
    </div>
  );
};

export default SavingsCard;