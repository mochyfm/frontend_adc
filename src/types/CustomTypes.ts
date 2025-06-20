export type Empleo =
  // Compartido
  | "Soldado"
  | "Cabo"
  | "Cabo Primero"
  | "Cabo Mayor"
  | "Sargento"
  | "Sargento Primero"
  | "Brigada"
  | "Subteniente"
  | "Suboficial Mayor"
  | "Alférez"
  | "Teniente"
  | "Capitán"
  | "Comandante"
  | "Teniente Coronel"
  | "Coronel"

  // Ejército de Tierra
  | "General de Brigada"
  | "General de División"
  | "Teniente General"
  | "General del Ejército"

  // Armada
  | "Marinero"
  | "Alférez de Fragata"
  | "Alférez de Navío"
  | "Teniente de Navío"
  | "Capitán de Corbeta"
  | "Capitán de Fragata"
  | "Capitán de Navío"
  | "Comodoro"
  | "Contralmirante"
  | "Vicealmirante"
  | "Almirante"
  | "Almirante General"
  | "Capitán General"

  // Ejército del Aire
  | "General de Brigada Aérea"
  | "General de División Aérea"
  | "Teniente General"
  | "General del Aire";

export interface EmpleoInfo {
  nombre: Empleo;
  scale: "Tropa y Marinería" | "Suboficiales" | "Oficiales";
  insigniaUrl: string;
  army?:
    | "Ejército de Tierra"
    | "Armada"
    | "Infantería Marina"
    | "Ejército del Aire y Espacio";
}

// Plan Cards (/Home)

export interface PlanCard {
  label?: string;
  cardTitle: string;
  planAttributes: PlanAttribute[];
  buttonText: string;
  redirectsTo: string;
  planType?: PlanCardColor;
}

export interface PlanAttribute {
  typeOfAttribute: AttributeType;
  content: string;
}

export interface PlanCardProps extends PlanCard {}

export type AttributeType = "Positive" | "Negative";
export type PlanCardColor = "Complete" | "Pro";

export type ArmyType = "ET" | "Armada" | "EA"