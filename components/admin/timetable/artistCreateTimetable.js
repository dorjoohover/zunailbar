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
const serviceForm = ({
  data,
  artist_list,
  timetable_list,
  artistsByService,
  events,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      artistId: data?.artistId,
      date: null,
      startTime: null,
      endTime: null,
    });
  }, []);

  const artistList2 = [];
  data?.employeeList.map((item, index) => {
    artistList2.push({ value: item?.id, label: item?.firstName });
  });

  const handleFormFinish = (values) => {
    console.log("values", values);
    events.createArtistTimetable(values);
    form.setFieldsValue({
      artistId: null,
      date: null,
      startTime: null,
      endTime: null,
    });
  };

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
            disabled
            // options={artistList}
          />
        </Form.Item>
        <Form.Item
          label="Огноо нэр сонгох"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
        >
          <DatePicker
          // onChange={handleDateChangeArtist}
          // disabled={!selectedArtist}
          />
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
