import Image from "next/image";
import { Button } from "antd";

export default function Banner() {
  return (
    <div className="min-h-screen bg-[#ebf3f5] py-[120px] px-6 min-[1280px]:px-40">
      <div className="grid grid-cols-1 min-[990px]:grid-cols-2">
        {/* 1 */}
        <div className="pr-[100px] max-[990px]:mb-12 inline-block align-middle">
          <div className="flex text-left">
            <img
              className="px-2"
              src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618e5bf1761484360c0f6e7e_hero-new-update.svg"
            ></img>
            <div className="">ZuNailbar Salon</div>
          </div>
          <h1 className="my-[5px] text-[53px] text-[#141414]">
            Гоо сайхан бол хүч чадвар юм.
          </h1>
          <div className="hero-content">
            {/* Your body does a lot for you, and your caring therapist can help you
            return the favor in a way that benefits both your physical and
            mental wellness. */}
          </div>
          <a href="#" className="">
            <Button className="bg-[#5c8692] w-[230px] h-[56px] text-white text-[16px] font-semibold border-2 rounded-none border-[#5c8692]">
              Захиалга хийх
            </Button>
          </a>
        </div>
        {/* 2 */}
        <div
          id="w-node-f35c7018-1efa-cdc5-95c9-8a68304e37d5-aeb2c8ac"
          className="hero-image-wrap"
        >
          <img
            // src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618e5d79639af90a181f0c4c_hero-area-women.jpg"
            src="./img/manicure-4.jpg"
            loading="lazy"
            sizes="(max-width: 479px) 100vw, (max-width: 767px) 71vw, 500px"
            // srcSet="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618e5d79639af90a181f0c4c_hero-area-women-p-500.jpeg 500w, https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618e5d79639af90a181f0c4c_hero-area-women.jpg 550w"
            srcSet="./img/manicure-4.jpg 450w, ./img/manicure-4.jpg 500w"
            alt="Hero Girl Image"
            className="hero-image"
          ></img>
        </div>
      </div>
    </div>
  );
}
