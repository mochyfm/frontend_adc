"use client";
import WidgetBase from "@/components/common/WidgetBase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gatherUserBoardMessages } from "@/services/TelegramService";
import { TelegramBotMessage } from "@/types/CustomTypes";
import "./TelegramWidget.css";
import BotMessageBox from "./BotMessageBox";
import { SOCIAL_MEDIA } from "@/constants";

const LOCAL_KEY = "telegram_messages";
const LOCAL_HASH = "telegram_messages_hash";

// ✅ Función simple para generar un hash
function generateHash(messages: TelegramBotMessage[]): string {
  const raw = JSON.stringify(
    messages.map(({ id, text, date, media_type }) => ({
      id,
      text,
      date,
      media_type,
    }))
  );
  return btoa(unescape(encodeURIComponent(raw))); // UTF-8 seguro
}

const TelegramWidget = () => {
  const router = useRouter();
  const [mensajes, setMensajes] = useState<TelegramBotMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔁 Cargar mensajes desde localStorage (si hay)
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMensajes(parsed);
        setLoading(false);
      } catch (e) {
        console.warn("⚠️ Fallo al parsear mensajes locales");
      }
    }

    // 🔁 Luego pide al servidor y actualiza solo si cambió
    gatherUserBoardMessages()
      .then((fresh) => {
        const newHash = generateHash(fresh);
        const oldHash = localStorage.getItem(LOCAL_HASH);

        if (newHash !== oldHash) {
          localStorage.setItem(LOCAL_KEY, JSON.stringify(fresh));
          localStorage.setItem(LOCAL_HASH, newHash);
          setMensajes(fresh);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <WidgetBase header="Tablón de anuncios">
      <div className="telegram-messages-holder">
        {loading ? (
          <div className="telegram-loading-spinner" />
        ) : mensajes.length === 0 ? (
          <p className="telegram-empty-msg">No new messages.</p>
        ) : (
          mensajes.map((msg) => <BotMessageBox key={msg.id} {...msg} />)
        )}
      </div>

      <button
        onClick={() => router.push(`${SOCIAL_MEDIA.telegram.tablonAnuncios}`)}
        className="telegram-widget-button"
      >
        Ir al tablón de anuncios
      </button>
    </WidgetBase>
  );
};

export default TelegramWidget;
