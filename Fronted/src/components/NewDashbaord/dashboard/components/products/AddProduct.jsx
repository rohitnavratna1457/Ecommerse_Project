// import React, { useState, useEffect } from "react";
// // import "./AddProduct.css";
// import { GetProductdata, PostProductdata } from "../../../../../Api/CoreApi";

// const AddProduct = ({ productId }) => {
//   const [formData, setFormData] = useState({
//     product_name: "",
//     main_image: "",
//     slug: "",
//     description: "",
//     product_description: "",
//     status: "",
//     category: "",
//     subcategory: "",
//     brand: "",
//     model_number: "",
//     price: "",
//     original_price: "",
//     discount_percentage: "",
//     quantity: "",
//     inventory_status: "In Stock",
//     low_stock_alert: false,
//     is_physical: true,
//     weight: "",
//     weight_unit: "kg",
//     dimensions: "",
//     requires_shipping: true,
//     shipping_cost: "",
//     color: "",
//     size: "",
//     features: "",
//     rating: 0,
//     review_count: 0,
//     return_policy: "",
//     warranty: "",
//   });

//   const [mainImage, setMainImage] = useState(null);

//   // Fetch product data if editing an existing product
//   useEffect(() => {
//     if (productId) {
//       const fetchProductData = async () => {
//         try {
//           const product = await GetProductdata(productId);
//           if (product) {
//             setFormData(product);
//           }
//         } catch (error) {
//           console.error("Error fetching product data", error);
//         }
//       };
//       fetchProductData();
//     }
//   }, [productId]);

//   // Handle input field changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     console.log(`Updated Field - ${name}:`, type === "checkbox" ? checked : value);
//   };

//   // Handle image file changes
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setMainImage(file);
//     console.log("Selected File:", file);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();

//     // Append all form fields
//     for (const key in formData) {
//       if (formData[key] !== null && formData[key] !== "") {
//         data.append(key, formData[key]);
//       }
//     }

//     // Append the main image file
//     if (mainImage) {
//       data.append("main_image", mainImage);
//     }

//     // Debugging logs
//     console.log("Form Data (Raw):", formData);
//     console.log("Main Image:", mainImage);

//     for (let pair of data.entries()) {
//       console.log(`${pair[0]}: ${pair[1]}`);
//     }

//     try {
//       let response;
//       if (productId) {
//         // Update existing product
//         response = await PostProductdata(data, "POST");
//       } else {
//         // Create new product
//         response = await PostProductdata(data, "POST");
//       }

//       if (response) {
//         alert("Product successfully saved!");
//       } else {
//         alert("Failed to save product.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An unexpected error occurred.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <h1>{productId ? "Edit Product" : "Create Product"}</h1>
//       <div>
//         <label>Product Name:</label>
//         <input
//           type="text"
//           name="product_name"
//           value={formData.product_name}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Slug:</label>
//         <input
//           type="text"
//           name="slug"
//           value={formData.slug}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Description:</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         ></textarea>
//       </div>
//       <div>
//         <label>Product Description:</label>
//         <textarea
//           name="product_description"
//           value={formData.product_description}
//           onChange={handleChange}
//         ></textarea>
//       </div>
//       <div>
//         <label>Status:</label>
//         <select name="status" value={formData.status} onChange={handleChange}>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>
//       </div>
//       <div>
//         <label>Category:</label>
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Subcategory:</label>
//         <input
//           type="text"
//           name="subcategory"
//           value={formData.subcategory}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Brand:</label>
//         <input
//           type="text"
//           name="brand"
//           value={formData.brand}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Model Number:</label>
//         <input
//           type="text"
//           name="model_number"
//           value={formData.model_number}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Price:</label>
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Original Price:</label>
//         <input
//           type="number"
//           name="original_price"
//           value={formData.original_price}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Discount Percentage:</label>
//         <input
//           type="number"
//           step="0.01"
//           name="discount_percentage"
//           value={formData.discount_percentage}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Quantity:</label>
//         <input
//           type="number"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Low Stock Alert:</label>
//         <input
//           type="checkbox"
//           name="low_stock_alert"
//           checked={formData.low_stock_alert}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Weight:</label>
//         <input
//           type="number"
//           name="weight"
//           value={formData.weight}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Main Image:</label>
//         <input type="file" name="main_image" onChange={handleImageChange} />
//       </div>
//       <div>
//         <label>Color:</label>
//         <input
//           type="text"
//           name="color"
//           value={formData.color}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Size:</label>
//         <input
//           type="text"
//           name="size"
//           value={formData.size}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Features:</label>
//         <textarea
//           name="features"
//           value={formData.features}
//           onChange={handleChange}
//         ></textarea>
//       </div>
//       <div>
//         <label>Return Policy:</label>
//         <textarea
//           name="return_policy"
//           value={formData.return_policy}
//           onChange={handleChange}
//         ></textarea>
//       </div>
//       <div>
//         <label>Warranty:</label>
//         <textarea
//           name="warranty"
//           value={formData.warranty}
//           onChange={handleChange}
//         ></textarea>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default AddProduct;


import React, { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, Button, Switch, Upload, Typography, Modal, Row, Col, notification, Table, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { PostProduct, GetProduct, GettCategoryGet, GettSubCategory,DeleteProduct } from '../../../../../Api/CoreApi'
const { Option } = Select;
const { Title } = Typography;

const ProductFormModal = () => {
  const [form] = useForm();
  const [Loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log(form)

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    setLoading(true);
    try {
      const response = await GetProduct();
      if (Array.isArray(response.data)) {
        setProduct(response.data);
      } else {
        console.warn('Fetched data is not an array:', response.data);
        setProduct(response);
      }
      console.log('Fetched Products:', response.data); // Add this line
    } catch (error) {
      console.error('Error fetching products:', error);
      notification.error({
        message: 'Failed to load products',
        description: error.message,
      });
      setProduct([]);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await GettCategoryGet(); // Call directly without .get()

      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.warn('Fetched data is not an array:', response.data);
        setCategories(response);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      notification.error({
        message: 'Failed to load categories',
        description: error.message,
      });
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const response = await GettSubCategory(); // Call directly without .get()

      if (Array.isArray(response.data)) {
        setSubCategories(response.data);
      } else {
        console.warn('Fetched data is not an array:', response.data);
        setSubCategories(response);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      notification.error({
        message: 'Failed to load categories',
        description: error.message,
      });
      setSubCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log('Form Values:', values); // Add this line to log form values
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'main_image' && imageFile) {
          formData.append(key, imageFile);
        } else {
          formData.append(key, values[key]);
        }
      });
  
      const response = await PostProduct(formData); // Submit form data using the PostProduct API
  
      notification.success({
        message: 'Success',
        description: 'Product added successfully'
      });
      setIsModalVisible(false); // Close the modal after successful submission
      form.resetFields(); // Reset form fields after submission
    } catch (error) {
      notification.error({
        message: 'Failed to add product',
        description: error.message || 'An error occurred while adding the product'
      });
    }
  };
  

  // Handle image upload
  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      setImageFile(info.file.originFileObj);
    }
  };

  // Show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hide the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Handle product deletion
  const handleDelete = async (record) => {
    try {
      const response = await DeleteProduct(record.product_id); // Assuming DeleteProduct is an API to delete a product
      setProducts(products.filter(product => product.product_id !== record.product_id));
      notification.success({
        message: 'Success',
        description: 'Product deleted successfully'
      });
    } catch (error) {
      notification.error({
        message: 'Failed to delete product',
        description: error.message || 'An error occurred while deleting the product'
      });
    }
  };

  // Handle product editing
  const handleEdit = (record) => {
    setEditingProduct(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Modal
        title="Add or Edit Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000} // Adjust width as needed
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ status: 'Active', is_physical: true, inventory_status: 'In Stock' }}
        >
          {/* Row 1: Name, Category, Subcategory */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Product Name"
                name="product_name"
                rules={[{ required: true, message: 'Please enter the product name!' }]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select a category!' }]}
              >
                <Select placeholder="Select a category">
                  {categories.map(category => (
                    <Option key={category.category_id} value={category.category_id}>
                      {category.category_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Subcategory"
                name="subcategory"
                rules={[{ required: true, message: 'Please select a subcategory!' }]}
              >
                <Select placeholder="Select a subcategory">
                  {subCategories.map(subCategory => (
                    <Option key={subCategory.subcategory_id} value={subCategory.subcategory_name}>
                      {subCategory.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[{ required: true, message: 'Please enter the slug!' }]}
              >
                <Input placeholder="Enter product slug" />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 2: Description, Price, Original Price */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Product Description"
                name="product_description"
              >
                <Input.TextArea placeholder="Enter product description" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please enter the price!' }]}
              >
                <InputNumber placeholder="Enter price" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Original Price"
                name="original_price"
              >
                <InputNumber placeholder="Enter original price" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 3: Discount Percentage, Quantity, Inventory Status */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Discount Percentage"
                name="discount_percentage"
              >
                <InputNumber placeholder="Enter discount percentage" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please enter the quantity!' }]}
              >
                <InputNumber placeholder="Enter quantity" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Inventory Status"
                name="inventory_status"
              >
                <Select placeholder="Select inventory status">
                  <Option value="In Stock">In Stock</Option>
                  <Option value="Out of Stock">Out of Stock</Option>
                  <Option value="Preorder">Preorder</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Row 4: Main Image, Shipping Details */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Main Image"
                name="main_image"
              >
                <Upload
                  beforeUpload={() => false} // Prevent auto upload
                  onChange={handleImageChange}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Is Physical"
                name="is_physical"
                valuePropName="checked"
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
              <Form.Item
                label="Weight"
                name="weight"
              >
                <InputNumber placeholder="Enter weight" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 5: Shipping Cost, Color, Size */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Weight Unit"
                name="weight_unit"
              >
                <Select placeholder="Select weight unit">
                  <Option value="kg">kg</Option>
                  <Option value="g">g</Option>
                  <Option value="lb">lb</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Dimensions"
                name="dimensions"
              >
                <Input placeholder="Enter dimensions" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Shipping Cost"
                name="shipping_cost"
              >
                <InputNumber placeholder="Enter shipping cost" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 6: Attributes */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Color"
                name="color"
              >
                <Input placeholder="Enter color" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Size"
                name="size"
              >
                <Input placeholder="Enter size" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Features"
                name="features"
              >
                <Input.TextArea placeholder="Enter features" />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 7: Ratings and Reviews */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Rating"
                name="rating"
              >
                <InputNumber placeholder="Enter rating" min={0} max={5} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Review Count"
                name="review_count"
              >
                <InputNumber placeholder="Enter review count" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 8: Policies */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Return Policy"
                name="return_policy"
              >
                <Input.TextArea placeholder="Enter return policy" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Warranty"
                name="warranty"
              >
                <Input.TextArea placeholder="Enter warranty" />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* table format */}
      <Table
        columns={columns}
        dataSource={product}
        rowKey="product_id"
      />
    </div>
  );
};

export default ProductFormModal;
