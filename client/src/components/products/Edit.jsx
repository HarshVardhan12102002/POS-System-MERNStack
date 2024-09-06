import { Button, Form, message, Table, Input, Select, Modal } from "antd";
import React, { useState, useEffect } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditOpenModal, setIsEditOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/categories/get-categories"
        );
        const data = await res.json();
        if (data.status === "success") {
          data &&
            setCategories(
              data.data.map((item) => {
                return { ...item, value: item.title };
              })
            );
        }
        //console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/get-products"
        );
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.data);
        }
        //console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const onFinish = (values) => {
    console.log(values);
    try {
      fetch("http://localhost:5000/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Product updated successfully.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
      setIsEditOpenModal(false);
    } catch (error) {
      message.success("Something went wrong.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        fetch("http://localhost:5000/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Product deleted successfully.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Something went wrong!");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Product Image",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img
            src={record.img}
            alt={record.title}
            className="w-full h-20 object-cover"
          />
        );
      },
    },
    {
      title: "Product Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditOpenModal(true);
                setEditingItem(record);
              }}
            >
              Edit
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
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Edit Product"
        open={isEditOpenModal}
        onCancel={() => setIsEditOpenModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
          <Form.Item
            name="title"
            label="Product Name"
            rules={[
              { required: true, message: "Product Name field is required!" },
            ]}
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
            <Input placeholder="Enter the product image." />
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
            rules={[
              { required: true, message: "Category field is required!" },
            ]}
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
