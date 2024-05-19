import React, { useEffect, useState } from "react";
// import moment from "moment";
import { Card } from "antd";

const Cards = ({ data, events }) => {
  // const { data, events } = props;

  useEffect(() => {}, []);
  const service_clicked = () => {
    // console.log("service_clicked", data.id);
    events.handleClick(data?.id, data?.serviceName, data?.price);
    events.loadArtistByService(data?.id);
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
