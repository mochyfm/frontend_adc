import React from "react";
import "./TelegramCardsWidget.css";
import WidgetBase from "@/components/common/WidgetBase";
import TelegramCard from "./TelegramCard/TelegramCard";
import { SOCIAL_MEDIA } from "@/constants";
import { useRouter } from "next/navigation";

function TelegramCardsWidget() {
  const router = useRouter();

  return (
    <WidgetBase header="Grupos de Telegram">
      <div className="telegram-cards-body">
        <TelegramCard
          type="aa"
          summary="Grupo de Orientación Militar. Dedicado a dudas militares y relacionadas con la orientación militar únicamente."
        />
        <TelegramCard
          type="psi"
          summary="Grupo de Psicotécnicos. Dedicado a dudas relacionadas con las clases de psicotécnicos y los tests por bloques. Para las dudas de Simulacros esperar a la clase de resolución del mismo."
        />
        <TelegramCard
          type="fc"
          summary="Grupo Social de la academia. Se prohibe totalmente cualquier tema político, al igual que tratar temas sobre razas, religiones, sexo… etc. Se exige tener 2 dedos de frente y no tratar temas que discriminen a ningún miembro de la academia."
        />
      </div>
      <button
        onClick={() => router.push(`${SOCIAL_MEDIA.telegram.tablonAnuncios}`)}
        className="telegram-cards-button"
      >
        Ir al tablón de anuncios
      </button>
    </WidgetBase>
  );
}

export default TelegramCardsWidget;
