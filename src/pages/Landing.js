import React from "react";
import "./Landing.css";
import Footer from "../features/common/Footer";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="main-landing bg-white">
        <div className="landing-navbar flex justify-between items-center p-10 font-bold h-4">
          <div className="landing-logo flex justify-center items-center">
            <img src="/logo192.png" />
            <h1 className="mr-auto ml-2">Nimart</h1>
          </div>
          <nav className="nav flex gap-2">
            <Link
              to={"/home"}
              className="p-2 text-[#FFFFFF] bg-[#87A908] rounded-md hover:bg-[#bed07c]"
            >
              Explore Now
            </Link>
          </nav>
        </div>

        <div className="block sm:hidden">
          <img src="/images/landingsecond.png" alt="" className="mx-auto" />
        </div>

        <div className="banner-one block md:flex p-4">
          <div className="md:w-1/2 w-full p-4 h-full">
            <h1 className="text-5xl font-bold">
              Shop with <span className="text-[#F80F00]">Heart</span>, Shop{" "}
              <span className="text-[#EB9B0E]">Nimart</span>{" "}
            </h1>
            <h2 className="mb-10 mt-2 font-bold">
              -Your Trusted Haven of Treasures!"
            </h2>
            <p className="my-10">
              Discover a world of quality products at Nimart. Shop the latest
              trends in fashion, electronics, home decor, and more. Enjoy secure
              online shopping, fast delivery, and exceptional customer service.
              Find everything you need in one place."
            </p>

            <Link
              to={"/home"}
              className="my-10 p-2 bg-[#87A908] text-[#FFFFFF] font-bold hover:bg-[#e5f3b2] mb-auto"
            >
              Explore Now
            </Link>
          </div>
          <div className="md:w-1/2 p-4 w-full`">
            <img src="/images/landingmain.png" alt="" loading="lazy" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Landing;
