import Image from "next/image";
import { Button } from "antd";

export default function Aboutus() {
  return (
    <div className="grid sm:grid-cols-2 gap-6 px-5 sm:px-[40px] py-12 bg-[#ebf3f5]">
      <div className="grid grid-flow-row auto-rows-auto">
        <h1 className="text-[15px] text-gray-500">TAKE YOUR CARE</h1>
        <h1 className="text-[45px]">Гоо сайхан таны тав тухаас эхэлдэг!</h1>
        <div>
          Designed to allow you to unwind and feel confident that you’re in
          good, caring hands. Our first priority is cleanliness. We have a
          full-time staff whose job is to ensure that the environment at
          Beautyness remains.
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div
            className="grid grid-flow-row auto-rows-auto sm:px-5 py-5 border-2 border-black items-center text-center"
            style={{}}
          >
            <img
              className="self-center justify-self-center"
              src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f473e1e3bd92a8bb6ece4_about-icon-one.svg"
            />
            <h3 className="sm:text-[22px] font-semibold">
              Гоо сайханы <br />
              Мэдлэг
            </h3>
          </div>
          <div
            className="grid grid-flow-row auto-rows-auto sm:px-5 py-5 border-2 border-black items-center text-center"
            style={{}}
          >
            <img
              className="self-center justify-self-center"
              src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f473e7ca5fb6466638b30_about-icon-two.svg"
            />
            <h3 className="sm:text-[22px] font-semibold">
              Гайхамшигт
              <br />
              Үйлчилгээ
            </h3>
          </div>
          <div
            className="grid grid-flow-row auto-rows-auto sm:px-5 py-5 border-2 border-black items-center text-center"
            style={{}}
          >
            <img
              className="self-center justify-self-center"
              src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f473ecd54744a3d6292ba_about-icon-three.svg"
            />
            <h3 className="sm:text-[22px] font-semibold">
              100% <br />
              Найдвартай
            </h3>
          </div>
        </div>
      </div>
      <div className="">
        <div>
          <img
            className=".z-[10]"
            src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f48751328985dc398bddc_about-girl-image.jpg"
          />
          {/* <img
            className="z-[30]"
            // style={{index:"10"}}
            src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f487689cbccaa098d6e96_about-pattern-bg.jpg"
          /> */}
        </div>
      </div>
    </div>
  );
}
