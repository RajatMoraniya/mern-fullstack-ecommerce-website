import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";
import Footer from "../features/common/Footer";

function ProductDetailPage() {
  return (
    <>
      <Navbar>
        <ProductDetail />
      </Navbar>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
