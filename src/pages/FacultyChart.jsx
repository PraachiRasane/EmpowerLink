import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    CartesianGrid,
    Legend,
} from "recharts";

const FacultyChart = () => {
    const lineData = [
        { month: "Jan", Male: 20, Female: 10 },
        { month: "Feb", Male: 25, Female: 15 },
        { month: "Mar", Male: 30, Female: 20 },
        { month: "Apr", Male: 35, Female: 25 },
        { month: "May", Male: 40, Female: 30 },
        { month: "Jun", Male: 45, Female: 35 },
    ];

    const pieData = [
        { name: "Training", value: 400 },
        { name: "Entrepreneur", value: 300 },
    ];

    const barData = [
        { month: "Jan", joined: 10, dropout: 2 },
        { month: "Feb", joined: 12, dropout: 1 },
        { month: "Mar", joined: 15, dropout: 3 },
        { month: "Apr", joined: 18, dropout: 2 },
        { month: "May", joined: 20, dropout: 4 },
        { month: "Jun", joined: 22, dropout: 3 },
    ];

    const COLORS = ["#818cf8", "#4f46e5"];

    return (
        <div className="p-8 bg-indigo-50 min-h-screen space-y-8">
            <h1 className="text-3xl font-bold text-indigo-800">Faculty Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card title="Total Trainees" value="120" />
                <Card title="Active Ventures" value="75" />
                <Card title="Follow Ups" value="30" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative group">
                <div className="bg-white rounded-xl shadow p-4 col-span-2">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-700">
                        Male & Female Growth Over Time
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Male"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Female"
                                stroke="#4f46e5"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-700">
                        Level Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                fill="#4f46e5"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">
                    Monthly Joined vs Dropouts
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="joined"
                            fill="#6366f1"
                            name="Newly Joined"
                            radius={[10, 10, 0, 0]}
                        />
                        <Bar
                            dataKey="dropout"
                            fill="#a5b4fc"
                            name="Dropouts"
                            radius={[10, 10, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition">
        <h3 className="text-md text-gray-600">{title}</h3>
        <p className="text-3xl font-extrabold text-indigo-700 mt-2">{value}</p>
    </div>
);

export default FacultyChart;