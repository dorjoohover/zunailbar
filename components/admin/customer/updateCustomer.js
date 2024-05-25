import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo)
// }

const { TextArea } = Input;
const App = ({ data, events }) => {
  // console.log("data123", data);

  const onFinish = (values) => {
    // console.log("values", values);
    events.handleUpdateUser(values);
    events.handleCancel();
  };
  const membership = [
    { value: null, label: "Гишүүнчлэл байхгүй" },
    { value: "1", label: "Гишүүнчлэл байгаа" },
  ];
  const defaultMembership = membership[0]?.value;

  const [form] = Form.useForm();
  const defaultValues = {
    id: data?.form?.data?.id,
    status: data?.form?.data?.status,
    firstName: data?.form?.data?.firstName,
    lastName: data?.form?.data?.lastName,
    email: data?.form?.data?.email,
    phone: data?.form?.data?.phone,
    membership: defaultMembership,
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
      <Form.Item label="status" name="status" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="firstName" name="firstName">
        <Input />
      </Form.Item>
      <Form.Item label="lastName" name="lastName">
        <Input rows={""} />
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
        <Input rows={""} />
      </Form.Item>
      <Form.Item label="membership" name="membership">
        <Select options={membership} />
      </Form.Item>
      <Form.Item label="password" name="password">
        <Input rows={""} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button htmlType="submit">Өөрчлөх</Button>
      </Form.Item>
    </Form>
  );
};
export default App;
