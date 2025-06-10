import React from "react";
import { IconType } from "react-icons";
import "./InformationPanelCard.css";

interface InformationCardProps {
  icon: IconType;
  title: string;
  className?: string;
}

const InformationPanelCard: React.FC<InformationCardProps> = ({
  icon: Icon,
  title,
  className = "",
}) => {
  return (
    <div className={`card-body ${className}`}>
      <div className="card-body-left">
        <Icon className="card-icon" />
      </div>
      <div className="card-body-right">
        <div
          className="card-title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </div>
  );
};

export default InformationPanelCard;
