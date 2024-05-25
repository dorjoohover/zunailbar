import React from "react";
import { Table, Button } from "antd";
import Scheduler from "../../scheduler/TimeTableScheduler";
// import moment from "moment";

export default function Agenda({ data, events }) {
  // console.log(data?.vote)
  // console.log(data?.confirm)
  //   console.log(data);
  const columns = [
    {
      title: "№",
      width: 19,
      dataIndex: "list",
      key: "list",
      // fixed: "left",
    },
    // {
    //   title: "customerId",
    //   width: 60,
    //   dataIndex: "customerId",
    //   key: "customerId",
    //   // fixed: "left",
    // },
    {
      title: "artistName",
      dataIndex: "artistName",
      key: "artistName",
      width: 60,
    },
    // {
    //   title: "serviceId",
    //   dataIndex: "serviceId",
    //   key: "serviceId",
    //   width: 80,
    // },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      width: 40,
    },
    {
      title: "startTime",
      dataIndex: "startTime",
      key: "startTime",
      width: 40,
    },
    {
      title: "endTime",
      key: "endTime",
      // fixed: "right",
      width: 40,
      dataIndex: "endTime",
    },
    {
      title: "updatedAt",
      key: "updatedAt",
      // fixed: "right",
      width: 40,
      dataIndex: "updatedAt",
    },
    // {
    //   title: "update",
    //   key: "update",
    //   // fixed: "right",
    //   width: 40,
    //   dataIndex: "update",
    // },
    // {
    //   title: "delete",
    //   key: "delete",
    //   // fixed: "right",
    //   width: 40,
    //   dataIndex: "delete",
    // },
  ];
  // console.log(Maindata)
  const checkUserIdforPhone = (userId) => {
    var one = "";
    data?.userList.forEach((element) => {
      if (element?.id === userId) {
        // userSet.push(userId);
        one = element?.phone;
      }
    });
    return one;
  };

  const checkArtistId = (artistId) => {
    var one = "";
    data?.employeeList.forEach((element) => {
      if (element?.id === artistId) {
        // userSet.push(userId);
        one = element?.firstName;
      }
    });
    return one;
  };

  const checkServiceId = (serviceId) => {
    var one = "";
    data?.just_service_list.forEach((element) => {
      if (element?.id === serviceId) {
        // userSet.push(userId);
        one = element?.serviceName;
      }
    });
    return one;
  };
  //   console.log("All_artist_timetables", data?.All_artist_timetables);
  const data1 = [];
  let number = 0;
  data?.All_artist_timetables.map((item, index) => {
    // menu_titleIds.push({ menu_titleId: item });
    number = number + 1;
    // console.log("index", index);
    data1.push({
      key: index,
      list: number,
      //   customerId: checkUserIdforPhone(item?.customerId),
      // customerPhone: checkUserId(item?.customerId),
      //   serviceId: checkServiceId(item?.serviceId),
      artistName: checkArtistId(item?.artistId),
      artistId: item?.artistId,
      date: item?.date,
      startTime: item?.startTime,
      endTime: item?.endTime,
      updatedAt: item?.updatedAt,
      //   delete: (
      //     <Button
      //       onClick={() =>
      //         events.handleFormData({
      //           header: "Захиалга устгах",
      //           formType: "deleteOrderForm",
      //           message:
      //             item?.ognoo +
      //             "огноотой " +
      //             item?.time +
      //             " цагтай " +
      //             " >> захиалгыг" +
      //             "-г устгах уу?",
      //           data: {
      //             id: item?.id,
      //           },
      //         })
      //       }
      //       type="primary"
      //       danger
      //     >
      //       Устгах
      //     </Button>
      //   ),
      //   update: (
      //     <Button
      //       onClick={() =>
      //         events.handleFormData({
      //           header: "Захиалга өөрчлөх",
      //           formType: "updateOrderForm",
      //           form: "put",
      //           // data: {
      //           //   id: item?.id,
      //           //   date: item?.ognoo,
      //           //   time: item?.time,
      //           // },
      //           data: { item },
      //         })
      //       }
      //       type="primary"
      //       ghost
      //     >
      //       Өөрчлөх
      //     </Button>
      //   ),
    });
  });

  return (
    <div>
      <div className="m-2">
        <Button
          // className="bg-blue-200 hover:bg-blue-400 hover:text-white"
          className="bg-gray-300 font-semibold"
          onClick={() =>
            events.handleFormData({
              header: "Захиалга нэмэх",
              formType: "createTimetableForm",
              form: "post",
              // data: [
              //   {
              //     label: "projectId",
              //     value: "",
              //   },
              //   { label: "question", value: "" },
              // ],
            })
          }
        >
          Шинээр хуваарь нэмэх
        </Button>
      </div>
      <Table
        bordered
        pagination={{ pageSize: 30 }}
        columns={columns}
        dataSource={data1}
        scroll={{ x: 1500, y: 700 }}
      />
      <Scheduler data={data1} />
    </div>
  );
}
