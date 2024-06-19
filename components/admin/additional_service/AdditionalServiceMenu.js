import React from "react";
import { Table, Button } from "antd";
// import moment from "moment";

export default function Agenda({ data, events }) {
  // console.log(data?.vote)
  // console.log(data?.confirm)
  // console.log("just_service_list", data);
  const columns = [
    {
      title: "№",
      width: 5,
      dataIndex: "list",
      key: "list",
      // fixed: "left",
    },
    {
      title: "Нэмэлт үйлчилгээний нэр",
      width: 30,
      dataIndex: "additional_serviceName",
      key: "additional_serviceName",
      // fixed: "left",
    },
    {
      title: "Үндсэн үнэ",
      dataIndex: "default_price",
      key: "default_price",
      width: 10,
    },
    {
      title: "Тайлбар",
      dataIndex: "description",
      key: "description",
      width: 30,
    },
    {
      title: "Өөрчлөх",
      dataIndex: "update",
      key: "update",
      width: 30,
    },
    {
      title: "Устгах",
      dataIndex: "delete",
      key: "delete",
      width: 30,
    },
  ];
  // console.log(Maindata)
  const data1 = [];
  let number = 0;
  data?.additional_service_list.map((item, index) => {
    // menu_titleIds.push({ menu_titleId: item });
    number = number + 1;
    // console.log("index", index);
    data1.push({
      key: number,
      list: number,
      additional_serviceName: item?.additional_serviceName,
      default_price: item?.default_price,
      description: item?.description,
      delete: (
        <Button
          onClick={() =>
            events.handleFormData({
              // header: "",
              formType: "deleteAdditionalServiceForm",
              message:
                item?.additional_serviceName +
                " >> нэртэй үйлчилгээг" +
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
              header: "Үйлчилгээ өөрчлөх",
              formType: "updateAdditionalService",
              form: "put",
              data: {
                id: item?.id,
                additional_serviceName: item?.additional_serviceName,
                default_price: item?.default_price,
                description: item?.description,
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
              formType: "createAdditionalService",
              form: "post",
              data: data,
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
        scroll={{ x: 1000, y: 700 }}
      />
    </div>
  );
}
