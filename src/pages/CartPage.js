import React from "react";
import Cart from "../features/cart/Cart";
import Navbar from "../features/Navbar/Navbar";

function CartPage() {
  return (
    <>
      <Navbar>
        <Cart />
      </Navbar>
    </>
  );
}

export default CartPage;
