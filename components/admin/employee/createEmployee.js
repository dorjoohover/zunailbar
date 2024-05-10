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
  const status = [
    { value: 9, label: "хэрэглэгч" },
    { value: 1, label: "ажилчин" },
  ];
  // const users = [];
  // data?.userList.map((item, index) => {
  //   users.push({ value: item?.id, label: item?.title_name });
  // });
  const [form] = Form.useForm();
  const defaultValues = {
    status: 9,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
      <Form.Item label="status" name="status">
        <Select
          // style={{ width: 120 }}
          // onChange={handleChange}
          options={status}
        />
      </Form.Item>
      <Form.Item
        label="firstName"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Та firstName аа оруулна уу.",
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="lastName"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Та lastName аа оруулна уу.",
          },
        ]}
      >
        <TextArea rows={""} />
      </Form.Item>
      <Form.Item
        label="email"
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
        label="phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Та phone оруулна уу !",
          },
        ]}
      >
        <TextArea rows={""} />
      </Form.Item>
      <Form.Item
        label="password"
        name="password"
        rules={[
          {
            required: true,
            message: "Та password оруулна уу !",
          },
        ]}
      >
        <TextArea rows={""} />
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
