import Image from "next/image";
import { Button } from "antd";

export default function Features() {
  return (
    <div className="pt-20 pb-14 max-[1120px]:px-8 px-40">
      <div className="grid max-[767px]:grid-cols-1 md:grid-cols-2 min-[990px]:grid-cols-3 gap-x-[30px] gap-y-[16px]">
        {/* 1*/}
        <div className="w-full">
          <img
            className="w-full"
            src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618f41ba892f5bd8b50b7eaa_feature-image-one.jpg"
          ></img>
          <h2 className="mt-[17px] text-[26px] leading-6">Спа &amp; Бариа</h2>
          <div className="feature-content">
            Your wellness goals and the areas of preference, then unwind with a
            customized massage experience.
          </div>
          <a href="#" className="">
            <Button className="bg-transparent w-[150px] h-[57px] text-black text-lg border-2 rounded-none border-gray-500">
              Илүү мэдээлэл
            </Button>
          </a>
        </div>
        {/* 2 */}
        <div className="w-full">
          <img
            className="w-full"
            src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618f41ba7ca5fbc636637c4a_feature-image-three.jpg"
          ></img>
          <h2 className="mt-[17px] text-[26px] leading-6">
            Үс &amp; Гоо сайхан
          </h2>
          <div className="feature-content">
            Combining skin-type-specific cleansing & toning, exfoliation,
            deep-pore cleansing extractions customized treatment.
          </div>
          <a href="#" className="">
            <Button className="bg-transparent w-[150px] h-[57px] text-black text-lg border-2 rounded-none border-gray-500">
              Илүү мэдээлэл
            </Button>
          </a>
        </div>
        {/* 3 */}
        <div className="w-full">
          <img
            className="w-full"
            src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618f41bad6736d6be7bd40e3_feature-image-two.jpg"
          ></img>
          <h2 className="mt-[17px] text-[26px] leading-6">Биеийн эмчилгээ</h2>
          <div className="feature-content">
            Offers therapeutic benefits such as relief of muscle tension and
            increased circulation to the areas worked.
          </div>
          <a href="#" className="">
            <Button className="bg-transparent w-[150px] h-[57px] text-black text-lg border-2 rounded-none border-gray-500">
              Илүү мэдээлэл
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
