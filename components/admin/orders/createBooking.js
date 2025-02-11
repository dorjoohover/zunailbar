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
import { globals } from "../../../utils/functions";
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
      artistId: null,
      date: null,
      time: null,
    });
    setSelectedDate(null);
    setselectedArtist(null);
  }, []);

  const userList = [];
  data?.userList.map((item, index) => {
    userList.push({
      value: item?.id,
      label: `${item?.firstName} (${item?.phone})`,
    });
  });

  const artistList = [];
  data?.employeeList.map((item, index) => {
    artistList.push({
      value: item?.id,
      label: `${item?.firstName} (${item?.phone})`,
    });
  });
  // data?.employeeList.map((item, index) => {
  //   artistList.push({ value: item?.id, label: item?.firstName });
  const serviceList = [];
  data?.just_service_list.map((item, index) => {
    serviceList.push({
      value: item?.id,
      label: `${item?.serviceName} (${item?.price}₮)`,
    });
  });

  const artistList2 = [];
  data?.employeeList.map((item, index) => {
    artistList2.push({ value: item?.id, label: item?.firstName });
  });

  const handleFormFinish = (values) => {
    events.handleCreateOrder(values);
    form.setFieldsValue({
      customerId: null,
      serviceId: [],
      artistId: null,
      date: null,
      time: null,
    });
    setSelectedDate(null);
    setselectedArtist(null);
  };

  const handleSelectChange = (value) => {
    setselectedArtist(value);
    events.loadTimeTable(value);
  };

  const [selectedArtist, setselectedArtist] = useState(null);
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

  const [selectedService, setSelectedService] = useState([]);
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
        <Form.Item name="customerId" label="Үйлчлүүлэгчийн нэр">
          <Select
            options={userList}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item name="serviceId" label="Үйлчилгээ">
          {/* <InputNumber /> */}
          <Select
            options={serviceList}
            onChange={handleChangeService}
            showSearch
            mode="multiple"
            filterOption={(input, option) => {
              return option.label.toLowerCase().includes(input.toLowerCase());
            }}
            tokenSeparators={[","]}
          />
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
            onChange={handleSelectChange}
            style={{ width: 300 }}
            options={artistList}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Огноо сонгох"
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
            disabled={!selectedArtist}
            // disabledDate={(currentDate) => {
            // Disable dates that are not in the availableData array
            //return !data?.timetable_list.some(
            //  (data) => data.date === currentDate.format("YYYY-MM-DD")
            // );
            //}
            //  }
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
            // disabled={!selectedDate}
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
