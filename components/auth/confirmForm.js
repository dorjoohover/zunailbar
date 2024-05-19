import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Form, Input, Select, Modal } from "antd";
import Link from "next/link";

const SignUp = ({ data, events }) => {
  // const [form] = Form.useForm();

  const router = useRouter();
  // const [visible, setVisible] = useState("email");
  // var visible="email"

  useEffect(() => {
    // form.setFieldsValue({
    //   email: null,
    //   password: null,
    // });
  }, []);
  const handleFinish = (values) => {
    // console.log("values", values);
    events.handleGetConfirm(values);
  };
  // function handleChange(value) {
  //   // console.log(`Selected ${value}`);
  //   // console.log("visible", visible);
  //   if (value === "email") {
  //     setVisible("email");
  //     //   console.log("visible email", visible);
  //   } else if (value === "phone") {
  //     setVisible("phone");
  //     //   console.log("visible", visible);
  //   }
  // }
  const defaultValues = {
    type: "email",
    email: null,
    phone: null,
  };
  return (
    <Form
      // form={form}
      layout="vertical"
      initialValues={defaultValues}
      wrapperCol={{ flex: 1 }}
      onFinish={handleFinish}
      // onValuesChange={handleChange}
    >
      <Form.Item className="hidden" label="Баталгаажуулах төрөл" name="type">
        <Input
          // type="type"
          // placeholder="Бүртгүүлсэн и-мэйл хаягаа оруулна уу."
          value="email"
        />
        {/* <Select
          //   defaultValue="email"
          style={{ width: 200 }}
          onChange={handleChange}
        >
          <Option value="email">Э-майлээр</Option>
          <Option value="phone">Утасны дугаараар</Option>
        </Select> */}
      </Form.Item>
      <Form.Item className="mb-[-7px]" label="И-мэйл хаяг" name="email">
        <Input
          type="email"
          placeholder="Бүртгүүлсэн и-мэйл хаягаа оруулна уу."
        />
      </Form.Item>
      {/* {visible === "email" && (
        <Form.Item className="mb-[-7px]" label="И-мэйл хаяг" name="email">
          <Input
            type="email"
            placeholder="Бүртгүүлсэн и-мэйл хаягаа оруулна уу."
          />
        </Form.Item>
      )}
      {visible === "phone" && (
        <Form.Item className="mb-[-7px]" label="Утасны дугаар" name="phone">
          <Input type="phone" placeholder="Утасны дугаар оруулна уу." />
        </Form.Item>
      )} */}
      {/* <Form.Item className="mb-[-7px]. " label="И-мэйл хаяг" name="email">
        <Input type="email" placeholder={`И-мэйл хаягаа оруулна уу.`} />
      </Form.Item>

      <Form.Item className="mb-[-7px]. " label="Утасны дугаар" name="phone">
        <Input type="phone" placeholder={`Утасны дугаар оруулна уу.`} />
      </Form.Item> */}
      {/* <Form.Item name="password" label={<div>Нууц үг</div>}>
        <Input.Password type="password" placeholder="Нууц үгээ оруулна уу." />
      </Form.Item> */}
      <div className="justify-content-between flex mt-5">
        <Form.Item className="pt-2 text-left">
          <Button
            type="primary"
            htmlType="submit"
            // className="bg-[#0F285F] text-white hover:bg-cyan-800 hover:text-white rounded-md mx-6"
            className="bg-blue-900 text-white"
          >
            <div className="hover:text-white">баталгаажуулах линк явуулах</div>
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SignUp;
