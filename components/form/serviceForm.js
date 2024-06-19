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
      customerId: initialData?.customer?.id,
      serviceId: data?.serviceId,
      duration: data?.duration,
      artistId: null,
      date: null,
      time: null,
    });
    setSelectedDate(null);
    setselectedArtist(null);
  }, [data?.serviceId]);
  const detail = localStorage.getItem("beauty_detail");
  const initialData1 = detail === "undefined" ? null : detail;
  var initialData = initialData1 === null ? {} : JSON.parse(initialData1);

  const artistList2 = [];
  artistsByService.map((item, index) => {
    artistList2.push({ value: item?.id, label: item?.firstName });
  });

  const handleFormFinish = (values) => {
    // let timeString = values?.time.format("HH:00:00");
    // let originalTime = moment(timeString, "HH:mm:ss");
    // let updatedTime = originalTime.add(1, "hours");
    // let formattedUpdatedTime = updatedTime.format("HH:mm:ss");
    // console.log(formattedUpdatedTime);
    events.handleOnFinish(values);
    setSelectedDate(null);
    setselectedArtist(null);
    setSelectedTime(null);
    form.setFieldsValue({
      customerId: null,
      serviceId: null,
      duration: data?.duration,
      artistId: null,
      date: null,
      time: null,
    });
  };

  const handleSelectChange = (value) => {
    setselectedArtist(value);
    events.loadTimeTable(value);
  };

  const [selectedArtist, setselectedArtist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(timeString);
  };

  const disabledHours = () => {
    if (!selectedDate) {
      // Disable all hours if no selectedDate
      return Array.from({ length: 24 }, (_, i) => i);
    }

    const selectedData = timetable_list.find(
      (data) => data.date === selectedDate
    );

    if (selectedData) {
      const availableHours = selectedData.timetable.map((time) =>
        moment(time, "HH:mm:ss").hours()
      );

      // Filter out the allowed hours (7 to 20) and those not in the availableHours
      return Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour < 7 || hour > 20 || !availableHours.includes(hour)
      );
    }

    // If no selectedData, disable all hours outside 7-20
    return Array.from({ length: 24 }, (_, i) => i).filter(
      (hour) => hour < 7 || hour > 20
    );
  };

  // const disabledHours = () => {
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
  // };

  return (
    <div>
      <div className="text-[18px] font-semibold ">
        Үйлчилгээний нэр: {data?.name}
      </div>
      <div className="text-[18px] font-semibold">Үнэ: {data?.price}₮</div>{" "}
      <div className="text-[18px] font-semibold">
        Үргэлжлэх хугацаа: {data?.duration} цаг
      </div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        // onFinish={events.handleOnFinish}
        onFinish={handleFormFinish}
      >
        <Form.Item name="serviceId" hidden>
          <InputNumber />
        </Form.Item>

        <Form.Item hidden name="duration" label="Үргэлжлэх хугацаа (цагаар):">
          <InputNumber disabled />
        </Form.Item>
        <Form.Item name="customerId" hidden>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Ажилчны нэр сонгох"
          name="artistId"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleSelectChange}
            style={{ width: 300 }}
            options={artistList2}
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
            onChange={handleDateChange}
            disabled={!selectedArtist}
            disabledDate={(currentDate) => {
              // Disable dates that are not in the availableData array
              return !timetable_list.some(
                (data) => data.date === currentDate.format("YYYY-MM-DD")
              );
            }}
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
