import {
  FaMedal,
  FaDumbbell,
  FaClock,
  FaClipboardList,
  FaLaptop,
  FaUsers,
  FaBullseye,
  FaRunning,
  FaSyncAlt,
  FaMapMarkedAlt,
  FaUserCheck,
  FaUserTie,
} from "react-icons/fa";
import { IconType } from "react-icons";

export type ContentKey = "Medal" | "Dumbell" | "Clock";

export const iconComponents: Record<ContentKey, IconType> = {
  Medal: FaMedal,
  Dumbell: FaDumbbell,
  Clock: FaClock,
};

export const contentData: Record<
  ContentKey,
  {
    title: string;
    description: string;
    cards: {
      icon: IconType;
      title: string;
    }[];
    imageSrc: string;
  }
> = {
  Medal: {
    title: "Psicotécnicos <strong>Online</strong> con Método de Élite",
    description:
      "Prepárate con un plan de estudios adaptado a tu ritmo. Accede a psicotécnicos, temarios actualizados y clases en <strong>directo</strong> o <strong>grabadas.</strong>",
    cards: [
      {
        icon: FaClipboardList,
        title:
          "Simulacros <strong>reales</strong> que replican el examen oficial.",
      },
      {
        icon: FaLaptop,
        title:
          "Plataforma exclusiva con <strong>seguimiento personalizado</strong> y <strong>predicción</strong> de tu nota final.",
      },
      {
        icon: FaUsers,
        title:
          "Con profesores y compañeros <strong>activos</strong> para resolver tus dudas en <strong>tiempo real.</strong>",
      },
    ],
    imageSrc: "/media/infoBlockImg1.png",
  },
  Dumbell: {
    title: "Preparación <strong>Física</strong> de Alto Nivel",
    description:
      "Recibe un plan de entrenamiento <strong>personalizado</strong>, enfocado en superar con <strong>garantías</strong> las pruebas físicas de la oposición. Adaptado a tu nivel y objetivos, con seguimiento constante para que progreses de forma <strong>segura</strong> y <strong>eficaz.</strong>",
    cards: [
      {
        icon: FaBullseye,
        title:
          "Diseñado por <strong>entrenadores</strong> de unidades de <strong>élite</strong> del Ejército y la Guardia Civil.",
      },
      {
        icon: FaRunning,
        title:
          "No <strong>solo</strong> te preparamos para las pruebas: te entrenamos para soportar la exigencia del entorno</strong> militar.",
      },
      {
        icon: FaSyncAlt,
        title:
          "Actualización <strong>constante</strong> del contenido para adaptarse a los últimos <strong>cambios</strong> en las pruebas oficiales.",
      },
    ],
    imageSrc: "/media/infoBlockImg2.png",
  },
  Clock: {
    title: "Orientación Militar <strong>24/7</strong>",
    description:
      "Conoce de primera mano, junto a <strong>militares</strong> y <strong>exmilitares</strong> con experiencia, los destinos del Ejército que mejor encajan con tu perfil</strong> y aspiraciones.</strong>",
    cards: [
      {
        icon: FaMapMarkedAlt,
        title: "Conoce las <strong>especialidades</strong>, <strong>destinos</strong> y <strong>trayectorias</strong> posibles.",
      },
      {
        icon: FaUserCheck,
        title:
          "Disfruta de un <strong>acompañamiento <strong>constante desde el inicio hasta tu <strong>incorporación.",
      },
      {
        icon: FaUserTie,
        title:
          "Con la oportunidad de recibir <strong>orientación individual</strong> de un militar en activo, que te guiará para tomar las <strong>decisiones correctas</strong> en función de tu <strong>perfil</strong> y <strong>objetivos.</strong>",
      },
    ],
    imageSrc: "/media/infoBlockImg3.png",
  },
};