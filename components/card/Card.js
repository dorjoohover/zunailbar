import React, { useEffect, useState } from "react";
// import moment from "moment";
import { Card, message } from "antd";
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
      key={data.index}
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
        />
      }
    >
      <div>
        <div className="mb-5 h-[50px] text-left text-[18px] font-bold">
          {data?.serviceName}
        </div>
        <div className="m-1 flex justify-between text-[12px] xl:text-[16px] ">
          Үнэ: {data?.price}₮
        </div>
        {/* <div className="m-1 flex justify-between text-[12px] xl:text-[16px]">
          {tr("main_date_meeting")}
          <div className="] font-bold">
            {data?.date2 && moment(data.date2).format("YYYY-MM-DD")}
          </div>
        </div> */}
      </div>
    </Card>
  );
};

export default Cards;
