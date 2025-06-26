import { TelegramBotMessage } from "@/types/CustomTypes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; // 👈 ¡Este es el clave!
import React from "react";
import "./TelegramCardsWidget.css";

function TelegramCardsWidget({
  id,
  date,
  media_type,
  text,
  user,
}: TelegramBotMessage) {
  return (
    <div>

    </div>
  );
}

export default TelegramCardsWidget;
