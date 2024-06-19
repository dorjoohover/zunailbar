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
const serviceForm = ({ events, data }) => {
  const event_clicked = () => {
    events.handleClick(data);
  };
  return (
    <div>
      <Button onClick={event_clicked}>Үнэлгээ өгөх</Button>
    </div>
  );
};
export default serviceForm;
