import React, { useState, useEffect } from "react";
import { Button, Form, DatePicker, TimePicker, Select } from "antd";

const serviceForm = ({ data, events }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // console.log("values", values);
    events.getServiceIncome(values);
  };

  const dateFormat = "YYYY/MM/DD";
  const serviceList = [];
  data?.serviceList.map((item, index) => {
    serviceList.push({ value: item?.id, label: item?.serviceName });
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
          label="Эхлэх огноо сонгох"
          name="startDate"
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
          label="Дуусах огноо сонгох"
          name="endDate"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
        >
          <DatePicker format={dateFormat} />
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
