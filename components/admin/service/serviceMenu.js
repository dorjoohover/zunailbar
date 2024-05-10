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
      width: 10,
      dataIndex: "list",
      key: "list",
      // fixed: "left",
    },
    {
      title: "status",
      width: 50,
      dataIndex: "status",
      key: "status",
      // fixed: "left",
    },
    {
      title: "serviceName",
      width: 60,
      dataIndex: "serviceName",
      key: "serviceName",
      // fixed: "left",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      width: 60,
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 60,
    },
    {
      title: "update",
      dataIndex: "update",
      key: "update",
      width: 60,
    },
    {
      title: "delete",
      dataIndex: "delete",
      key: "delete",
      width: 60,
    },
  ];
  // console.log(Maindata)
  const data1 = [];
  const getUserStatus = (status) => {
    if (status === "9") {
      return "Хэрэглэгч";
    } else if (status === "1") {
      return "Ажилчин";
    } else {
      return "Админ";
    }
    // console.log("clicked");s
    // company.SetLogo(value.logo);
    // router.push("/auth/login");
  };
  let number = 0;
  data?.serviceList.map((item, index) => {
    // menu_titleIds.push({ menu_titleId: item });
    number = number + 1;
    // console.log("index", index);
    data1.push({
      key: number,
      list: number,
      status: item?.status,
      serviceName: item?.serviceName,
      price: item?.price,
      updatedAt: item?.updatedAt,
      delete: (
        <Button
          onClick={() =>
            events.handleFormData({
              // header: "",
              formType: "deleteServiceForm",
              message:
                item?.serviceName + " >> нэртэй үйлчилгээг" + "-г устгах уу?",
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
              header: "Үйлчилгээ өөрчлөх",
              formType: "updateServiceForm",
              form: "put",
              data: {
                status: item?.status,
                serviceName: item?.serviceName,
                price: item?.price,
                id: item?.id,
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
              header: "Үйлчилгээ нэмэх",
              formType: "createServiceForm",
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
          Шинээр Үйлчилгээ нэмэх
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
