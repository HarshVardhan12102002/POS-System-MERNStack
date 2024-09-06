import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  increase,
  decrease,
  reset,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Cart Items
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems
              .map((item) => (
                <li className="cart-item flex justify-between" key={item._id}>
                  <div className="flex items-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-16 w-16 object-cover cursor-pointer"
                      onClick={() => {
                        message.success("Product removed from the cart.");
                        dispatch(deleteProduct(item));
                      }}
                    />
                    <div className="flex flex-col ml-2">
                      <b>{item.title}</b>
                      <span>
                        {item.price}INR x {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      type="primary"
                      size="small"
                      className="w-full flex items-center justify-center !rounded-full"
                      icon={<PlusCircleOutlined />}
                      onClick={() => dispatch(increase(item))}
                    />
                    <span className="font-bold w-6 inline-block text-center">
                      {item.quantity}
                    </span>
                    <Button
                      type="primary"
                      size="small"
                      className="w-full flex items-center justify-center !rounded-full"
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        if (item.quantity === 1) {
                          if (window.confirm("Remove the product from the cart?")) {
                            dispatch(decrease(item));
                            message.success("Product removed from the cart.");
                          }
                        }
                        if (item.quantity > 1) {
                          dispatch(decrease(item));
                        }
                      }}
                    />
                  </div>
                </li>
              ))
              .reverse() // Display the latest added product on top
          : "No items in the cart..."}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}INR</span>
          </div>
          <div className="flex justify-between p-2">
            <b>GST %{cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              INR
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Total Amount</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              INR
            </span>
          </div>
        </div>
        <div className="py-4 px-4">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Create Order
          </Button>
          <Button
            type="primary"
            danger
            disabled={cart.cartItems.length === 0}
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            onClick={() => {
              if (window.confirm("Are you sure?")) {
                dispatch(reset());
                message.success("Cart cleared successfully.");
              }
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
