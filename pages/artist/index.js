// system import
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// global state
import useAuth from "../../hooks/useAuth";
import useBooking from "../../hooks/useBooking";
import useEmployee from "../../hooks/useArtist";
import useService from "../../hooks/useService";
import useReport from "../../hooks/useReport";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import { Table, Button, Row, Col, Modal, Tabs, message } from "antd";
// USER
import UserMenu from "../../components/admin/customer/customerMenu";
import CreateUser from "../../components/admin/customer/createCustomer";
import UpdateUser from "../../components/admin/customer/updateCustomer";
// EMPLOYEE
import EmployeeMenu from "../../components/admin/artist/artistMenu";
import CreateEmployee from "../../components/admin/artist/createArtist";
import UpdateEmployee from "../../components/admin/artist/updateArtist";
// SERVICE
import ServiceMenu from "../../components/admin/service/serviceMenu";
import CreateService from "../../components/admin/service/createService";
import UpdateService from "../../components/admin/service/updateService";
// ORDER
import OrderMenu from "../../components/admin/orders/orderMenu";
import CreateOrder from "../../components/admin/orders/createOrder";
import UpdateOrder from "../../components/admin/orders/updateOrder";
// REPORT
import AttendanceMenu from "../../components/admin/report/attendanceMenu";
// import OrlogoMenu from "../../components/admin/report/orlogoMenu";
const render = ({ data, events, tr }) => {
  // console.log("dataORder", data?.orderList);
  // const dataDetails = [...data?.room];
  //
  const Data = [
    {
      id: 1,
      title: "Үйлчлүүлэгч",
      children: <UserMenu data={data} events={events} />,
    },
    {
      id: 2,
      title: "Ажилчин",
      children: <EmployeeMenu data={data} events={events} />,
    },
    {
      id: 3,
      title: "Үйлчилгээ",
      children: <ServiceMenu data={data} events={events} />,
    },
    {
      id: 3,
      title: "Захиалга",
      children: <OrderMenu data={data} events={events} />,
    },
    {
      id: 4,
      title: "Тайлан",
      children: <AttendanceMenu data={data} events={events} />,
    },
    // {
    //   id: 4,
    //   title: "Орлого",
    //   children: <OrlogoMenu data={data} events={events} />,
    // },
  ];
  return (
    <div className="min-h-screen min-[350px]:px-6">
      <Head>
        <title>Админ хэсэг</title>
      </Head>
      <div>
        <div>
          <Modal
            title={data?.form?.header}
            open={data?.form?.visible}
            // onOk={events.handleOk}
            onCancel={events.handleCancel}
            footer={[
              <Button key="back" onClick={events.handleCancel}>
                БУЦАХ
              </Button>,
            ]}
            width={1000}
          >
            {events.handleFormRender(data?.form?.formType, data, events)}
          </Modal>
        </div>
        <Tabs
          // onTabClick={Clicktab}
          defaultActiveKey="1"
          type="card"
          size="large"
          items={Data.map((ele, index) => {
            //   const id = String(i + 1)
            return {
              label: ele.title,
              key: index,
              children: ele.children,
            };
          })}
        />
      </div>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const user = useAuth();
  const order = useBooking();
  const employee = useEmployee();
  const service = useService();
  const report = useReport();

  useEffect(() => {
    const getUserAndOrder = async () => {
      await user.getAllUsers();
      await employee.loadAllArtist();
      await service.loadAllServices();
      await order.getAllOrders();
      const dateRange = {
        startDate: "2023/01/01",
        endDate: "2023/12/31",
      };
      await report.getTotalIncome(dateRange);
      // await report.getEmployeeIncome();
      // await report.getServiceIncome();
      await report.getAttendance();
    };
    // if (!localStorage.getItem("accessToken")) {
    //   router.push("/");
    //   message.error("Та нэвтэрч орно уу!");
    // }
    const detail = localStorage.getItem("beauty_detail");

    const initialData1 = detail === "undefined" ? null : detail;
    var userDetail = initialData1 === null ? {} : JSON.parse(initialData1);
    // console.log("beauty_detail", userDetail);
    if (
      userDetail?.artist?.status !== "0" &&
      userDetail?.artist?.status !== "1"
    ) {
      router.push("/");
      message.error("Та админ эрхээр нэвтэрч орно уу!");
    }
    // console.log("useState");
    getUserAndOrder();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const [mainForm, setMainForm] = useState({
    formType: "",
    data: "",
    visible: false,
    header: "",
    message: "",
  });
  const handleFormData = (e) => {
    setMainForm({
      func: e.form,
      header: e.header,
      data: e.data,
      visible: true,
      formType: e.formType,
      message: e.message,
      // id: auth?.state?.loggedInCompany,
    });
  };
  const handleFormRender = (type, data, events) => {
    // console.log("data", data?.form?.data);
    // console.log(data?.form?.data?.type)
    switch (type) {
      // USER
      case "createUserForm":
        return <CreateUser data={data} events={events} />;
      case "updateUserForm":
        return <UpdateUser data={data} events={events} />;
      case "deleteUserForm":
        return (
          <div>
            {data?.form?.message}
            <div className="my-3 flex">
              <Button
                onClick={() => {
                  handleDeleteUser(data?.form?.data?.id);
                }}
                type="primary"
                danger
              >
                Тийм
              </Button>
            </div>
          </div>
        );
      // EMPLOYEE
      case "createEmployeeForm":
        return <CreateEmployee data={data} events={events} />;
      case "updateEmployeeForm":
        return <UpdateEmployee data={data} events={events} />;
      case "deleteEmployeeForm":
        return (
          <div>
            {data?.form?.message}
            <div className="my-3 flex">
              <Button
                onClick={() => {
                  handleDeleteUser(data?.form?.data?.id);
                }}
                type="primary"
                danger
              >
                Тийм
              </Button>
            </div>
          </div>
        );
      // SERVICE
      case "createServiceForm":
        return <CreateService data={data} events={events} />;
      case "updateServiceForm":
        return <UpdateService data={data} events={events} />;
      case "deleteServiceForm":
        return (
          <div>
            {data?.form?.message}
            <div className="my-3 flex">
              <Button
                onClick={() => {
                  handleDeleteService(data?.form?.data?.id);
                }}
                type="primary"
                danger
              >
                Тийм
              </Button>
            </div>
          </div>
        );
      // ORDER
      case "createOrderForm":
        return <CreateOrder data={data} events={events} />;
      case "updateOrderForm":
        return <UpdateOrder data={data} events={events} />;
      case "deleteOrderForm":
        return (
          <div>
            {data?.form?.message}
            <div className="my-3 flex">
              <Button
                onClick={() => {
                  handleDeleteOrder(data?.form?.data?.id);
                }}
                type="primary"
                danger
              >
                Тийм
              </Button>
            </div>
          </div>
        );
        break;
      default:
        return <div>hi</div>;
    }
  };

  const handleCancel = (value) => {
    setMainForm({
      visible: false,
    });
  };
  //
  //
  // USER FUNCTIONS
  const handleCreateUser = async (value) => {
    await user.CreateUser(value);
    setMainForm({
      visible: false,
    });
    user.getAllUsers();
  };
  const handleUpdateUser = async (value) => {
    await user.UpdateUser(value);
    setMainForm({
      visible: false,
    });
    user.getAllUsers();
  };
  const handleDeleteUser = async (value) => {
    await user.DeleteUser(value);
    setMainForm({
      visible: false,
    });
    user.getAllUsers();
  };
  //
  //
  // EMPLOYEE FUNCTIONS
  const handleCreateEmployee = async (value) => {
    await employee.CreateEmployees(value);
    setMainForm({
      visible: false,
    });
    employee.loadAllEmployees();
  };
  const handleUpdateEmployee = async (value) => {
    await employee.UpdateEmployees(value);
    setMainForm({
      visible: false,
    });
    employee.loadAllEmployees();
  };
  const handleDeleteEmployee = async (value) => {
    await employee.DeleteEmployees(value);
    setMainForm({
      visible: false,
    });
    employee.loadAllEmployees();
  };
  //
  //
  // SERVICE FUNCTIONS
  const handleCreateOrder = async (value) => {
    await order.createOrder(
      value?.userId,
      value?.serviceId,
      value?.employeeId,
      value?.ognoo.format("YYYY/MM/DD"),
      value?.time.format("HH:00")
    );
    setMainForm({
      visible: false,
    });
    order.getAllOrders();
  };
  const handleUpdateOrder = async (value) => {
    await order.UpdateOrder(
      value?.id,
      value?.ognoo.format("YYYY/MM/DD"),
      value?.time.format("HH:00")
    );
    setMainForm({
      visible: false,
    });
    order.getAllOrders();
  };
  const handleDeleteOrder = async (value) => {
    await order.DeleteOrder(value);
    setMainForm({
      visible: false,
    });
    order.getAllOrders();
  };
  //
  //
  // ORDER FUNCTIONS
  const handleCreateService = async (value) => {
    await service.CreateService(value);
    setMainForm({
      visible: false,
    });
    service.loadAllServices();
  };
  const handleUpdateService = async (value) => {
    await service.UpdateService(value);
    setMainForm({
      visible: false,
    });
    service.loadAllServices();
  };
  const handleDeleteService = async (value) => {
    await service.DeleteService(value);
    setMainForm({
      visible: false,
    });
    service.loadAllServices();
  };
  const getTotalIncome = async (value) => {
    await report.getTotalIncome(value);
  };
  const getEmployeeIncome = async (value) => {
    await report.getEmployeeIncome(value);
  };
  const getServiceIncome = async (value) => {
    await report.getServiceIncome(value);
  };
  return (
    <React.Fragment>
      <h1
        className="mb-2 pt-2"
        style={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        Админ хэсэг
      </h1>
      {user?.contextHolder}
      {employee?.contextHolder}
      {order?.contextHolder}
      {service?.contextHolder}
      {report?.contextHolder}
      <DataDisplayer
        // error={user?.state?.message}
        status={"success"}
        // status={user?.state?.status}
        data={{
          userList: user?.state?.list,
          orderList: order?.state?.list,
          employeeList: employee?.state?.list,
          serviceList: service?.state?.list,
          reportList: report?.state,
          orlogo: report?.state2,
          form: mainForm,
        }}
        render={render}
        events={{
          handleCancel: handleCancel,
          handleFormData: handleFormData,
          handleFormRender: handleFormRender,
          // users
          handleCreateUser: handleCreateUser,
          handleUpdateUser: handleUpdateUser,
          handleDeleteUser: handleDeleteUser,
          // employee
          handleCreateEmployee: handleCreateEmployee,
          handleUpdateEmployee: handleUpdateEmployee,
          handleDeleteEmployee: handleDeleteEmployee,
          // service
          handleCreateService: handleCreateService,
          handleUpdateService: handleUpdateService,
          handleDeleteService: handleDeleteService,
          // order
          handleCreateOrder: handleCreateOrder,
          handleDeleteOrder: handleDeleteOrder,
          handleUpdateOrder: handleUpdateOrder,
          getTotalIncome: getTotalIncome,
          getEmployeeIncome: getEmployeeIncome,
          getServiceIncome: getServiceIncome,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
