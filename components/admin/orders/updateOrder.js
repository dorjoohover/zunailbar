import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  DatePicker,
  TimePicker,
  Select,
  InputNumber,
} from "antd";
import moment from "moment";
const serviceForm = ({ data, events }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // console.log("values update", values);
    events.handleUpdateOrder(values);
    events.handleCancel();
  };
  useEffect(() => {
    form.setFieldsValue({
      id: data?.form?.data?.id,
      ognoo: "",
      time: "",
    });
  }, []);

  const dateFormat = "YYYY/MM/DD";
  const defaultTime = moment().hour(0).minute(0);

  // const employeeList = [];
  // data?.employeeList.map((item, index) => {
  //   employeeList.push({ value: item?.id, label: item?.firstName });
  // });
  // const serviceList = [];
  // data?.serviceList.map((item, index) => {
  //   serviceList.push({ value: item?.id, label: item?.serviceName });
  // });
  // const userList = [];
  // data?.userList.map((item, index) => {
  //   userList.push({ value: item?.id, label: item?.email });
  // });
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        // onValuesChange={events.onHandleChange}
        onFinish={onFinish}
      >
        <Form.Item hidden name="id">
          <InputNumber />
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
          <DatePicker
            format={dateFormat}
            // defaultValue={moment(data?.form?.data?.date)}
          />
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
          <TimePicker
            className="timepicker-background"
            format="HH"
            // defaultValue={moment(data?.form?.data?.time)}
          />
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
