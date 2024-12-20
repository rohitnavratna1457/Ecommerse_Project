import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Switch,
  Upload,
  Typography,
  Modal,
  Row,
  Col,
  notification,
  Table,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import {
  PostProduct,
  GetProduct,
  GettCategoryGet,
  GettSubCategory,
  DeleteProduct,
} from "../../../Api/CoreApi";
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

  console.log(form);

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
        console.warn("Fetched data is not an array:", response.data);
        setProduct(response);
      }
      console.log("Fetched Products:", response.data); // Add this line
    } catch (error) {
      console.error("Error fetching products:", error);
      notification.error({
        message: "Failed to load products",
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
        console.warn("Fetched data is not an array:", response.data);
        setCategories(response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      notification.error({
        message: "Failed to load categories",
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
        console.warn("Fetched data is not an array:", response.data);
        setSubCategories(response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      notification.error({
        message: "Failed to load categories",
        description: error.message,
      });
      setSubCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("Form Values:", values); // Add this line to log form values
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "main_image" && imageFile) {
          formData.append(key, imageFile);
        } else {
          formData.append(key, values[key]);
        }
      });

      console.log(formData);

      const response = await PostProduct(formData); // Submit form data using the PostProduct API

      notification.success({
        message: "Success",
        description: "Product added successfully",
      });
      setIsModalVisible(false); // Close the modal after successful submission
      form.resetFields(); // Reset form fields after submission
    } catch (error) {
      notification.error({
        message: "Failed to add product",
        description:
          error.message || "An error occurred while adding the product",
      });
    }
  };

  // Handle image upload
  const handleImageChange = (info) => {
    if (info.file.status === "done") {
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
      setProducts(
        products.filter((product) => product.product_id !== record.product_id)
      );
      notification.success({
        message: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      notification.error({
        message: "Failed to delete product",
        description:
          error.message || "An error occurred while deleting the product",
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
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category",
    },
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
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
          initialValues={{
            status: "Active",
            is_physical: true,
            inventory_status: "In Stock",
          }}
        >
          {/* Row 1: Name, Category, Subcategory */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Product Name"
                name="product_name"
                rules={[
                  { required: true, message: "Please enter the product name!" },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select placeholder="Select a category">
                  {categories.map((category) => (
                    <Option
                      key={category.category_id}
                      value={category.category_id}
                    >
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
                rules={[
                  { required: true, message: "Please select a subcategory!" },
                ]}
              >
                <Select placeholder="Select a subcategory">
                  {subCategories.map((subCategory) => (
                    <Option
                      key={subCategory.subcategory_id}
                      value={subCategory.subcategory_name}
                    >
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
                rules={[{ required: true, message: "Please enter the slug!" }]}
              >
                <Input placeholder="Enter product slug" />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 2: Description, Price, Original Price */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Product Description" name="product_description">
                <Input.TextArea placeholder="Enter product description" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter the price!" }]}
              >
                <InputNumber
                  placeholder="Enter price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Original Price" name="original_price">
                <InputNumber
                  placeholder="Enter original price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 3: Discount Percentage, Quantity, Inventory Status */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Discount Percentage" name="discount_percentage">
                <InputNumber
                  placeholder="Enter discount percentage"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  { required: true, message: "Please enter the quantity!" },
                ]}
              >
                <InputNumber
                  placeholder="Enter quantity"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Inventory Status" name="inventory_status">
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
                type="image"
                rules={[
                  { required: true, message: "Please upload a main image!" },
                ]}
              >
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload
                  onChange={(info) => handleImageChange(info)} // Handle image change
                  showUploadList={true}
                  accept="image/*"
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
              <Form.Item label="Weight" name="weight">
                <InputNumber
                  placeholder="Enter weight"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 5: Shipping Cost, Color, Size */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Weight Unit" name="weight_unit">
                <Select placeholder="Select weight unit">
                  <Option value="kg">kg</Option>
                  <Option value="g">g</Option>
                  <Option value="lb">lb</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Dimensions" name="dimensions">
                <Input placeholder="Enter dimensions" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Shipping Cost" name="shipping_cost">
                <InputNumber
                  placeholder="Enter shipping cost"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 6: Attributes */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Color" name="color">
                <Input placeholder="Enter color" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Size" name="size">
                <Input placeholder="Enter size" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Features" name="features">
                <Input.TextArea placeholder="Enter features" />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 7: Ratings and Reviews */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Rating" name="rating">
                <InputNumber
                  placeholder="Enter rating"
                  min={0}
                  max={5}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Review Count" name="review_count">
                <InputNumber
                  placeholder="Enter review count"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 8: Policies */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Return Policy" name="return_policy">
                <Input.TextArea placeholder="Enter return policy" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Warranty" name="warranty">
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
      <Table columns={columns} dataSource={product} rowKey="product_id" />
    </div>
  );
};

export default ProductFormModal;

// import React, { useEffect, useState } from "react";
// import {
//   Form,
//   Input,
//   Select,
//   InputNumber,
//   Button,
//   Switch,
//   Upload,
//   Typography,
//   Modal,
//   Row,
//   Col,
//   notification,
//   Table,
//   Space,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useForm } from "antd/es/form/Form";
// import {
//   PostProduct,
//   GetProduct,
//   GettCategoryGet,
//   GettSubCategory,
//   DeleteProduct,
// } from "../../../Api/CoreApi";

// const { Option } = Select;
// const { Title } = Typography;

// const Products = () => {
//   const [form] = useForm();
//   const [Loading, setLoading] = useState();
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [product, setProduct] = useState([]);
//   const [imageFile, setImageFile] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     fetchCategories();
//     fetchSubCategories();
//     fetchProductList();
//   }, []);

//   const fetchProductList = async () => {
//     setLoading(true);
//     try {
//       const response = await GetProduct();
//       if (Array.isArray(response.data)) {
//         setProduct(response.data);
//       } else {
//         console.warn("Fetched data is not an array:", response.data);
//         setProduct(response);
//       }
//     } catch (error) {
//       notification.error({
//         message: "Failed to load products",
//         description: error.message,
//       });
//       setProduct([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await GettCategoryGet();
//       if (Array.isArray(response.data)) {
//         setCategories(response.data);
//       } else {
//         console.warn("Fetched data is not an array:", response.data);
//         setCategories(response);
//       }
//     } catch (error) {
//       notification.error({
//         message: "Failed to load categories",
//         description: error.message,
//       });
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await GettSubCategory();
//       if (Array.isArray(response.data)) {
//         setSubCategories(response.data);
//       } else {
//         console.warn("Fetched data is not an array:", response.data);
//         setSubCategories(response);
//       }
//     } catch (error) {
//       notification.error({
//         message: "Failed to load subcategories",
//         description: error.message,
//       });
//       setSubCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (values) => {
//     if (!imageFile) {
//       notification.error({
//         message: "Validation Error",
//         description: "Please upload a valid image file!",
//       });
//       return;
//     }

//     try {
//       const formData = new FormData();

//       Object.keys(values).forEach((key) => {
//         formData.append(key, values[key]);
//       });

//       formData.append("main_image", imageFile);

//       const response = await PostProduct(formData);

//       notification.success({
//         message: "Success",
//         description: "Product added successfully",
//       });
//       setIsModalVisible(false);
//       form.resetFields();
//       fetchProductList();
//     } catch (error) {
//       notification.error({
//         message: "Failed to add product",
//         description: error.message || "An error occurred while adding the product",
//       });
//     }
//   };

//   const handleImageChange = (info) => {
//     setImageFile(info.file.originFileObj);
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleDelete = async (record) => {
//     try {
//       const response = await DeleteProduct(record.product_id);
//       setProduct(product.filter((item) => item.product_id !== record.product_id));
//       notification.success({
//         message: "Success",
//         description: "Product deleted successfully",
//       });
//     } catch (error) {
//       notification.error({
//         message: "Failed to delete product",
//         description: error.message || "An error occurred while deleting the product",
//       });
//     }
//   };

//   const columns = [
//     {
//       title: "Product Name",
//       dataIndex: "product_name",
//       key: "product_name",
//     },
//     {
//       title: "Category",
//       dataIndex: "category_name",
//       key: "category_name",
//     },
//     {
//       title: "Subcategory",
//       dataIndex: "subcategory",
//       key: "subcategory",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity",
//       key: "quantity",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <Space size="middle">
//           {/* <a onClick={() => handleEdit(record)}>Edit</a> */}
//           <a onClick={() => handleDelete(record)}>Delete</a>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       <Button type="primary" onClick={showModal}>
//         Add Product
//       </Button>
//       <Modal
//         title="Add or Edit Product"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//         width={1000}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           initialValues={{
//             status: "Active",
//             is_physical: true,
//             inventory_status: "In Stock",
//           }}
//         >
//           {/* Form fields */}
//           <Row gutter={24}>
//             <Col span={12}>
//               <Form.Item
//                 label="Product Name"
//                 name="product_name"
//                 rules={[{ required: true, message: "Please enter the product name!" }]}
//               >
//                 <Input placeholder="Enter product name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Category"
//                 name="category"
//                 rules={[{ required: true, message: "Please select a category!" }]}
//               >
//                 <Select placeholder="Select a category">
//                   {categories.map((category) => (
//                     <Option key={category.category_id} value={category.category_id}>
//                       {category.category_name}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={24}>
//             <Col span={12}>
//               <Form.Item
//                 label="Subcategory"
//                 name="subcategory"
//                 rules={[{ required: true, message: "Please select a subcategory!" }]}
//               >
//                 <Select placeholder="Select a subcategory">
//                   {subCategories.map((subCategory) => (
//                     <Option key={subCategory.subcategory_id} value={subCategory.subcategory_name}>
//                       {subCategory.name}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Slug"
//                 name="slug"
//                 rules={[{ required: true, message: "Please enter the slug!" }]}
//               >
//                 <Input placeholder="Enter product slug" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={24}>
//             <Col span={12}>
//               <Form.Item
//                 label="Main Image"
//                 name="main_image"
//                 rules={[{ required: true, message: "Please upload a main image!" }]}
//               >
//                 <Upload
//                   beforeUpload={() => false}
//                   onChange={handleImageChange}
//                   showUploadList={true}
//                   accept="image/*"
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Image</Button>
//                 </Upload>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//       <Table columns={columns} dataSource={product} rowKey="product_id" />
//     </div>
//   );
// };

// export default Products;
