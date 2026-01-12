export interface Stop {
  stop_id: string;
  stop_code: string;
  stop_name: string;
  stop_lat: number;
  stop_lon: number;
  location_type: string;
  parent_station: string;
  wheelchair_boarding: number;
  level_id: string;
  platform_code: string;
}

export interface TripResponse {
  error?: ErrorInfo;
  journeys: Journey[];
  systemMessages?: ResponseMessage[];
  version: string;
}

/* ---------- Error ---------- */

export interface ErrorInfo {
  message: string;
  versions: {
    controller: string;
    interfaceMax: string;
    interfaceMin: string;
  };
}

/* ---------- Journeys ---------- */

export interface Journey {
  isAdditional: boolean;
  legs: Leg[];
  rating: number;
}

/* ---------- Legs ---------- */

export interface Leg {
  coords: number[][];
  destination: Stop;
  distance: number;
  duration: number;
  footPathInfo?: FootPathInfo[];
  hints?: Hint[];
  infos?: Info[];
  interchange?: Interchange;
  isRealtimeControlled: boolean;
  origin: Stop;
  pathDescriptions?: PathDescription[];
  properties?: LegProperties;
  stopSequence?: Stop[];
  transportation?: Transportation;
}

/* ---------- Stops ---------- */

export interface Stop {
  arrivalTimeEstimated?: string;
  arrivalTimePlanned?: string;
  departureTimeEstimated?: string;
  departureTimePlanned?: string;
  coord: number[];
  disassembledName: string;
  id: string;
  name: string;
  parent?: StopParent;
  properties?: StopProperties;
  type: "poi";
}

export interface StopParent {
  disassembledName: string;
  id: string;
  name: string;
  parent: string;
  type: "poi";
}

export interface StopProperties {
  WheelchairAccess?: "true" | "false";
  downloads?: Download[];
  NumberOfCars?: string;
}

export interface Download {
  type: string;
  url: string;
}

/* ---------- Footpaths ---------- */

export interface FootPathInfo {
  duration: number;
  footPathElem: FootPathElement[];
  position: "BEFORE" | "AFTER";
}

export interface FootPathElement {
  description: string;
  destination: FootPathLocation;
  level: "UP" | "DOWN" | "LEVEL";
  levelFrom: number;
  levelTo: number;
  origin: FootPathLocation;
  type: "ESCALATOR" | "STAIRS" | "ELEVATOR" | string;
}

export interface FootPathLocation {
  area: number;
  georef: string;
  location: {
    coord: number[];
    id: string;
    type: "poi";
  };
  platform: number;
}

/* ---------- Hints & Infos ---------- */

export interface Hint {
  infoText: string;
}

export interface Info {
  content: string;
  id: string;
  priority: "veryLow" | "low" | "normal" | "high";
  subtitle: string;
  timestamps: {
    availability: {
      from: string;
      to: string;
    };
    creation: string;
    lastModification: string;
    validity: {
      from: string;
      to: string;
    }[];
  };
  url: string;
  urlText: string;
  version: number;
}

/* ---------- Interchange ---------- */

export interface Interchange {
  coords: number[][];
  desc: string;
  type: number;
}

/* ---------- Path Descriptions ---------- */

export interface PathDescription {
  coord: number[];
  cumDistance: number;
  cumDuration: number;
  distance: number;
  distanceDown: number;
  distanceUp: number;
  duration: number;
  fromCoordsIndex: number;
  manoeuvre: "LEAVE" | "CONTINUE" | string;
  name: string;
  skyDirection: number;
  toCoordsIndex: number;
  turnDirection: "UNKNOWN" | "LEFT" | "RIGHT" | string;
}

/* ---------- Leg Properties ---------- */

export interface LegProperties {
  DIFFERENT_FARES?: string;
  PlanLowFloorVehicle?: string;
  PlanWheelChairAccess?: string;
  lineType?: string;
  vehicleAccess?: string[];
}

/* ---------- Transportation ---------- */

export interface Transportation {
  description: string;
  destination: {
    id: string;
    name: string;
  };
  disassembledName: string;
  iconId: number;
  id: string;
  name: string;
  number: string;
  operator: {
    id: string;
    name: string;
  };
  product: {
    class: number;
    iconId: number;
    name: string;
  };
  properties?: {
    isTTB?: boolean;
    tripCode?: number;
  };
}

/* ---------- System Messages ---------- */

export interface ResponseMessage {
  code: number;
  error: string;
  module: string;
  type: string;
  text: string;
}
