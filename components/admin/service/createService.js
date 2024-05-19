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
    events.handleCreateService(values);
    events.handleCancel();
  };
  const status = [
    { value: "active", label: "active" },
    { value: "not active", label: "not active" },
  ];
  // const users = [];
  // data?.userList.map((item, index) => {
  //   users.push({ value: item?.id, label: item?.title_name });
  // });
  const [form] = Form.useForm();
  const defaultValues = {
    status: "active",
    serviceName: "",
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
            message: "Та image1 оруулна уу !",
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
        <Button htmlType="submit">Нэмэх</Button>
      </Form.Item>
    </Form>
  );
};
export default App;
