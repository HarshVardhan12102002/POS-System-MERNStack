import { useState } from "react";
import Header from "../components/header/Header";
import { Table, Card, Button, message, Popconfirm } from "antd";
import CreateBill from "../components/cart/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease, deleteProduct } from "../redux/cartSlice";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      with: "125px",
      render: (img) => (
        <img src={img} alt="" className="w-full h-20 object-cover" />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-gray-600">{price.toFixed(2)} .00 INR</span>
      ),
    },
    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div className="flex items-center">
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(increase(record))}
          />
          <span className="font-bold w-6 inline-block text-center">
            {record.quantity}
          </span>
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<MinusCircleOutlined />}
            onClick={() => {
              if (record.quantity === 1) {
                if (window.confirm("Do you want to delete the product?")) {
                  dispatch(decrease(record));
                  message.success("Product removed from the cart.");
                }
              }
              if (record.quantity > 1) {
                dispatch(decrease(record));
              }
            }}
          />
        </div>
      ),
    },
    {
      title: "Total Price",
      render: (text, record) => (
        <span className="text-gray-600">
          {(record.quantity * record.price).toFixed(2)} .00 INR
        </span>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            message.success("Product removed from the cart.");
            dispatch(deleteProduct(record));
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0} .00 INR</span>
            </div>
            <div className="flex justify-between my-2">
              <span>GST %{cart.tax}</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                 .00 INR
              </span>
            </div>
            <div className="flex justify-between">
              <b>Total</b>
              <b>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                 .00 INR
              </b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Create Order
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
