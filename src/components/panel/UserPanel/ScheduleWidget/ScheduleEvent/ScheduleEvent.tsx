import React from "react";
import "./ScheduleEvent.css";
import { CalendarEvent, EventType } from "@/types/CustomTypes";

const renderTypeOfEventBackground = (typeOfEvent: EventType): string => {
  switch (typeOfEvent) {
    case "Clase Obligatoria":
      return "clase-obligatoria";
    case "Clase de psisoctécnicos":
      return "clase-psicotécnicos";
    case "Repaso psicotécnicos":
      return "clase-repaso";
    case "Orientación ET":
      return "ori-et";
    case "Orientación EA":
      return "ori-ea";
    case "Orientación Armada":
      return "ori-armada";
    case "Orientación IMT":
      return "ori-imt";
    case "Debate":
      return "debate";
    case "Intensivo":
      return "intensivo";
    case "Entrevista":
      return "entrevista";
    case "Simulacro":
      return "repaso-simulacro";
    default:
      return "default";
  }
};

const ScheduleEvent = ({
  title,
  startingHour,
  endingHour,
  typeOfEvent,
  teacher,
}: CalendarEvent) => {
  return (
    <div className="schedule-event">
      <div className="schedule-information">
        <h4>
          {startingHour} - {endingHour}
        </h4>
        <h4>{title}</h4>
      </div>
      <div className="schedule-type-and-teacher">
        <h4 className={`${renderTypeOfEventBackground(typeOfEvent)}`}>
          {teacher}
        </h4>
        <h4 className={`${renderTypeOfEventBackground(typeOfEvent)}`}>
          {typeOfEvent}
        </h4>
      </div>
    </div>
  );
};

export default ScheduleEvent;
