import type { DailyCase } from "./daily_case"
import type { DailyFYC, DailyFYCData } from "./daily_fyc"
import type { DailyFYP } from "./daily_fyp"

export interface AgentReportEntity {
  agentId: string,
  fullName: string,

  yearToDate: {
    case: number,
    fyp: number,
    fyc: number,
    fycLife: number,
  },
  monthToDate: {
    caseLifeSubmitted: number,
    caseLifeApproved: number,
    fypLifeSubmitted: number,
    fypLifeApproved: number,
    fycAll: number,
    fycLife: number,
  }
}

export interface amsReport {
  agentReport: AgentReportEntity[],
}


const makeAgentIdMap = <T extends { agentId: string }>(data: T[]): Map<string, T> => {
  const agentIdMap = new Map<string, T>()
  data.forEach((agent) => {
    agentIdMap.set(agent.agentId, agent)
  })
  return agentIdMap
}

export const constructAgentReports = (
  dailyFYCData: DailyFYCData,
  dailyFYCLifeData: DailyFYCData,
  dailyFYP: DailyFYP[],
  dailyCase: DailyCase[],
): AgentReportEntity[] => {
  const dailyFYC = dailyFYCData.agents
  const dailyFYCLife = dailyFYCLifeData.agents

  // make map of agentId for each input
  const dailyFYCMap = makeAgentIdMap<DailyFYC>(dailyFYC)
  const dailyFYCLifeMap = makeAgentIdMap<DailyFYC>(dailyFYCLife)
  const dailyFYPMap = makeAgentIdMap<DailyFYP>(dailyFYP)
  const dailyCaseMap = makeAgentIdMap<DailyCase>(dailyCase)

  // construct agent report
  const reports: AgentReportEntity[] = []

  console.log('dailyFYCMap: ', dailyFYCMap)
  console.log('dailyFYCLifeMap: ', dailyFYCLifeMap)
  console.log('dailyFYPMap: ', dailyFYPMap)
  console.log('dailyCaseMap: ', dailyCaseMap)

  // iterate over dailyFYCMap
  for (const agentId of dailyFYCMap.keys()) {
    const dailyFYC = dailyFYCMap.get(agentId)
    const dailyFYCLife = dailyFYCLifeMap.get(agentId)
    const dailyFYP = dailyFYPMap.get(agentId)
    const dailyCase = dailyCaseMap.get(agentId)
    if (!dailyFYC || !dailyFYCLife || !dailyFYP || !dailyCase) {
      continue
    }

    const agentReport: AgentReportEntity = {
      agentId: dailyFYC.agentId,
      fullName: dailyFYC.fullName,
      yearToDate: {
        case: dailyCase.ytd.currentYear,
        fyp: dailyFYP.ytdCytdSub,
        fyc: dailyFYC.ytd.currentYear,
        fycLife: dailyFYCLife.ytd.currentYear,
      },
      monthToDate: {
        caseLifeSubmitted: dailyCase.mtd.cmtdSub,
        caseLifeApproved: dailyCase.mtd.currentYear,
        fypLifeSubmitted: dailyFYP.mtdCmtdSub,
        fypLifeApproved: dailyFYP.mtdCurrentYear,
        fycAll: dailyFYC.mtd.currentYear,
        fycLife: dailyFYCLife.mtd.currentYear,
      },
    }

    reports.push(agentReport)
  }
  return reports
}