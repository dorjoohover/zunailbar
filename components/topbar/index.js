import React, { useState, useEffect } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  GiHamburgerMenu,
  FaTwitterSquare,
} from "react-icons/fa";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import axios from "../../utils/axios";

const TopBar = () => {
  const [state, setState] = useState();
  if (typeof window !== "undefined") {
    // Perform localStorage action
    var accessToken = localStorage.getItem("accessToken");
  }
  useEffect(() => {
    setState(localStorage.getItem("accessToken"));
  }, [accessToken]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  const closeBar = () => {
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("beauty_detail");
    delete axios.defaults.headers.Authorization;
  };
  const checkAuth = () => {
    if (state) {
      return (
        <div className="grid grid-flow-col auto-cols-max gap-4">
          <a
            className="mt-2 ml-6 font-extrabold hover:text-cyan-600"
            href="/customer-bookings"
          >
            Захиалгын түүх
          </a>
          <a className="hover:text-cyan-600" href="/profile">
            <Icon icon="iconoir:profile-circle" width="40px" height="40px" />
          </a>
          <a
            href="/auth/sign-in"
            className="text-red-400 ml-2 bg-red-100 rounded-3xl p-2  hover:text-red-600"
            onClick={logout}
          >
            Гарах
          </a>
        </div>
      );
    }
  };
  return (
    <div className="w-full h-[90px] border-solid  .rounded-b-2xl shadow-lg bg-white flex .flex-wrap mr-2 justify-between items-center px-6 py-8 sticky top-0 z-30">
      <div className="flex">
        <a href="/" className="pr-4">
          <img
            src="http://localhost:3000/img/zunailbar_logo.jpg"
            className="rounded-full .mb-2"
            width="60"
          ></img>
        </a>
        <div className="text-3xl flex w-[110px] justify-evenly mt-3">
          <div className=" hover:text-cyan-600">
            <a
              href="https://www.facebook.com/profile.php?id=100090649232252"
              target="blank"
            >
              <FaFacebookSquare />
            </a>
          </div>
          <a
            className=" hover:text-cyan-600"
            href="https://www.instagram.com/zu_nailbar/"
            target="blank"
          >
            <FaInstagramSquare />
          </a>
          <a className=" hover:text-cyan-600" href="#">
            <FaYoutubeSquare />
          </a>
          <a className=" hover:text-cyan-600" href="#">
            <FaTwitterSquare />
          </a>
        </div>
      </div>
      <div className=".flex max-[860px]:hidden  font-semibold inline-flex align-middle">
        <a href="/" className="mr-3 hover:text-cyan-600 mt-2">
          Нүүр{" "}
        </a>
        <a href="#aboutus" className="mr-3 hover:text-cyan-600  mt-2">
          Бидний тухай{" "}
        </a>{" "}
        <a href="#footer" className="mr-3 hover:text-cyan-600 mt-2">
          Холбоо барих{" "}
        </a>
        <a href="/services" className="mr-3 hover:text-cyan-600  mt-2">
          Үйлчилгээ{" "}
        </a>
        {state === null ? (
          <a href="/auth/sign-in" className="">
            <Button className="bg-[#5c8692] w-[230px] min-h-[40px] text-white text-[16px] font-semibold border-2 rounded-none border-[#5c8692]">
              Нэвтрэх
            </Button>
          </a>
        ) : null}
        {/* <a href="/auth/sign-in" className="">
          <Button className="bg-[#5c8692] .w-[230px] min-h-[40px] text-white text-[16px] font-semibold border-2 rounded-none border-[#5c8692]">
            Нэвтрэх
          </Button>
        </a> */}
        {checkAuth()}
      </div>
      <button
        onClick={toggleBar}
        className="rounded min-[860px]:hidden  text-2xl z-10"
      >
        ☰
      </button>

      {isOpen && (
        <>
          <div
            onClick={closeBar}
            className="fixed top-0 z-30 left-0 bg-black opacity-30 h-full w-full"
          />
          <div
            className={`absolute top-24 left-0 bg-white .p-4 h-full min-[964px]:hidden z-40 ${
              isOpen ? "w-60" : "w-0"
            } transition-all duration-300 ease-in-out`}
          >
            <div className="pt-10 font-semibold bg-white">
              <a href="/" className="px-4 hover:text-cyan-600  ">
                Нүүр хуудас{" "}
              </a>
              <a
                href="#aboutus"
                className="px-4 block pt-4 hover:text-cyan-600 "
              >
                Бидний тухай{" "}
              </a>
              <a
                href="/services"
                className="px-4 pt-4 block hover:text-cyan-600 "
              >
                Үйлчилгээнүүд{" "}
              </a>
              <a
                href="/contactUs"
                className="px-4 pt-4 pb-4 block hover:text-cyan-600 "
              >
                Холбоо барих{" "}
              </a>
              <a
                href="/auth/sign-in"
                className="px-4 pb-4 block hover:text-cyan-600 relative right-1 "
              >
                <button className="border-slate-500  rounded-xl border w-[150px] h-8  hover:text-cyan-600">
                  Нэвтрэх{" "}
                </button>
              </a>
              {checkAuth()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TopBar;
