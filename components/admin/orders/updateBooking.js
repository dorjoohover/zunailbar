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
import { globals } from "../../../utils/functions";

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
    values.serviceId =
      values.serviceId[0]?.value != undefined
        ? values.serviceId.map((service) => service.value).join(",")
        : values.serviceId.join(",");
    values.date = values.date.format("YYYY-MM-DD");
    values.startTime = values.startTime.format("HH:00:00");
    values.endTime = values.endTime.format("HH:00:00");
    // values.serviceId = values.serviceId.join(",");
    values.additional_services = values.additional_services?.join(",");
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
    console.log(formData)
    console.log(data.serviceList);
    form.setFieldsValue({
      id: formData?.id,
      artistId: formData?.artistId,
      customerId: formData?.customerId,
      additional_services: formData?.additionalServiceId,
      prepayment: formData?.prepayment,
      paymentMethod: globals.PaymentMethodTypesDict[formData?.paymentMethod],
      serviceId: data?.just_service_list
        .map((item, index) => {
          const services = formData?.serviceId
            .split(",")
            .map((s) => parseInt(s));
          if (services.includes(item.id)) {
            return {
              value: item.id,
              label: `${item?.serviceName} (${item?.price})`,
            };
          }
        })
        .filter((s) => s != undefined),
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
    serviceList.push({
      value: item?.id,
      label: `${item?.serviceName} (${item?.price})`,
    });
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
          name="prepayment"
          label="Урьдчилгаа"
          rules={[
            {
              pattern: new RegExp(/^[0-9]*$/),
            },
          ]}
        >
          <Input className={"max-w-[300px]"} />
        </Form.Item>
        <Form.Item name="paymentMethod" label="Төлбөрийн хэлбэр">
          <Select
            style={{ width: 300 }}
            options={Object.values(globals.PaymentMethodTypes).map((m) => {
              return { value: m, label: globals.PaymentMethodTypesDict[m] };
            })}
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
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
          <Select
            options={artistList}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item name="customerId" label="Үйлчлүүлэгийн нэр">
          <Select
            options={customerList}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item name="serviceId" label="Үйлчилгээ">
          <Select
            mode="multiple"
            tokenSeparators={[","]}
            options={serviceList}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
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
