// system import
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Modal } from "antd";

// global state
import useService from "../../hooks/useService";
import useOrder from "../../hooks/useOrder";
import useEmployee from "../../hooks/useEmployee";
// import useAuth from "../hooks/useAuth";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import Cards from "../../components/card/Card";
import ServiceForm from "../../components/form/serviceForm";

const render = ({ data, events }) => {
  // console.log("data services", data);
  console.log("render");
  const dataDetails = [...data?.service_list];
  return (
    <div className="min-h-screen min-[350px]:px-12">
      <Head>
        <title>ӨРӨӨНҮҮД</title>
      </Head>
      <div className="my-5 font-bold"></div>
      <div className="grid .place-items-center gap-3 font-Montserrat sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dataDetails.length > 0 &&
          dataDetails.map((item, index) => {
            return (
              // <a href={`/rooms/${item?.id}`} target="_blank">
              <Cards
                key={index}
                data={{
                  id: item?.id,
                  key: index,
                  status: item?.status,
                  serviceName: item?.serviceName,
                  price: item?.price,
                }}
                events={{
                  onClick: events.handleClick,
                }}
              />
              // </a>
            );
          })}
      </div>
      <Modal
        title={"Үйлчилгээ авах форм"}
        centered
        open={data?.modal?.modalState}
        onCancel={() => events.handleCloseModal()}
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {/* {data?.modal?.modalData} */}
        <ServiceForm
          data={data?.modal?.modalData}
          employee_list={data?.employee_list}
          events={events}
        />
        {/* <Vote data={data} events={events} tr={tr} /> */}
      </Modal>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const service = useService();
  const order = useOrder();
  const employee = useEmployee();
  const [modal, setModal] = useState({ modalState: false, modalData: "" });
  useEffect(() => {
    service.loadAllServices();
    employee.loadAllEmployees();
    console.log("presentation");
  }, []);

  const handleOnClick = (value, serviceName, price) => {
    // console.log("handleOnClick", value, serviceName, price);
    setModal(true);
    setModal({
      ...modal,
      modalState: true,
      modalData: { id: value, name: serviceName, price: price },
    });
  };
  const handleCloseModal = () => {
    setModal({
      ...modal,
      modalState: false,
    });
  };
  const handleOnFinish = (values) => {
    handleCloseModal();
    order.createOrder(
      values?.userId,
      values?.serviceId,
      values?.employeeId,
      values?.ognoo.format("YYYY/MM/DD"),
      values?.time.format("HH:00")
    );
    // console.log("handleOnFinish", values?.date.format("YYYY/MM/DD"));
    // console.log("handleOnFinish", values?.date.format("YYYY/MM/DD"));
  };
  return (
    <React.Fragment>
      <h1
        className="mb-2 pt-4"
        style={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        Үйлчилгээнүүд
      </h1>
      <DataDisplayer
        error={service?.state?.message}
        status={service?.state?.status}
        data={{
          service_list: service?.state?.list,
          modal: modal,
          employee_list: employee?.state?.list,
        }}
        render={render}
        // tr={t}
        events={{
          handleClick: handleOnClick,
          handleCloseModal: handleCloseModal,
          handleOnFinish: handleOnFinish,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
