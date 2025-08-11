import React from "react";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";


import "@schedule-x/theme-default/dist/calendar.css";

import "./Service.css";

const events = [
  { id: 1, title: 'Đi ăn sáng', start: '2025-08-11 05:15', end: '2025-08-11 05:35', colorType: 'personal' },
  { id: 2, title: 'Tập hợp học bài mới', start: '2025-08-11 06:15', end: '2025-08-11 09:00', colorType: 'school' },
  { id: 3, title: 'Ra chơi', start: '2025-08-11 09:00', end: '2025-08-11 09:20', colorType: 'leisure' },
  { id: 4, title: 'Tập trung vô học lại', start: '2025-08-11 09:20', end: '2025-08-11 10:20', colorType: 'school' },
  { id: 5, title: 'Ra ăn cơm trưa', start: '2025-08-11 11:20', end: '2025-08-11 11:40', colorType: 'leisure' },
  { id: 6, title: 'Nghỉ ngơi', start: '2025-08-11 11:45', end: '2025-08-11 13:30', colorType: 'leisure' },
  { id: 7, title: 'Bắt đầu buổi học buổi chiều', start: '2025-08-11 13:30', end: '2025-08-11 15:00', colorType: 'school' },
  { id: 8, title: 'Ra chơi', start: '2025-08-11 15:00', end: '2025-08-11 15:20', colorType: 'leisure' },
  { id: 9, title: 'Vô học tiếp', start: '2025-08-11 15:30', end: '2025-08-11 16:30', colorType: 'school' },
  { id: 10, title: 'Ăn tối', start: '2025-08-11 17:15', end: '2025-08-11 17:30', colorType: 'personal' },
  { id: 11, title: 'Giờ sinh hoạt của sinh viên', start: '2025-08-11 17:45', end: '2025-08-11 21:00', colorType: 'work' },
];

const styledEvents = events.map(e => ({
  ...e,
  classNames: [`event-${e.colorType}`] 
}));

export default function Services() {
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: styledEvents,
    selectedDate: '2025-08-11',
    plugins: [createEventModalPlugin()]
  });

  return (
    <div className="calendar-container">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}
