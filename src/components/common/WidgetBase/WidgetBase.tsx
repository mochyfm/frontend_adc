import React, { ReactNode } from "react";
import "./WidgetBase.css";

type WidgetBaseProps = {
  children: ReactNode;
  header?: string;
};

const WidgetBase: React.FC<WidgetBaseProps> = ({ children, header }) => {
  return (
    <div className="widget-body">
      {header && (
        <div className="widget-header">
          <h2>{header}</h2>
        </div>
      )}
      {children}
    </div>
  );
};

export default WidgetBase;
