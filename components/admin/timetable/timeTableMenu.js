import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import Scheduler from "../../scheduler/TimeTableScheduler";

export default function Agenda({ data, events }) {
  const [searchArtist, setSearchArtist] = useState("");

  const columns = [
    {
      title: "№",
      width: 19,
      dataIndex: "list",
      key: "list",
    },
    {
      title: "Артистийн нэр",
      dataIndex: "artistName",
      key: "artistName",
      width: 60,
    },
    {
      title: "Огноо",
      dataIndex: "date",
      key: "date",
      width: 40,
    },
    {
      title: "Эхлэх цаг",
      dataIndex: "startTime",
      key: "startTime",
      width: 40,
    },
    {
      title: "Дуусах цаг",
      key: "endTime",
      width: 40,
      dataIndex: "endTime",
    },
    {
      title: "updatedAt",
      key: "updatedAt",
      width: 40,
      dataIndex: "updatedAt",
    },
  ];

  const checkArtistId = (artistId) => {
    var one = "";
    data?.employeeList.forEach((element) => {
      if (element?.id === artistId) {
        one = element?.firstName;
      }
    });
    return one;
  };

  let number = 0;
  const data1 = data?.All_artist_timetables.map((item, index) => {
    number += 1;
    return {
      key: index,
      list: number,
      artistName: checkArtistId(item?.artistId),
      artistId: item?.artistId,
      date: item?.date,
      startTime: item?.startTime,
      endTime: item?.endTime,
      updatedAt: item?.updatedAt,
    };
  });

  const filteredData = data1.filter((item) =>
    item.artistName.toLowerCase().includes(searchArtist.toLowerCase())
  );

  return (
    <div>
      <div className="m-2">
        <Button
          className="bg-gray-300 font-semibold"
          onClick={() =>
            events.handleFormData({
              header: "Захиалга нэмэх",
              formType: "createTimetableForm",
              form: "post",
            })
          }
        >
          Шинээр хуваарь нэмэх
        </Button>
      </div>
      <div className="m-2">
        <Input
          placeholder="Артистийн нэрээр хайх"
          value={searchArtist}
          onChange={(e) => setSearchArtist(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table
        bordered
        pagination={{ pageSize: 30 }}
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 1500, y: 700 }}
      />
      <Scheduler data={filteredData} />
    </div>
  );
}
