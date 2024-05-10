// system import
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// global state
import useAuth from "../../hooks/useAuth";
import useOrder from "../../hooks/useOrder";
import useEmployee from "../../hooks/useEmployee";
import useService from "../../hooks/useService";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import { Table, Button, Row, Col, Modal, Tabs, message } from "antd";
// ORDER
import OrderMenu from "../../components/admin/orders/orderMenu";
import CreateEmployeeOrder from "../../components/admin/orders/createEmployeeOrder";
import UpdateOrder from "../../components/admin/orders/updateOrder";

const render = ({ data, events, tr }) => {
  // console.log("dataORder", data?.orderList);
  // const dataDetails = [...data?.room];
  const Data = [
    {
      id: 1,
      title: "Захиалга",
      children: <OrderMenu data={data} events={events} />,
    },
  ];
  return (
    <div className="min-h-screen min-[350px]:px-6">
      <Head>
        <title>Ажилтаны хэсэг</title>
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
  const order = useOrder();
  const employee = useEmployee();
  const service = useService();

  useEffect(() => {
    const getUserAndOrder = async (initialData) => {
      await user.getAllUsers();
      await employee.loadAllEmployees();
      await service.loadAllServices();
      await order.getEmployeeOrders(initialData?.employee?.id);
    };
    if (!localStorage.getItem("accessToken")) {
      router.push("/");
      message.error("Та нэвтэрч орно уу!");
    }
    const detail = localStorage.getItem("beauty_detail");
    const initialData1 = detail === "undefined" ? null : detail;
    var initialData = initialData1 === null ? {} : JSON.parse(initialData1);
    // console.log("useState");
    getUserAndOrder(initialData);
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
      // ORDER
      case "createOrderForm":
        return <CreateEmployeeOrder data={data} events={events} />;
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
  // ORDER FUNCTIONS
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
  return (
    <React.Fragment>
      <h1
        className="mb-2 pt-2"
        style={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        Ажилтаны хэсэг
      </h1>
      {user?.contextHolder}
      {employee?.contextHolder}
      {order?.contextHolder}
      {service?.contextHolder}
      <DataDisplayer
        // error={user?.state?.message}
        status={"success"}
        // status={user?.state?.status}
        data={{
          userList: user?.state?.list,
          orderList: order?.state?.list,
          employeeList: employee?.state?.list,
          serviceList: service?.state?.list,
          form: mainForm,
        }}
        render={render}
        events={{
          handleCancel: handleCancel,
          handleFormData: handleFormData,
          handleFormRender: handleFormRender,
          // order
          handleCreateOrder: handleCreateOrder,
          handleDeleteOrder: handleDeleteOrder,
          handleUpdateOrder: handleUpdateOrder,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
