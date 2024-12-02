import { 
  FaHome, 
  FaBox, 
  FaClipboardList, 
  FaChartBar, 
  FaCog, 
  FaShoppingBag,
  FaUsers,
  FaMoneyBillWave
} from 'react-icons/fa';

export const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: FaHome,
    url: '/seller/dashboard'
  },
  {
    id: 'products',
    title: 'Products',
    type: 'collapse',
    icon: FaBox,
    children: [
      {
        id: 'product-list',
        title: 'All Products',
        type: 'item',
        url: '/seller/dashboard/products'
      },
      {
        id: 'add-product',
        title: 'Add New Product',
        type: 'item',
        url: '/seller/dashboard/products/add'
      },
      {
        id: 'categories',
        title: 'Categories',
        type: 'item',
        url: '/seller/dashboard/products/categories'
      }
    ]
  },
  {
    id: 'orders',
    title: 'Orders',
    type: 'collapse',
    icon: FaShoppingBag,
    children: [
      {
        id: 'all-orders',
        title: 'All Orders',
        type: 'item',
        url: '/seller/dashboard/orders'
      },
      {
        id: 'pending-orders',
        title: 'Pending',
        type: 'item',
        url: '/seller/dashboard/orders/pending'
      },
      {
        id: 'completed-orders',
        title: 'Completed',
        type: 'item',
        url: '/seller/dashboard/orders/completed'
      }
    ]
  },
  {
    id: 'customers',
    title: 'Customers',
    type: 'item',
    icon: FaUsers,
    url: '/seller/dashboard/customers'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    type: 'collapse',
    icon: FaChartBar,
    children: [
      {
        id: 'sales-analytics',
        title: 'Sales Analytics',
        type: 'item',
        url: '/seller/dashboard/analytics/sales'
      },
      {
        id: 'product-analytics',
        title: 'Product Performance',
        type: 'item',
        url: '/seller/dashboard/analytics/products'
      }
    ]
  },
  // {
  //   id: 'finance',
  //   title: 'Finance',
  //   type: 'collapse',
  //   icon: FaMoneyBillWave,
  //   children: [
  //     {
  //       id: 'earnings',
  //       title: 'Earnings',
  //       type: 'item',
  //       url: '/seller/dashboard/finance/earnings'
  //     },
  //     {
  //       id: 'payouts',
  //       title: 'Payouts',
  //       type: 'item',
  //       url: '/seller/dashboard/finance/payouts'
  //     }
  //   ]
  // },
  // {
  //   id: 'settings',
  //   title: 'Settings',
  //   type: 'item',
  //   icon: FaCog,
  //   url: '/seller/dashboard/settings'
  // }
  {
    id: 'addkyc',
    title: 'Add KYC',
    type: 'item',
    icon: FaCog,
    url: '/seller/dashboard/addkyc'
  }
]; 