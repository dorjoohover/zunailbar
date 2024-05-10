// system import
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useRouter } from "next/router";
import Reset from "../../components/password/reset";
import AuthLayout from "../../layouts/Auth";
import useAuth from "../../hooks/useAuth";
import DataDisplayer from "../../components/displayer";

const render = ({ data, events, tr }) => {
  return (
    <div>
      <Helmet title="Reset" />
      <Reset tr={tr} events={events} />
    </div>
  );
};

function Presentation() {
  const auth = useAuth();

  useEffect(() => {
    // if (!auth?.state?.loggedInCompany) {
    //   router.push("/");
    // }
  }, []);

  const handleOnClick = (values) => {
    auth.ForgotPass(values.email);
  };
  // const handleOnClick1 = (values) => {
  //   // console.log(auth)
  //   auth.ForgotPass(values.email, values.phone);
  //   console.log(values);
  // };

  return (
    <div className="min-h-[500px]">
      {auth.contextHolder}
      <DataDisplayer
        status={"success"}
        // data={{
        //   auth: auth?.state,
        // }}
        render={render}
        events={{
          handleClick: handleOnClick,
          // handleClick1: handleOnClick1,
        }}
      />
    </div>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Presentation;
