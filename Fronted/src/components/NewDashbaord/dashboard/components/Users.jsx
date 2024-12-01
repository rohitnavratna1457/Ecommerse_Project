import React, { useState } from 'react';
import { HiUsers, HiSearch, HiCheckCircle, HiXCircle, HiClock, HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styles from '../styles/CommonStyles.module.css';

const Users = () => {
  // Example KYC data
  const allUsers = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      status: 'approved', 
      submissionDate: '2024-02-15',
      documentType: 'Passport',
      verificationDate: '2024-02-16'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      status: 'pending', 
      submissionDate: '2024-02-14',
      documentType: 'National ID',
      verificationDate: null
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@example.com', 
      status: 'rejected', 
      submissionDate: '2024-02-13',
      documentType: 'Driver License',
      verificationDate: '2024-02-14'
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved':
        return <HiCheckCircle className={styles.statusIconApproved} />;
      case 'rejected':
        return <HiXCircle className={styles.statusIconRejected} />;
      case 'pending':
        return <HiClock className={styles.statusIconPending} />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'approved':
        return styles.statusApproved;
      case 'rejected':
        return styles.statusRejected;
      case 'pending':
        return styles.statusPending;
      default:
        return '';
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.listHeader}>
        <div className={styles.titleSection}>
          <h1 className={styles.pageTitle}>
            <HiUsers className={styles.titleIcon} />
            KYC Status Management
          </h1>
          <p className={styles.pageDescription}>
            View and manage customer KYC verification status
          </p>
        </div>
        
        <div className={styles.actionSection}>
          <div className={styles.searchBox}>
            <HiSearch className={styles.searchIcon} />
            <input 
              type="text" 
              value={searchTerm} 
              onChange={handleSearch}
              placeholder="Search by name or email..." 
              className={styles.searchInput}
            />
          </div>
          <Link to="/users/add-kyc" className={styles.primaryButton}>
            <HiPlus className={styles.buttonIcon} />
            New KYC
          </Link>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={`${styles.statCard} ${styles.approved}`}>
          <HiCheckCircle className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Approved</h3>
            <p>150</p>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.pending}`}>
          <HiClock className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Pending</h3>
            <p>45</p>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.rejected}`}>
          <HiXCircle className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Rejected</h3>
            <p>25</p>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Document Type</th>
              <th>Submission Date</th>
              <th>Verification Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.documentType}</td>
                <td>{user.submissionDate}</td>
                <td>{user.verificationDate || '-'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(user.status)}`}>
                    {getStatusIcon(user.status)}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.viewButton}>View Details</button>
                    {user.status === 'pending' && (
                      <>
                        <button className={styles.approveButton}>Approve</button>
                        <button className={styles.rejectButton}>Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users; 