import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Card } from "antd";
import useEmployee from "../../hooks/useEmployee";

export default function Artist() {
  const employee = useEmployee();
  useEffect(() => {
    employee.loadAllEmployees();
  }, []);
  const cardStyle = {
    padding: 0, // Set padding to 0 to remove the default padding
  };
  return (
    <div className="px-5 sm:px-[40px] pb-16 .mb-12 .bg-[#ebf3f5] ">
      <div className="text-center pt-12 pb-6 sm:px-8">
        <div className="text-[15px] text-gray-500">МАНАЙ ХАМТ ОЛОН</div>
        <div className="text-[40px] font-bold">УРАН БҮТЭЭЛЧИД</div>
      </div>
      <div>
        <div className="grid .place-items-center gap-3 font-Montserrat sm:grid-cols-2 md:grid-cols-3 .lg:grid-cols-4">
          {employee?.state?.list.length > 0 &&
            employee?.state?.list.map((item, index) => {
              return (
                <a href="/services" target={"_blank"}>
                  <Card
                    // onClick={() => events.onClick({ id: data.id, logo: data.logo })}
                    key={index}
                    // onClick={service_clicked}
                    hoverable
                    className=".w-full .min-h-[150px]  .border .border-[#0F285F] .border-opacity-30 "
                    style={cardStyle}
                    size="small"
                  >
                    <div className=".min-h-[120px] w-full grid grid-flow-row auto-rows-max">
                      <div>
                        <img
                          className=".max-w-[300px]"
                          src="https://assets-global.website-files.com/61558d52bbfeb85ec85163bd/6156d8f341101872f9fbd0e0_expert-small-image-1-p-500.jpeg"
                        />
                      </div>
                      <div className="mb-5 h-auto px-4 .bg-[#ebf3f5] text-left text-[18px] .font-bold">
                        <div className=".font-bold">
                          Овог:{" "}
                          <span className="font-bold">{item?.lastName}</span>
                        </div>
                        <div className=".font-bold">
                          Нэр:{" "}
                          <span className="font-bold">{item?.firstName}</span>
                        </div>
                        <div className=".text-[12px] mt-1">
                          И-майл:{" "}
                          <span className="font-bold">{item?.email}</span>
                        </div>
                        <div className=".text-[12px] mt-1">
                          Утас: <span className="font-bold">{item?.phone}</span>
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
