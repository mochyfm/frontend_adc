import React, { ReactNode } from "react";
import "./WidgetBase.css";

type WidgetBaseProps = {
  children: ReactNode;
};

const WidgetBase: React.FC<WidgetBaseProps> = ({ children }) => {
  return <div className="widget-body">{children}</div>;
};

export default WidgetBase;
