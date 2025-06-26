import { TelegramBotMessage } from "@/types/CustomTypes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; // 👈 ¡Este es el clave!
import React from "react";
import "./BotMessageBox.css";
import { useRouter } from "next/navigation";
import { SOCIAL_MEDIA } from "@/constants";

function BotMessageBox({
  id,
  date,
  media_type,
  text,
  user,
}: TelegramBotMessage) {
  const router = useRouter();

  return (
    <div className="telegram-message">
      <p className="telegram-message-date">{new Date(date).toLocaleString().replace(',', ' -')}</p>

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]} // 👈 Añadir breaks
        components={{
          p: ({ node, ...props }) => (
            <p className="telegram-message-text" {...props} />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-link"
            >
              {children}
            </a>
          ),
        }}
      >
        {text || ""}
      </ReactMarkdown>

      {media_type === "image" && (
        <span className="telegram-tag">
          📷 Imagen adjunta{" "}
          <a className="telegram-direct-link" href={`${SOCIAL_MEDIA.telegram.tablonAnuncios}`}>
            (Ver en telegram)
          </a>
        </span>
      )}
      {media_type === "file" && (
        <span className="telegram-tag">
          📎 Archivo adjunto{" "}
          <a className="telegram-direct-link" href={`${SOCIAL_MEDIA.telegram.tablonAnuncios}`}>
            (Ver en telegram)
          </a>
        </span>
      )}
    </div>
  );
}

export default BotMessageBox;
