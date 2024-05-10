import React, { useState, useEffect } from "react";
import { Button, Form, DatePicker, TimePicker, Select, Input } from "antd";
import moment from "moment";
const serviceForm = ({ data, events }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      serviceId: null,
      userId: null,
      time: null,
      ognoo: null,
      employeeId: initialData?.employee?.id,
    });
  }, [data?.id]);
  const detail = localStorage.getItem("beauty_detail");
  const initialData1 = detail === "undefined" ? null : detail;
  var initialData = initialData1 === null ? {} : JSON.parse(initialData1);
  const onFinish = (values) => {
    // console.log("values", values);
    events.handleCreateOrder(values);
    events.handleCancel();
  };
  // useEffect(() => {
  //   form.setFieldsValue({
  //     userId: initialData?.user?.id,
  //     serviceId: data?.id,
  //   });
  // }, [data?.id]);

  const dateFormat = "YYYY/MM/DD";
  const defaultTime = moment().hour(0).minute(0);

  const employeeList = [];
  data?.employeeList.map((item, index) => {
    employeeList.push({ value: item?.id, label: item?.firstName });
  });
  const serviceList = [];
  data?.serviceList.map((item, index) => {
    serviceList.push({ value: item?.id, label: item?.serviceName });
  });
  const userList = [];
  data?.userList.map((item, index) => {
    userList.push({ value: item?.id, label: item?.email });
  });
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        // onValuesChange={events.onHandleChange}
        onFinish={onFinish}
      >
        <Form.Item
          name="serviceId"
          label="Үйлчилгээний нэр"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          <Select style={{ width: 300 }} options={serviceList} />
        </Form.Item>
        <Form.Item
          name="userId"
          label="Хэрэглэгчийн email"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          <Select style={{ width: 300 }} options={userList} />
        </Form.Item>
        <Form.Item
          className="hidden"
          name="employeeId"
          label="Ажилчны id"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Огноо нэр сонгох"
          name="ognoo"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="Цаг сонгох"
          name="time"
          rules={[
            {
              required: true,
              message: "Please select a time!",
            },
          ]}
        >
          <TimePicker className="timepicker-background" format="HH" />
        </Form.Item>
        <Form.Item>
          <Button className="bg-[#0F285F]" type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default serviceForm;
