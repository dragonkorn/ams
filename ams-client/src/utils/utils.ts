/**
 * Convert a CSV file to a string
 * @param file - The CSV file to convert
 * @returns A promise that resolves to the CSV string
 */
export const CsvToString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      // Try different encodings for Thai language support
      let csv = ''
      try {
        // Try Windows-874 (Thai encoding)
        csv = new TextDecoder('windows-874').decode(binaryStr as ArrayBuffer)
      } catch (error) {
        try {
          // Try ISO-8859-11 (Thai encoding)
          csv = new TextDecoder('iso-8859-11').decode(binaryStr as ArrayBuffer)
        } catch (error) {
          // Fallback to UTF-8 with replacement character
          try {
            csv = new TextDecoder('utf-8', { fatal: false }).decode(binaryStr as ArrayBuffer)
          } catch (error) {
            return reject(error)
          }
        }
      }
      return resolve(csv)
    }
    reader.readAsArrayBuffer(file)
  })
}

export const parseNumber = (val: string) => Number(val.replace(/[^\d.-]+/g, ''));

// Helper function to parse CSV line with proper quote handling
export const parseCSVLine = (line: string): string[] => {
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

export const Sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}