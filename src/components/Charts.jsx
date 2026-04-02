import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
);

export default function Charts({ transactions }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const expenseData = transactions.filter(t => t.type === "expense");

    const categoryMap = {};
    expenseData.forEach(t => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    const balanceArray = transactions.reduce((acc, t, i) => {
        const prev = acc[i - 1] || 0;
        acc.push(t.type === "income" ? prev + t.amount : prev - t.amount);
        return acc;
    }, []);
    const pieData = {
        labels: Object.keys(categoryMap),
        datasets: [
            {
                data: Object.values(categoryMap),
                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6"
                ],
                borderWidth: 0
            }
        ]
    };

    const lineData = {
        labels: transactions.map(t => t.date),
        datasets: [
            {
                label: "Balance",
                data: balanceArray,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 3
            }
        ]
    };

    const commonOptions = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 important

    layout: {
        padding: isMobile ? 10 : 0
    },

    plugins: {
        legend: {
            position: isMobile ? "left" : "bottom",
            align: isMobile ? "start" : "center",
            labels: {
                color: "#64748b",
                font: { size: isMobile ? 10 : 12 } 
            }
        }
    },

    animation: {
        duration: 800,
        easing: "easeOutQuart"
    }
};

    const lineOptions = {
        ...commonOptions,
        scales: {
            x: {
                ticks: { color: "#64748b" },
                grid: { display: false }
            },
            y: {
                ticks: { color: "#64748b" },
                grid: { color: "#e2e8f0" }
            }
        }
    };

    return (
        <div className="charts">

            <div className="chart-card small">
                <h3>Spending</h3>
                <div className="chart-wrapper">
                    <Pie 
                      data={pieData} 
                      options={commonOptions} 
                      style={{ 
                        maxWidth: isMobile ? "180px" : "100%", 
                        margin: "0 auto" 
                      }} 
                    />
                </div>
            </div>

            <div className="chart-card small">
                <h3>Balance</h3>
                <div className="chart-wrapper">
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>

        </div>
    );
}
