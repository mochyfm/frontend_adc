import { TelegramBotMessage } from "@/types/CustomTypes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; // 👈 ¡Este es el clave!
import React from "react";
import "./TelegramCardsWidget.css";
import WidgetBase from "@/components/common/WidgetBase";

function TelegramCardsWidget() {
  return (
    <WidgetBase>
      <div>A</div>
    </WidgetBase>
  );
}

export default TelegramCardsWidget;
