// system import
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ChangePass from "../components/password/changepassword";
import AuthLayout from "../layouts/Auth";
import useAuth from "../hooks/useAuth";
import DataDisplayer from "../components/displayer";
import { useRouter } from "next/router";

const render = ({ data, events, tr }) => {
  return (
    <div>
      <Helmet title="Reset" />
      <ChangePass tr={tr} events={events} data={data} />
    </div>
  );
};

function Presentation() {
  const auth = useAuth();
  const router = useRouter();
  // console.log("TOKEN", router.query);
  useEffect(() => {
    // if (!auth?.state?.loggedInCompany) {
    //   router.push("/");
    // }
  }, []);

  const handleOnClick = (values) => {
    // console.log("values", values);
    auth.ChangePass(values.password, values.resetToken);
  };

  return (
    <div>
      <DataDisplayer
        status={router?.query?.token && "success"}
        data={{
          token: router?.query?.token,
        }}
        render={render}
        events={{
          handleClick: handleOnClick,
        }}
      />
    </div>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Presentation;
