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
    events.handleUpdateAdditionalService(values);
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
    additional_serviceName: data?.form?.data?.additional_serviceName,
    default_price: data?.form?.data?.default_price,
    description: data?.form?.data?.description,
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

  const [restate, setRestate] = useState(false);
  const handleImageUpload = (values) => {
    if (form) {
      form.setFieldsValue(values);
    }
  };

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
        name="additional_serviceName"
        rules={[
          {
            required: true,
            message: "Та additional_serviceName аа оруулна уу.",
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Үнэ"
        name="default_price"
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
        label="Тайлбар"
        name="description"
        rules={[
          {
            required: true,
            message: "Та description аа оруулна уу.",
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
