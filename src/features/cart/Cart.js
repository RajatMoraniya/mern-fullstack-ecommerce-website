import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartAsync,
  selectCartItems,
  selectCartLoaded,
  selectCartStatus,
  updateCartAsync,
} from "./cartSlice";
import { Link, Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constaints";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";

export default function Cart() {
  const items = useSelector(selectCartItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(null);

  const handleQuantity = (e, item) => {
    const updateData = { id: item.id, quantity: +e.target.value };
    // console.log(updateData);
    dispatch(updateCartAsync(updateData));
  };

  const handleRemove = (e, item) => {
    dispatch(deleteCartAsync(item));
  };

  return (
    <>
      {!items.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )}
      <div className="mx-auto bg-white max-w-7xl sm:px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl my-5 text-left font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            {status === "loading" ? (
              <Grid
                height="80"
                width="80"
                color="rgb(79, 70, 229) "
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : null}
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <Link to={`/product-detail/${item.product.id}`}>
                    <div className="h-10 w-10 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </Link>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h5 className="text-sm sm:text-xl">
                          {item.product.title}
                        </h5>
                        <p className="sm:ml-4 sm:text-xl">
                          ${discountedPrice(item.product)}
                        </p>
                      </div>
                      <p className="sm:mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="mt-2">
                        <label
                          htmlFor="quantity"
                          className="inblock mr-2 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty.
                        </label>
                        <select
                          className="scale-75"
                          name="quantity"
                          id="quantity"
                          value={item.quantity}
                          onChange={(e) => {
                            handleQuantity(e, item);
                          }}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal
                          title={`Remove ${item.product.title} from cart`}
                          message="Are you sure you want to delete this Cart item ?"
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e) => handleRemove(e, item.id)}
                          cancelAction={() => setOpenModal(null)}
                          showModal={openModal === item.id}
                        ></Modal>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => {
                            setOpenModal(item.id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-black-700 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or 
              <Link to={"/"}>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  &nbsp;Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
