import { useState } from "react";

export default function Transactions({ transactions, setTransactions, role }) {
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({ amount: "", category: "", type: "expense" });

    const filtered = transactions.filter(t =>
        t.category.toLowerCase().includes(search.toLowerCase())
    );

    const addTransaction = () => {
        if (!form.amount || !form.category) return;

        const newTx = {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            amount: Number(form.amount),
            category: form.category,
            type: form.type
        };

        setTransactions([...transactions, newTx]);
        setForm({ amount: "", category: "", type: "expense" });
    };

    const deleteTx = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    return (
        <div className="transactions">

            <div className="txn-header">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search category..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {role === "Admin" && (
                    <div className="txn-form">
                        <input
                            value={form.amount}
                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                            placeholder="Amount"
                        />
                        <input
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            placeholder="Category"
                        />
                        <select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <button onClick={addTransaction}>Add</button>
                    </div>
                )}
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Type</th>
                            {role === "Admin" && <th></th>}
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map(t => (
                            <tr key={t.id} className="row">

                                <td className="date">{t.date}</td>

                                <td className="amount">₹{t.amount}</td>

                                <td>
                                    <span className="category">{t.category}</span>
                                </td>

                                <td>
                                    <span className={`badge ${t.type}`}>
                                        {t.type}
                                    </span>
                                </td>

                                {role === "Admin" && (
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteTx(t.id)}
                                        >
                                            ✕
                                        </button>
                                    </td>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}