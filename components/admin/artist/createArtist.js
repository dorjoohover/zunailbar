import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo)
// }

const { TextArea } = Input;
const App = ({ data, events }) => {
  const Type = data?.func;

  const onFinish = (values) => {
    // console.log("values", values);
    events.handleCreateEmployee(values);
    events.handleCancel();
  };
  // const status = [
  //   { value: 9, label: "хэрэглэгч" },
  //   { value: 1, label: "ажилчин" },
  // ];
  // const users = [];
  // data?.userList.map((item, index) => {
  //   users.push({ value: item?.id, label: item?.title_name });
  // });
  const [form] = Form.useForm();
  const defaultValues = {
    status: 9,
    branchId: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    jobStartDate: "",
    jobEndDate: "",
    password: "",
  };

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);
  return (
    <Form
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={defaultValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Төлөв" name="status" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Салбар" name="branchId" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label="Овог"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Та lastName аа оруулна уу.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Нэр"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Та firstName аа оруулна уу.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="И-майл"
        name="email"
        rules={[
          {
            required: true,
            message: "Та email аа оруулна уу.",
          },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Утас"
        name="phone"
        rules={[
          {
            required: true,
            message: "Та phone оруулна уу !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Ажилж эхэлсэн огноо" name="jobStartDate">
        <Input />
      </Form.Item>
      <Form.Item label="Ажлаас гарсан огноо" name="jobEndDate">
        <Input />
      </Form.Item>
      <Form.Item label="Зураг" name="image">
        <Input />
      </Form.Item>
      <Form.Item
        label="Нууц үг"
        name="password"
        rules={[
          {
            required: true,
            message: "Та password оруулна уу !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button htmlType="submit">Нэмэх</Button>
      </Form.Item>
    </Form>
  );
};
export default App;
