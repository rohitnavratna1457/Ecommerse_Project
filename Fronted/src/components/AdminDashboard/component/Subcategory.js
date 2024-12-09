import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Switch, Typography, Modal, notification, message, Space, Table } from 'antd';
import { PostSubCategory, GettSubCategory, GettCategoryGet, DeleteSubCategory } from '../../../Api/CoreApi'; // Import API functions

const { Option } = Select;
const { Title } = Typography;

const SubCategoryForm = () => {
    const [categories, setCategories] = useState([]);
    const [Loading, setLoading] = useState();
    const [subcategoriesList, setSubCategoriesList] = useState([]); // State for the list of categories
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState([]);

    const [subcategory, setSubCategory] = useState({
        name: '',
        category_id: null,
        is_status: true,
        slug: '',
    });
    console.log(categories, '** subcategory ***')
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchSubCategoryList();
        fetchCategories();
    }, []);

    //get category list
    const fetchSubCategoryList = async () => {
        try {
            const response = await GettSubCategory(); // Call directly without .get()

            if (Array.isArray(response.data)) {
                setSubCategoriesList(response.data);
            } else {
                console.warn('Fetched data is not an array:', response.data);
                setSubCategoriesList(response);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            notification.error({
                message: 'Failed to load categories',
                description: error.message,
            });
            setSubCategoriesList([]);
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

    const handleSubmit = async (values) => {
        try {
            console.log('Form submitted with values:', values);
            const response = await PostSubCategory(values); // Submit form data using the PostSubCategory API
            console.log('Subcategory added successfully:', response.data);

            notification.success({ message: 'Success', description: 'Subcategory added successfully' });
            setIsModalVisible(false); // Close the modal after successful submission
        } catch (error) {
            console.error('Error adding subcategory:', error);
            notification.error({ message: 'Failed to add subcategory', description: error.message });
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //delete the SubCategories
    const handleDelete = async (record) => {
        try {
            const response = await DeleteSubCategory(record.product_id); // Assuming DeleteProduct is an API to delete a product
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

    // Handle SubCategories editing
    const handleEdit = (record) => {
        setEditingProduct(record);
        setIsModalVisible(true);
    };

    // Define columns for the table
    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'name',
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
        <div style={{ padding: '20px' }}>
            <Button type="primary" onClick={showModal}>
                Add Subcategory
            </Button>

            <Modal
                title="Add or Edit Subcategory"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Hide default footer to use the form's own submit button
                width={600}
            >
                <Form
                    layout="vertical"
                    initialValues={subcategory}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Subcategory Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the subcategory name!' }]}
                    >
                        <Input placeholder="Enter subcategory name" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                    >
                        <Select placeholder="Select a category">
                            {categories.map(categories => (
                                <Option key={categories.category_id} value={categories.category_name}>
                                    {categories.category_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Slug"
                        name="slug"
                        rules={[{ required: true, message: 'Please enter the slug!' }]}
                    >
                        <Input placeholder="Enter subcategory slug" />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="is_status"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Table to display categories */}
            <Table
                dataSource={subcategoriesList}
                columns={columns}
                rowKey="id" // Assuming each category has a unique 'id' field
                pagination={{ pageSize: 5 }} // Customize the page size as needed
                style={{ marginTop: 20 }}
            />
        </div>
    );
};

export default SubCategoryForm;
