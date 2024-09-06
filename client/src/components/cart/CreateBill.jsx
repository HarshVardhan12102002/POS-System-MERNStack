import { Modal, Form, Input, Select, Button, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 201) {
        message.success("Invoice created successfully.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <Modal
      title="Create Invoice"
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[
            { required: true, message: "Customer Name field is required" },
          ]}
        >
          <Input placeholder="Enter a Customer Name" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="customerPhoneNumber"
          rules={[
            { required: true, message: "Phone Number field is required" },
          ]}
        >
          <Input placeholder="Enter a Phone Number" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          name="paymentMode"
          rules={[
            { required: true, message: "Payment Method field is required" },
          ]}
        >
          <Select placeholder="Select a Payment Method">
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Credit Card">Credit Card</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}INR</span>
          </div>
          <div className="flex justify-between my-2">
            <span>VAT %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              INR
            </span>
          </div>
          <div className="flex justify-between">
            <b>Total Amount</b>
            <b>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              INR
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Create Order
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
