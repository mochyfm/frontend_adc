import { CalendarEvent } from "@/types/CustomTypes";

export const calendarEvents: CalendarEvent[] = [
  {
    title: "Corrección Simulacro Nº5",
    teacher: "Josean",
    startingHour: "16:00",
    endingHour: "17:00",
    typeOfEvent: "Simulacro",
    date: new Date(),
  },
  {
    title: "Orientación Grupal destinos ET",
    teacher: "Judas",
    startingHour: "17:00",
    endingHour: "18:00",
    typeOfEvent: "Orientación ET",
    date: new Date(),
  },
  {
    title: "Orientación Grupal Infantería de Marina",
    teacher: "Eagle",
    startingHour: "18:00",
    endingHour: "19:00",
    typeOfEvent: "Orientación IMT",
    date: new Date(),
  },
  {
    title: "Orientación Grupal Infantería de Marina",
    teacher: "Soldier",
    startingHour: "19:00",
    endingHour: "20:00",
    typeOfEvent: "Clase Obligatoria",
    date: new Date(),
  },
  {
    title: "Orientación Físicas 2ª Fase",
    teacher: "Barrq",
    startingHour: "19:00",
    endingHour: "20:00",
    typeOfEvent: "Físicas",
    date: new Date(),
  }
];
