import { Mars, NonBinary, Venus } from "lucide-react";

export const defaultDarkModeLogo = "./logos/logo_atomic_crm_dark.svg";
export const defaultLightModeLogo = "./logos/logo_atomic_crm_light.svg";

export const defaultTitle = "Atomic CRM";

export const defaultCompanySectors = [
  "Communication Services",
  "Consumer Discretionary",
  "Consumer Staples",
  "Energy",
  "Financials",
  "Health Care",
  "Industrials",
  "Information Technology",
  "Materials",
  "Real Estate",
  "Utilities",
];

export const defaultDealStages = [
  // 🟦 Prospección / contacto
  {
    value: "leads",
    label: "Leads",
    className: "border-blue-500 bg-blue-50/50",
  },
  {
    value: "en-proceso-de-contacto",
    label: "En Proceso de Contacto",
    className: "border-blue-500 bg-blue-50/50",
  },
  {
    value: "en-proceso-de-agendamiento",
    label: "En proceso de agendamiento",
    className: "border-blue-500 bg-blue-50/50",
  },
  {
    value: "no-responde",
    label: "No responde",
    className: "border-slate-500 bg-slate-50/50",
  },
  {
    value: "no-asistio-a-reunion",
    label: "No asistio a reunion",
    className: "border-slate-500 bg-slate-50/50",
  },

  // 🟪 Reunión / asesoría
  {
    value: "asesoria-agendada",
    label: "Asesoria agendada",
    className: "border-violet-500 bg-violet-50/50",
  },

  // 🟧 Documentación / validación
  {
    value: "documentos-solicitados",
    label: "Documentos solicitados",
    className: "border-amber-500 bg-amber-50/50",
  },
  {
    value: "calificados",
    label: "Calificados",
    className: "border-amber-500 bg-amber-50/50",
  },
  {
    value: "presentacion-de-proyectos-agendada",
    label: "Presentacion de proyectos agendada",
    className: "border-amber-500 bg-amber-50/50",
  },

  // 🟩 Propuesta / visita / evaluación
  {
    value: "propuestas-enviadas",
    label: "Propuestas enviadas",
    className: "border-emerald-500 bg-emerald-50/50",
  },
  {
    value: "visita-agendada",
    label: "Visita agendada",
    className: "border-emerald-500 bg-emerald-50/50",
  },
  {
    value: "evaluando-documentos",
    label: "Evaluando documentos",
    className: "border-emerald-500 bg-emerald-50/50",
  },

  // ✅ Cierre
  {
    value: "reserva",
    label: "Reserva",
    className: "border-green-600 bg-green-50/50",
  },
  {
    value: "promesa",
    label: "Promesa",
    className: "border-green-600 bg-green-50/50",
  },
  {
    value: "escritura",
    label: "Escritura",
    className: "border-green-600 bg-green-50/50",
  },

  // 🔴 Perdidos / pausados / error
  {
    value: "caidos",
    label: "Caidos",
    className: "border-red-600 bg-red-50/50",
  },
  {
    value: "congelados",
    label: "Congelados",
    className: "border-zinc-500 bg-zinc-50/50",
  },
  {
    value: "informacion-con-error",
    label: "Informacion con error",
    className: "border-orange-600 bg-orange-50/50",
  },

  // 🏁 Ganados
  {
    value: "me-compro",
    label: "Me compro",
    className: "border-lime-700 bg-lime-50/60",
  },
  {
    value: "ya-compro",
    label: "Ya compro",
    className: "border-lime-700 bg-lime-50/60",
  },
];

export const defaultDealPipelineStatuses = ["ya-compro"];

export const defaultDealCategories = [
  "Other",
  "Copywriting",
  "Print project",
  "UI Design",
  "Website design",
];

export const defaultNoteStatuses = [
  { value: "cold", label: "Cold", color: "#7dbde8" },
  { value: "warm", label: "Warm", color: "#e8cb7d" },
  { value: "hot", label: "Hot", color: "#e88b7d" },
  { value: "in-contract", label: "In Contract", color: "#a4e87d" },
];

export const defaultTaskTypes = [
  "None",
  "Email",
  "Demo",
  "Lunch",
  "Meeting",
  "Follow-up",
  "Thank you",
  "Ship",
  "Call",
];

export const defaultContactGender = [
  { value: "male", label: "He/Him", icon: Mars },
  { value: "female", label: "She/Her", icon: Venus },
  { value: "nonbinary", label: "They/Them", icon: NonBinary },
];
