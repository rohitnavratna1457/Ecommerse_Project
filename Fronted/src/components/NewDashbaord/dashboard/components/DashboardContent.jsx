import React from 'react';
import { HiChartBar, HiUsers, HiShoppingCart, HiViewList } from 'react-icons/hi';
import styles from '../../styles/DashboardStyles.module.css';

const DashboardContent = () => {
  // Example data for recent uploads
  const data = [
    { name: 'iPhone', date: '2023-02-15' },
    { name: 'Table', date: '2023-02-14' },
    { name: 'Bottle', date: '2023-02-13' },
    { name: 'Fan', date: '2023-02-12' },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Marketor Dashboard</h1>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <HiChartBar className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Total Sales</h2>
          <p className={styles.cardValue}>$10,000</p>
        </div>
        <div className={styles.card}>
          <HiUsers className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Active Customers</h2>
          <p className={styles.cardValue}>500</p>
        </div>
        <div className={styles.card}>
          <HiShoppingCart className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Average Order Value</h2>
          <p className={styles.cardValue}>$50</p>
        </div>
        <div className={styles.card}>
          <HiViewList className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Conversion Rate</h2>
          <p className={styles.cardValue}>20%</p>
        </div>
      </div>
      <div className={styles.flowChartContainer}>
        <h2 className={styles.flowChartTitle}>Order Flow Chart</h2>
        <div className={styles.flowChart}>
          <div className={styles.flowChartStep}>
            <p>Order Placed</p>
          </div>
          <div className={styles.flowChartStep}>
            <p>Order Processed</p>
          </div>
          <div className={styles.flowChartStep}>
            <p>Order Shipped</p>
          </div>
          <div className={styles.flowChartStep}>
            <p>Order Delivered</p>
          </div>
        </div>
      </div>
      <div className={styles.dataUploadContainer}>
        <h2 className={styles.dataUploadTitle}>Recent Data Uploads</h2>
        <div className={styles.dataUploadList}>
          {data.map((item, index) => (
            <div key={index} className={styles.dataUploadItem}>
              <p>{item.name} - {item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
