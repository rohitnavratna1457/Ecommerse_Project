// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, Select, Space, Tag, message, Checkbox, Row, Col, Upload } from 'antd';
// import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
// import { Adduser, GetUsers, DeleteUser,UpdateUser } from '../../../Api/CoreApi'; // Assuming Adduser is properly implemented
// import './Products.css';

// const { Option } = Select;

// // Assuming GetUsers API call is something like this:


// const Products = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [userType, setUserType] = useState(null); // Added to track user type
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState();

//   // Fetch users when the component mounts
//   useEffect(() => {

//     GetUserss();
//     // fetchUsers();
//   }, []);  // Empty dependency array to run only once when the component mounts


//   const GetUserss = async () => {
//     try {
//       const response = await GetUsers(); // Call the GetUsers function
//       if (response) {
//         setUser(response); // Set users data if response exists
//       } else {
//         message.error('No data received from server');
//       }
//     } catch (error) {
//       message.error('Error fetching users');
//       console.error(error);
//     }
//   };
//   const handleDelete = (user_id) => {
//     Modal.confirm({
//       title: 'Confirm Deletion',
//       content: 'Are you sure you want to delete this user?',
//       onOk: async () => {
//         try {
//           await DeleteUser(user_id); // Call API to delete user
//           setProducts((prev) => prev.filter((user) => user.id !== user_id)); // Update UI
//           message.success('User deleted successfully');
//         } catch (error) {
//           message.error('Failed to delete user');
//         }
//       },
//     });
//   };
//    // Handler functions
//    const handleEdit = (user) => {
//     setEditingProduct(user);
//     form.setFieldsValue({
//       name: user.name,
//       email: user.email,
//       mobile_no: user.mobile_no,
//       user_type: user.user_type,
//       address: user.address,
//       is_status: user.is_status,
//       is_admin: user.is_admin,
//       is_superuser: user.is_superuser
//     });
//     setUserType(user.user_);
//     setIsModalVisible(true);
//   };
//   const columns = [
//     {
//       title: 'User Name',
//       dataIndex: 'name',
//       key: 'name',
//       sorter: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       title: 'Mobile Number',
//       dataIndex: 'mobile_no',
//       key: 'mobile_no',
//       sorter: (a, b) => a.mobile_no - b.mobile_no,
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//       sorter: (a, b) => a.email.localeCompare(b.email),
//     },
//     {
//       title: 'User Type',
//       dataIndex: 'user_type',
//       key: 'user_type',
//       filters: [
//         { text: 'Super Admin', value: 'Super Admin' },
//         { text: 'Admin', value: 'Admin' },
//         { text: 'Seller', value: 'Seller' },
//         { text: 'Customer', value: 'Customer' },
//       ],
//       onFilter: (value, record) => record.user_type === value,
//     },
//     {
//       title: 'Last Login Date',
//       dataIndex: 'date',
//       key: 'date',
//       sorter: (a, b) => a.date.localeCompare(b.date),
//     },
//     {
//       title: 'Last Login Time',
//       dataIndex: 'time',
//       key: 'time',
//       sorter: (a, b) => a.time.localeCompare(b.time),
//     },
//     {
//       title: 'Is Status',
//       dataIndex: 'is_status',
//       key: 'is_status',
//       render: (is_status) => (
//         <Tag color={is_status ? 'green' : 'red'}>{is_status ? 'Yes' : 'No'}</Tag>
//       ),
//     },
//     {
//       title: 'Is Admin',
//       dataIndex: 'is_admin',
//       key: 'is_admin',
//       render: (is_admin) => (
//         <Tag color={is_admin ? 'green' : 'red'}>{is_admin ? 'Yes' : 'No'}</Tag>
//       ),
//     },
//     {
//       title: 'Is Superuser',
//       dataIndex: 'is_superuser',
//       key: 'is_superuser',
//       render: (is_superuser) => (
//         <Tag color={is_superuser ? 'green' : 'red'}>{is_superuser ? 'Yes' : 'No'}</Tag>
//       ),
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//       sorter: (a, b) => a.address.localeCompare(b.address),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => handleEdit(record.user_id)}
//           >
//             Edit
//           </Button>
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record.user_id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];




//         const handleModalOk = async () => {
//           try {
//             // Validate form fields
//             const values = await form.validateFields();

//             // Check if passwords match
//             if (values.password !== values.password2) {
//               message.error("Passwords don't match!");
//               return;
//             }

//             // Mock API call (replace Adduser with actual API function)
//             const result = await Adduser(values);

//             if (result) {
//               // Show success message and reset form if API call is successful
//               message.success('User added successfully');
//               form.resetFields();
//               setIsModalVisible(false);

//               // Fetch the updated list of users after successful user creation
//               const users = await GetUsers();
//               console.log(users)
//               setProducts(users);  // Update the state with the fetched users
//             }
//           } catch (err) {
//             console.error('Error:', err);
//             message.error('Failed to add user. Please try again.');
//           }
//         };

//         const handleModalCancel = () => {
//           setIsModalVisible(false);
//           setEditingProduct(null);
//           form.resetFields();
//         };

//         const handleUserTypeChange = (value) => {
//           setUserType(value);
//         };

//         return (
//           <div className="products-container">
//             <div className="products-header">
//               <h2>Users Management</h2>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => setIsModalVisible(true)}
//               >
//                 Add New User
//               </Button>
//             </div>

//             <Table
//               columns={columns}
//               dataSource={user}
//               rowKey="id"
//               className="products-table"
//             />

//             <Modal
//               title={editingProduct ? "Edit User" : "Add New User"}
//               open={isModalVisible}
//               onOk={handleModalOk}
//               onCancel={handleModalCancel}
//               width={720}
//             >
//               <Form
//                 form={form}
//                 layout="vertical"
//                 className="product-form"
//               >
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item
//                       name="name"
//                       label="Name"

//                       rules={[{ required: true, message: 'Please input your name!' }]}
//                     >
//                       <Input />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item
//                       name="mobile_no"
//                       label="Mobile Number"
//                       rules={[{ required: true, message: 'Please input your mobile number!' }]}
//                     >
//                       <Input />
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item
//                       name="password"
//                       label="Password"

//                       rules={[{ required: true, message: 'Please input your password!' }]}
//                     >
//                       <Input.Password />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item
//                       name="password2"
//                       label="Confirm Password"
//                       rules={[{ required: true, message: 'Please confirm your password!' }]}
//                     >
//                       <Input.Password />
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item
//                       name="email"
//                       label="Email"
//                       rules={[{ required: true, message: 'Please input your email!' }]}
//                     >
//                       <Input />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item
//                       name="user_type"
//                       label="User Type"
//                       rules={[{ required: true, message: 'Please select your user type!' }]}
//                     >
//                       <Select value={userType} onChange={handleUserTypeChange}>
//                         <Option value="SuperAdmin">Super Admin</Option>
//                         <Option value="Admin">Admin</Option>
//                         <Option value="Seller">Seller</Option>
//                         <Option value="Customer">Customer</Option>
//                       </Select>
//                     </Form.Item>
//                     {/* Show additional input when "Seller" is selected */}
//                     {userType === 'Seller' && (
//                       <>
//                         {/* Business Name */}
//                         <Form.Item
//                           name="bussiness_name"
//                           label="Business Name"
//                           rules={[{ required: true, message: 'Please enter your business name!' }]}
//                         >
//                           <Input placeholder="Enter your business name" />
//                         </Form.Item>

//                         {/* Business Address */}
//                         <Form.Item
//                           name="bussiness_address"
//                           label="Business Address"
//                           rules={[{ required: true, message: 'Please enter your business address!' }]}
//                         >
//                           <Input.TextArea placeholder="Enter your business address" />
//                         </Form.Item>

//                         {/* Business Mobile Number */}
//                         <Form.Item
//                           name="bussiness_mobile_no"
//                           label="Business Mobile Number"
//                           rules={[
//                             { required: true, message: 'Please enter your business mobile number!' },
//                             { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits long!' }
//                           ]}
//                         >
//                           <Input maxLength={10} placeholder="Enter your business mobile number" />
//                         </Form.Item>

//                         {/* Business Image Upload */}
//                         <Form.Item
//                           name="image"
//                           label="Business Image"
//                           valuePropName="fileList"
//                           getValueFromEvent={({ fileList }) => fileList}
//                         >
//                           <Upload
//                             action="/upload"  // Your backend upload URL
//                             listType="picture"
//                             accept="image/*"
//                             beforeUpload={() => false}  // Prevent auto upload (handle manually)
//                           >
//                             <Button icon={<UploadOutlined />}>Upload Business Image</Button>
//                           </Upload>
//                         </Form.Item>
//                       </>
//                     )}
//                   </Col>
//                 </Row>

//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item
//                       name="date"
//                       label="Last Login Date"
//                     >
//                       <Input type="date" />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item
//                       name="time"
//                       label="Last Login Time"
//                     >
//                       <Input type="time" />
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Row gutter={16}>
//                   <Col span={8}>
//                     <Form.Item
//                       name="is_status"
//                       valuePropName="checked"
//                     >
//                       <Checkbox>Is Status</Checkbox>
//                     </Form.Item>
//                   </Col>
//                   <Col span={8}>
//                     <Form.Item
//                       name="is_admin"
//                       valuePropName="checked"
//                     >
//                       <Checkbox>Is Admin</Checkbox>
//                     </Form.Item>
//                   </Col>
//                   <Col span={8}>
//                     <Form.Item
//                       name="is_superuser"
//                       valuePropName="checked"
//                     >
//                       <Checkbox>Is Superuser</Checkbox>
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Form.Item
//                   name="address"
//                   label="Address"
//                   rules={[{ required: true, message: 'Please enter your address!' }]}
//                 >
//                   <Input.TextArea placeholder="Enter your address" />
//                 </Form.Item>
//               </Form>
//             </Modal>
//           </div>
//         );
//       };

//       export default Products;

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Checkbox, Row, Col, Upload, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Adduser, GetUsers, DeleteUser, UpdateUser } from '../../../Api/CoreApi';
import './Products.css';

const { Option } = Select;

const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [userType, setUserType] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await GetUsers();
      if (response && Array.isArray(response)) {
        setProducts(response);
      } else {
        message.error('Failed to load user data.');
      }
    } catch (error) {
      message.error('Error fetching users.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (user_id) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this user?',
      onOk: async () => {
        try {
          await DeleteUser(user_id);
          setProducts((prev) => prev.filter((user) => user.user_id !== user_id));
          message.success('User deleted successfully');
        } catch (error) {
          message.error('Failed to delete user');
        }
      },
    });
  };

  const handleEdit = (user) => {
    setEditingProduct(user);
    setUserType(user.user_type);
    form.setFieldsValue({
      ...user,
      bussiness_name: user.bussiness_name || '',
      bussiness_address: user.bussiness_address || '',
      bussiness_mobile_no: user.bussiness_mobile_no || '',
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.password && values.password !== values.password2) {
        message.error("Passwords don't match!");
        return;
      }
  
      if (editingProduct) {
        // Call UpdateUser API with updated user data
        const updatedUser = { ...editingProduct, ...values };
        console.log(updatedUser.user_id)
        await UpdateUser(updatedUser.user_id);
        message.success('User updated successfully');
      } else {
        // Call Adduser API for new user
        await Adduser(values);
        message.success('User added successfully');
      }
  
      setIsModalVisible(false);
      form.resetFields();
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error:', error);
      message.error(editingProduct ? 'Failed to update user' : 'Failed to add user');
    }
  };
  
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile_no',
      key: 'mobile_no',
      sorter: (a, b) => a.mobile_no - b.mobile_no,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'User Type',
      dataIndex: 'user_type',
      key: 'user_type',
      filters: [
        { text: 'Super Admin', value: 'Super Admin' },
        { text: 'Admin', value: 'Admin' },
        { text: 'Seller', value: 'Seller' },
        { text: 'Customer', value: 'Customer' },
      ],
      onFilter: (value, record) => record.user_type === value,
    },
    {
      title: 'Last Login Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.user_id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Users Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingProduct(null);
            setIsModalVisible(true);
          }}
        >
          Add New User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="user_id"
        loading={loading}
        className="products-table"
      />

      <Modal
        title={editingProduct ? 'Edit User' : 'Add New User'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={720}
      >
        <Form form={form} layout="vertical" className="product-form">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mobile_no"
                label="Mobile Number"
                rules={[{ required: true, message: 'Please input your mobile number!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: !editingProduct, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password2"
                label="Confirm Password"
                rules={[{ required: !editingProduct, message: 'Please confirm your password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="user_type"
                label="User Type"
                rules={[{ required: true, message: 'Please select your user type!' }]}
              >
                <Select value={userType} onChange={handleUserTypeChange}>
                  <Option value="SuperAdmin">Super Admin</Option>
                  <Option value="Admin">Admin</Option>
                  <Option value="Seller">Seller</Option>
                  <Option value="Customer">Customer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {userType === 'Seller' && (
            <>
              <Form.Item
                name="bussiness_name"
                label="Business Name"
                rules={[{ required: true, message: 'Please enter your business name!' }]}
              >
                <Input placeholder="Enter your business name" />
              </Form.Item>
              <Form.Item
                name="bussiness_address"
                label="Business Address"
                rules={[{ required: true, message: 'Please enter your business address!' }]}
              >
                <Input.TextArea placeholder="Enter your business address" />
              </Form.Item>
              <Form.Item
                name="bussiness_mobile_no"
                label="Business Mobile Number"
                rules={[
                  { required: true, message: 'Please enter your business mobile number!' },
                  { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits long!' }
                ]}
              >
                <Input maxLength={10} placeholder="Enter your business mobile number" />
              </Form.Item>
              <Form.Item
                name="image"
                label="Business Image"
                valuePropName="fileList"
                getValueFromEvent={({ fileList }) => fileList}
              >
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Upload Business Image</Button>
                </Upload>
              </Form.Item>
            </>
          )}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date" label="Last Login Date">
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="time" label="Last Login Time">
                <Input type="time" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="is_status" valuePropName="checked">
                <Checkbox>Is Status</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="is_admin" valuePropName="checked">
                <Checkbox>Is Admin</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="is_superuser" valuePropName="checked">
                <Checkbox>Is Superuser</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter your address!' }]}
          >
            <Input.TextArea placeholder="Enter your address" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
