import React from "react";
import { Table, Button } from "antd";
// import moment from "moment";

export default function Agenda({ data, events }) {
  // console.log(data?.vote)
  // console.log(data?.confirm)
  console.log("report", data?.orlogo);
  const columns = [
    {
      title: "№",
      width: 10,
      dataIndex: "list",
      key: "list",
      // fixed: "left",
    },
    {
      title: "ajiltan_id",
      dataIndex: "ajiltan_id",
      key: "ajiltan_id",
      width: 10,
    },
    {
      title: "ajiltan_name",
      width: 10,
      dataIndex: "ajiltan_name",
      key: "ajiltan_name",
      // fixed: "left",
    },
    {
      title: "ajilsan",
      width: 10,
      dataIndex: "ajilsan",
      key: "ajilsan",
      // fixed: "left",
    },
    {
      title: "niit",
      width: 10,
      dataIndex: "niit",
      key: "niit",
      // fixed: "left",
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
  data?.reportList?.list4.map((item, index) => {
    // menu_titleIds.push({ menu_titleId: item });
    number = number + 1;
    // console.log("index", index);
    data1.push({
      key: number,
      list: number,
      orlogo: item?.ajiltan_id,
    });
  });

  return (
    <div>
      {/* <div className="m-2">
        <Button
          // className="bg-blue-200 hover:bg-blue-400 hover:text-white"
          className="bg-gray-300 font-semibold"
          onClick={() =>
            events.handleFormData({
              header: "Хэрэглэгч нэмэх",
              formType: "createUserForm",
              form: "post",
            })
          }
        >
          Шинээр хэрэглэгч нэмэх
        </Button>
      </div> */}
      <Table
        bordered
        pagination={{ pageSize: 30 }}
        columns={columns}
        dataSource={data1}
        scroll={{ x: 500, y: 700 }}
      />
    </div>
  );
}
