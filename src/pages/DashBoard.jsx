import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBillData } from "../Reducer/BillSlice";
import { useNavigate } from "react-router-dom";
import BillSummary from "./BillSummary";
import SavingsCard from "./SavingsCard";
import UsageInsights from "./UsageInsights";

const mockBillData = {
  customerName: "Akash Ghosh",
  billMonth: "February 2025",
  dueDate: "15 Mar 2025",
  units: 320,
  amount: 1850,
  ratePerUnit: 5.78,
  previousReading: 1200,
  currentReading: 1520,
  optimizedCost: 1480,
  yearlySavings: 4440,
  recommendations: [
    "Switch to LED bulbs to save up to ₹200/month",
    "Run AC at 24°C instead of 18°C",
    "Unplug devices when not in use",
    "Use washing machine during off-peak hours",
  ],
  monthlyUsage: [
    { month: "Sep", units: 290, pct: 85 },
    { month: "Oct", units: 310, pct: 91 },
    { month: "Nov", units: 275, pct: 81 },
    { month: "Dec", units: 340, pct: 100 },
    { month: "Jan", units: 300, pct: 88 },
    { month: "Feb", units: 320, pct: 94 },
  ],
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { billData } = useSelector((state) => state.bill);

  useEffect(() => {
    if (!billData) dispatch(setBillData(mockBillData));
  }, []);

  if (!billData) return <div className="loader-container"><div className="spinner" /></div>;

  const saved = billData.amount - billData.optimizedCost;
  const percent = Math.round((saved / billData.amount) * 100);

  return (
    <div className="dash-page">
      <div className="dash-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back, {billData.customerName} &nbsp;·&nbsp; {billData.billMonth}</p>
        </div>
        <button className="dash-upload-btn" onClick={() => navigate("/upload")}>
          ⚡ Upload New Bill
        </button>
      </div>

      <div className="info-bar">
        <span>📅 Bill Month: {billData.billMonth}</span>
        <span>📆 Due Date: {billData.dueDate}</span>
      </div>

      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">Units Consumed</div>
          <div className="kpi-value blue">{billData.units} <span style={{fontSize:"14px",color:"#94a3b8"}}>kWh</span></div>
          <div className="kpi-badge down">+6.7% vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Bill</div>
          <div className="kpi-value">₹{billData.amount.toLocaleString()}</div>
          <div className="kpi-badge down">Higher than avg</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Potential Savings</div>
          <div className="kpi-value green">₹{saved}</div>
          <div className="kpi-badge up">{percent}% reducible</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Yearly Savings</div>
          <div className="kpi-value green">₹{billData.yearlySavings.toLocaleString()}</div>
          <div className="kpi-badge up">If tips followed</div>
        </div>
      </div>

      {/* Cards */}
      <div className="dash-grid">
        <BillSummary data={billData} />
        <SavingsCard data={billData} />
        <UsageInsights data={billData} />
      </div>

      {/* Chart */}
      <div className="dash-chart-card">
        <h3>📈 Monthly Usage (last 6 months)</h3>
        {billData.monthlyUsage.map((m) => (
          <div className="bar-row" key={m.month}>
            <span className="bar-month">{m.month}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${m.pct}%` }} />
            </div>
            <span className="bar-val">{m.units}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;