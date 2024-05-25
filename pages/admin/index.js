// system import
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import moment from "moment";

// global state
import useAuth from "../../hooks/useAuth";
import useBooking from "../../hooks/useBooking";
import useArtist from "../../hooks/useArtist";
import useService from "../../hooks/useService";
import useTimeTable from "../../hooks/useTimetable";
import useReport from "../../hooks/useReport";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import { Table, Button, Row, Col, Modal, Tabs, message } from "antd";
// USER
import CustomerMenu from "../../components/admin/customer/customerMenu";
import CreateCustomer from "../../components/admin/customer/createCustomer";
import UpdateCustomer from "../../components/admin/customer/updateCustomer";
// EMPLOYEE
import ArtistMenu from "../../components/admin/artist/artistMenu";
import CreateArtist from "../../components/admin/artist/createArtist";
import UpdateArtist from "../../components/admin/artist/updateArtist";
// SERVICE
import ServiceMenu from "../../components/admin/service/serviceMenu";
import CreateService from "../../components/admin/service/createService";
import UpdateService from "../../components/admin/service/updateService";
// ORDER
import BookingMenu from "../../components/admin/orders/bookingMenu";
import CreateBooking from "../../components/admin/orders/createBooking";
import UpdateBooking from "../../components/admin/orders/updateBooking";

// TIMETABLE
import TimeTableMenu from "../../components/admin/timetable/timeTableMenu";
import CreateTimetable from "../../components/admin/timetable/createTimetable";

// REPORT
import ReportMenu from "../../components/admin/report/reportMenu";
// import OrlogoMenu from "../../components/admin/report/orlogoMenu";

const render = ({ data, events, tr }) => {
  // console.log("dataORder", data?.orderList);
  // const dataDetails = [...data?.room];
  //
  const Data = [
    {
      id: 1,
      // key:1,
      title: "Үйлчлүүлэгч",
      children: <CustomerMenu data={data} events={events} />,
    },
    {
      id: 2,
      title: "Ажилчин",
      children: <ArtistMenu data={data} events={events} />,
    },
    {
      id: 3,
      title: "Үйлчилгээ",
      children: <ServiceMenu data={data} events={events} />,
    },
    {
      id: 3,
      title: "Захиалга",
      children: <BookingMenu data={data} events={events} />,
    },
    {
      id: 4,
      title: "Ажиллах хуваарь",
      children: <TimeTableMenu data={data} events={events} />,
    },
    {
      id: 5,
      title: "Тайлан",
      children: <ReportMenu data={data} events={events} />,
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
  const employee = useArtist();
  const service = useService();
  const timetable = useTimeTable();
  const report = useReport();

  useEffect(() => {
    const getUserAndOrder = async () => {
      await user.getAllUsers();
      await employee.loadAllArtist();
      await service.loadAllServices();
      await service.loadAllServicesByGroups();
      await order.getAllOrders();
      await timetable.getAllArtist_Timetable();
      // const dateRange = {
      //   startDate: "2023/01/01",
      //   endDate: "2023/12/31",
      // };
      // await report.getTotalIncome(dateRange);
      // await report.getEmployeeIncome();
      // await report.getServiceIncome();
      // await report.getAttendance();
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
      userDetail?.manager?.status !== "0" &&
      userDetail?.manager?.status !== "1"
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
      // CUSTOMER
      case "createUserForm":
        return <CreateCustomer data={data} events={events} />;
      case "updateUserForm":
        return <UpdateCustomer data={data} events={events} />;
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
      // ARTIST
      case "createEmployeeForm":
        return <CreateArtist data={data} events={events} />;
      case "updateEmployeeForm":
        return <UpdateArtist data={data} events={events} />;
      case "deleteEmployeeForm":
        return (
          <div>
            {data?.form?.message}
            <div className="my-3 flex">
              <Button
                onClick={() => {
                  handleDeleteEmployee(data?.form?.data?.id);
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
        return <CreateBooking data={data} events={events} />;
      case "updateOrderForm":
        return <UpdateBooking data={data} events={events} />;
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
      // TIMETABLE
      case "createTimetableForm":
        return <CreateTimetable data={data} events={events} />;
      case "updateTimetableForm":
        return <UpdateBooking data={data} events={events} />;
      case "deleteTimetableForm":
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
    await employee.CreateArtist(value);
    setMainForm({
      visible: false,
    });
    employee.loadAllArtist();
  };
  const handleUpdateEmployee = async (value) => {
    await employee.UpdateArtist(value);
    setMainForm({
      visible: false,
    });
    employee.loadAllArtist();
  };
  const handleDeleteEmployee = async (value) => {
    await employee.DeleteArtist(value);
    setMainForm({
      visible: false,
    });
    employee.loadAllArtist();
  };
  //
  //
  // SERVICE FUNCTIONS
  const handleCreateOrder = async (values) => {
    let timeString = values?.time.format("HH:00:00");
    let originalTime = moment(timeString, "HH:mm:ss");
    let updatedTime = originalTime.add(1, "hours");
    let formattedUpdatedTime = updatedTime.format("HH:mm:ss");
    // console.log(formattedUpdatedTime);
    await order.createBooking(
      values?.customerId,
      values?.serviceId,
      values?.artistId,
      values?.date.format("YYYY-MM-DD"),
      values?.time.format("HH:00:00"),
      formattedUpdatedTime
    );
    // timetable.clearTimetable();
    setMainForm({
      visible: false,
    });
    order.getAllOrders();
  };
  const handleUpdateOrder = async (value) => {
    await order.UpdateOrder(value);
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
  const getArtistIncome = async (value) => {
    await report.getArtistIncome(value);
  };
  const getServiceIncome = async (value) => {
    await report.getServiceIncome(value);
  };
  //
  //
  // Timetable Functions
  const loadTimeTable = (value) => {
    console.log("loadTimeTable", value);
    timetable.getArtistTimetableById(value);
  };
  const loadArtistByService = (value) => {
    employee.loadArtistByService(value);
  };

  const createArtistTimetable = async (values) => {
    await timetable.createArtistTimetable(
      values?.artistId,
      values?.date.format("YYYY-MM-DD"),
      values?.startTime.format("HH:00:00"),
      values?.endTime.format("HH:00:00")
    );
    setMainForm({
      visible: false,
    });
    await timetable.getAllArtist_Timetable();
  };
  // console.log(
  //   "service?.state?.just_service_list",
  //   service?.state?.just_service_list
  // );
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
        status={user?.state?.status}
        // status={user?.state?.status}
        data={{
          userList: user?.state?.list,
          orderList: order?.state?.list,
          employeeList: employee?.state?.list,
          artistsByService: employee?.state?.artistsByService,
          serviceList: service?.state?.list,
          just_service_list: service?.state1?.just_service_list,
          timetable_list: timetable?.state?.list,
          All_artist_timetables: timetable?.state?.All_artist_timetables,
          reportList: report?.state,
          // orlogo: report?.state2,
          form: mainForm,
        }}
        render={render}
        events={{
          handleCancel: handleCancel,
          handleFormData: handleFormData,
          handleFormRender: handleFormRender,
          // Customer
          handleCreateUser: handleCreateUser,
          handleUpdateUser: handleUpdateUser,
          handleDeleteUser: handleDeleteUser,
          // Artist
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
          loadTimeTable: loadTimeTable,
          loadArtistByService: loadArtistByService,
          // report
          getTotalIncome: getTotalIncome,
          getArtistIncome: getArtistIncome,
          getServiceIncome: getServiceIncome,
          // timetable
          createArtistTimetable: createArtistTimetable,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
