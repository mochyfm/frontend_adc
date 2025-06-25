"use client";
import React from "react";
import "./PanelBarButton.css";
import { ArmyType } from "@/types/CustomTypes";
import { useRouter } from "next/navigation";

interface PanelBarButtonProps {
  buttonText: string;
  buttonContent: string | React.ReactNode;
  link?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  army?: ArmyType;
}

function PanelBarButton({
  buttonText,
  buttonContent,
  link,
  onClick,
  army,
}: PanelBarButtonProps) {
  const isImage = typeof buttonContent === "string";
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (link) {
      router.push(link);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button className="panel-bar-button-body" onClick={handleClick}>
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
    </button>
  );
}

export default PanelBarButton;
