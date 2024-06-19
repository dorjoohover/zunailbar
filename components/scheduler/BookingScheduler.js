import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DatePicker, Button } from "antd";
import moment from "moment";
// import "antd/dist/antd.css";

export default function DemoApp({ data }) {
  // Define a mapping of artistId to colors
  const artistColors = {
    1: "#ff9f89",
    2: "#d4a0ff",
    3: "#9fd4ff",
    4: "#afff9f",
    5: "#ffaf7f",
    6: "#7fd4ff",
    7: "#d4ff7f",
    8: "#ff7fd4",
    9: "#7fffaf",
    10: "#d47fff",
    11: "#ffdf7f",
    12: "#7fafff",
    13: "#df7fff",
    14: "#7fffdf",
    15: "#ff7f9f",
    16: "#9fff7f",
    17: "#7fdfff",
    18: "#ffbf7f",
    19: "#7fbfff",
    20: "#ff7fff",
    21: "#bfff7f",
    22: "#7fff7f",
    23: "#7f7fff",
    24: "#7f7fff",
    25: "#ff7f7f",
  };

  const [viewType, setViewType] = useState("timeGridWeek");
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

  const events = data.map((element) => {
    const color = artistColors[element.artistId] || "#ccc"; // Default color if artistId not found

    return {
      title: `${element.artistName} ${element.customerId}`,
      start: new Date(`${element.date}T${element.startTime}`),
      end: new Date(`${element.date}T${element.endTime}`),
      backgroundColor: color,
      borderColor: color,
    };
  });

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date.format("YYYY-MM-DD"));
    } else {
      setSelectedDate(null);
    }
  };

  const handleDateSubmit = () => {
    if (selectedDate) {
      setViewType("timeGridDay");

      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView("timeGridDay", selectedDate);
    }
  };

  const handleGoBack = () => {
    setViewType("timeGridWeek");

    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek");
  };

  return (
    <div>
      <h2>Цаг захиалгын календарь</h2>
      <div style={{ marginBottom: 16 }}>
        <DatePicker onChange={handleDateChange} />
        <Button
          type="default"
          className="bg-blue-800 text-white"
          onClick={handleDateSubmit}
          style={{ marginLeft: 8 }}
        >
          Сонгосон өдрийг харуулах
        </Button>
        <Button onClick={handleGoBack} style={{ marginLeft: 8 }}>
          БУЦАХ
        </Button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={viewType}
        weekends={true}
        editable={true}
        droppable={true}
        selectable={true}
        eventDisplay="block"
        events={events}
        eventContent={renderEventContent}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        }}
        slotMinTime="08:00:00"
        slotMaxTime="21:00:00"
        views={{
          timeGridFourDay: {
            type: "timeGrid",
            duration: { days: 4 },
          },
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
