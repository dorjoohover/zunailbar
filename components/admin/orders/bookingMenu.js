import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import Scheduler from "../../scheduler/BookingScheduler";

export default function Agenda({ data, events }) {
  const [searchPhone, setSearchPhone] = useState("");

  const columns = [
    {
      title: "№",
      width: 19,
      dataIndex: "list",
      key: "list",
    },
    {
      title: "Үйлчлүүлэгийн дугаар",
      width: 60,
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Артистийн нэр",
      dataIndex: "artistName",
      key: "artistName",
      width: 60,
    },
    {
      title: "Үйлчилгээний нэр",
      dataIndex: "serviceId",
      key: "serviceId",
      width: 80,
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
      title: "Өөрлчөх",
      key: "update",
      width: 40,
      dataIndex: "update",
    },
    {
      title: "Устгах",
      key: "delete",
      width: 40,
      dataIndex: "delete",
    },
    {
      title: "updatedAt",
      key: "updatedAt",
      width: 40,
      dataIndex: "updatedAt",
    },
  ];

  const checkUserIdforPhone = (userId) => {
    var phone = "";
    data?.userList.forEach((element) => {
      if (element?.id === userId) {
        phone = element?.phone;
      }
    });
    return phone;
  };

  const checkEmployeeId = (employeeId) => {
    var firstName = "";
    data?.employeeList.forEach((element) => {
      if (element?.id === employeeId) {
        firstName = element?.firstName;
      }
    });
    return firstName;
  };

  const checkServiceId = (serviceId) => {
    var serviceName = "";
    data?.just_service_list.forEach((element) => {
      if (element?.id === serviceId) {
        serviceName = element?.serviceName;
      }
    });
    return serviceName;
  };

  let number = 0;
  const data1 = data?.orderList.map((item) => {
    number += 1;
    return {
      key: number,
      list: number,
      customerId: checkUserIdforPhone(item?.customerId),
      serviceId: checkServiceId(item?.serviceId),
      artistName: checkEmployeeId(item?.artistId),
      artistId: item?.artistId,
      date: item?.date,
      startTime: item?.startTime,
      endTime: item?.endTime,
      updatedAt: item?.updatedAt,
      delete: (
        <Button
          onClick={() =>
            events.handleFormData({
              header: "Захиалга устгах",
              formType: "deleteOrderForm",
              message: `${item?.date} огноотой ${item?.startTime} цагтай >> захиалгыг -г устгах уу?`,
              data: { id: item?.id },
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
              data: { item },
            })
          }
          type="primary"
          ghost
        >
          Өөрчлөх
        </Button>
      ),
    };
  });

  const filteredData = data1.filter((item) =>
    item.customerId.includes(searchPhone)
  );

  return (
    <div>
      <div className="m-2">
        <Button
          className="bg-gray-300 font-semibold"
          onClick={() =>
            events.handleFormData({
              header: "Захиалга нэмэх",
              formType: "createOrderForm",
              form: "post",
              data: data,
            })
          }
        >
          Өөртөө шинээр захиалга нэмэх
        </Button>
      </div>
      <div className="m-2">
        <Input
          placeholder="Утасны дугаараар хайх"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
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
      <Scheduler data={data1} />
    </div>
  );
}
