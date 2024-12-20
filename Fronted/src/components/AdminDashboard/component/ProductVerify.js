// import React, { useState } from "react";
// import axios from "axios";
// import { PostSellerprofile } from "../../../Api/CoreApi";

// const ApproveRejectSeller = ({ sellerId }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");

//   const handleApprove = async () => {
//     setLoading(true);
//     setError(null);
//     setMessage(null);

//     try {
//       const response = await axios.post(`/api/approve-seller/${sellerId}/`);
//       setMessage(response.data.message);
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReject = async () => {
//     setLoading(true);
//     setError(null);
//     setMessage(null);

//     try {
//       const response = await axios.post(`/api/reject-seller/${sellerId}/`, {
//         rejection_reason: rejectionReason,
//       });
//       setMessage(response.data.message);
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h3>Seller Management</h3>

//       {/* Approve Button */}
//       <div>
//         <button onClick={handleApprove} disabled={loading}>
//           {loading ? "Approving..." : "Approve Seller"}
//         </button>
//       </div>

//       {/* Reject Button & Reason Input */}
//       <div style={{ marginTop: "20px" }}>
//         <textarea
//           value={rejectionReason}
//           onChange={(e) => setRejectionReason(e.target.value)}
//           placeholder="Enter rejection reason"
//           rows="4"
//           cols="50"
//         />
//         <br />
//         <button onClick={handleReject} disabled={loading}>
//           {loading ? "Rejecting..." : "Reject Seller"}
//         </button>
//       </div>

//       {/* Feedback Messages */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {message && <p style={{ color: "green" }}>{message}</p>}
//     </div>
//   );
// };

// export default ApproveRejectSeller;

// import React from 'react'
// import { useState,useEffect } from 'react'
// import { GetProductdata , ProductUpdate} from '../../../Api/CoreApi'

// function Sellers() {
//     const [data,setData]=useState([])
//     console.log(data,'data')

//     const getproduct = async()=>{
//       const response = await GetProductdata()
//       const data = response.filter(i=>i.admin_approve === 'admin_request')
//       setData(data)
//     }

//     const ProductUpdate = async(value)=>{

//       const response = await GetProductdata(value)
//       setData(response)
//     }

//     const send = (value)=>{
//       // const approve = value.map(i=>i.admin_approve)
//       // const data = ({approve:'Approve'})
//       const updatedValue = value.map(item => ({
//         ...item, // Spread the existing properties
//         admin_approve: 'Approve'}))
//         console.log(updatedValue,'***** updatedValue ******')

//     }

//     useEffect(()=>{
//       getproduct()
//     },[])

//   return (
//     <div>
//       {data.map(i=>(
//         <><h2>{i.product_name}</h2>
//         <button onClick={() => send(i.admin_approve)}>Approve</button>
//         </>
//       ))}

//     </div>
//   )
// }

// export default Sellers

// import React, { useState, useEffect } from 'react';
// import { GetProductdata, ProductUpdate } from '../../../Api/CoreApi';

// function Sellers() {
//   const [data, setData] = useState([]); // State to store product data
//   console.log(data, 'data'); // Debugging log

//   // Fetch products with admin_approve === 'admin_request'
//   const getproduct = async () => {
//     try {
//       const response = await GetProductdata();
//       const filteredData = response.filter((item) => item.admin_approve === 'admin_request');
//       setData(filteredData);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const send = async (value) => {
//     try {
//       const updatedProduct = { ...value, admin_approve: 'Approve' };

//       // Use product.product_id for the API call and state update
//       await ProductUpdate(updatedProduct, value.product_id);

//       // Update the state to reflect the change
//       setData((prevData) =>
//         prevData.map((item) =>
//           item.product_id === value.product_id ? updatedProduct : item
//         )
//       );

//       console.log(updatedProduct, '***** updatedProduct ******');
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   useEffect(() => {
//     getproduct();
//   }, []);

//   return (
//     <div>
//       {data.length > 0 ? (
//         data.map((item) => (
//           <div key={item.product_id} style={{ marginBottom: '20px' }}>
//             <h2>{item.product_name}</h2>
//             <button onClick={() => send(item)}>Approve</button>
//           </div>
//         ))
//       ) : (
//         <p>No products requiring approval.</p>
//       )}
//     </div>
//   );
// }

// export default Sellers;

// import React, { useState, useEffect } from "react";
// import { GetProductdata, ProductUpdate } from "../../../Api/CoreApi";

// function Sellers() {
//   const [data, setData] = useState([]);
//   const getproduct = async () => {
//     const response = await GetProductdata();
//     const filteredData = response.filter((item) => item.admin_approve === "admin_request");
//     setData(filteredData);
//   };

//   const send = async (product) => {
//     const seller_id = parseInt(product.product_id, 10);
//     const updatedProduct = { ...product, admin_approve: "Approve" };
//     const response = await ProductUpdate(seller_id, updatedProduct);
//     console.log(response,'****** response ********')
//     // setData(response)
//   };

//   useEffect(() => {
//     getproduct();
//   },[]);

//   return (
//     <div>
//       {data.map((item) => (
//           <div key={item.product_id} style={{ marginBottom: "20px" }}>
//             <h2>{item.product_name}</h2>
//             <button onClick={() => send(item)}>Approve</button>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default Sellers;

import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { GetProductdata, ProductUpdate } from "../../../Api/CoreApi";

function ProductVerify() {
  const [data, setData] = useState([]);

  // Fetch products from API and filter based on admin approval status
  const getproduct = async () => {
    const response = await GetProductdata();
    const filteredData = response.filter(
      (item) => item.admin_approve === "admin_request"
    );
    setData(filteredData);
  };

  // Send updated product approval to API
  const send = async (product, status) => {
    const seller_id = parseInt(product.product_id, 10);
    const updatedProduct = { ...product, admin_approve: status };
    const response = await ProductUpdate(seller_id, updatedProduct);
    console.log(response, `****** response for ${status} ********`);

    // Optionally refresh the data after update
    getproduct();
  };

  // Fetch products when component mounts
  useEffect(() => {
    getproduct();
  }, []);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "admin_approve",
      key: "admin_approve",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => send(record, "Approve")}>
            Approve
          </Button>
          <Button type="primary" onClick={() => send(record, "Reject")}> 
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Seller Products</h1>
      <Table dataSource={data} columns={columns} rowKey="product_id" />
    </div>
  );
}

export default ProductVerify;
