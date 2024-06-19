// system import
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useRouter } from "next/router";

// global state
import useAuth from "../hooks/useAuth";

// design component
import DataDisplayer from "../components/displayer";

import AuthLayout from "../layouts/Auth";
import { Alert, Button, Form, Input, Image } from "antd";

const render = ({ data, events, tr }) => {
  return (
    <div className="bg-white .dark:bg-slate-800 mt-32">
      <Helmet title="Данс нээх" />
      <h1 className="text-black font-black text-3xl my-4 text-center">
        Zu Nailbar
      </h1>
      <h1 className="text-black font-black text-2xl mt-8 mb-4 text-center">
        Баталгаажуулалт амжилттай
      </h1>
      <a href="/auth/sign-in">Нэвтэр хэсэг рүү очих</a>
      {/* <SignUp data={data} events={events} tr={tr} /> */}
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  // const { t } = useTranslation();
  const auth = useAuth();
  //   const reference = useReference();
  console.log("router?.query?", router?.query?.token);

  //   useEffect(() => {
  //     auth.confirm(router?.query?.token);
  //   }, []);
  useEffect(() => {
    if (router?.query?.token !== null) {
      auth.confirm(router?.query?.token);
    }
  }, [router?.query?.token]);

  const confirm = (values) => {
    // console.log(values);
    auth.confirm(values);
  };

  return (
    <div>
      {/* {auth?.contextHolder} */}
      <DataDisplayer
        status={auth?.state?.status}
        data={{
          token: router?.query?.token,
          // auth: auth?.state,
          //   bankList: reference?.state?.bankList,
          // countryList: reference?.state?.countryList,
        }}
        render={render}
        // tr={t}
        events={{
          confirm: confirm,
        }}
      />
    </div>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Presentation;
