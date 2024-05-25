import React from "react";
import { Table, Button } from "antd";
import OrlogoForm from "./orlogoForm";
import ServiceIncomeForm from "./serviceIncomeForm";
import EmployeeIncomeForm from "./employeeIncomeForm";
// import moment from "moment";

export default function Agenda({ data, events }) {
  // console.log(data?.vote)
  // console.log(data?.confirm)
  // console.log("report", data?.reportList);
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
      ajiltan_id: item?.ajiltan_id,
      ajiltan_name: item?.ajiltan_name,
      ajilsan: item?.ajillasan?.niit,
      niit: item?.niit?.niit,
    });
  });
  console.log("data?.reportList", data?.reportList);
  return (
    <div>
      <div>
        <h3>Total Income</h3>
        <OrlogoForm data={data} events={events} />
      </div>
      <div className="mt-2 p-1 .bg-blue-200">
        {/* {data?.orlogo !== null &&
          data?.orlogo.map((item, index) => ( */}
        <div>
          <p className="bg-blue-200">
            Нйит орлого:{" "}
            {data?.reportList.totalIncome !== null &&
              data?.reportList.totalIncome}
          </p>
        </div>
        {/* ))} */}
      </div>
      <div className="my-12">
        <h3>Income by Service</h3>
        <ServiceIncomeForm data={data} events={events} />
        <div className="">
          <p className="bg-blue-200">
            Үйлчилгээний орлого:{" "}
            {data?.reportList.serviceIncome !== null &&
              data?.reportList.serviceIncome}
          </p>
        </div>
      </div>
      <div>
        <h3>Income by Employee</h3>
        <EmployeeIncomeForm data={data} events={events} />
        <div className="">
          <p className="bg-blue-200">
            Артистийн Орлого:{" "}
            {data?.reportList.artistIncome !== null &&
              data?.reportList.artistIncome}
          </p>
        </div>
      </div>
      <h3 className="text-center mt-4 text-2xl font-bold">Тайлан</h3>
      {/* <Table
        bordered
        pagination={{ pageSize: 30 }}
        columns={columns}
        dataSource={data1}
        scroll={{ x: 500, y: 700 }}
      /> */}
    </div>
  );
}
