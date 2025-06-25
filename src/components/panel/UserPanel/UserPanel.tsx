import React from "react";
import "./UserPanel.css";
import ScheduleWidget from "./ScheduleWidget";
import ReminderWidget from "./ReminderWidget";
import AptitudesWidget from "./AptitudesWidget";
import ExamsSummaryWidget from "./ExamsSummaryWidget";
import WidgetWrapper from "@/components/common/WidgetBase/WidgetWrapper";

interface UserPanelProps {
  parentRef: React.RefObject<HTMLDivElement | null>;
}

function UserPanel({ parentRef }: UserPanelProps) {
  return (
    <div className="user-panel-content" ref={parentRef}>
      <ScheduleWidget />
      <WidgetWrapper intervalSeconds={5}>
        <ReminderWidget />
        <ScheduleWidget />
      </WidgetWrapper>
      <AptitudesWidget />
      <ExamsSummaryWidget />
    </div>
  );
}

export default UserPanel;
