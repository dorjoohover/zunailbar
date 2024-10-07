import React, { useState, useEffect } from "react";
import {
  Button,
  Steps,
  Form,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
// import dayjs from "dayjs";
// import styles from "./CustomTimePicker.module.css";
import moment from "moment";
const serviceForm = ({
  data,
  artist_list,
  timetable_list,
  artistsByService,
  events,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      customerId: null,
      serviceId: null,
      artistId: data?.artistId,
      date: null,
      time: null,
    });
    setSelectedDate(null);
    // setselectedArtist(null);
    events.loadTimeTable(data?.artistId);
  }, []);

  const userList = [];
  data?.userList.map((item, index) => {
    userList.push({ value: item?.id, label: item?.phone });
  });

  const artistList = [];
  data?.artistsByService.map((item, index) => {
    artistList.push({ value: item?.id, label: item?.phone });
  });
  // data?.employeeList.map((item, index) => {
  //   artistList.push({ value: item?.id, label: item?.firstName });
  // });

  const serviceList = [];
  data?.just_service_list.map((item, index) => {
    serviceList.push({ value: item?.id, label: item?.serviceName });
  });

  const artistList2 = [];
  data?.employeeList.map((item, index) => {
    artistList2.push({ value: item?.id, label: item?.firstName });
  });

  const handleFormFinish = (values) => {
    events.handleCreateOrder(values);
    form.setFieldsValue({
      customerId: null,
      serviceId: null,
      artistId: null,
      date: null,
      time: null,
    });
    setSelectedDate(null);
    // setselectedArtist(null);
  };

  // const handleSelectChange = (value) => {
  //   setselectedArtist(value);
  //   events.loadTimeTable(value);
  // };

  const [selectedArtist, setselectedArtist] = useState(data?.artistId);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChangeArtist = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(timeString);
  };

  const disabledHours = () => {
    if (!selectedDate) {
      return Array.from({ length: 24 }, (_, i) => i);
    }

    const selectedData = data?.timetable_list.find(
      (data) => data.date === selectedDate
    );

    if (selectedData) {
      const availableHours = selectedData.timetable.map((time) =>
        moment(time, "HH:mm:ss").hours()
      );

      return Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour < 7 || hour > 20 || !availableHours.includes(hour)
      );
    }

    return Array.from({ length: 24 }, (_, i) => i).filter(
      (hour) => hour < 7 || hour > 20
    );
  };

  const [selectedService, setSelectedService] = useState(null);
  const handleChangeService = (value) => {
    setSelectedService(value);
    events.loadArtistByService(value);
  };
  return (
    <div>
      <div className="text-[18px] font-semibold ">
        Үйлчилгээний нэр: {data?.name}
      </div>
      <div className="text-[18px] font-semibold">Үнэ: {data?.price}</div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        onFinish={handleFormFinish}
      >
        <Form.Item name="customerId" label="customerId">
          <Select options={userList} />
        </Form.Item>
        <Form.Item name="serviceId" label="serviceId">
          {/* <InputNumber /> */}
          <Select options={serviceList} onChange={handleChangeService} />
        </Form.Item>
        <Form.Item
          label="Ажилчны нэр сонгох"
          name="artistId"
          disabled={!selectedService}
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          <Select
            // onChange={handleSelectChange}
            style={{ width: 300 }}
            options={artistList2}
            disabled
            // options={artistList}
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
          <DatePicker
            onChange={handleDateChangeArtist}
            disabled={!data?.artistId}
           // disabledDate={(currentDate) => {
              // Disable dates that are not in the availableData array
            //  return !data?.timetable_list.some(
            //    (data) => data.date === currentDate.format("YYYY-MM-DD")
            //  );
           // }}
          />
        </Form.Item>
        <Form.Item
          label="Цаг сонгох"
          name="time"
          rules={[
            {
              required: true,
              message: "Please select a time!",
            },
          ]}
        >
          <TimePicker
            onChange={handleTimeChange}
            disabled={!selectedDate}
            format="HH"
            disabledHours={disabledHours}
            hideDisabledOptions={true}
            // disabledHours={() => {
            //   const selectedData = timetable_list.find(
            //     (data) => data.date === selectedDate
            //   );
            //   if (selectedData) {
            //     const availableHours = selectedData.timetable.map((time) =>
            //       moment(time, "HH:mm:ss").hours()
            //     );
            //     return Array.from({ length: 24 }, (_, i) => i).filter(
            //       (hour) => !availableHours.includes(hour)
            //     );
            //   }
            //   return [];
            // }}
          />
        </Form.Item>
        {/* submit button */}
        <Form.Item>
          <Button
            className="bg-[#0F285F]"
            type="primary"
            htmlType="submit"
            // disabled={data?.maxSharesError}
          >
            Захиалга өгөх
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default serviceForm;
