import { parseCSVLine, parseNumber } from "../utils/utils"

export interface DailyCase {
  agentId: string,
  ga: string,
  mtd: {
    lastYear: number,
    currentYear: number,
    growthPercentage: number,
    cmtdSub: number,
  },
  ytd: {
    lastYear: number,
    currentYear: number,
    growthPercentage: number,
  },
  cytdSub: number,
  cmtd: number,
  cytd: number,
  monthEndOfLastYear: number,
  yearEndOfLastYear: number,
}

export const parseDailyCaseFromCSV = (csvData: string): DailyCase[] => {
  const lines = csvData.split('\n').filter(line => line.trim() !== '')

  if (lines.length < 2) {
    throw new Error('Invalid CSV format: insufficient data')
  }

  const cases: DailyCase[] = []


  for (let i = 2; i < lines.length; i++) {
    const line = lines[i]
    const columns = parseCSVLine(line)

    if (columns.length < 14) continue



    const caseRecord: DailyCase = {
      agentId: columns[0].split(':')[0].trim(),
      ga: columns[1].replace(/"/g, '').trim(),
      mtd: {
        lastYear: parseNumber(columns[2]),
        currentYear: parseNumber(columns[3]),
        growthPercentage: parseNumber(columns[4]),
        cmtdSub: parseNumber(columns[5]),
      },
      ytd: {
        lastYear: parseNumber(columns[6]),
        currentYear: parseNumber(columns[7]),
        growthPercentage: parseNumber(columns[8]),
      },
      cytdSub: parseNumber(columns[9]),
      cmtd: parseNumber(columns[10]),
      cytd: parseNumber(columns[11]),
      monthEndOfLastYear: parseNumber(columns[12]),
      yearEndOfLastYear: parseNumber(columns[13]),
    }

    cases.push(caseRecord)
  }

  return cases
}
