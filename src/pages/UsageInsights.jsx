const UsageInsights = ({ data }) => (
  <div className="dash-card">
    <h3>💡 Recommendations</h3>
    <ul className="tips-list">
      {data.recommendations?.map((item, i) => (
        <li key={i} className="tip-item">
          <span className="tip-dot" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default UsageInsights;