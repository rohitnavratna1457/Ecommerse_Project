import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationConfig } from '../config/navigation';
import styles from './Sidebar.module.css';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

const NavItem = ({ item, isActive, onClick, isOpen }) => {
  const Icon = item.icon;
  
  return (
    <div className={styles.navItemContainer}>
      <div 
        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
        onClick={onClick}
      >
        <div className={styles.navItemContent}>
          {Icon && <Icon className={styles.icon} />}
          <span className={styles.title}>{item.title}</span>
        </div>
        {item.type === 'collapse' && (
          <div className={styles.collapseIcon}>
            {isOpen ? <FaAngleDown /> : <FaAngleRight />}
          </div>
        )}
      </div>
      
      {item.type === 'collapse' && isOpen && (
        <div className={styles.subMenu}>
          {item.children.map((child) => (
            <NavChild key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const NavChild = ({ item }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={styles.navChild}
      onClick={() => navigate(item.url)}
    >
      <span>{item.title}</span>
    </div>
  );
};

const Sidebar = () => {
  const [openItems, setOpenItems] = useState({});
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.type === 'collapse') {
      setOpenItems(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
    } else {
      setActiveItem(item.id);
      navigate(item.url);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>Seller Dashboard</h2>
      </div>
      
      <div className={styles.navigation}>
        {navigationConfig.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            isOpen={openItems[item.id]}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
