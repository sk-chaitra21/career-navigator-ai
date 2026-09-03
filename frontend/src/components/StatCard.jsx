import "./../styles/statcard.css";

function StatCard({ title, value, color }) {
  return (
    <div
      className="stat-card"
      style={{
        "--card-accent": color,
      }}
    >
      <div className="stat-card-top">
        <span className="stat-card-dot"></span>

        <span className="stat-card-label">
          {title}
        </span>
      </div>

      <div className="stat-card-value">
        {value}
      </div>

      <div className="stat-card-footer">
        <span
          className="stat-card-line"
          style={{
            background: color,
          }}
        />

        <span className="stat-card-info">
          Available on platform
        </span>
      </div>
    </div>
  );
}

export default StatCard;