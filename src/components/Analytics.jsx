'use client';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const employees = [
  { department: 'Engineering', rating: 4.2 },
  { department: 'Engineering', rating: 3.8 },
  { department: 'HR', rating: 4.5 },
  { department: 'HR', rating: 4.0 },
  { department: 'Sales', rating: 3.9 },
  { department: 'Sales', rating: 4.1 },
];

const departmentRatings = employees.reduce((acc, emp) => {
  if (!acc[emp.department]) acc[emp.department] = { total: 0, count: 0 };
  acc[emp.department].total += emp.rating;
  acc[emp.department].count += 1;
  return acc;
}, {});

const departments = Object.keys(departmentRatings);
const avgRatings = departments.map(
  (dept) => departmentRatings[dept].total / departmentRatings[dept].count
);

const bookmarkTrendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const bookmarkTrendData = [15, 18, 12, 20, 22, 25];

export default function Charts() {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 12 } },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: { font: { size: 12 }, stepSize: 1, beginAtZero: true },
      },
      x: {
        ticks: { font: { size: 12 } },
      },
    },
  };

  const ratingData = {
    labels: departments,
    datasets: [
      {
        label: 'Average Rating',
        data: avgRatings,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderRadius: 4,
      },
    ],
  };

  const bookmarkData = {
    labels: bookmarkTrendLabels,
    datasets: [
      {
        label: 'Bookmarks',
        data: bookmarkTrendData,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.7)',
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="p-4 space-y-8 max-w-xl mx-auto">
      <div style={{ height: 250, width: 400 }}>
        <h2 className="text-lg font-semibold mb-2">Department-wise Average Ratings</h2>
        <Bar data={ratingData} options={commonOptions} />
      </div>

      <div style={{ height: 250, width: 400 }}>
        <h2 className="text-lg font-semibold mb-2">Bookmark Trends (Monthly)</h2>
        <Line data={bookmarkData} options={commonOptions} />
      </div>
    </div>
  );
}
