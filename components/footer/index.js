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
        {" "}
        <img
          // src="https://res.cloudinary.com/dfhvxswh6/image/upload/v1691979048/326238817_843833970046776_3151643487262701768_n_wbwl14.png"
          src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618f63659752576ed7190b81_doctorate-footer.svg"
          className=".mt-[-34px]"
          width="100"
        ></img>
        <div className="text-3xl flex w-[110px] justify-evenly">
          <div className=" hover:text-cyan-600">
            <a href="https://www.facebook.com/GDeluxeHotelandResort/ ">
              <FaFacebookSquare />
            </a>
          </div>
          <a
            className=" hover:text-cyan-600"
            href="https://www.instagram.com/gdeluxe_resort/"
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
        <div className="grid lg:grid-flow-col grid-flow-row auto-cols-auto gap-3 lg:gap-10">
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
        <div>Хаяг: UFE, Ulaanbaatar, Mongolia</div>
        <div>Утас: 95802438</div>
        {/* <ul>
          <li>Explore</li>
          <li>Home</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Articles</li>
          <li>Contact Us</li>
        </ul>
        <ul>
          <li>Utility Pages</li>
          <li>Style Guide</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Articles</li>
          <li>Contact Us</li>
        </ul>
        <ul>
          <li>Explore</li>
          <li>Home</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Articles</li>
          <li>Contact Us</li>
        </ul> */}
        {/* <ul>
          <li>Explore</li>
          <li>Home</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Articles</li>
          <li>Contact Us</li>
        </ul> */}
      </div>
      <div></div>
    </div>
  );
}
