const BillSummary = ({ data }) => (
  <div className="dash-card">
    <h3>🧾 Bill Summary</h3>
    <div className="dash-row"><span>Units Consumed</span><strong>{data.units} kWh</strong></div>
    <div className="dash-row"><span>Rate per Unit</span><strong>₹{data.ratePerUnit}</strong></div>
    <div className="dash-row"><span>Previous Reading</span><strong>{data.previousReading}</strong></div>
    <div className="dash-row"><span>Current Reading</span><strong>{data.currentReading}</strong></div>
    <div className="dash-row"><span>Total Amount</span><strong className="blue">₹{data.amount.toLocaleString()}</strong></div>
  </div>
);

export default BillSummary;