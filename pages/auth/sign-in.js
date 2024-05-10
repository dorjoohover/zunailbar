// system import
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// global state
import useAuth from "../../hooks/useAuth";

// design components
import { Alert, Button, Form, Input, Select, Modal } from "antd";
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import SignIn from "../../components/auth/SignIn";
import ConfirmForm from "../../components/auth/confirmForm";

const render = ({ data, events, tr }) => {
  //   console.log("data", data);
  //   const dataDetails = [...data];
  return (
    <div className="min-h-screen min-[350px]:px-12 flex items-center justify-center">
      <div className="grid grid-cols-1 bg-white p-4 rounded">
        <Modal
          okButtonProps={{ style: { display: "none" } }}
          title={"Баталгаажуулалт байхгүй байна"}
          open={data?.auth?.isModalOpen}
          onCancel={() => {
            events.handleCancel();
          }}
          // cancelText={"Хаах"}
        >
          <Alert
            // message="Warning Text"
            className="text-center. mb-5 mt-10 text-[16px]"
            description="Та и-мэйл ээ баталгаажуулснаар нэвтрэх эрхтэй болно"
            type="warning"
          />
        </Modal>
        <Modal
          // className="bg-gray-300"
          title="Бүртгэл баталгаажуулалт"
          open={data.visible}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={events.handleCancelConfirm}
        >
          <ConfirmForm data={data} events={events} tr={tr} />
          {/* modal test */}
        </Modal>
        <h1
          className="mb-2 p-4"
          style={{
            fontSize: "32px",
            fontWeight: "500",
          }}
        >
          Нэвтрэх хэсэг
        </h1>
        <SignIn events={events} />
        <div className="">
          {/* <Form.Item className=""> */}
          {/* <Link href=""> */}
          <Button
            onClick={events.showModal}
            className="font-semibold text-[#0F285F]  underline-offset-1 "
          >
            Бүртгэлээ баталгаажуулах
          </Button>
          {/* </Link> */}
          {/* </Form.Item> */}
        </div>
      </div>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const auth = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // company.loadListAPI();
  }, []);

  const handleOnClick = (value) => {
    // console.log("clicked");
    auth.signIn(value);
    // company.SetLogo(value.logo);
    // auth?.eventFun();
    // router.push("/auth/login");
  };
  const handleCancel = () => {
    auth?.handleCancel();
  };
  const handleCancelConfirm = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleGetConfirm = (values) => {
    // console.log(values);
    auth.handleGetConfirm(values);
  };
  return (
    <React.Fragment>
      {/* <h1
        className="mb-2 pt-4"
        style={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        Нэвтрэх хэсэг
      </h1> */}
      <DataDisplayer
        error=""
        status="success"
        // error={company?.state?.message}
        // status={company?.state?.status}
        data={{
          auth: auth?.state,
          visible: visible,
          // token: getJsonWebToken(),
        }}
        render={render}
        // tr={t}
        events={{
          handleClick: handleOnClick,
          handleCancel: handleCancel,
          handleCancelConfirm: handleCancelConfirm,
          showModal: showModal,
          handleGetConfirm: handleGetConfirm,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
