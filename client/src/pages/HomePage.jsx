import React, { useEffect, useState } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

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
                return {
                  ...item,
                  value: item.title,
                };
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
          process.env.REACT_APP_SERVER_URL + "api/products/get-products"
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

  return (
    <>
      <Header setSearch={setSearch} />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 pb-24 md:pb-0 h-screen">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
          <Categories
            categories={categories}
            setCategories={setCategories}
            setFiltered={setFiltered}
            products={products}
          />
        </div>
        <div className="products flex-[8] overflow-y-auto max-h-[calc(100vh_-_112px)] pb-10 min-h-[500px]">
          <Products
            categories={categories}
            filtered={filtered}
            products={products}
            setProducts={setProducts}
            search={search}
          />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
