import { useState, useEffect } from "react";
import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import { Area, Pie } from "@ant-design/plots";

const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-products");
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

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("http://localhost:5000/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Total\nValue",
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)} INR`;
  };

  return (
    <>
      <Header />
      <div style={{ minHeight: "1000vh", overflowY: "auto" }}>
        <h1 className="text-4xl font-bold text-center mb-4">My Stats</h1>
        <div className="statistic-section" style={{ Height: "1000vh", overflowY: "auto" }}>
          <h2 className="text-lg">
            Welcome{" "}
            <span className="text-green-700 font-bold text-xl">admin</span>.
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Total Customers"}
              amount={data.length}
              image={"images/user.png"}
            />
            <StatisticCard
              title={"Total Earnings"}
              amount={totalAmount()}
              image={"images/money.png"}
            />
            <StatisticCard
              title={"Total Sales"}
              amount={data?.length}
              image={"images/sale.png"}
            />
            <StatisticCard
              title={"Total Products"}
              amount={products?.length}
              image={"images/product.png"}
            />
          </div>
          <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
            <div className="lg:w-1/2 lg:h-full h-72">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 lg:h-full h-72">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticPage;
