import React, { createContext, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { message } from "antd";

const BookingContext = createContext();

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
const BookingProvider = (props) => {
  const [state, setState] = useState(initialState);
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
  const createBooking = async (
    customerId,
    serviceId,
    artistId,
    prepayment,
    paymentMethod,
    date,
    startTime,
    endTime
  ) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/bookings",
      method: "post",
      data: {
        customerId: customerId,
        serviceId: serviceId,
        artistId: artistId,
        prepayment: prepayment,
        paymentMethod: paymentMethod,
        date: date,
        startTime: startTime,
        endTime: endTime,
      },
    };
    try {
      console.log("config", config);
      var response = await axios(config);
      // console.log("response", response);
      const { data } = response.data;
      // console.log("data", data);
      setState({
        ...state,
        status: "success",
        // list: data,
        message: "",
      });
      message.success(
        <div className="text-[20px]">Та амжилттай захиалга хийлээ.</div>
      );
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
      DeleteMess();
      message.error(<div className="text-[20px]">{err?.message}</div>);
    }
  };

  const getAllOrders = async () => {
    // console.log("worked");
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/bookings",
      method: "get",
      data: {},
    };

    try {
      var response = await axios(config);
      //   console.log("response", response);
      const { data } = response.data;
      // console.log("data orders", data);
      setState({
        ...state,
        status: "success",
        list: data,
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

  const getEmployeeOrders = async (employeeId) => {
    // console.log("worked");
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/orders/getOrdersByEmployeeId/${employeeId}`,
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
        list: data,
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

  const UpdateOrder = async (value) => {
    let body = { value };
    // let body = { ognoo, time };
    // console.log("body", body);
    setState({
      ...state,
      status: "loading",
      message: "",
    });
    // console.log(body);

    var config = {
      url: `/bookings/${value.id}`,
      method: "post",
      data: {
        ...body,
      },
    };
    // console.log(config);
    LoadingFun();
    try {
      var response = await axios(config);
      const { data } = response.data;
      setState({
        ...state,
        status: "success",
      });
      message.success("Захиалга амжилттай шинэчлэлээ");
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

  const DeleteOrder = async (value) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/bookings/${value}`,
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
      message.success("Захиалга амжилттай устлаа");
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
    <BookingContext.Provider
      value={{
        state,
        contextHolder,
        createBooking,
        getAllOrders,
        getEmployeeOrders,
        UpdateOrder,
        DeleteOrder,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingProvider };
