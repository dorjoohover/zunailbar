import React, { useState, useEffect } from "react";
import {
  Button,
  Steps,
  Form,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
// import dayjs from "dayjs";
// import styles from "./CustomTimePicker.module.css";
import moment from "moment";
const { TextArea } = Input;
const serviceForm = ({ data, artist_list, just_service_list, events }) => {
  //   console.log(data);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      customerId: initialData?.customer?.id,
      artistId: data?.artistId,
      ratingPoint: null,
      ratingComment: null,
    });
  }, [data?.artistId]);
  const detail = localStorage.getItem("beauty_detail");
  const initialData1 = detail === "undefined" ? null : detail;
  var initialData = initialData1 === null ? {} : JSON.parse(initialData1);

  const artistList = [];
  //   artist_list.map((item, index) => {
  //     artistList.push({ value: item?.id, label: item?.firstName });
  //   });
  //   const checkArtistId = (ArtistId) => {
  artist_list.map((item, index) => {
    if (data?.artistId == item.id) {
      // return item.firstName;
      artistList.push({ value: item?.id, label: item?.firstName });
    }
  });

  const checkServiceId = (ServiceId) => {
    var one = "";
    just_service_list.forEach((element) => {
      if (element?.id === ServiceId) {
        // userSet.push(userId);
        one = element?.serviceName;
      }
    });
    return one;
  };

  const handleFormFinish = (values) => {
    events.handleOnFinish(values);
    // setSelectedDate(null);
  };

  const handleSelectChange = (value) => {
    // Call loadTimeTable function with the selected value
    // events.loadTimeTable(value);
  };
  const ratingPoints = [
    {
      value: 1,
      label: "1 оноо",
    },
    { value: 2, label: "2 оноо" },
    { value: 3, label: "3 оноо" },
    { value: 4, label: "4 оноо" },
    {
      value: 5,
      label: "5 оноо",
    },
  ];
  return (
    <div>
      <div className="text-[18px] font-semibold ">
        Үйлчилгээний нэр: {checkServiceId(data?.serviceId)}
      </div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        // onFinish={events.handleOnFinish}
        onFinish={handleFormFinish}
      >
        {/* <Form.Item name="serviceId" hidden>
          <InputNumber />
        </Form.Item> */}
        <Form.Item name="customerId" hidden>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Ажилчны нэр"
          name="artistId"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          {/* <InputNumber /> */}

          <Select
            // onChange={handleSelectChange}
            style={{ width: 300 }}
            options={artistList}
            // options={artistList}
            // disabled
          />
        </Form.Item>
        <Form.Item
          label="Үнэлгээ"
          name="ratingPoint"
          rules={[
            {
              required: true,
              message: "Please select a ratingPoint!",
            },
          ]}
        >
          <Select
            onChange={handleSelectChange}
            style={{ width: 300 }}
            // options={{}}
            options={ratingPoints}
          />
        </Form.Item>
        <Form.Item name="ratingComment" label="Коммент">
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-[#0F285F]"
            type="primary"
            htmlType="submit"
            // disabled={data?.maxSharesError}
          >
            Захиалга өгөх
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default serviceForm;
