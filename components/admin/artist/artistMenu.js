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
      title: "lastName",
      dataIndex: "lastName",
      key: "lastName",
      width: 60,
    },
    {
      title: "firstName",
      width: 60,
      dataIndex: "firstName",
      key: "firstName",
      // fixed: "left",
    },

    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: 80,
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
      width: 40,
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
  const data1 = [];
  // const getUserStatus = (status) => {
  //   if (status === "9") {
  //     return "Хэрэглэгч";
  //   } else if (status === "1") {
  //     return "Ажилчин";
  //   } else {
  //     return "Админ";
  //   }
  // };
  let number = 0;
  data?.employeeList.map((item, index) => {
    // menu_titleIds.push({ menu_titleId: item });
    number = number + 1;
    // console.log("index", index);
    data1.push({
      key: number,
      list: number,
      // status: getUserStatus(item?.status),
      email: item?.email,
      firstName: item?.firstName,
      lastName: item?.lastName,
      phone: item?.phone,
      delete: (
        <Button
          onClick={() =>
            events.handleFormData({
              // header: "Хэлэлцэх асуудал",
              formType: "deleteEmployeeForm",
              message: item?.email + " >> имайлтэй ажилчинг" + "-г устгах уу?",
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
              header: "Ажилчин өөрчлөх",
              formType: "updateEmployeeForm",
              form: "put",
              data: { item },
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
              header: "Ажилчин нэмэх",
              formType: "createEmployeeForm",
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
          Шинээр ажилчин нэмэх
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
