import React from "react";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { Clock, FileText } from "lucide-react";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createResizePlugin } from "@schedule-x/resize";
import "@schedule-x/theme-default/dist/calendar.css";
import "./Service.css";

const events = [
  {
    id: 1,
    title: 'Đi ăn sáng',
    start: '2025-08-11 05:15',
    end: '2025-08-11 05:35',
    colorType: 'personal',
    description: 'Ăn sáng tại quán gần ký túc xá, uống cà phê'
  },
  {
    id: 2,
    title: 'Tập hợp học bài mới',
    start: '2025-08-11 06:15',
    end: '2025-08-11 09:00',
    colorType: 'school',
    description: 'Học chương mới, chuẩn bị bài thuyết trình'
  },
  {
    id: 3,
    title: 'Ra chơi',
    start: '2025-08-11 09:00',
    end: '2025-08-11 09:20',
    colorType: 'leisure',
    description: 'Uống nước, trò chuyện với bạn bè'
  },
  {
    id: 4,
    title: 'Tập trung vô học lại',
    start: '2025-08-11 09:20',
    end: '2025-08-11 10:20',
    colorType: 'school',
    description: 'Tiếp tục bài giảng, làm bài tập nhóm'
  },
  {
    id: 5,
    title: 'Ra ăn cơm trưa',
    start: '2025-08-11 11:20',
    end: '2025-08-11 11:40',
    colorType: 'leisure',
    description: 'Ăn cơm cùng bạn tại căn tin'
  },
  {
    id: 6,
    title: 'Nghỉ ngơi',
    start: '2025-08-11 11:45',
    end: '2025-08-11 13:30',
    colorType: 'leisure',
    description: 'Ngủ trưa và nghe nhạc'
  },
  {
    id: 7,
    title: 'Bắt đầu buổi học buổi chiều',
    start: '2025-08-11 13:30',
    end: '2025-08-11 15:00',
    colorType: 'school',
    description: 'Học tiếp phần nâng cao'
  },
  {
    id: 8,
    title: 'Ra chơi',
    start: '2025-08-11 15:00',
    end: '2025-08-11 15:20',
    colorType: 'leisure',
    description: 'Đi dạo, giải lao'
  },
  {
    id: 9,
    title: 'Vô học tiếp',
    start: '2025-08-11 15:30',
    end: '2025-08-11 16:30',
    colorType: 'school',
    description: 'Học nhóm và làm bài tập về nhà'
  },
  {
    id: 10,
    title: 'Ăn tối',
    start: '2025-08-11 17:15',
    end: '2025-08-11 17:30',
    colorType: 'personal',
    description: 'Ăn tối ở căn tin, trò chuyện cùng bạn bè'
  },
  {
    id: 11,
    title: 'Giờ sinh hoạt của sinh viên',
    start: '2025-08-11 17:45',
    end: '2025-08-11 21:00',
    colorType: 'work',
    description: 'Họp câu lạc bộ, chơi thể thao'
  },
];


const styledEvents = events.map(e => ({
  ...e,
  classNames: [`event-${e.colorType}`],
}));

const customComponents = {
  eventModal: ({ calendarEvent }) => {
    return (
      <div
        data-event-id={calendarEvent.id}
        style={{
          padding: "24px",
          borderRadius: "16px",
          backgroundColor: "white",
          color: "var(--sx-color-on-primary-container)",
          minWidth: "280px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "var(--sx-color-primary-container)",
              borderRadius: "3px",
              display: "inline-block",
              marginRight: "8px",
            }}
          ></span>
          <h2 style={{ margin: 0, fontWeight: "600", fontSize: "18px" }}>
            {calendarEvent.title}
          </h2>
        </div>

        {/* Time */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <Clock size={16} style={{ marginRight: "6px" }} />
          <span>
            {new Date(calendarEvent.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(calendarEvent.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Description */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <FileText size={18} style={{ marginRight: "6px", marginTop: "2px" }} />
          <span style={{ fontSize: "14px", lineHeight: "1.4" }}>
            {calendarEvent.description}
          </span>
        </div>
      </div>
    );
  },
};

export default function Services() {
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: styledEvents,
    selectedDate: "2025-08-11",
    plugins: [createResizePlugin(),,createEventModalPlugin(),createDragAndDropPlugin()],
  });

  return (
    <div className="calendar-container">
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={customComponents}
      />
    </div>
  );
}
