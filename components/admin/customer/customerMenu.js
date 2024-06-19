import React, { useState } from "react";
import { Table, Button, Input } from "antd";

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
      title: "Төлөв",
      width: 50,
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Овог",
      dataIndex: "lastName",
      key: "lastName",
      width: 60,
    },
    {
      title: "Нэр",
      width: 60,
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "И-майл",
      dataIndex: "email",
      key: "email",
      width: 80,
    },
    {
      title: "Утас",
      dataIndex: "phone",
      key: "phone",
      width: 40,
    },
    {
      title: "Өөрчлөх",
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
  ];

  const getUserStatus = (status) => {
    if (status === "9") {
      return "Хэрэглэгч";
    } else if (status === "1") {
      return "Ажилчин";
    } else {
      return "Админ";
    }
  };

  let number = 0;
  const filteredData = data?.userList.filter((item) =>
    item.phone.includes(searchPhone)
  );

  const dataSource = filteredData.map((item, index) => {
    number = number + 1;
    return {
      key: number,
      list: number,
      status: getUserStatus(item?.status),
      email: item?.email,
      firstName: item?.firstName,
      lastName: item?.lastName,
      phone: item?.phone,
      delete: (
        <Button
          onClick={() =>
            events.handleFormData({
              formType: "deleteUserForm",
              message:
                item?.email +
                " >> " +
                item?.phone +
                "  >> хэрэглэгчийг" +
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
              formType: "updateUserForm",
              form: "put",
              data: {
                status: item?.status,
                firstName: item?.firstName,
                lastName: item?.lastName,
                email: item?.email,
                phone: item?.phone,
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
    };
  });

  return (
    <div>
      <div className="m-2">
        <Button
          className="bg-gray-300 font-semibold"
          onClick={() =>
            events.handleFormData({
              header: "Хэрэглэгч нэмэх",
              formType: "createUserForm",
              form: "post",
            })
          }
        >
          Шинээр үйлчлүүлэгч нэмэх
        </Button>
      </div>
      <div className="mt-4 mb-2">
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
        dataSource={dataSource}
        scroll={{ x: 1500, y: 700 }}
      />
    </div>
  );
}
