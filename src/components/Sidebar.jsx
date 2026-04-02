export default function Sidebar({ page, setPage }) {
  const menu = ["Dashboard", "Transactions", "Insights"];

  return (
    <div className="sidebar">
      <h2>FinTrack</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item}
            className={page === item ? "active" : ""}
            onClick={() => setPage(item)} // 🔥 THIS FIX
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}