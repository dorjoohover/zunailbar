import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo)
// }

const { TextArea } = Input;
const App = ({ data, events }) => {
  // console.log("data?.form?.data?.item", data?.form?.data?.item);

  const onFinish = (values) => {
    // console.log("values", values);
    events.handleUpdateEmployee(values);
    events.handleCancel();
  };
  // const status = [
  //   { value: 9, label: "хэрэглэгч" },
  //   { value: 1, label: "ажилчин" },
  // ];

  const [form] = Form.useForm();
  const defaultValues = {
    id: data?.form?.data?.item?.id,
    status: data?.form?.data?.item?.status,
    branchId: data?.form?.data?.item?.branchId,
    firstName: data?.form?.data?.item?.firstName,
    lastName: data?.form?.data?.item?.lastName,
    email: data?.form?.data?.item?.email,
    phone: data?.form?.data?.item?.phone,
    jobStartDate: data?.form?.data?.item?.jobStartDate,
    jobEndDate: data?.form?.data?.item?.jobEndDate,
    image: data?.form?.data?.item?.image,
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
      <Form.Item label="id" name="id" hidden>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Төлөв" name="status" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Салбар" name="branchId" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label="Овог"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Та lastName аа оруулна уу.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Нэр"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Та firstName аа оруулна уу.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="И-майл"
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
        label="Утас"
        name="phone"
        rules={[
          {
            required: true,
            message: "Та phone оруулна уу !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Ажилж эхэлсэн огноо" name="jobStartDate">
        <Input />
      </Form.Item>
      <Form.Item label="Ажлаас гарсан огноо" name="jobEndDate">
        <Input />
      </Form.Item>
      <Form.Item label="Зураг" name="image">
        <Input />
      </Form.Item>
      <Form.Item
        label="Нууц үг"
        name="password"
        // rules={[
        //   {
        //     required: true,
        //     message: "Та password оруулна уу !",
        //   },
        // ]}
      >
        <Input />
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
