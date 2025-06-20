import React from "react";
import "./GroupPanel.css";

interface GroupPanelProps {
  children: React.ReactNode;
  groupText?: string;
}

function GroupPanel({ children, groupText }: GroupPanelProps) {
  return (
    <div className="group-panel">
      {groupText?.trim() !== "" && groupText && (
        <div className="group-panel-header">
          <h2>{groupText}</h2>
          <div className="line" />
        </div>
      )}
      {children}
    </div>
  );
}

export default GroupPanel;
