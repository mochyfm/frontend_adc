"use client";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./PlanCard.css";
import { AttributeType, PlanCardProps } from "@/types/CustomTypes";
import { forwardRef } from "react";

const renderTypeOfIcon = (iconType: AttributeType) => {
  if (iconType === "Positive") return <FaCheck />;
  if (iconType === "Negative") return <FaTimes />;
  return null;
};

const PlanCard = forwardRef<HTMLDivElement, PlanCardProps>(function PlanCard(
  {
    label,
    cardTitle,
    planAttributes,
    redirectsTo,
    buttonText,
    planType,
  }: PlanCardProps,
  ref
) {
  const planTypeClass = planType ? `${planType.toLowerCase()}-plan-card` : "";

  return (
    <div className={`plan-card ${planTypeClass}`} ref={ref}>
      {label && label.trim() !== "" && (
        <div className={`plan-card-label ${planTypeClass}`}>{label}</div>
      )}
      <h4 className="plan-card-title">{cardTitle}</h4>
      {planAttributes.map(({ content, typeOfAttribute }, idx) => (
        <div className={`plan-card-attribute ${typeOfAttribute.toLowerCase()}`} key={idx}>
          <div className={`plan-card-attribute-icon ${planTypeClass}`}>
            {renderTypeOfIcon(typeOfAttribute)}
          </div>
          <div
            className="plan-card-attribute-text"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      ))}
      <a className={`plan-card-button ${planTypeClass}`} href={redirectsTo}>
        {buttonText}
      </a>
    </div>
  );
});

export default PlanCard;
