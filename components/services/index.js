import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Card } from "antd";
import useService from "../../hooks/useService";

export default function Artist() {
  const service = useService();
  useEffect(() => {
    service.loadAllServices();
  }, []);
  return (
    <div className="px-5 sm:px-[40px] pb-16 .mb-12 вbg-[#ebf3f5]">
      <div className="text-center pt-12 pb-6 sm:px-8">
        {/* <div className="text-[15px] text-gray-500">ҮЙЧИЛГЭЭ</div> */}
        <div className="lg:text-[40px] text-lg font-bold">ҮЙЛЧИЛГЭЭНҮҮД</div>
      </div>
      <div>
        <div className="grid .place-items-center gap-3 font-Montserrat sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {service?.state?.list.length > 0 &&
            service?.state?.list.map((item, index) => {
              return (
                <a href="/services" target={"_blank"}>
                  <Card
                    // onClick={() => events.onClick({ id: data.id, logo: data.logo })}
                    key={index}
                    // onClick={service_clicked}
                    hoverable
                    className=".w-full .min-h-[150px]  .border .border-[#0F285F] .border-opacity-30 "
                    size="small"
                  >
                    <div className=".min-h-[120px] w-full grid grid-flow-row auto-rows-max">
                      <div>
                        <img
                          className=".max-w-[300px]"
                          src="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/618f792992067f1d8c893d24_service-image-three.jpg"
                        />
                      </div>
                      <div className="mb-5 h-auto .h-[50px] text-left text-[18px] .font-bold">
                        <div className=".font-bold">
                          Үйлчилгээний төлөв:{" "}
                          <span className="font-bold">{item?.status}</span>
                        </div>
                        <div className=".font-bold">
                          Үйлчилгээний нэр:{" "}
                          <span className="font-bold">{item?.serviceName}</span>
                        </div>
                        <div className=".text-[12px] mt-1">
                          Үнэ: <span className="font-bold">{item?.price}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
}
