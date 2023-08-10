import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { resetOrder, resetcurrentOrder } from "../features/order/orderSlice";
import { Helmet } from "react-helmet";

function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // reset cart
    dispatch(resetCartAsync());
    // reset currentOrder
    dispatch(resetOrder());
    return () => {
      dispatch(resetcurrentOrder());
    };
  }, [dispatch]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <Helmet>
          <title>Order Success - Nimart</title>
          <meta
            name="keywords"
            content="Online Shopping, Fashion, Electronics, Home Decor, Beauty Products, Lifestyle, Deals and Discounts, Best Prices, Secure Checkout, Fast Delivery, Customer Reviews, Brands, Accessories, Gifts, Sustainable Products, Sale"
          />
          <meta
            name="description"
            content="Discover a world of quality products at Nimart. Shop the latest trends in fashion, electronics, home decor, and more. Enjoy secure online shopping, fast delivery, and exceptional customer service. Find everything you need in one place."
          />
        </Helmet>
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-xl sm:text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-sm leading-7 text-gray-600">
            You can check your order in My Account &gt; My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccessPage;
