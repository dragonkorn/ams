import type { MonthType } from "../utils/constant";

export interface Agent {
  agentId: string,
  fullName: string,
}

export type MonthlyActiveType = Map<MonthType, number>;

export interface AgentMonthlyActive {
  agentId: string,
  monthlyActive: MonthlyActiveType,
}