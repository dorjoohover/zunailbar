import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo)
// }

const { TextArea } = Input;
const App = ({ data, events }) => {
  console.log("data12345", data);

  const onFinish = (values) => {
    // console.log("values", values);
    events.handleCreateService(values);
    events.handleCancel();
  };
  const duration = [
    { value: 0.5, label: "30 мин" },
    { value: 1, label: "1 цаг" },
    { value: 1.5, label: "1 цаг 30 мин" },
    { value: 2, label: "2 цаг" },
    { value: 2.5, label: "2 цаг 30 мин" },
    { value: 3, label: "3 цаг" },
    { value: 3.5, label: "3 цаг 30 мин" },
    { value: 4, label: "4 цаг" },
  ];
  const serviceGroups = [];
  data?.serviceList.map((item, index) => {
    serviceGroups.push({ value: item?.id, label: item?.serviceGroupName });
  });
  const defaultValueforServiceGroups = serviceGroups[0]?.value;

  const [form] = Form.useForm();
  const defaultValues = {
    serviceGroupId: defaultValueforServiceGroups,
    serviceName: "",
    description: "",
    duration: 1,
    image1: "",
    price: "",
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
      <Form.Item
        label="Үйлчилгээний груп"
        name="serviceGroupId"
        rules={[
          {
            required: true,
            message: "Та serviceGroupId аа оруулна уу.",
          },
        ]}
      >
        <Select
          // style={{ width: 120 }}
          // onChange={handleChange}
          options={serviceGroups}
        />
      </Form.Item>
      <Form.Item
        label="Үргэлжлэх хугацаа"
        name="duration"
        rules={[
          {
            required: true,
            message: "Та duration аа оруулна уу.",
          },
        ]}
      >
        <Select
          // style={{ width: 120 }}
          // onChange={handleChange}
          options={duration}
        />
      </Form.Item>
      <Form.Item
        label="Үйлчилгээний нэр"
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
        label="Үнэ"
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
      <Form.Item label="Зураг" name="image1">
        <Input rows={""} />
      </Form.Item>
      <Form.Item label="Дэлгэрэнгүй тодорхойлт" name="description">
        <TextArea />
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
