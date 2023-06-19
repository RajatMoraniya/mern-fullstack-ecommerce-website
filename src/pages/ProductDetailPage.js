import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";

function ProductDetailPage() {
  return (
    <>
      <Navbar >
        <ProductDetail />
      </Navbar>
    </>
  );
}

export default ProductDetailPage;
