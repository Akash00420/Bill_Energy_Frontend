import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllBills } from "../Reducer/BillSlice";
import { useNavigate } from "react-router-dom";
import BillSummary from "./BillSummary";
import SavingsCard from "./SavingsCard";
import UsageInsights from "./UsageInsights";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bills, loading, error } = useSelector((state) => state.bill);

  useEffect(() => {
    dispatch(getAllBills());
  }, [dispatch]);

  // ✅ use the most recent bill (last in array)
  const data = bills && bills.length > 0 ? bills[bills.length - 1] : null;

  // ✅ safe calculations using real DB fields
  const netAmount     = data?.netAmount || 0;
  const grossAmount   = data?.grossAmount || 0;
  const unitsBilled   = data?.unitsBilled || 0;
  const energyCharges = data?.energyCharges || 0;
  const saved         = grossAmount - netAmount;  // rebate/discount saved
  const percent       = grossAmount > 0 ? Math.round((saved / grossAmount) * 100) : 0;
  const yearlySavings = saved * 12;
  const costPerUnit   = unitsBilled > 0 ? (energyCharges / unitsBilled).toFixed(2) : 0;

  if (loading) return (
    <div className="loader-container">
      <div className="spinner" />
    </div>
  );

  if (error) return (
    <div className="loader-container">
      <p style={{ color: "red" }}>❌ {error}</p>
    </div>
  );

  if (!data) return (
    <div className="loader-container">
      <p>No bills found. <button onClick={() => navigate("/upload")}>Upload your first bill</button></p>
    </div>
  );

  return (
    <div className="dash-page">

      {/* ── Header ─────────────────────────────── */}
      <div className="dash-header">
        <div>
          <h2>Dashboard</h2>
          <p>
            Welcome back, {data.customerName}
            &nbsp;·&nbsp;
            {data.billMonth}
          </p>
        </div>
        <button className="dash-upload-btn" onClick={() => navigate("/upload")}>
          ⚡ Upload New Bill
        </button>
      </div>

      {/* ── Info Bar ───────────────────────────── */}
      <div className="info-bar">
        <span>📅 Bill Month: {data.billMonth}</span>
        <span>
          📆 Due Date:{" "}
          {data.dueDate
            ? new Date(data.dueDate).toLocaleDateString("en-IN")
            : "N/A"}
        </span>
        <span>🏠 Type: {data.consumerType}</span>
        <span>🔢 Consumer No: {data.consumerNumber}</span>
      </div>

      {/* ── KPI Row ────────────────────────────── */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">Units Consumed</div>
          <div className="kpi-value blue">
            {unitsBilled}{" "}
            <span style={{ fontSize: "14px", color: "#94a3b8" }}>kWh</span>
          </div>
          <div className="kpi-badge">
            ₹{costPerUnit}/unit
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Total Bill</div>
          <div className="kpi-value">
            ₹{netAmount.toLocaleString("en-IN")}
          </div>
          <div className="kpi-badge down">
            Gross: ₹{grossAmount.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Rebate Savings</div>
          <div className="kpi-value green">
            ₹{saved.toLocaleString("en-IN")}
          </div>
          <div className="kpi-badge up">{percent}% saved</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Yearly Projection</div>
          <div className="kpi-value green">
            ₹{yearlySavings.toLocaleString("en-IN")}
          </div>
          <div className="kpi-badge up">Based on this bill</div>
        </div>
      </div>

      {/* ── Bill Breakdown ─────────────────────── */}
      <div className="dash-chart-card">
        <h3>🧾 Bill Breakdown</h3>
        {[
          { label: "Energy Charges",        value: data.energyCharges },
          { label: "Fixed/Demand Charges",  value: data.fixedDemandCharges },
          { label: "Govt Duty",             value: data.govtDuty },
          { label: "Meter Rent",            value: data.meterRent },
          { label: "Adjustments",           value: data.adjustments },
          { label: "Rebate",                value: data.rebate },
        ].map((item) => (
          <div className="bar-row" key={item.label}>
            <span className="bar-month">{item.label}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: grossAmount > 0
                    ? `${Math.min(((item.value || 0) / grossAmount) * 100, 100)}%`
                    : "0%",
                }}
              />
            </div>
            <span className="bar-val">
              ₹{(item.value || 0).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      {/* ── Payment Status ─────────────────────── */}
      <div className="dash-chart-card">
        <h3>💳 Payment Info</h3>
        <div className="info-bar">
          <span>
            Status:{" "}
            <strong
              style={{
                color:
                  data.paymentStatus === "Paid" ? "green" :
                  data.paymentStatus === "Overdue" ? "red" : "orange",
              }}
            >
              {data.paymentStatus}
            </strong>
          </span>
          {data.paymentMode && <span>Mode: {data.paymentMode}</span>}
          {data.lastPaymentDate && (
            <span>
              Last Paid:{" "}
              {new Date(data.lastPaymentDate).toLocaleDateString("en-IN")}
            </span>
          )}
          {data.securityDeposit > 0 && (
            <span>Security Deposit: ₹{data.securityDeposit}</span>
          )}
        </div>
      </div>

      {/* ── Sub Cards ──────────────────────────── */}
      <div className="dash-grid">
        <BillSummary data={data} />
        <SavingsCard data={data} />
        <UsageInsights data={data} />
      </div>

      {/* ── All Bills List ─────────────────────── */}
      {bills.length > 1 && (
        <div className="dash-chart-card">
          <h3>📋 All Bills</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "8px" }}>Month</th>
                <th style={{ padding: "8px" }}>Units</th>
                <th style={{ padding: "8px" }}>Amount</th>
                <th style={{ padding: "8px" }}>Status</th>
                <th style={{ padding: "8px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill._id}
                  style={{ borderBottom: "1px solid #f1f5f9" }}
                >
                  <td style={{ padding: "8px" }}>{bill.billMonth}</td>
                  <td style={{ padding: "8px" }}>{bill.unitsBilled} kWh</td>
                  <td style={{ padding: "8px" }}>
                    ₹{(bill.netAmount || 0).toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "8px" }}>
                    <span
                      style={{
                        color:
                          bill.paymentStatus === "Paid" ? "green" :
                          bill.paymentStatus === "Overdue" ? "red" : "orange",
                        fontWeight: "600",
                      }}
                    >
                      {bill.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: "8px" }}>
                    <button
                      onClick={() => navigate(`/analysis/${bill._id}`)}
                      style={{
                        background: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "4px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Analyse
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default Dashboard;