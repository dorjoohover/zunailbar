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
    events.handleUpdateEmployee(values);
    events.handleCancel();
  };
  const status = [
    { value: 9, label: "хэрэглэгч" },
    { value: 1, label: "ажилчин" },
  ];

  const [form] = Form.useForm();
  const defaultValues = {
    id: data?.form?.data?.id,
    status: data?.form?.data?.status,
    firstName: data?.form?.data?.firstName,
    lastName: data?.form?.data?.lastName,
    email: data?.form?.data?.email,
    phone: data?.form?.data?.phone,
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
      <Form.Item hidden name="id">
        <InputNumber />
      </Form.Item>
      <Form.Item label="status" name="status">
        <Select options={status} />
      </Form.Item>
      <Form.Item
        label="firstName"
        name="firstName"
        // defaultValue={data?.form?.data?.item_name}
        rules={[
          {
            required: true,
            message: "Та firstName аа оруулна уу.",
          },
        ]}
      >
        <TextArea rows={""} />
      </Form.Item>

      <Form.Item
        label="lastName"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Та lastName оруулна уу !",
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
            message: "Та email оруулна уу !",
          },
        ]}
      >
        <TextArea rows={""} />
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
        // rules={[
        //   {
        //     required: true,
        //     message: "Та password оруулна уу !",
        //   },
        // ]}
      >
        <TextArea rows={""} />
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
