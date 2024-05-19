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

const UpdateServiceForm = ({ data, events }) => {
  // console.log("data?.serviceList", data?.serviceList);
  let additional_services_list = [];
  let additional_services_list1 = [];
  // var additional_services_list = new Map();
  data?.serviceList.forEach(async (serviceGroup, index) => {
    serviceGroup?.services.forEach(async (service, index) => {
      if (
        service?.additional_services !== null &&
        service?.additional_services.length > 0
      ) {
        service.additional_services.forEach(
          async (additional_service, index) => {
            additional_services_list.push(additional_service);
            additional_services_list1.push({
              value: additional_service.id,
              label: additional_service.additional_serviceName,
            });
            // additional_services_list.add({
            //   serviceId: data?.form?.data?.item?.serviceId,
            //   additional_service: additional_service,
            // });
          }
        );
      }
    });
  });
  // console.log("additional_services123", additional_services_list);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("onFinish", values);
    // Ensure the date and time values are in the correct format
    values.date = values.date.format("YYYY-MM-DD");
    values.startTime = values.startTime.format("HH:00:00");
    values.endTime = values.endTime.format("HH:00:00");

    events.handleUpdateOrder(values);
    events.handleCancel();
  };

  useEffect(() => {
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
  }, [data]);

  const [checkedList, setCheckedList] = useState([]);
  // const [checkAll, setCheckAll] = useState(false);
  const onChange = (list) => {
    setCheckedList(list);
    // setCheckAll(list.length === additional_services_list1.length);
  };
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item label="bookingId" name="id">
          <InputNumber />
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
        <Form.Item name="artistId" label="artistId">
          <InputNumber />
        </Form.Item>
        <Form.Item name="customerId" label="customerId">
          <InputNumber />
        </Form.Item>
        <Form.Item name="serviceId" label="serviceId">
          <InputNumber />
        </Form.Item>
        <span className=".mb-6 font-bold text-lg">Нэмэлт үйлчилгээнүүд:</span>
        <Form.Item name="additional_services">
          <Checkbox.Group
            options={additional_services_list1}
            value={checkedList}
            onChange={onChange}
          />
        </Form.Item>
        {/* <span className=".mb-6 font-bold text-lg">Нэмэлт үйлчилгээнүүд:</span>
        <div className="mt-4 grid grid-flow-col">
          {additional_services_list.map((item, index) => {
            return (
              <div
                className="grid grid-flow-col auto-cols-max border"
                key={index}
              >
                <Form.Item
                  name={`additional_serviceId-${item.id}`}
                >
                  <Checkbox>{item.additional_serviceName}</Checkbox>
                </Form.Item>
              </div>
            );
          })}
        </div> */}
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
