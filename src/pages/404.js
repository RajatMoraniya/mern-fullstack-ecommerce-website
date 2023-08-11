import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Helmet>
        <title>404 Page Not Found</title>
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
        <p className="text-base font-semibold text-[#10455F]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-[#10455F] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#5a8faa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10455F]"
          >
            go to Homepage
          </Link>
        </div>
      </div>
    </main> 
  );
}

export default PageNotFound;
