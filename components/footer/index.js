import Image from "next/image";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  GiHamburgerMenu,
  FaTwitterSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div
      id="footer"
      className="lg:grid lg:grid-flow-row px-6 py-8 bg-[#1e2c30] text-white"
    >
      <div className="flex justify-evenly .justify-around mt-5 mb-10">
        {/* <div className="grid grid-flow-col auto-cols-max">
          <img
            src="http://localhost:3000/img/zunailbar_logo.jpg"
            className="max-h-[30px] rounded full mr-2"
            // width="20"
          />
          Zu Nailbar
        </div> */}
        <div className="text-3xl flex w-[110px] justify-evenly">
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
      <div className="flex flex-wrap justify-evenly">
        <div className="grid lg:grid-flow-col grid-flow-row auto-cols-auto gap-3 lg:gap-10 mb-2">
          <a className="hover:underline" href="/">
            Нүүр
          </a>
          <a className="hover:underline" href="/about">
            Бидний тухай
          </a>
          <a className="hover:underline" href="/services">
            Үйлчилгээ
          </a>
          <a className="hover:underline" href="/contactUs">
            Холбоо барих
          </a>
          <a className="hover:underline" href="/auth/sign-in">
            Захиалга хийх
          </a>
        </div>
        <div className=".text-center .mt-6">
          <div>
            Хаяг: СЭЗИС-н замын урд Орчлон комплекс 3 давхарт, Ulaanbaatar,
            Mongolia
          </div>
          <div className="pt-2">Утас: +976 8608 0708</div>
        </div>
      </div>
      {/* <div className="text-center mt-6">
        <div>
          Хаяг: СЭЗИС-н замын урд Орчлон комплекс 3 давхарт, Ulaanbaatar,
          Mongolia
        </div>
        <div>Утас: +976 8608 0708</div>
      </div> */}
    </div>
  );
}
