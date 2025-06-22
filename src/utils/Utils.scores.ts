import { AptitudeScore, SimulacroScore } from "@/types/CustomTypes";

export const lastSimulacresExample: SimulacroScore[] = [
  {
    uuid: "1",
    simulacro: "Simulacro 1",
    date: new Date(),
    totalScore: 54,
    customSim: false,
  },
  {
    uuid: "2",
    simulacro: "Simulacro Custom 12/05 - 11:04",
    date: new Date(),
    totalScore: 21,
    customSim: true,
  },
  {
    uuid: "3",
    simulacro: "Simulacro 2",
    date: new Date(),
    totalScore: 32,
    customSim: false,
  },
  {
    uuid: "4",
    simulacro: "Simulacro 5",
    date: new Date(),
    totalScore: 82,
    customSim: false,
  },
  {
    uuid: "5",
    simulacro: "Simulacro Custom 23/05 - 21:04",
    date: new Date(),
    totalScore: 53,
    customSim: true,
  },
  {
    uuid: "6",
    simulacro: "Simulacro 3",
    date: new Date(),
    totalScore: 65,
    customSim: false,
  },
  {
    uuid: "7",
    simulacro: "Simulacro 4",
    date: new Date(),
    totalScore: 72,
    customSim: false,
  },
  {
    uuid: "8",
    simulacro: "Simulacro 6",
    date: new Date(),
    totalScore: 105,
    customSim: false,
  },
  {
    uuid: "9",
    simulacro: "Simulacro Custom 22/06 - 14:04",
    date: new Date(),
    totalScore: 22,
    customSim: true,
  },
  {
    uuid: "10",
    simulacro: "Simulacro Extra",
    date: new Date(),
    totalScore: 105,
    customSim: false,
  },
];

export const lastTestsExample: AptitudeScore[] = [
  { uuid: "1", aptitude: "Mecánico", date: new Date(), totalScore: 8 },
  { uuid: "2", aptitude: "Percepción", date: new Date(), totalScore: 10 },
  { uuid: "3", aptitude: "Espacial", date: new Date(), totalScore: 8 },
  { uuid: "4", aptitude: "Verbal", date: new Date(), totalScore: 13 },
  { uuid: "5", aptitude: "Verbal", date: new Date(), totalScore: 15 },
  { uuid: "6", aptitude: "Numérico", date: new Date(), totalScore: 5 },
  { uuid: "7", aptitude: "Memoria", date: new Date(), totalScore: 6 },
  { uuid: "8", aptitude: "Memoria", date: new Date(), totalScore: 2 },
  { uuid: "9", aptitude: "Abstracto", date: new Date(), totalScore: 4 },
  { uuid: "10", aptitude: "Espacial", date: new Date(), totalScore: 5 },
];
