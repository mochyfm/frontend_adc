import { SOCIAL_MEDIA } from "@/constants";
import React from "react";
import "./TelegramCard.css";

interface TelegramCardProps {
  type: "fc" | "aa" | "psi";
  summary: string;
}

function TelegramCard({ summary, type }: TelegramCardProps) {
  let title = "";
  let link = "";
  let image = "";

  switch (type) {
    case "fc":
      title = "ForoCarros";
      link = SOCIAL_MEDIA.telegram.foroCarros;
      image = "/media/telegram/forocarros.jpg";
      break;
    case "aa":
      title = "Alumnos en Activo";
      link = SOCIAL_MEDIA.telegram.alumnosActivo;
      image = "/media/telegram/alumnos.png";
      break;
    case "psi":
      title = "Psicotécnicos";
      link = SOCIAL_MEDIA.telegram.psicotecnicos;
      image = "/media/telegram/psicotecnicos.png";
      break;
    default:
      return <div>Tipo de canal no válido</div>;
  }

  if (!link) {
    return <div>Enlace no disponible para {title}</div>;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`telegram-card-body ${type}-bg`}
    >
      <img className="telegram-card-img" src={image} />
      <div className="telegram-card-content">
        <h2 className="telegram-card-title">{title}</h2>
        <p className="telegram-card-summary">{summary}</p>
      </div>
    </a>
  );
}

export default TelegramCard;
