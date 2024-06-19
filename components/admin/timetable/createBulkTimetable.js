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
  Checkbox, // Import Checkbox
} from "antd";
// import dayjs from "dayjs";
// import styles from "./CustomTimePicker.module.css";
import moment from "moment";

const serviceForm = ({ data, events }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      artistId: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      days: [],
    });
  }, []);

  const artistList2 = [];
  data?.employeeList.map((item, index) => {
    artistList2.push({ value: item?.id, label: item?.firstName });
  });

  const handleFormFinish = (values) => {
    console.log("values", values);
    events.createArtistBulkTimetable(values);
    form.setFieldsValue({
      artistId: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      days: [],
    });
  };

  const dayOptions = [
    { label: "1 дэхь", value: 1 },
    { label: "2 дэхь", value: 2 },
    { label: "3 дэхь", value: 3 },
    { label: "4 дэхь", value: 4 },
    { label: "5 дэхь", value: 5 },
    { label: "6 дэхь", value: 6 },
    { label: "7 дэхь", value: 7 },
  ];

  return (
    <div>
      <div className="text-[18px] font-semibold">
        Үйлчилгээний нэр: {data?.name}
      </div>
      <div className="text-[18px] font-semibold">Үнэ: {data?.price}</div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        onFinish={handleFormFinish}
      >
        <Form.Item
          label="Ажилчны нэр сонгох"
          name="artistId"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          <Select
            // onChange={handleSelectChange}
            style={{ width: 300 }}
            options={artistList2}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Эхлэх огноо сонгох"
          name="startDate"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Дуусах огноо сонгох"
          name="endDate"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Цаг сонгох"
          name="startTime"
          rules={[
            {
              required: true,
              message: "Please select a time!",
            },
          ]}
        >
          <TimePicker format="HH" />
        </Form.Item>
        <Form.Item
          label="Цаг сонгох"
          name="endTime"
          rules={[
            {
              required: true,
              message: "Please select a time!",
            },
          ]}
        >
          <TimePicker format="HH" />
        </Form.Item>
        <Form.Item
          label="Өдрийн дугаар сонгох"
          name="days"
          rules={[
            {
              required: true,
              message: "Please select at least one day!",
            },
          ]}
        >
          <Checkbox.Group options={dayOptions} />
        </Form.Item>
        {/* submit button */}
        <Form.Item>
          <Button className="bg-[#0F285F]" type="primary" htmlType="submit">
            Захиалга өгөх
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default serviceForm;
