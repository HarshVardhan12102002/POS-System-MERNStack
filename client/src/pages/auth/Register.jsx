import React, { useState } from "react";
import { Button, Form, Input, Carousel, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
    
      if (res.status === 201) {
        message.success("Registration successful");
        navigate("/login");
        setLoading(false);
      } else {
        // Handle other HTTP status codes (e.g., res.status === 404, 500, etc.)
        message.error("Registration failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error during registration:", error);
      message.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Username"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Username cannot be empty!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email cannot be empty!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Password cannot be empty!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Confirm Password cannot be empty!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords must match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-600">
              Login now
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Compatibility with All Device Sizes"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="Statistics"
                  desc="Comprehensive Statistics"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Customer Satisfaction"
                  desc="Satisfied Customers at the End of the Experience"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Admin Panel"
                  desc="Centralized Management"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
