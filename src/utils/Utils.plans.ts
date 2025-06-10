import { SOCIAL_MEDIA } from "@/constants";
import { PlanCard } from "@/types/CustomTypes";

export const plansAndAttributes: PlanCard[] = [
  {
    label: "Más estándar",
    cardTitle: "Plan Base",
    buttonText: "¡Apúntate!",
    planAttributes: [
      {
        typeOfAttribute: "Positive",
        content:
          "Acceso completo a <strong>test</strong> y simulacros hechos a medida.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Acceso a <strong>todos</strong> los vídeos de orientaciones y clases de psicotécnicos.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Disponibilidad <strong>inmediata</strong> a nuestros grupos de Telegram para dudas / consultas de <strong>cualquier</strong> tipo según proceda.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Orientación <strong>individual</strong> con un profesional que te ayudará a alcanzar tus <strong>objetivos personales.</strong>",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Seguimiento <strong>completo</strong>, desde que empiezas la oposición, hasta que te incorporas a la unidad.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Contacto 24/7 con todo el equipo de la academia para cualquier duda o consulta relacionada con el ámbito.",
      },
      {
        typeOfAttribute: "Negative",
        content:
          "Acceso completo a un <strong>plan de entrenamiento</strong> con tres entrenadores especializados, procedentes de las unidades <strong>más exigentes</strong> del Ejército español y la Guardia Civil (MOE, GAR y Cazadores de Montaña).",
      },
    ],
    redirectsTo: SOCIAL_MEDIA.whatsapp,
  },
  {
    label: "Recomendado",
    cardTitle: "Plan Completo",
    buttonText: "¡A darlo todo!",
    planType: "Complete",
    planAttributes: [
      {
        typeOfAttribute: "Positive",
        content:
          "Acceso completo a <strong>test</strong> y simulacros hechos a medida.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Acceso a <strong>todos</strong> los vídeos de orientaciones y clases de psicotécnicos.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Disponibilidad <strong>inmediata</strong> a nuestros grupos de Telegram para dudas / consultas de <strong>cualquier</strong> tipo según proceda.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Orientación <strong>individual</strong> con un profesional que te ayudará a alcanzar tus <strong>objetivos personales.</strong>",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Seguimiento <strong>completo</strong>, desde que empiezas la oposición, hasta que te incorporas a la unidad.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Contacto 24/7 con todo el equipo de la academia para cualquier duda o consulta relacionada con el ámbito.",
      },
      {
        typeOfAttribute: "Positive",
        content:
          "Acceso completo a un <strong>plan de entrenamiento</strong> con tres entrenadores especializados, procedentes de las unidades <strong>más exigentes</strong> del Ejército español y la Guardia Civil (MOE, GAR y Cazadores de Montaña).",
      },
    ],
    redirectsTo: SOCIAL_MEDIA.whatsapp,
  },
];
