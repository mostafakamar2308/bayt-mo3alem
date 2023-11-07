"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import React, { useState } from "react";
import EventItem from "./EventItem";

function Calendar({ exams }) {
  const examsFormatted = exams.map((exam) => ({
    ...exam,
    start: new Date(exam.start),
    end: new Date(exam.start),
  }));
  return (
    <FullCalendar
      events={examsFormatted}
      eventContent={(info) => (
        <EventItem
          subject={
            examsFormatted.find((exam) => exam.id === info.event.id).subject
          }
          info={info}
        />
      )}
      headerToolbar={{
        start: "today prev next",
        end: "dayGridMonth dayGridWeek",
      }}
      height={"90vh"}
      plugins={[dayGridPlugin]}
      views={["dayGridMonth", "dayGridWeek"]}
    />
  );
}

export default Calendar;
