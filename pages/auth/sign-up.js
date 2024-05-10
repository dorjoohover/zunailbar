// system import
import React, { useEffect } from "react";
import { useRouter } from "next/router";
// import { useTranslation } from "react-i18next";
// import packageJson from "../package.json";

// global state
import useAuth from "../../hooks/useAuth";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import SignUp from "../../components/auth/SignUp";
// import LanguagesDropdown from "../components/Navbar/LanguagesDropdown";

const render = ({ data, events, tr }) => {
  //   console.log("data", data);
  //   const dataDetails = [...data];
  return (
    <div className="min-h-screen min-[350px]:px-12 flex items-center justify-center">
      <div className="grid grid-cols-1 bg-slate-300 p-4 rounded">
        <h1
          className="mb-2 p-4"
          style={{
            fontSize: "32px",
            fontWeight: "500",
          }}
        >
          Бүртгүүлэх хэсэг
        </h1>
        <SignUp data={data} events={events} />
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
    // console.log("sign_up_values", value);
    auth.signUp(value);
    // auth.setLoggedInCompany(value.id);
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
