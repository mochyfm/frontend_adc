import React from "react";
import "./ScheduleWidget.css";
import { renderMonth, renderWeekDay } from "@/utils/Utils.renderer";
import { calendarEvents } from "@/utils/Utils.events";
import ScheduleEvent from "./ScheduleEvent";
import WidgetBase from "@/components/common/WidgetBase";

const renderCurrentDate = (): string => {
  const date = new Date();
  const weekDay = date.getDay();
  const day = date.getDate();
  const month = date.getMonth();
  const fullYear = date.getFullYear();

  return `${renderWeekDay(weekDay)} ${day} de ${renderMonth(
    month
  )} ${fullYear}`;
};

function ScheduleWidget() {
  return (
    <WidgetBase header={renderCurrentDate()}>
      <div className="schedule-widget-event-list">
        {calendarEvents.map((calendarEvent,index) => {
          return <ScheduleEvent key={index} {...calendarEvent} />;
        })}
      </div>
      <button className="schedule-open-full-calendar">Ver calendario completo</button>
    </WidgetBase>
  );
}

export default ScheduleWidget;
