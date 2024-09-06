import { Button, Form, Input, message, Modal, Table } from "antd";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    console.log(values);
    try {
      fetch("http://localhost:5000/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Category successfully updated.");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.success("Something went wrong.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        fetch("http://localhost:5000/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Category deleted.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Something went wrong!");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Save
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Category Operations"
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
