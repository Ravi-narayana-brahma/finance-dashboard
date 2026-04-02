export default function Cards({ transactions }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const format = (num) =>
    num.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <div className="cards">

      <div className="card balance">
        <div className="card-top">
          <span>Total Balance</span>
          <span className="icon">💰</span>
        </div>
        <h2>₹{format(balance)}</h2>
      </div>

      <div className="card income">
        <div className="card-top">
          <span>Income</span>
          <span className="icon">📈</span>
        </div>
        <h2>₹{format(income)}</h2>
      </div>

      <div className="card expense">
        <div className="card-top">
          <span>Expenses</span>
          <span className="icon">📉</span>
        </div>
        <h2>₹{format(expense)}</h2>
      </div>

    </div>
  );
}