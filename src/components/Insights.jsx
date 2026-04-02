export default function Insights({ transactions }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const categories = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      categories[t.category] =
        (categories[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.keys(categories).reduce((a, b) =>
    categories[a] > categories[b] ? a : b
  , "");

  const format = (num) =>
    num.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <div className="insights">

      <h3 className="insights-title">Insights</h3>

      <div className="insight-grid">

        <div className="insight-card">
          <div className="icon">🔥</div>
          <div>
            <p className="label">Top Spending</p>
            <h4>{highest || "—"}</h4>
          </div>
        </div>

        <div className="insight-card">
          <div className="icon">💰</div>
          <div>
            <p className="label">Total Income</p>
            <h4>₹{format(income)}</h4>
          </div>
        </div>

        <div className="insight-card">
          <div className="icon">💸</div>
          <div>
            <p className="label">Total Expense</p>
            <h4>₹{format(expense)}</h4>
          </div>
        </div>

        <div className="insight-card">
          <div className="icon">📊</div>
          <div>
            <p className="label">Transactions</p>
            <h4>{transactions.length}</h4>
          </div>
        </div>

      </div>

    </div>
  );
}