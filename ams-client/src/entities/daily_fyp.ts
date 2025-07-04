export interface DailyFYP {
  // Agent information
  agentId: string;
  fullname: string;
  ga: string;

  // MTD (Month to Date) data
  mtdLastYear: number;
  mtdCurrentYear: number;
  mtdGrowthPercent: number;
  mtdCmtdSub: number;

  // YTD (Year to Date) data
  ytdLastYear: number;
  ytdCurrentYear: number;
  ytdGrowthPercent: number;
  ytdCytdSub: number;

  // Paid vs Sub data
  cmtd: number;
  cytd: number;
  monthEndLastYear: number;
  yearEndLastYear: number;
}

// Helper function to parse CSV data
export const parseDailyFYPFromCSV = (csvData: string): DailyFYP[] => {
  // console.log({ csvData })
  const lines = csvData.split('\n').filter(line => line.trim() !== '');
  console.log({ lines })

  if (lines.length < 3) {
    throw new Error('Invalid CSV format: insufficient data');
  }

  const agents: DailyFYP[] = [];

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
    const line = lines[i];
    const columns = parseCSVLine(line);

    if (columns.length < 14) continue;

    // agentId : fullname
    const agentInfo = columns[0].split(':');
    const agentId = agentInfo[0].trim();
    const fullname = agentInfo[1] ? agentInfo[1].trim() : '';

    const parseNumber = (val: string) => Number(val.replace(/[^\d.-]+/g, ''));

    const agent: DailyFYP = {
      agentId,
      fullname,
      ga: columns[1].replace(/"/g, '').trim(),
      mtdLastYear: parseNumber(columns[2]),
      mtdCurrentYear: parseNumber(columns[3]),
      mtdGrowthPercent: parseNumber(columns[4]),
      mtdCmtdSub: parseNumber(columns[5]),
      ytdLastYear: parseNumber(columns[6]),
      ytdCurrentYear: parseNumber(columns[7]),
      ytdGrowthPercent: parseNumber(columns[8]),
      ytdCytdSub: parseNumber(columns[9]),
      cmtd: parseNumber(columns[10]),
      cytd: parseNumber(columns[11]),
      monthEndLastYear: parseNumber(columns[12]),
      yearEndLastYear: parseNumber(columns[13]),
    }

    agents.push(agent);
  }

  return agents;
};
