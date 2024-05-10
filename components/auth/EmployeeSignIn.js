import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Form, Input, Select, Modal } from "antd";
import Link from "next/link";

const SignUp = ({ data, events, tr }) => {
  const [form] = Form.useForm();

  const router = useRouter();

  useEffect(() => {
    form.setFieldsValue({
      email: null,
      password: null,
      route: "/employee",
    });
  }, []);
  const handleFinish = (values) => {
    // console.log("values", values);
    events.handleClick(values);
  };

  const defaultValues = {
    email: null,
    password: null,
    route: "/employee",
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultValues}
      wrapperCol={{ flex: 1 }}
      onFinish={handleFinish}
      // onValuesChange={handleChange}
    >
      {/* <Form.Item name="name" label="Нэр">
        <Input />
      </Form.Item> */}
      <Form.Item className="mb-[-7px]. " label="И-мэйл хаяг" name="email">
        <Input type="email" placeholder={`И-мэйл хаягаа оруулна уу.`} />
      </Form.Item>

      {/* <Form.Item name="phone" label="Утасны дугаар">
        <Input maxLength={8} type="phone" />
      </Form.Item> */}
      <Form.Item
        name="password"
        // className="mb-[-7px]"
        label={<div>Нууц үг</div>}
      >
        <Input.Password type="password" placeholder="Нууц үгээ оруулна уу." />
      </Form.Item>
      <Form.Item name="route" className="hidden">
        <Input />
      </Form.Item>
      <div className="flex">
        <div className="relative right-4 flex mx-6">
          <Form.Item className="">
            <Link href="/auth/reset">
              <Button
                type="link"
                className="text-gray-400 underline-offset-1  "
              >
                Нууц сэргээх
              </Button>
            </Link>
          </Form.Item>
        </div>
        <div className="relative right-4 flex ">
          <Form.Item className="">
            <Link href="/auth/sign-up">
              <Button
                type="link"
                className="font-semibold text-[#0F285F]  underline-offset-1 "
              >
                Бүртгүүлэх
              </Button>
            </Link>
          </Form.Item>
        </div>
      </div>
      <div className="justify-content-between flex">
        <Form.Item className="pt-2 text-left">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#0F285F] text-white hover:bg-cyan-800 hover:text-white rounded-md mx-6"
          >
            <div className="hover:text-white">Нэвтрэх</div>
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
