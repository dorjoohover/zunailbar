import Image from "next/image";
import { Button } from "antd";

export default function Features() {
  return (
    <div className="pt-20 pb-14 max-[1120px]:px-8 px-40">
      <div className="grid max-[767px]:grid-cols-1 md:grid-cols-2 min-[990px]:grid-cols-3 gap-x-[30px] gap-y-[16px]">
        {/* 1*/}
        <div className="w-full">
          <img
            className="w-full max-h-[290px]"
            src="./img/manicure-1.jpg"
          ></img>
          <h2 className="mt-[17px] text-[26px] leading-6">
            Маникюр &amp; Педикюр
          </h2>
          <div className="feature-content">Мэргэжлийн чадварлаг артистууд</div>
          <a href="#" className="">
            <Button className="bg-transparent w-[150px] h-[57px] text-black text-lg border-2 rounded-none border-gray-500">
              Илүү мэдээлэл
            </Button>
          </a>
        </div>
        {/* 2 */}
        <div className="w-full">
          <img className="w-full max-h-[290px]" src="./img/lash-3.jpg"></img>
          <h2 className="mt-[17px] text-[26px] leading-6">
            {/* Үс &amp; Гоо сайхан
             */}
            Хөмсөг засалт
          </h2>
          <div className="feature-content">Мэргэжлийн чадварлаг артистууд</div>
          <a href="#" className="">
            <Button className="bg-transparent w-[150px] h-[57px] text-black text-lg border-2 rounded-none border-gray-500">
              Илүү мэдээлэл
            </Button>
          </a>
        </div>
        {/* 3 */}
        <div className="w-full">
          <img className="w-full max-h-[290px]" src="./img/wax-1.jpg"></img>
          <h2 className="mt-[17px] text-[26px] leading-6">Вакс</h2>
          <div className="feature-content">Мэргэжлийн чадварлаг артистууд</div>
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
