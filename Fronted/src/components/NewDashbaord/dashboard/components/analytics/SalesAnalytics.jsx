import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Analytics.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesAnalytics = () => {
  // Sample data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [30000, 45000, 35000, 50000, 60000, 55000],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Revenue',
        data: [2100, 1800, 2500, 2200, 2800, 3000, 2600],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Sales Analytics</h1>
        <div className="date-filter">
          <select defaultValue="last6months">
            <option value="last7days">Last 7 Days</option>
            <option value="lastmonth">Last Month</option>
            <option value="last6months">Last 6 Months</option>
            <option value="lastyear">Last Year</option>
          </select>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p className="stat-value">₹2,75,000</p>
          <span className="stat-change positive">+15% from last period</span>
        </div>
        <div className="stat-card">
          <h3>Average Order Value</h3>
          <p className="stat-value">₹1,850</p>
          <span className="stat-change positive">+5% from last period</span>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p className="stat-value">148</p>
          <span className="stat-change negative">-3% from last period</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Monthly Sales Trend</h3>
          <div className="chart">
            <Line data={salesData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: false,
                }
              }
            }} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Weekly Revenue Distribution</h3>
          <div className="chart">
            <Bar data={revenueData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: false,
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics; 