import React from "react";
import { Table, Button } from "antd";

export default function Agenda({ data, events }) {
  console.log("data?.serviceList", data?.serviceList);

  const columns = [
    {
      title: "№",
      width: 8,
      dataIndex: "list",
      key: "list",
    },
    {
      title: "Үйлчилгээний бүлгийн нэр",
      width: 30,
      dataIndex: "serviceGroupName",
      key: "serviceGroupName",
    },
    {
      title: "Үйлчилгээний нэр",
      width: 30,
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Үнэ",
      dataIndex: "price",
      key: "price",
      width: 10,
    },
    {
      title: "Зураг",
      dataIndex: "image",
      key: "image",
      width: 30,
    },
    {
      title: "Үргэлжлэх хугацаа",
      dataIndex: "duration",
      key: "duration",
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

  const columnServiceGroup = [
    {
      title: "№",
      width: 8,
      dataIndex: "list",
      key: "list",
    },
    {
      title: "Үйлчилгээний бүлгийн нэр",
      width: 30,
      dataIndex: "serviceGroupName",
      key: "serviceGroupName",
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

  const dataServices = [];
  let number = 0;

  data?.serviceList.forEach((group) => {
    group.services.forEach((service) => {
      number += 1;
      dataServices.push({
        key: number,
        list: number,
        serviceGroupName: group?.serviceGroupName,
        serviceName: service?.serviceName,
        price: service?.price,
        image: (
          <img
            className="max-h-12"
            src={service?.image1}
            alt={service?.serviceName}
          />
        ),
        duration: service?.duration,
        delete: (
          <Button
            onClick={() =>
              events.handleFormData({
                formType: "deleteServiceForm",
                message: `${service?.serviceName} нэртэй үйлчилгээг устгах уу?`,
                data: {
                  id: service?.id,
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
                  id: service?.id,
                  status: service?.status,
                  serviceName: service?.serviceName,
                  price: service?.price,
                  image1: service?.image1,
                  duration: service?.duration,
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
  });

  const dataServiceGroups = [];
  let number2 = 0;

  data?.serviceList.forEach((group) => {
    number2 += 1;
    dataServiceGroups.push({
      key: number,
      list: number,
      serviceGroupName: group?.serviceGroupName,
      delete: (
        <Button
          onClick={() =>
            events.handleFormData({
              formType: "deleteServiceGroupForm",
              message: `${group?.serviceGroupName} нэртэй үйлчилгээг устгах уу?`,
              data: {
                id: group?.id,
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
              formType: "updateServiceGroupForm",
              form: "put",
              data: {
                id: group?.id,
                serviceGroupName: group?.serviceGroupName,
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
          className="bg-gray-300 font-semibold"
          onClick={() =>
            events.handleFormData({
              header: "Үйлчилгээ нэмэх",
              formType: "createServiceForm",
              form: "post",
              data: data,
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
        dataSource={dataServices}
        scroll={{ x: 1000, y: 700 }}
      />
      <div className="m-2">
        <Button
          className="bg-gray-300 font-semibold"
          onClick={() =>
            events.handleFormData({
              header: "Үйлчилгээ нэмэх",
              formType: "createServiceGroupForm",
              form: "post",
              data: data,
            })
          }
        >
          Шинээр Үйлчилгээ нэмэх
        </Button>
      </div>
      <Table
        bordered
        pagination={{ pageSize: 30 }}
        columns={columnServiceGroup}
        dataSource={dataServiceGroups}
        scroll={{ x: 1000, y: 700 }}
      />
    </div>
  );
}
