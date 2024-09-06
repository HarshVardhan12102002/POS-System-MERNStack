import React from "react";
import { Button, Form, Input, Modal, message } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        message.success("Category Successfully Added.");
        form.resetFields();
        setCategories([
          ...categories,
          {
            _id: Math.random(),
            title: values.title,
          },
        ]);
        setIsAddModalOpen(false);
      } else {
        message.error("Failed to add category.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Add New Category"
      visible={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Add Category"
          rules={[{ required: true, message: "Category field cannot be empty!" }]}
        >
          <Input />
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
