import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  DatePicker,
  TimePicker,
  Select,
  InputNumber,
  Input,
  Checkbox,
} from "antd";
import moment from "moment";
import Additional_service from "./additional_services";

const UpdateServiceForm = ({ data, events }) => {
  // console.log("data?.serviceList", data?.serviceList);
  let additional_services_list = [];
  data?.serviceList.forEach(async (serviceGroup, index) => {
    serviceGroup?.services.forEach(async (service, index) => {
      if (
        service?.additional_services !== null &&
        service?.additional_services.length > 0
      ) {
        service.additional_services.forEach(
          async (additional_service, index) => {
            additional_services_list.push(additional_service);
          }
        );
      }
    });
  });

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("onFinish", values);
    values.date = values.date.format("YYYY-MM-DD");
    values.startTime = values.startTime.format("HH:00:00");
    values.endTime = values.endTime.format("HH:00:00");

    events.handleUpdateOrder(values);
    events.handleCancel();
  };

  useEffect(() => {
    // console.log(
    //   "data?.form?.data?.item?.formData?.id",
    //   data?.form?.data?.item?.id
    // );
    const allFields = form.getFieldsValue(true);
    const updatedFields = {};

    Object.keys(allFields).forEach((field) => {
      // console.log(field);
      updatedFields[field] = null;
    });
    form.setFieldsValue(updatedFields);
    var formData = data?.form?.data?.item;
    console.log(data.serviceList);
    form.setFieldsValue({
      id: formData?.id,
      artistId: formData?.artistId,
      customerId: formData?.customerId,
      serviceId: formData?.serviceId,
      date: formData?.date ? moment(formData?.date, "YYYY-MM-DD") : null,
      startTime: formData?.startTime
        ? moment(formData?.startTime, "HH:mm")
        : null,
      endTime: formData?.endTime ? moment(formData?.endTime, "HH:mm") : null,
    });
  }, [data?.form?.data?.item?.id]);

  const artistList = [];
  data?.employeeList.map((item, index) => {
    artistList.push({ value: item?.id, label: item?.firstName });
  });

  const customerList = [];
  data?.userList.map((item, index) => {
    customerList.push({ value: item?.id, label: item?.firstName });
  });

  const serviceList = [];
  data?.just_service_list.map((item, index) => {
    serviceList.push({ value: item?.id, label: item?.serviceName });
  });
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item label="bookingId" name="id">
          <InputNumber disabled />
        </Form.Item>
        <Form.Item
          label="Огноо нэр сонгох"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Эхлэх цаг сонгох"
          name="startTime"
          rules={[
            {
              required: true,
              message: "Please select a start time!",
            },
          ]}
        >
          <TimePicker format="HH" />
        </Form.Item>
        <Form.Item
          label="Дуусах цаг сонгох"
          name="endTime"
          rules={[
            {
              required: true,
              message: "Please select an end time!",
            },
          ]}
        >
          <TimePicker format="HH" />
        </Form.Item>
        <Form.Item label="Ажилчны нэр сонгох" name="artistId">
          <Select options={artistList} />
        </Form.Item>
        <Form.Item name="customerId" label="customerId">
          <Select options={customerList} />
        </Form.Item>
        <Form.Item name="serviceId" label="serviceId">
          <Select options={serviceList} />
        </Form.Item>
        <span className=".mb-6 font-bold text-lg">Нэмэлт үйлчилгээнүүд:</span>
        <Additional_service
          data={data}
          events={events}
          // tr={tr}
          form={form}
          additional_services_list={additional_services_list}
        />
        <Form.Item>
          <Button className="bg-[#0F285F]" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateServiceForm;
