

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Switch, Row, Col, Modal, Table, notification, Space } from 'antd';
import { PostCategory, GettCategoryGet, DeleteCategory } from '../../../Api/CoreApi'; // Import your API functions

const CategoryForm = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]); // State for the list of categories
  const [categoriesList, setCategoriesList] = useState([]); // State for the list of categories
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState([]);


  const [category, setCategory] = useState({
    category_name: '',
    is_status: true,
    slug: '',
  });

  // Fetch category data when the component mounts
  useEffect(() => {
    
    fetchCategory();
  }, []);

  //get category list
  const fetchCategory = async () => {
    try {
      const response = await GettCategoryGet(); // Call directly without .get()

      if (Array.isArray(response.data)) {
        setCategoriesList(response.data);
      } else {
        console.warn('Fetched data is not an array:', response.data);
        setCategoriesList(response);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      notification.error({
        message: 'Failed to load categories',
        description: error.message,
      });
      setCategoriesList([]);
    } 
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log('Form submitted with values:', values);

    try {
      const response = await PostCategory(values); // Call API to submit form data
      console.log('Category submitted successfully:', response.data);
      setCategories((prevCategories) => [...prevCategories, response.data]); // Add new category to state
      setIsModalVisible(false); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  // Show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //delete the categories
  const handleDelete = async (record) => {
    try {
      const response = await DeleteCategory(record.product_id); // Assuming DeleteProduct is an API to delete a product
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
  // Define columns for the table
  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Status',
      dataIndex: 'is_status',
      key: 'is_status',
      render: (text) => (text ? 'Active' : 'Inactive'), // Display 'Active' or 'Inactive'
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
    <div>
      <Button type="primary" onClick={showModal}>
        Open Category Form
      </Button>

      <Modal
        title="Category Form"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Hide the default footer to use the form's button
        width={600}
      >
        <Form
          layout="vertical"
          initialValues={category}
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            {/* First column */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Category Name"
                name="category_name"
                rules={[{ required: true, message: 'Please enter the category name!' }]}
              >
                <Input placeholder="Enter category name" />
              </Form.Item>
            </Col>

            {/* Second column */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[{ required: true, message: 'Please enter the slug!' }]}
              >
                <Input placeholder="Enter category slug" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Status column */}
            <Col xs={24}>
              <Form.Item
                label="Status"
                name="is_status"
                valuePropName="checked"
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Table to display categories */}
      <Table
        dataSource={categoriesList}
        columns={columns}
        rowKey="id" // Assuming each category has a unique 'id' field
        pagination={{ pageSize: 5 }} // Customize the page size as needed
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default CategoryForm;
