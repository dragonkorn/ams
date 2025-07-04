export interface DailyFYC {
  // Agent information
  agent: {
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

  // Helper function to parse CSV line with proper quote handling
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  };

  // Skip header lines and process agent data
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i]
    const columns = parseCSVLine(line)

    if (columns.length >= 11) {
      const parseNumber = (val: string) => Number(val.replace(/[^\d.-]+/g, ''));

      const agent: DailyFYC = {
        agent: {
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
      }
      // console.log({ line, columns, agent })

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
