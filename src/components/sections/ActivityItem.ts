
export type ActivityType = "financeiro" | "reserva" | "comunicado" | "ocorrencia";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: ActivityType;
}
