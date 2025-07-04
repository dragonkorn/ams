export interface DailyFYC {
  // Header information
  fyc: {
    current: number
    mtd: {
      lastYear: number
      currentYear: number
      growthPercentage: number
    }
    ytd: {
      lastYear: number
      currentYear: number
      growthPercentage: number
    }
    monthEndOfLastYear: number
    yearEndOfLastYear: number
  }
  
  // Agent information
  agent: {
    agentId: string
    fullName: string
    ga: string
    current: number
    mtd: {
      lastYear: number
      currentYear: number
      growthPercentage: number
    }
    ytd: {
      lastYear: number
      currentYear: number
      growthPercentage: number
    }
    monthEndOfLastYear: number
    yearEndOfLastYear: number
  }
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
    const columns = line.split(',')
    
    if (columns.length >= 11) {
      const agent: DailyFYC = {
        fyc: {
          current: parseFloat(columns[1] || '0'),
          mtd: {
            lastYear: parseFloat(columns[3] || '0'),
            currentYear: parseFloat(columns[4] || '0'),
            growthPercentage: parseFloat(columns[5] || '0')
          },
          ytd: {
            lastYear: parseFloat(columns[6] || '0'),
            currentYear: parseFloat(columns[7] || '0'),
            growthPercentage: parseFloat(columns[8] || '0')
          },
          monthEndOfLastYear: parseFloat(columns[9] || '0'),
          yearEndOfLastYear: parseFloat(columns[10] || '0')
        },
        agent: {
          agentId: columns[0]?.split(':')[0]?.trim() || '',
          fullName: columns[0]?.split(':')[1]?.trim() || '',
          ga: columns[2] || '',
          current: parseFloat(columns[1] || '0'),
          mtd: {
            lastYear: parseFloat(columns[3] || '0'),
            currentYear: parseFloat(columns[4] || '0'),
            growthPercentage: parseFloat(columns[5] || '0')
          },
          ytd: {
            lastYear: parseFloat(columns[6] || '0'),
            currentYear: parseFloat(columns[7] || '0'),
            growthPercentage: parseFloat(columns[8] || '0')
          },
          monthEndOfLastYear: parseFloat(columns[9] || '0'),
          yearEndOfLastYear: parseFloat(columns[10] || '0')
        }
      }
      
      agents.push(agent)
    }
  }

  // Calculate summary
  const totalCurrent = agents.reduce((sum, agent) => sum + agent.agent.current, 0)
  const totalMTD = agents.reduce((sum, agent) => sum + agent.agent.mtd.currentYear, 0)
  const totalYTD = agents.reduce((sum, agent) => sum + agent.agent.ytd.currentYear, 0)
  const averageGrowthPercentage = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + agent.agent.ytd.growthPercentage, 0) / agents.length 
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
