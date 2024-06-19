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
    events.handleCreateAdditionalService(values);
    events.handleCancel();
  };
  const duration = [
    { value: 1, label: "1 цаг" },
    { value: 2, label: "2 цаг" },
    { value: 3, label: "3 цаг" },
    { value: 4, label: "4 цаг" },
  ];
  const serviceGroups = [];
  data?.serviceList.map((item, index) => {
    serviceGroups.push({ value: item?.id, label: item?.serviceGroupName });
  });
  const defaultValueforServiceGroups = serviceGroups[0]?.value;

  const [form] = Form.useForm();
  const defaultValues = {
    additional_serviceName: "",
    default_price: "",
    description: "",
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
        label="Нэмэлт үйлчилгээний нэр"
        name="additional_serviceName"
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
        label="Үндсэн үнэ"
        name="default_price"
        rules={[
          {
            required: true,
            message: "Та default_price оруулна уу !",
          },
        ]}
      >
        <InputNumber rows={""} />
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
