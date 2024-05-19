import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Calendar } from "@fullcalendar/core";

export default function DemoApp({ data }) {
  const events = [
    // { title: "Meeting", start: new Date("2024-05-13T06:00:00.000Z") },
  ];
  data.forEach((element) => {
    events.push({
      title: element.artistId + " " + element.customerId,
      start: new Date(element.date + " " + element.startTime),
    });
  });
  //   var calendar = new Calendar(calendarEl, {
  //     initialView: "timeGridFourDay",
  //     views: {
  //       timeGridFourDay: {
  //         type: "timeGrid",
  //         duration: { days: 4 },
  //       },
  //     },
  //   });
  return (
    <div>
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        // initialView="timeGridDay"
        weekends={true}
        editable
        droppable
        selectable
        eventDisplay="block"
        events={events}
        eventContent={renderEventContent}
        slotMinTime="8:00:00"
        slotMaxTime="19:00:00"
        views={{
          timeGridFourDay: {
            // Define the custom view
            type: "timeGrid", // Use timeGrid view
            duration: { days: 4 }, // Set the duration to 4 days
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
