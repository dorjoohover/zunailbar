import React, { useState } from "react";

import { Alert, Button, Form, Input, Image, Radio } from "antd";
// import { Alert, Button, Form, Input, Radio } from "antd";
import Link from "next/link";

const Reset = ({ data, events }) => {
  const handleFinish = (values) => {
    events.handleClick(values);
  };
  return (
    <div>
      {/* <div className="my-4">{tr("auth_reset_type")}</div> */}
      <Form onFinish={handleFinish}>
        <span className="py-2 font-semibold">Нүүц үг солих И-майл</span>
        <Form.Item
          className="mt-2"
          // label={tr("auth_reset_email")}
          name="email"
          rules={[{ required: true, message: "email" }]}
        >
          <Input
            //   onChange={TypeEmail}
            //   status={email}
            //   className="relative bottom-[34px] ml-[48%] mr-2 w-[50%]"
            type="email"
            placeholder="email"
          />
        </Form.Item>
        <Form.Item>
          <Button className="bg-blue-300" htmlType="submit">
            Нүүг үг солих
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Reset;
