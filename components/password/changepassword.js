import React, { useState } from "react";

import { Alert, Button, Form, Input, Image, message } from "antd";
const ChangePass = ({ data, events }) => {
  //   console.log("DATA", data);
  const handleFinish = (values) => {
    events.handleClick(values);
  };
  return (
    <Form
      onFinish={handleFinish}
      initialValues={{
        password: "",
        resetToken: data?.token,
      }}
    >
      <Form.Item name="resetToken" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        // className="mb-[-7px]"
        label="Шинэ нууц үгээ оруулна уу"
        name="password"
        // rules={[{ required: true, message: tr('form_auth_rules_email') }]}
      >
        <Input.Password placeholder="form_auth_placeholder_password" />
      </Form.Item>
      <Form.Item>
        <Button className="bg-blue-300" htmlType="submit">
          Нууц үг солих
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePass;
