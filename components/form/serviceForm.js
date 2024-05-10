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
import dayjs from "dayjs";
import styles from "./CustomTimePicker.module.css";
import moment from "moment";
const serviceForm = ({ data, employee_list, events }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      userId: initialData?.user?.id,
      serviceId: data?.id,
    });
  }, [data?.id]);
  const detail = localStorage.getItem("beauty_detail");
  const initialData1 = detail === "undefined" ? null : detail;
  var initialData = initialData1 === null ? {} : JSON.parse(initialData1);
  //   const handleFormFinish = () => {
  //     events.handleCloseModal();
  //     form.submit();
  //   };

  const dateFormat = "YYYY/MM/DD";
  const defaultTime = moment().hour(0).minute(0);

  const employeeList = [];
  employee_list.map((item, index) => {
    employeeList.push({ value: item?.id, label: item?.firstName });
  });
  const today = moment();
  return (
    <div>
      <div className="text-[18px] font-semibold ">
        Үйлчилгээний нэр: {data?.name}
      </div>
      <div className="text-[18px] font-semibold">Үнэ: {data?.price}</div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        // onValuesChange={events.onHandleChange}
        onFinish={events.handleOnFinish}
      >
        <Form.Item name="serviceId" hidden>
          <InputNumber />
        </Form.Item>
        <Form.Item name="userId" hidden>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Ажилчны нэр сонгох"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          {/* <InputNumber />
           */}
          <Select style={{ width: 300 }} options={employeeList} />
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
            disabledDate={(current) =>
              current && current < today.startOf("day")
            }
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
          <TimePicker className="timepicker-background" format="HH" />
        </Form.Item>
        {/* submit button */}
        <Form.Item>
          <Button
            className="bg-[#0F285F]"
            type="primary"
            htmlType="submit"
            // disabled={data?.maxSharesError}
          >
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default serviceForm;
