// system import
import React, { useEffect } from "react";
import { useRouter } from "next/router";

// global state
import useAuth from "../../../hooks/useAuth";

// design components
import MainLayout from "../../../layouts/main";
import DataDisplayer from "../../../components/displayer";
import EmployeeSignIn from "../../../components/auth/EmployeeSignIn";

const render = ({ data, events, tr }) => {
  //   console.log("data", data);
  //   const dataDetails = [...data];
  return (
    <div className="min-h-screen min-[350px]:px-12 flex items-center justify-center">
      <div className="grid grid-cols-1 bg-white p-4 rounded">
        <h1
          className="mb-2 p-4"
          style={{
            fontSize: "32px",
            fontWeight: "500",
          }}
        >
          Ажилтан нэвтрэх хэсэг
        </h1>
        <EmployeeSignIn events={events} />
      </div>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const auth = useAuth();

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
        data=""
        // error={company?.state?.message}
        // status={company?.state?.status}
        // data={company?.state?.list}
        render={render}
        // tr={t}
        events={{
          handleClick: handleOnClick,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
