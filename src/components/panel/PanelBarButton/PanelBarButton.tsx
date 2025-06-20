"use client";
import React from "react";
import "./PanelBarButton.css";
import { ArmyType } from "@/types/CustomTypes";

interface PanelBarButtonProps {
  buttonText: string;
  buttonContent: string | React.ReactNode;
  link?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  army?: ArmyType;
}

function PanelBarButton({
  buttonText,
  buttonContent,
  link,
  onClick,
  army
}: PanelBarButtonProps) {
  const isImage = typeof buttonContent === "string";

  return (
    <a className="panel-bar-button-body" href={link} onClick={onClick ?? (() => {})}>
      {isImage ? (
        <div
          className="image-background"
          style={{ backgroundImage: `url(${buttonContent})` }}
        >
          <div className={`image-block-text text-${army}`}>{buttonText}</div>
          <div className="image-transparent-layer" />
        </div>
      ) : (
        <div className="image-content">
          <div className={`image-block-text text-${army}`}>{buttonText}</div>
          {buttonContent}
        </div>
      )}
    </a>
  );
}

export default PanelBarButton;
