// import React from "react";
// import { useState, useEffect } from "react";
// import { Getsellerdata, UpdateSellerData } from "../../../Api/CoreApi";
// function SellerProfile() {
//   const [data, setData] = useState([]);
//   console.log(data, "**** data ****");

//   const get_seller = async () => {
//     const response = await Getsellerdata();
//     setData(response);
//   };

//   useEffect(() => {
//     get_seller();
//   }, []);

//   const accept = async (value) => {
//     const seller_id = parseInt(value.user_id, 10);
//     const updatedProduct = { ...value, admin_approve: "accept" };
//     const response = await UpdateSellerData(seller_id, updatedProduct);
//   };
//   const reject = async (value) => {
//     const seller_id = parseInt(value.user_id, 10);
//     const updatedProduct = { ...value, admin_approve: "reject" };
//     const response = await UpdateSellerData(seller_id, updatedProduct);
//   };
//   return (
//     <div>
//       {data.map((i) => (
//         <>
//           <p>{i.name}</p>
//           <button onClick={() => accept(i)}>accept</button>
//           <button onClick={() => reject(i)}>reject</button>

//         </>
//       ))}
//     </div>
//   );
// }

// export default SellerProfile;


import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Getsellerdata, UpdateSellerData } from "../../../Api/CoreApi";
import "antd/dist/reset.css"; // Import Ant Design CSS

function SellerProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch seller data
  const get_seller = async () => {
    setLoading(true);
    const response = await Getsellerdata();
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    get_seller();
  }, []);

  // Accept seller
  const accept = async (value) => {
    const seller_id = parseInt(value.user_id, 10);
    const updatedSeller = { ...value, admin_approve: "accept" };
    await UpdateSellerData(seller_id, updatedSeller);
    get_seller(); // Refresh data
  };

  // Reject seller
  const reject = async (value) => {
    const seller_id = parseInt(value.user_id, 10);
    const updatedSeller = { ...value, admin_approve: "reject" };
    await UpdateSellerData(seller_id, updatedSeller);
    get_seller(); // Refresh data
  };

  // Define table columns
  const columns = [
    {
      title: "id",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1, // Add serial number
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "admin_approve",
      key: "admin_approve",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: "10px" }}
            type="primary"
            onClick={() => accept(record)}
          >
            Accept
          </Button>
          <Button type="primary" onClick={() => reject(record)}>
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Seller Profile</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="user_id"
        loading={loading}
        pagination={{ pageSize: 5 }} // Add pagination with 5 items per page
      />
    </div>
  );
}

export default SellerProfile;
