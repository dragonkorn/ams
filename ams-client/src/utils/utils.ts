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
      console.log(binaryStr)
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

export const Sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}