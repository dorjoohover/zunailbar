import React, { createContext, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { message } from "antd";
import { isValidToken, setSession } from "../utils/jwt.js";

const ArtistContext = createContext();

const initialState = {
  status: "",
  message: "",
  modal: false,
  detail: {},
  list: [],
  artistsByService: [],
};

message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
  style: "fontSize:20px",
});

const ArtistProvider = (props) => {
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
  //
  //
  //
  const signIn = async ({ email, password, route }) => {
    // console.log(email, password);
    setState({
      ...state,
      status: "loading",
      message: "loading",
    });

    var config = {
      url: `/artists/login`,
      method: "post",
      data: {
        email: email,
        password: password,
      },
    };
    LoadingFun();
    try {
      const response = await axios(config);
      const { data, accessToken } = response?.data;
      var detail = JSON.stringify(data);
      // console.log(first)
      var auth_detail = {
        detail: data,
        token: accessToken,
        isAuthenticated: isValidToken(accessToken),
      };
      // console.log(auth_detail)
      localStorage.setItem("beauty_detail", detail);

      setSession(accessToken);
      setState({
        ...state,
        status: "success",
        ...auth_detail,
      });
      message.success(
        <div className="text-[20px]">Та амжилттай нэвтэрлээ</div>
      );
      router.push("/artist");
      //   DeleteMess();
    } catch (err) {
      console.log("err", err);
      if (err?.message === "customer_confirm_error") {
        setState({
          ...state,
          status: "error",
        });
        DeleteMess();
      } else {
        console.log("else");
        setState({
          ...state,
          status: "error",
          message: err?.message,
        });
        DeleteMess();
        message.error(<div className="text-[20px]">{err?.message}</div>);
      }
    }
  };
  //
  //
  //
  const loadAllArtist = async () => {
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

  const loadArtistByService = async (serviceId) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/artist_services/${serviceId}`,
      method: "get",
      data: {},
    };

    try {
      // console.log("config", config);
      var response = await axios(config);
      // console.log("response", response);
      const { data } = response.data;
      console.log("data", data);
      setState({
        ...state,
        status: "success",
        artistsByService: data,
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

  const CreateArtist = async (value) => {
    // let body = { value };
    // console.log("body", body);
    setState({
      ...state,
      status: "loading",
      message: "",
    });
    // console.log(body)

    var config = {
      url: "/artists",
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
  const UpdateArtist = async ({
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
      url: `/artists/${id}`,
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

  const DeleteArtist = async (value) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/artists/${value}`,
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
    <ArtistContext.Provider
      value={{
        state,
        contextHolder,
        signIn,
        loadAllArtist,
        loadArtistByService,
        CreateArtist,
        UpdateArtist,
        DeleteArtist,
      }}
    >
      {props.children}
    </ArtistContext.Provider>
  );
};

export { ArtistContext, ArtistProvider };
