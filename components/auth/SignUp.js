import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Form, Input, Select, Modal } from "antd";

const SignUp = ({ data, events, tr }) => {
  const [form] = Form.useForm();

  const router = useRouter();

  useEffect(() => {
    form.setFieldsValue({
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      password: null,
    });
  }, []);
  const handleFinish = (values) => {
    // console.log("values", values);
    events.handleClick(values);
  };

  const defaultValues = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    password: null,
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultValues}
      wrapperCol={{ flex: 1 }}
      onFinish={handleFinish}
      className=".border-[#e28743] .bg-[#e28743]"
      // style={{
      //   backgroundColor: "#e28743",
      // }}
      // onValuesChange={handleChange}
    >
      <Form.Item name="firstName" label="Нэр">
        <Input placeholder="Нэрээ оруулна уу." />
      </Form.Item>
      <Form.Item name="lastName" label="Овог">
        <Input placeholder="Овогоо оруулна уу." />
      </Form.Item>
      <Form.Item className="mb-[-7px]. " label="И-мэйл хаяг" name="email">
        <Input type="email" placeholder={`И-мэйл хаягаа оруулна уу.`} />
      </Form.Item>

      <Form.Item name="phone" label="Утасны дугаар">
        <Input
          maxLength={8}
          type="phone"
          placeholder="Утасны дугаараа оруулна уу."
        />
      </Form.Item>
      <Form.Item
        name="password"
        // className="mb-[-7px]"
        label={<div>Нууц үг</div>}
      >
        <Input.Password type="password" placeholder="Нууц үгээ оруулна уу." />
      </Form.Item>
      <div className="justify-content-between flex">
        <Form.Item className="pt-2 text-left">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#0F285F] text-white hover:bg-cyan-800 hover:text-white"
          >
            <div className="hover:text-white">Бүртгүүлэх</div>
          </Button>
        </Form.Item>
        <Form.Item className="pt-2 text-right text-[#0F285F] ">
          <Button
            onClick={() => router.back()}
            type="link"
            className="text-base font-medium text-[#0F285F]"
          >
            Буцах
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SignUp;
