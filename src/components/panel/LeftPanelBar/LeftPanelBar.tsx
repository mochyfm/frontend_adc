"use client";
import { FaBars } from "react-icons/fa";
import "./LeftPanelBar.css";
import UserProfileCard from "./UserProfileCard";
import PanelBarButton from "./PanelBarButton";
import GroupPanel from "./GroupPanel";

interface LeftPanelProps {
  togglePanel: () => void;
  isOpen: boolean;
  parentRef: React.RefObject<HTMLDivElement | null>;
  toggleSearchComponent ?: () => void;
}

function LeftPanelBar({ isOpen, togglePanel, parentRef, toggleSearchComponent }: LeftPanelProps) {
  return (
    <>
      <div className="left-panel-bar-body">
        <button className="left-panel-bar-toggle-button" onClick={togglePanel}>
          <FaBars />
        </button>
        <div className="left-panel-bar" ref={parentRef}>
          <GroupPanel>
            <UserProfileCard />
            <PanelBarButton
              buttonText="Buscar"
              buttonContent=""
              onClick={toggleSearchComponent}
            />
          </GroupPanel>

          <GroupPanel groupText="Clases Obligatorias">
            <PanelBarButton
              link="/info/orientaciones"
              buttonText="Normas de las orientaciones"
              buttonContent="/media/panelAlumnos/imagenOrientaciones.png"
            />
            <PanelBarButton
              link="/info/proceso-selectivo"
              buttonText="El proceso selectivo"
              buttonContent="/media/panelAlumnos/imagenProceso.png"
            />
            <PanelBarButton
              link="/info/documentacion"
              buttonText="Documentación a aportar"
              buttonContent="/media/panelAlumnos/imagenDocumentacion.png"
            />
          </GroupPanel>

          <GroupPanel groupText="Clases Orientaciones">
            <PanelBarButton
              army="ET"
              link="/orientaciones/ejercito-tierra"
              buttonText="Orientaciones Ejército de Tierra"
              buttonContent="/common/ejercitos/Tierra.png"
            />
            <PanelBarButton
              army="Armada"
              link="/orientaciones/armada-imt"
              buttonText="Orientaciones Armada e Imt"
              buttonContent="/common/ejercitos/Armada.png"
            />
            <PanelBarButton
              army="EA"
              link="/orientaciones/ejercito-aire"
              buttonText="Orientaciones Ejército del Aire"
              buttonContent="/common/ejercitos/Aire.png"
            />
          </GroupPanel>

          <GroupPanel groupText="Clases Psicotécnicos">
            <PanelBarButton
              link="/psicotecnicos/intensivo"
              buttonText="Clases del Intensivo"
              buttonContent="/media/panelAlumnos/imagenIntensivo.png"
            />
            <PanelBarButton
              link="/psicotecnicos/aptitud"
              buttonText="Clases por aptitud"
              buttonContent="/media/panelAlumnos/imagenAptitud.png"
            />
            <PanelBarButton
              link="/psicotecnicos/repaso"
              buttonText="Clases de repaso"
              buttonContent="/media/panelAlumnos/imagenPsicotecnicos.png"
            />
          </GroupPanel>
        </div>
      </div>
    </>
  );
}

export default LeftPanelBar;
