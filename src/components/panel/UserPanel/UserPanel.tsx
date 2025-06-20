import React from "react";
import "./UserPanel.css";

interface UserPanelProps {
  parentRef: React.RefObject<HTMLDivElement | null>;
}

function UserPanel({ parentRef }: UserPanelProps) {
  return (
    <div className="user-panel-body" ref={parentRef}>
      Hola
    </div>
  );
}

export default UserPanel;
