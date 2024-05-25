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
    events.handleUpdateService(values);
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
    serviceName: data?.form?.data?.serviceName,
    duration: data?.form?.data?.duration,
    price: data?.form?.data?.price,
    image1: data?.form?.data?.image1,
  };

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const duration = [
    { value: 1, label: "1 цаг" },
    { value: 2, label: "2 цаг" },
    { value: 3, label: "3 цаг" },
    { value: 4, label: "4 цаг" },
  ];
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
      <Form.Item name="duration" label="duration">
        <Select
          // style={{ width: 120 }}
          // onChange={handleChange}
          options={duration}
        />
      </Form.Item>
      {/* <Form.Item label="status" name="status">
        <Select
          // style={{ width: 120 }}
          // onChange={handleChange}
          options={status}
        />
      </Form.Item> */}
      <Form.Item
        label="serviceName"
        name="serviceName"
        rules={[
          {
            required: true,
            message: "Та serviceName аа оруулна уу.",
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="price"
        name="price"
        rules={[
          {
            required: true,
            message: "Та price оруулна уу !",
          },
        ]}
      >
        <InputNumber rows={""} />
      </Form.Item>
      <Form.Item
        label="image1"
        name="image1"
        rules={[
          {
            required: true,
            message: "Та price оруулна уу !",
          },
        ]}
      >
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
