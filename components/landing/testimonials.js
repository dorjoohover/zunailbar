import Image from "next/image";
import { Button } from "antd";

export default function Testimonials() {
  return (
    <div className="grid grid-flow-row auto-rows-auto mb-12">
      <div className="text-center pt-12 pb-6 sm:px-8">
        <div className="text-[15px] text-gray-500">ГЭРЧЛЭЛ</div>
        <div className="text-[40px] font-bold">
          Манай үйлчлүүлэгчдийн сэтгэгдэл:
        </div>
      </div>
      <div className="grid lg:grid-cols-2 sm:px-8 gap-12">
        <div className="grid grid-flow-row auto-rows-auto border-2">
          <div className="px-10 py-8 text-lg">
            “ Made an appointment with Beautyness and it was the best experience
            in a salon I have ever had. They went above and beyond to make sure
            I got what I wanted, & patiently explained her process “{" "}
          </div>
          <div className="bg-[#1e2c30] px-2 sm:px-8 py-6 grid grid-flow-col auto-cols-max gap-4 text-white">
            <img src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/6152ddae0f5c7703df6e42f9_testimonial-client-image-1.jpg" />
            <div className="grid grid-flow-row auto-rows-auto">
              <img src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f579f6b5fd0ea54f6c20b_rating.svg" />
              <div>James Williams</div>
              <div>United States</div>
            </div>
            <img
              className="place-self-end"
              src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f579fd32b1272a8d0ac9f_testimonial-quote.svg"
            />
          </div>
        </div>
        <div className="grid grid-flow-row auto-rows-auto border-2">
          <div className="px-10 py-8 text-lg">
            “ I've been going to Beautyness they are always goes above and
            beyond my expectations and leaves my hair looking and feeling
            fantastic and looking exactly as I hoped, if not better “
          </div>
          <div className="bg-[#1e2c30] px-2 sm:px-8 py-6 grid grid-flow-col auto-cols-max gap-4 text-white">
            <img src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/6156abac7a364b70e237ea5f_testimonail-client-two.png" />
            <div className="grid grid-flow-row auto-rows-auto">
              <img src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f579f6b5fd0ea54f6c20b_rating.svg" />
              <div>Carolyn James</div>
              <div>United Kingdom</div>
            </div>
            <img
              className="place-self-end"
              src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f579fd32b1272a8d0ac9f_testimonial-quote.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
