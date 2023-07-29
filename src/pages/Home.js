import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";

function Home() {
  return (
    <>
      <Navbar>
        <ProductList />
      </Navbar>
      
    </>
  );
}

export default Home;
