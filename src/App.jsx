import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Charts from "./components/Charts";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import { transactionsData } from "./data/data";

function App() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole] = useState("Viewer");
  const [dark, setDark] = useState(false);

  const [page, setPage] = useState("Dashboard"); // 🔥 ADD THIS

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className={`container ${dark ? "dark" : ""}`}>


      <Sidebar page={page} setPage={setPage} />

      <div className="main">
        <Header 
          role={role} 
          setRole={setRole} 
          dark={dark} 
          setDark={setDark} 
        />

        
        {page === "Dashboard" && (
          <>
            <Cards transactions={transactions} />
            <Charts transactions={transactions} />
          </>
        )}

        {page === "Transactions" && (
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
            role={role}
          />
        )}

        {page === "Insights" && (
          <Insights transactions={transactions} />
        )}

      </div>
    </div>
  );
}

export default App;