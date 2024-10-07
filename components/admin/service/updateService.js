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
    events.handleUpdateService(values);
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
    { value: 0.5, label: "30 мин" },
    { value: 1, label: "1 цаг" },
    { value: 1.5, label: "1 цаг 30 мин" },
    { value: 2, label: "2 цаг" },
    { value: 2.5, label: "2 цаг 30 мин" },
    { value: 3, label: "3 цаг" },
    { value: 3.5, label: "3 цаг 30 мин" },
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
      <Form.Item label="Үргэлжлэх хугацаа" name="duration">
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
      <Form.Item
        label="Зураг"
        name="image1"
        rules={[
          {
            required: true,
            message: "Та зураг оруулна уу !",
          },
        ]}
      >
        <Uploader
          name="image1"
          handleFinish={handleImageUpload}
          status={restate}
        />
        {/* <Upload
          name="image"
          listType="picture"
          beforeUpload={(file) => {
            setUploadedImage(file);
            return false; // Prevent default upload behavior
          }}
          fileList={uploadedImage ? [uploadedImage] : []}
        >
          <Button icon={<UploadOutlined />}>Зураг оруулах</Button>
        </Upload> */}
      </Form.Item>
      {/* <Form.Item
        label="Зураг"
        name="image1"
        rules={[
          {
            required: true,
            message: "Та price оруулна уу !",
          },
        ]}
      >
        <Input rows={""} />
      </Form.Item> */}
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
