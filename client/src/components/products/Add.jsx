import React from "react";
import { Button, Form, Input, Modal, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(values),
      });
      message.success("Product added successfully.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
    console.log("Success:", values);
  };

  const onFileChange = (info) => {
    if (info.file.status === "done") {
      console.log(info.file.response.data.url);
    }
  };

  const uploadProps = {
    action: "http://localhost:5000/api/upload/upload-image", 
    showUploadList: false,
    onChange: onFileChange,
  };

  return (
    <Modal
      title="Add New Product"
      visible={isAddModalOpen} // corrected prop name
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Product Name"
          rules={[{ required: true, message: "Product Name field is required!" }]}
        >
          <Input placeholder="Enter the product name." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Product Image"
          rules={[
            { required: true, message: "Product Image field is required!" },
          ]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="price"
          label="Product Price"
          rules={[
            { required: true, message: "Product Price field is required!" },
          ]}
        >
          <Input placeholder="Enter the product price." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Select Category"
          rules={[{ required: true, message: "Category field is required!" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
