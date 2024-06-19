import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Uploader from "../Atom/Uploader";

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo)
// }

const { TextArea } = Input;
const App = ({ data, events }) => {
  // console.log("data123", data);

  const onFinish = (values) => {
    // console.log("values", values);
    events.handleUpdateServiceGroup(values);
    events.handleCancel();
  };

  // const onFinish = (values) => {
  //   // Append the uploaded image to the form data
  //   const formData = { ...values, image1: uploadedImage };
  //   console.log("formData", formData);
  //   // Pass formData to your update service function
  //   // events.handleUpdateService(formData);
  //   // events.handleCancel();
  // };

  const status = [
    { value: 9, label: "хэрэглэгч" },
    { value: 1, label: "ажилчин" },
  ];

  const [form] = Form.useForm();
  const defaultValues = {
    id: data?.form?.data?.id,
    serviceGroupName: data?.form?.data?.serviceGroupName,
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
      <Form.Item
        label="Үйлчилгээний нэр"
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
        <Button htmlType="submit">Өөрчлөх</Button>
      </Form.Item>
    </Form>
  );
};
export default App;
