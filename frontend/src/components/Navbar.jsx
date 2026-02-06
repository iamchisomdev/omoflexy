import React, { useState } from "react";
import {
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import CartIcon from "./CartIcon";
import logo from "../assets/image/logo.png";
import NavbarSearch from "./NavbarSearch";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const categories = [
    "Beaded Bag",
    "Beaded Bracelet",
    "Beaded Necklace",
    "Beaded Top",
  ];

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        {/* Top mini-bar */}
        <div className="bg-[#D4AF37] w-full px-3 hidden md:flex place-content-end py-2 text-sm text-white poppins">
          <p>
            Contact <span className="mx-2">|</span> About
          </p>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Mobile: Hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(true)} className="p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo Centered */}
            <a href="/" className="flex-1 flex justify-center md:justify-start">
              <img
                src={logo}
                alt="Logo"
                className="md:w-35 md:h-14 max-sm:h-10"
              />
            </a>

            {/* Mobile: Cart + Search */}
            <div className="md:hidden flex space-x-4 items-center">
              <CartIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
              <div className="bg-black rounded-[20px] p-1 ml-2">
                <NavbarSearch className="w-2 h-2 text-white cursor-pointer" />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 items-center poppins">
              <button
                className="text-gray-700 hover:text-[#D4AF37]"
                onClick={() => navigate(`/search?q=Beaded Bag`)}
              >
                Beaded Bags |
              </button>
              <button
                className="text-gray-700 hover:text-[#D4AF37]"
                onClick={() => navigate(`/search?q=Beaded Bracelet`)}
              >
                Beaded Bracelet |
              </button>
              <button
                className="text-gray-700 hover:text-[#D4AF37]"
                onClick={() => navigate(`/search?q=Beaded Necklace`)}
              >
                Beaded Necklace |
              </button>
              <button
                className="text-gray-700 hover:text-[#D4AF37]"
                onClick={() => navigate(`/search?q=Beaded Top`)}
              >
                Beaded Top
              </button>

              {/* Search + Cart */}
              <NavbarSearch />
              <CartIcon className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Mobile Category Scroll Menu */}
        <div className="md:hidden flex w-full justify-center py-2 space-x-3 border-t text-[13px] font-medium poppins">
          <button
            className="whitespace-nowrap"
            onClick={() => navigate(`/search?q=Beaded Bag`)}
          >
            Beaded Bags
          </button>
          <button
            className="whitespace-nowrap"
            onClick={() => navigate(`/search?q=Beaded Bracelet`)}
          >
            Beaded <br /> Bracelet
          </button>
          <button
            className="whitespace-nowrap"
            onClick={() => navigate(`/search?q=Beaded Necklace`)}
          >
            Beaded <br /> Necklace
          </button>
          <button
            className="whitespace-nowrap"
            onClick={() => navigate(`/search?q=Beaded Top`)}
          >
            Beaded Tops
          </button>
        </div>
      </nav>

      {/* Mobile Slide-out Drawer from Left */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b inter">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col mt-2 inter">
          {["Home", ...categories].map((item) => (
            <button
              key={item}
              className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 text-left"
              onClick={() => {
                if (item === "Home") {
                  navigate("/");
                } else {
                  navigate(`/search?q=${encodeURIComponent(item)}`);
                }
                setMobileMenuOpen(false); // Close menu
              }}
            >
              <span>{item}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Bottom Icon Links */}
        <div className="absolute bottom-0 w-full border-t p-4 flex justify-around bg-white">
          <a
            href="/"
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_100_366)">
                <path
                  d="M10 0.666711L10.4333 0.160044C10.3126 0.0567576 10.1589 0 10 0C9.8411 0 9.68742 0.0567576 9.56667 0.160044L10 0.666711ZM0.666667 8.66671L0.233333 8.16004L0 8.36004V8.66671H0.666667ZM7.33333 19.3334V20C7.51014 20 7.67971 19.9298 7.80474 19.8048C7.92976 19.6798 8 19.5102 8 19.3334H7.33333ZM12.6667 19.3334H12C12 19.5102 12.0702 19.6798 12.1953 19.8048C12.3203 19.9298 12.4899 20 12.6667 20V19.3334ZM19.3333 8.66671H20V8.36004L19.7667 8.16004L19.3333 8.66671ZM2 20H7.33333V18.6667H2V20ZM19.7667 8.16004L10.4333 0.160044L9.56667 1.17338L18.9 9.17338L19.7667 8.16004ZM9.56667 0.160044L0.233333 8.16004L1.1 9.17338L10.4333 1.17338L9.56667 0.160044ZM8 19.3334V15.3334H6.66667V19.3334H8ZM12 15.3334V19.3334H13.3333V15.3334H12ZM12.6667 20H18V18.6667H12.6667V20ZM20 18V8.66671H18.6667V18H20ZM0 8.66671V18H1.33333V8.66671H0ZM10 13.3334C10.5304 13.3334 11.0391 13.5441 11.4142 13.9192C11.7893 14.2942 12 14.8029 12 15.3334H13.3333C13.3333 14.4493 12.9821 13.6015 12.357 12.9764C11.7319 12.3512 10.8841 12 10 12V13.3334ZM10 12C9.11594 12 8.2681 12.3512 7.64298 12.9764C7.01786 13.6015 6.66667 14.4493 6.66667 15.3334H8C8 14.8029 8.21071 14.2942 8.58579 13.9192C8.96086 13.5441 9.46957 13.3334 10 13.3334V12ZM18 20C18.5304 20 19.0391 19.7893 19.4142 19.4143C19.7893 19.0392 20 18.5305 20 18H18.6667C18.6667 18.1769 18.5964 18.3464 18.4714 18.4714C18.3464 18.5965 18.1768 18.6667 18 18.6667V20ZM2 18.6667C1.82319 18.6667 1.65362 18.5965 1.5286 18.4714C1.40357 18.3464 1.33333 18.1769 1.33333 18H0C0 18.5305 0.210714 19.0392 0.585786 19.4143C0.960859 19.7893 1.46957 20 2 20V18.6667Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_100_366">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            href="https://wa.me/2349037768161" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.44185 0.492065C4.50656 0.492065 0.492065 4.50768 0.492065 9.44437C0.492065 11.4022 1.12345 13.2179 2.19675 14.6916L1.08128 18.0178L4.52229 16.918C5.93757 17.8548 7.62653 18.3968 9.44704 18.3968C14.3823 18.3968 18.3968 14.3811 18.3968 9.44453C18.3968 4.50784 14.3823 0.492213 9.44704 0.492213L9.44185 0.492065ZM6.94257 5.03944C6.76898 4.62369 6.63742 4.60795 6.37444 4.59726C6.2849 4.59206 6.18511 4.58686 6.07449 4.58686C5.73236 4.58686 5.37464 4.68682 5.15889 4.90784C4.89591 5.17624 4.24342 5.80246 4.24342 7.08669C4.24342 8.37091 5.17997 9.61295 5.30619 9.78674C5.43775 9.96023 7.13204 12.6339 9.76273 13.7235C11.8199 14.5761 12.4304 14.4971 12.8986 14.3971C13.5826 14.2497 14.4403 13.7443 14.656 13.134C14.8718 12.5233 14.8718 12.0023 14.8085 11.8918C14.7454 11.7813 14.5717 11.7183 14.3087 11.5865C14.0457 11.4549 12.767 10.8234 12.525 10.7391C12.2881 10.6497 12.062 10.6814 11.8832 10.934C11.6306 11.2866 11.3834 11.6446 11.1834 11.8603C11.0255 12.0287 10.7676 12.0498 10.552 11.9602C10.2626 11.8393 9.4524 11.5549 8.4526 10.6655C7.6791 9.97612 7.15299 9.11834 7.00049 8.86048C6.84784 8.59743 6.98473 8.44458 7.10561 8.30259C7.23717 8.13935 7.36341 8.02364 7.49497 7.87094C7.62653 7.7184 7.70019 7.63938 7.78438 7.4604C7.87393 7.28676 7.81066 7.10778 7.74755 6.97618C7.68444 6.84457 7.15833 5.56035 6.94257 5.03944Z"
                fill="#67C15E"
              />
            </svg>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <CartIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
          </a>
        </div>
      </div>

      {/* Backdrop when drawer is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
