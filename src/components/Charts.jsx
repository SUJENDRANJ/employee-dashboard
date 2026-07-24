import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const PIE_COLORS_LIGHT = ["#3A7D5C", "#C44536"];
const PIE_COLORS_DARK = ["#5FCB94", "#F0776A"];

function Charts({ employees }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const pieColors = isDark ? PIE_COLORS_DARK : PIE_COLORS_LIGHT;
  const gridStroke = isDark ? "#F5F1E8" : "#0D1117";
  const tickFill = isDark ? "#A9A297" : "#8B8378";
  const labelFill = isDark ? "#F5F1E8" : "#0D1117";
  const barFill = isDark ? "#FF8B5C" : "#FF6B35";
  const tooltipBg = isDark ? "#1B222B" : "#0D1117";
  const tooltipText = "#F5F1E8";
  const tooltipBorder = isDark ? "1px solid #2A323D" : "none";

  const tickStyle = {
    fontFamily: "JetBrains Mono",
    fontSize: 11,
    fill: tickFill,
  };

  // build data for department bar chart
  const departmentCounts = {};
  employees.forEach((emp) => {
    if (departmentCounts[emp.department]) {
      departmentCounts[emp.department] += 1;
    } else {
      departmentCounts[emp.department] = 1;
    }
  });
  const barData = Object.keys(departmentCounts).map((dept) => ({
    department: dept,
    count: departmentCounts[dept],
  }));

  // build data for status pie chart
  const activeCount = employees.filter((emp) => emp.status === "Active").length;
  const inactiveCount = employees.filter(
    (emp) => emp.status === "Inactive",
  ).length;
  const pieData = [
    { name: "Active", value: activeCount },
    { name: "Inactive", value: inactiveCount },
  ];

  // build data for monthly joined employees line chart (last 12 months)
  const now = new Date();
  const monthBuckets = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthBuckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: `${MONTH_LABELS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`,
      count: 0,
    });
  }
  employees.forEach((emp) => {
    if (!emp.joiningDate) return;
    const d = new Date(emp.joiningDate);
    if (isNaN(d)) return;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = monthBuckets.find((b) => b.key === key);
    if (bucket) bucket.count += 1;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink/10 dark:bg-edge border border-ink/10 dark:border-edge mb-6">
      <div className="bg-white dark:bg-surface p-4">
        <h2 className="text-ink dark:text-paper text-xs tracking-widest mb-3">
          BY DEPARTMENT
        </h2>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={barData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridStroke}
              strokeOpacity={0.08}
            />
            <XAxis dataKey="department" tick={tickStyle} />
            <YAxis allowDecimals={false} tick={tickStyle} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: tooltipBorder,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                color: tooltipText,
              }}
            />
            <Bar dataKey="count" fill={barFill} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-surface p-4">
        <h2 className="text-ink dark:text-paper text-xs tracking-widest mb-3">
          BY STATUS
        </h2>
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={{
                fontFamily: "JetBrains Mono",
                fontSize: 11,
                fill: labelFill,
              }}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                border: tooltipBorder,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                color: tooltipText,
              }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                color: labelFill,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-surface p-4 lg:col-span-2">
        <h2 className="text-ink dark:text-paper text-xs tracking-widest mb-3">
          MONTHLY JOINED (LAST 12 MONTHS)
        </h2>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={monthBuckets}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridStroke}
              strokeOpacity={0.08}
            />
            <XAxis dataKey="month" tick={tickStyle} />
            <YAxis allowDecimals={false} tick={tickStyle} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: tooltipBorder,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                color: tooltipText,
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke={barFill}
              strokeWidth={2}
              dot={{ r: 3, fill: barFill }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
