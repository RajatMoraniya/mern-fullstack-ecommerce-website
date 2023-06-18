import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/productList/ProductList";

function Home() {
  return (
    <>
      <Navbar >
        <ProductList />
      </Navbar>
    </>
  );
}

export default Home;
