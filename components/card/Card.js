import React, { useEffect, useState } from "react";
// import moment from "moment";
import { Card, message } from "antd";
import { Icon } from "@iconify/react";
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
  style: { fontSize: "30px" },
});

const Cards = ({ data, events }) => {
  // const { data, events } = props;

  // useEffect(() => {}, []);
  const service_clicked = () => {
    // console.log("service_clicked", data.id);
    // const detail = localStorage.getItem("beauty_detail");

    // const initialData1 = detail === "undefined" ? null : detail;
    // var userDetail = initialData1 === null ? {} : JSON.parse(initialData1);
    // // console.log("beauty_detail", userDetail);
    if (!data?.userDetail?.customer) {
      // router.push("/");
      message.error("Та нэвтэрч орон захиалгаа өгнө үү !!!");
    } else {
      events.handleClick(
        data?.id,
        data?.serviceName,
        data?.price,
        data?.duration
      );
      events.loadArtistByService(data?.id);
    }
  };
  return (
    <Card
      onClick={service_clicked}
      // key={data.index}
      hoverable
      className="w-full border border-[#0F285F] border-opacity-30 "
      size="small"
      cover={
        <div
          className="min-h-[230px] overflow-hidden rounded-xl"
          style={{
            backgroundImage: "url(" + data.image1 + ")",
            backgroundPosition: "center",
            objectFit: "cover",
            // objectFit: "none",
            backgroundRepeat: "no-repeat",
            backgroundSize: "320px",
          }}
        >
          {/* <div className="text-white">
            <div className="mb-3 h-[50px] text-left text-[18px] font-bold">
              {data?.serviceName}
            </div>
            <div className="m-1 flex justify-start text-[12px] xl:text-[16px] ">
              <Icon
                className="mr-2"
                icon="fluent:money-16-filled"
                width="30px"
                height="30px"
              />{" "}
              {data?.price}₮
            </div>
            <div className="m-1 flex justify-start text-[12px] xl:text-[16px] ">
              <Icon
                className="mr-2"
                icon="carbon:time"
                width="30px"
                height="30px"
              />{" "}
              {data?.duration} цаг
            </div>
          </div> */}
        </div>
      }
    >
      <div className="font-bold">
        <div className="mb-3 h-[50px] text-left text-[18px]">
          {data?.serviceName}
        </div>
        <div className="m-1 flex justify-start text-[12px] xl:text-[16px]">
          <Icon
            className="mr-2"
            icon="fluent:money-16-filled"
            width="30px"
            height="30px"
          />{" "}
          {data?.price}₮
        </div>
        <div className="m-1 flex justify-start text-[12px] xl:text-[16px] ">
          <Icon
            className="mr-2"
            icon="vaadin:time-forward"
            width="30px"
            height="30px"
          />{" "}
          {data?.duration} цаг
        </div>
      </div>
    </Card>
  );
};

export default Cards;
