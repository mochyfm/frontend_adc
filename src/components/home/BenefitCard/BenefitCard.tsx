import React from "react";
import "./BenefitCard.css";

interface BenefitCardProps {
  title: string;
  content?: string;
  contentFontSize?: string;
}

function BenefitCard({ title, content, contentFontSize }: BenefitCardProps) {
  return (
    <div className="benefit-card-body">
      <h4
        className="benefit-card-title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {content && (
        <div
          className="benefit-card-content"
          style={contentFontSize ? { fontSize: contentFontSize } : undefined}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
    </div>
  );
}

export default BenefitCard;
