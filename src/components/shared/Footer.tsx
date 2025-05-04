
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import { SlArrowUp } from "react-icons/sl";
import logo from "../../assets/images/logo/logo.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import ContactUs from "../modals/ContactUs";
import { useState } from "react";

const Footer = () => {
  // modal open close state
  const [modal2Open, setModal2Open] = useState(false);

  // open modal contact us
  const handleClick = () => {
    setModal2Open(true);
  };

  return (
    <footer className="bg-white shadow-md rounded-t-2xl w-full p-3 md:p-4 relative shadow-purple-600 h-full">
      <div className="w-full flex items-center justify-center pt-[30px] flex-col gap-[20px] pb-[130px]">
        {/* motto */}
        <h3 className="text-2xl font-semibold font-serif">
          ☘️Safe Journey With Nature🌿
        </h3>

        {/* logo */}
        <img
          src={logo}
          alt="logo"
          className="w-[5rem] border-2 border-purple-600 rounded-full"
        />

        <p className="text-[0.9rem] text-center sm:text-start text-gray-600">
          High level experience in web design and development knowledge,
          producing quality work.
        </p>

        <CustomButton textName="Contact Us" handleAnything={handleClick} />

        {/* Render modal conditionally */}
        <ContactUs modal2Open={modal2Open} setModal2Open={setModal2Open} />

        <div className="flex gap-[15px] text-black mt-4">
          <Link
            to={""}
            className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:bg-[#d8e0e1] hover:scale-110 bg-white text-[#424242] shadow-md"
          >
            <CgFacebook />
          </Link>
          <Link
            to={""}
            className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-[#d8e0e1] hover:scale-110  bg-white text-[#424242] shadow-md"
          >
            <BsTwitter />
          </Link>
          <Link
            to={""}
            className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-[#d8e0e1] hover:scale-110  bg-white text-[#424242] shadow-md"
          >
            <BsInstagram />
          </Link>
          <Link
            to={""}
            className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-[#d8e0e1] hover:scale-110  bg-white text-[#424242] shadow-md"
          >
            <BsLinkedin />
          </Link>
        </div>
      </div>

      <div className="z-30 absolute bottom-3 left-0 right-0 px-3 flex items-center justify-between w-full">
        {/* year of making */}
        <p className="text-[0.9rem] text-white">
          ©
          {new Date().getFullYear() !== 2025
            ? 2025 - new Date().getFullYear()
            : new Date().getFullYear()}{" "}
          All Rights Reserved by Bicycle
        </p>

        {/* go to top */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <SlArrowUp className="p-2 rounded-full border border-purple-600 cursor-pointer text-[2rem] text-purple-600 hover:bg-blue-400 hover:scale-110" />
        </button>
      </div>

      <img
        src="https://i.ibb.co/zNk7XT4/Rectangle-97.png"
        alt="background/image"
        className="absolute bottom-[20px] sm:bottom-0 left-0 right-0 z-10 rounded-t-xl w-full"
      />
      <img
        src="https://i.ibb.co/0mp2FwS/Rectangle-95.png"
        alt="background/image"
        className="absolute bottom-0 left-0 right-0 z-10 rounded-t-xl w-full"
      />
    </footer>
  );
};

export default Footer;