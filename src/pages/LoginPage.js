import React from "react";
import Login from "../features/auth/components/Login";
import Footer from "../features/common/Footer";
import { Helmet } from "react-helmet";

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login - Nimart</title>
        <meta
          name="keywords"
          content="Online Shopping, Fashion, Electronics, Home Decor, Beauty Products, Lifestyle, Deals and Discounts, Best Prices, Secure Checkout, Fast Delivery, Customer Reviews, Brands, Accessories, Gifts, Sustainable Products, Sale"
        />
        <meta
          name="description"
          content="Discover a world of quality products at Nimart. Shop the latest trends in fashion, electronics, home decor, and more. Enjoy secure online shopping, fast delivery, and exceptional customer service. Find everything you need in one place."
        />
      </Helmet>
      <Login />
      <Footer />
    </>
  );
}

export default LoginPage;
