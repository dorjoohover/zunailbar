import React, { useState, useEffect } from "react";
import { Button, Form, DatePicker, TimePicker, Select } from "antd";

const serviceForm = ({ data, events }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // console.log("values", values);
    events.getEmployeeIncome(values);
  };
  const dateFormat = "YYYY/MM/DD";
  const employeeList = [];
  data?.employeeList.map((item, index) => {
    employeeList.push({ value: item?.id, label: item?.firstName });
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
          name="employeeId"
          label="Ажилчны нэр сонгох"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          <Select style={{ width: 300 }} options={employeeList} />
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
