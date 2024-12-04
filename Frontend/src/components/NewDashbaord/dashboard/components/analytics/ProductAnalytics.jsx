import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProductAnalytics = () => {
  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Others'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const productPerformance = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 90, 80, 70, 60],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Views',
        data: [500, 400, 350, 300, 250],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Product Analytics</h1>
        <div className="date-filter">
          <select defaultValue="lastmonth">
            <option value="last7days">Last 7 Days</option>
            <option value="lastmonth">Last Month</option>
            <option value="last3months">Last 3 Months</option>
          </select>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">248</p>
          <span className="stat-change positive">+12 new this month</span>
        </div>
        <div className="stat-card">
          <h3>Top Performing</h3>
          <p className="stat-value">45</p>
          <span className="stat-change neutral">Based on sales</span>
        </div>
        <div className="stat-card">
          <h3>Low Stock</h3>
          <p className="stat-value">8</p>
          <span className="stat-change warning">Needs attention</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Category Distribution</h3>
          <div className="chart donut-chart">
            <Doughnut data={categoryData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                },
              }
            }} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Top Products Performance</h3>
          <div className="chart">
            <Bar data={productPerformance} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                }
              }
            }} />
          </div>
        </div>
      </div>

      <div className="product-insights">
        <h3>Key Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Best Selling Category</h4>
            <p>Electronics (35% of sales)</p>
          </div>
          <div className="insight-card">
            <h4>Most Viewed Product</h4>
            <p>Product A (500 views)</p>
          </div>
          <div className="insight-card">
            <h4>Conversion Rate</h4>
            <p>24% (↑ 3% from last month)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics; 