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
    events.handleCreateServiceGroup(values);
    events.handleCancel();
  };

  const [form] = Form.useForm();
  const defaultValues = {
    serviceGroupName: "",
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
        label="Үйлчилгээний бүлгийн нэр"
        name="serviceGroupName"
        rules={[
          {
            required: true,
            message: "Та serviceGroupName аа оруулна уу.",
          },
        ]}
      >
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
