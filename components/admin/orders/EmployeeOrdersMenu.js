import React from "react";
import { Table, Button } from "antd";
// import moment from "moment";

export default function Agenda({ data, events }) {
  // console.log(data?.vote)
  // console.log(data?.confirm)
  // console.log(data)
  const columns = [
    {
      title: "№",
      width: 19,
      dataIndex: "list",
      key: "list",
      // fixed: "left",
    },
    {
      title: "userId",
      width: 60,
      dataIndex: "userId",
      key: "userId",
      // fixed: "left",
    },
    {
      title: "employeeId",
      dataIndex: "employeeId",
      key: "employeeId",
      width: 60,
    },
    {
      title: "serviceId",
      dataIndex: "serviceId",
      key: "serviceId",
      width: 80,
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      width: 40,
    },
    {
      title: "time",
      key: "time",
      // fixed: "right",
      width: 40,
      dataIndex: "time",
    },
    {
      title: "updatedAt",
      key: "updatedAt",
      // fixed: "right",
      width: 40,
      dataIndex: "updatedAt",
    },
    {
      title: "update",
      key: "update",
      // fixed: "right",
      width: 40,
      dataIndex: "update",
    },
    {
      title: "delete",
      key: "delete",
      // fixed: "right",
      width: 40,
      dataIndex: "delete",
    },
  ];
  // console.log(Maindata)
  const checkUserId = (userId) => {
    var one = "";
    data?.userList.forEach((element) => {
      if (element?.id === userId) {
        // userSet.push(userId);
        one = element?.email;
      }
    });
    return one;
  };

  const checkEmployeeId = (employeeId) => {
    var one = "";
    data?.employeeList.forEach((element) => {
      if (element?.id === employeeId) {
        // userSet.push(userId);
        one = element?.firstName;
      }
    });
    return one;
  };

  const checkServiceId = (serviceId) => {
    var one = "";
    data?.serviceList.forEach((element) => {
      if (element?.id === serviceId) {
        // userSet.push(userId);
        one = element?.serviceName;
      }
    });
    return one;
  };

  const data1 = [];
  let number = 0;
  data?.orderList.map((item, index) => {
    // menu_titleIds.push({ menu_titleId: item });
    number = number + 1;
    // console.log("index", index);
    data1.push({
      key: number,
      list: number,
      userId: checkUserId(item?.userId),
      serviceId: checkServiceId(item?.serviceId),
      employeeId: checkEmployeeId(item?.employeeId),
      time: item?.time,
      date: item?.ognoo,
      updatedAt: item?.updatedAt,
      delete: (
        <Button
          onClick={() =>
            events.handleFormData({
              header: "Захиалга устгах",
              formType: "deleteOrderForm",
              message:
                item?.ognoo +
                "огноотой " +
                item?.time +
                " цагтай " +
                " >> захиалгыг" +
                "-г устгах уу?",
              data: {
                id: item?.id,
              },
            })
          }
          type="primary"
          danger
        >
          Устгах
        </Button>
      ),
      update: (
        <Button
          onClick={() =>
            events.handleFormData({
              header: "Захиалга өөрчлөх",
              formType: "updateOrderForm",
              form: "put",
              data: {
                id: item?.id,
                date: item?.ognoo,
                time: item?.time,
              },
            })
          }
          type="primary"
          ghost
        >
          Өөрчлөх
        </Button>
      ),
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
              formType: "createOrderForm",
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
          Шинээр захиалга нэмэх
        </Button>
      </div>
      <Table
        bordered
        pagination={{ pageSize: 30 }}
        columns={columns}
        dataSource={data1}
        scroll={{ x: 1500, y: 700 }}
      />
    </div>
  );
}
