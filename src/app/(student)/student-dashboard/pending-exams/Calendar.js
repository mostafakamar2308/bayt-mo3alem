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
  console.log(examsFormatted);
  return (
    <FullCalendar
      events={examsFormatted}
      eventContent={(info) => <EventItem info={info} />}
      headerToolbar={{
        start: "today prev next",
        end: "dayGridMonth dayGridWeek",
      }}
      plugins={[dayGridPlugin]}
      views={["dayGridMonth", "dayGridWeek"]}
    />
  );
}

export default Calendar;
