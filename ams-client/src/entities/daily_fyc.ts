import { parseCSVLine, parseNumber } from "../utils/utils"

export interface DailyFYC {
  // Agent information
  agentId: string
  fullName: string
  ga: string
  current: number
  lastYear: number
  mtd: {
    currentYear: number
    growthPercentage: number
    lastYear: number
  }
  ytd: {
    currentYear: number
    growthPercentage: number
  }
  monthEndOfLastYear: number
  yearEndOfLastYear: number
}

export interface DailyFYCData {
  agents: DailyFYC[]
  summary: {
    totalCurrent: number
    totalMTD: number
    totalYTD: number
    averageGrowthPercentage: number
  }
}

// Helper function to parse CSV data
export const parseDailyFYCFromCSV = (csvData: string): DailyFYCData => {
  const lines = csvData.split('\n').filter(line => line.trim() !== '')

  if (lines.length < 2) {
    throw new Error('Invalid CSV format: insufficient data')
  }

  const agents: DailyFYC[] = []

  // Skip header lines and process agent data
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i]
    const columns = parseCSVLine(line)

    if (columns.length >= 11) {

      const agent: DailyFYC = {
        agentId: columns[0]?.split(':')[0]?.trim() || '',
        fullName: columns[0]?.split(':')[1]?.trim() || '',
        ga: columns[1] || '',
        current: parseNumber(columns[2] || '0'),
        lastYear: parseNumber(columns[3] || '0'),
        mtd: {
          currentYear: parseNumber(columns[4] || '0'),
          growthPercentage: parseNumber(columns[5] || '0'),
          lastYear: parseNumber(columns[6] || '0'),
        },
        ytd: {
          currentYear: parseNumber(columns[7] || '0'),
          growthPercentage: parseNumber(columns[8] || '0')
        },
        monthEndOfLastYear: parseNumber(columns[9] || '0'),
        yearEndOfLastYear: parseNumber(columns[10] || '0')
      }
      // console.log({ line, columns, agent })

      agents.push(agent)
    }
  }

  // Calculate summary
  const totalCurrent = agents.reduce((sum, agent) => sum + agent.current, 0)
  const totalMTD = agents.reduce((sum, agent) => sum + agent.mtd.currentYear, 0)
  const totalYTD = agents.reduce((sum, agent) => sum + agent.ytd.currentYear, 0)
  const averageGrowthPercentage = agents.length > 0
    ? agents.reduce((sum, agent) => sum + agent.ytd.growthPercentage, 0) / agents.length
    : 0

  return {
    agents,
    summary: {
      totalCurrent,
      totalMTD,
      totalYTD,
      averageGrowthPercentage
    }
  }
}