import { useCallback, useState } from "react"
import UploadArea from "../Inputs/UploadArea"
import ContainerHeader from "../Labels/ContainerHeader"
import Container from "../Layouts/Container"
import { parseDailyFYCFromCSV, type DailyFYCData } from "../../entities/daily_fyc"
import { CsvToString } from "../../utils/utils"
import { parseDailyFYPFromCSV, type DailyFYP } from "../../entities/daily_fyp"
import { parseDailyCaseFromCSV, type DailyCase } from "../../entities/daily_case"

const AmsFormUpload = ({
  onSubmit = () => { },
}: {
  onSubmit?: (
    dailyFYC: DailyFYCData,
    dailyFYCLife: DailyFYCData,
    dailyFYP: DailyFYP[],
    dailyCase: DailyCase[],
  ) => void
}) => {

  const [dailyFYCFile, setDailyFYCFile] = useState<File | null>(null)
  const [dailyFYCLifeFile, setDailyFYCLifeFile] = useState<File | null>(null)
  const [dailyFYPFile, setDailyFYPFile] = useState<File | null>(null)
  const [dailyCaseFile, setDailyCaseFile] = useState<File | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(() => {
    // verify dailyFYCFile and dailyFYPFile are not null
    if (!dailyFYCFile || !dailyFYCLifeFile || !dailyFYPFile || !dailyCaseFile) {
      const missingFiles = []
      if (!dailyFYCFile) missingFiles.push('Daily FYC')
      if (!dailyFYCLifeFile) missingFiles.push('Daily FYC (only Life)')
      if (!dailyFYPFile) missingFiles.push('Daily FYP')
      if (!dailyCaseFile) missingFiles.push('Daily Case')
      alert(`Please upload all required files: ${missingFiles.join(', ')}`)
      return
    }

    setIsLoading(true)

    if (typeof onSubmit === 'function') {
      Promise.all([
        CsvToString(dailyFYCFile),
        CsvToString(dailyFYCLifeFile),
        CsvToString(dailyFYPFile),
        CsvToString(dailyCaseFile)
      ]).then(([dailyFYCData, dailyFYCLifeData, dailyFYPData, dailyCaseData]) => {
        const dailyFYCDataParsed = parseDailyFYCFromCSV(dailyFYCData)
        const dailyFYCLifeDataParsed = parseDailyFYCFromCSV(dailyFYCLifeData)
        const dailyFYPDataParsed = parseDailyFYPFromCSV(dailyFYPData)
        const dailyCaseDataParsed = parseDailyCaseFromCSV(dailyCaseData)
        onSubmit(
          dailyFYCDataParsed,
          dailyFYCLifeDataParsed,
          dailyFYPDataParsed,
          dailyCaseDataParsed,
        )
      }).catch((error) => {
        console.error(error)
        alert('Error parsing files. Please check the files and try again.')
      }).finally(() => {
        setIsLoading(false)
      })

      return
    }
  }, [dailyFYCFile, dailyFYCLifeFile, dailyFYPFile, dailyCaseFile])

  return (
    <Container>
      <ContainerHeader
        title="Upload Report Files"
      >
        <button
          className=" text-white px-4 py-2 rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </ContainerHeader>

      <div className="h-4" />

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <UploadArea
          className="w-full md:w-1/2"
          title="Upload Daily FYC File"
          onUpload={(file) => setDailyFYCFile(file)}
        />
        <UploadArea
          className="w-full md:w-1/2"
          title="Upload Daily FYC (only Life) File"
          onUpload={(file) => setDailyFYCLifeFile(file)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <UploadArea
          className="w-full md:w-1/2"
          title="Upload Daily Case File"
          onUpload={(file) => setDailyCaseFile(file)}
        />
        <UploadArea
          className="w-full md:w-1/2"
          title="Upload Daily FYP File"
          onUpload={(file) => setDailyFYPFile(file)}
        />
      </div>
    </Container>
  )
}

export default AmsFormUpload