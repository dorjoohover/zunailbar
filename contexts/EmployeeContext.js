import React, { createContext, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { message } from "antd";

const EmployeeContext = createContext();

const initialState = {
  status: "",
  message: "",
  modal: false,
  detail: {},
  list: [],
};

message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
  style: "fontSize:20px",
});

const EmployeeProvider = (props) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const LoadingFun = () => {
    var config20 = {
      className: "text-[16px]   ",
      duration: 0.7,
      content: "message_loading",
    };
    message.loading(<div className="text-[20px]">message_loading</div>);
  };

  const DeleteMess = () => {
    messageApi.destroy();
  };
  const loadAllEmployees = async () => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/artists",
      method: "get",
      data: {},
    };

    try {
      // console.log("config", config);
      var response = await axios(config);
      // console.log("response", response);
      const { data } = response.data;
      // console.log("data", data);
      setState({
        ...state,
        status: "success",
        list: data,
        message: "",
      });
    } catch (err) {
      console.log("err", err);
      if (err?.statusCode === 409) {
        // router.push("/");
      }

      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
    }
  };

  const CreateEmployees = async (value) => {
    // let body = { value };
    // console.log("body", body);
    setState({
      ...state,
      status: "loading",
      message: "",
    });
    // console.log(body)

    var config = {
      url: "/employee",
      method: "post",
      data: {
        ...value,
      },
    };
    LoadingFun();
    try {
      var response = await axios(config);
      const { data } = response.data;
      setState({
        ...state,
        status: "success",
      });
      message.success("Ажилчин амжилттай үүслээ.");
      // CompanyBydetails(companyId)
      // console.log('2222')
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
      if (
        err?.message == "Your [1] permission has been denied to do this action"
      ) {
        message.error("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна.", 2);
      } else message.error(err?.message);
      DeleteMess();
    }
  };
  const UpdateEmployees = async ({
    email,
    firstName,
    lastName,
    password,
    phone,
    status,
    id,
  }) => {
    // let body = { value };
    let body = { email, firstName, lastName, password, phone, status };
    // console.log("body", body);
    setState({
      ...state,
      status: "loading",
      message: "",
    });
    // console.log(body)

    var config = {
      url: `/employee/${id}`,
      method: "put",
      data: {
        ...body,
      },
    };
    LoadingFun();
    try {
      var response = await axios(config);
      const { data } = response.data;
      setState({
        ...state,
        status: "success",
      });
      message.success("Ажилчин амжилттай шинэчлэлээ");
      // CompanyBydetails(companyId)
      // console.log('2222')
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
      if (
        err?.message == "Your [1] permission has been denied to do this action"
      ) {
        message.error("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна.", 2);
      } else message.error(err?.message);
      DeleteMess();
    }
  };

  const DeleteEmployees = async (value) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/employee/${value}`,
      method: "delete",
      // data: {
      //   ...body,
      // },
    };
    LoadingFun();
    try {
      var response = await axios(config);
      const { data } = response.data;
      setState({
        ...state,
        status: "success",
      });
      message.success("Ажилчин амжилттай устлаа");
      // success();
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
      if (
        err?.message == "Your [1] permission has been denied to do this action"
      ) {
        message.error("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна.", 2);
      } else message.error(err?.message);
      DeleteMess();
    }
  };
  return (
    <EmployeeContext.Provider
      value={{
        state,
        contextHolder,
        loadAllEmployees,
        CreateEmployees,
        UpdateEmployees,
        DeleteEmployees,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
