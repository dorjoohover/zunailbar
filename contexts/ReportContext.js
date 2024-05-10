import React, { createContext, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { message } from "antd";

const ReportContext = createContext();

const initialState = {
  status: "",
  message: "",
  modal: false,
  detail: {},
  orlogo: "",
  list: [],
  list2: [],
  list3: [],
  list4: [],
};
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
  style: "fontSize:20px",
});
const ReportProvider = (props) => {
  const [state, setState] = useState(initialState);
  const [state2, setState2] = useState(null);
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();
  const DeleteMess = () => {
    messageApi.destroy();
  };
  const LoadingFun = () => {
    var config20 = {
      className: "text-[16px]   ",
      duration: 0.7,
      content: "message_loading",
    };
    message.loading(<div className="text-[20px]">message_loading</div>);
  };

  const getTotalIncome = async ({ startDate, endDate }) => {
    // console.log("worked");
    let body = { startDate, endDate };
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/report/getTotalIncome",
      method: "post",
      data: {
        ...body,
      },
    };
    // console.log("config", config);
    try {
      var response = await axios(config);
      //   console.log("response", response);
      const { data } = response;
      console.log("orlogo", data);
      // setState({
      //   ...state,
      //   status: "success",
      //   list: data,
      //   message: "",
      // });
      setState2(data);
      // }
    } catch (err) {
      console.log("err", err);
      if (err?.statusCode === 409) {
        router.push("/");
      }

      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
    }
  };

  const getEmployeeIncome = async ({ employeeId, startDate, endDate }) => {
    // console.log("worked");
    let body = { startDate, endDate };
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/report/getEmployeeIncome/${employeeId}`,
      method: "post",
      data: {
        ...body,
      },
    };

    try {
      var response = await axios(config);
      //   console.log("response", response);
      const { data } = response;
      // console.log("data orders", data);
      setState({
        ...state,
        status: "success",
        list2: data,
        message: "",
      });
      // }
    } catch (err) {
      console.log("err", err);
      if (err?.statusCode === 409) {
        router.push("/");
      }

      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
    }
  };
  const getServiceIncome = async ({ serviceId, startDate, endDate }) => {
    // console.log("serviceId", serviceId);
    let body = { startDate, endDate };
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/report/getServiceIncome/${serviceId}`,
      method: "post",
      data: {
        ...body,
      },
    };

    try {
      var response = await axios(config);
      //   console.log("response", response);
      const { data } = response;
      // console.log("data orders", data);
      setState({
        ...state,
        status: "success",
        list3: data,
        message: "",
      });
      // }
    } catch (err) {
      console.log("err", err);
      if (err?.statusCode === 409) {
        router.push("/");
      }

      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
    }
  };

  const getAttendance = async () => {
    // console.log("worked");
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/report/getAttendance",
      method: "get",
      data: {},
    };

    try {
      var response = await axios(config);
      //   console.log("response", response);
      const { data } = response;
      // console.log("data orders", data);
      setState({
        ...state,
        status: "success",
        list4: data,
        message: "",
      });
      // }
    } catch (err) {
      console.log("err", err);
      if (err?.statusCode === 409) {
        router.push("/");
      }

      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
    }
  };

  return (
    <ReportContext.Provider
      value={{
        state,
        state2,
        contextHolder,
        getTotalIncome,
        getEmployeeIncome,
        getServiceIncome,
        getAttendance,
      }}
    >
      {props.children}
    </ReportContext.Provider>
  );
};

export { ReportContext, ReportProvider };
