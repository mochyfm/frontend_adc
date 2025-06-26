import React from "react";
import "./UserPanel.css";
import ScheduleWidget from "./ScheduleWidget";
import TelegramCardsWidget from "./TelegramCardsWidget";
import AptitudesWidget from "./AptitudesWidget";
import ExamsSummaryWidget from "./ExamsSummaryWidget";
import WidgetWrapper from "@/components/common/WidgetBase/WidgetWrapper";
import TelegramWidget from "./TelegramWidget/TelegramWidget";

interface UserPanelProps {
  parentRef: React.RefObject<HTMLDivElement | null>;
}

function UserPanel({ parentRef }: UserPanelProps) {
  return (
    <div className="user-panel-content" ref={parentRef}>
      <ScheduleWidget />
      <WidgetWrapper intervalSeconds={10}>
        {/* <TelegramCardsWidget /> */}
        <TelegramWidget />
      </WidgetWrapper>
      <AptitudesWidget />
      <ExamsSummaryWidget />
    </div>
  );
}

export default UserPanel;
