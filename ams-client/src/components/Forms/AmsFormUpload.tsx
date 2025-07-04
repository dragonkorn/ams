import { useState } from "react"
import UploadArea from "../Inputs/UploadArea"
import ContainerHeader from "../Labels/ContainerHeader"
import Container from "../Layouts/Container"
import { parseDailyFYCFromCSV, type DailyFYCData } from "../../entities/daily_fyc"
import { CsvToString } from "../../utils/utils"
import { parseDailyFYPFromCSV, type DailyFYP } from "../../entities/daily_fyp"

const AmsFormUpload = ({
  onSubmit = () => { },
}: {
  onSubmit?: (dailyFYC: DailyFYCData, dailyFYP: DailyFYP[]) => void
}) => {

  const [dailyFYCFile, setDailyFYCFile] = useState<File | null>(null)
  const [dailyFYPFile, setDailyFYPFile] = useState<File | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    // verify dailyFYCFile and dailyFYPFile are not null
    if (!dailyFYCFile || !dailyFYPFile) {
      alert('Please upload both daily FYC and daily FYP files')
      return
    }

    setIsLoading(true)

    if (typeof onSubmit === 'function') {
      Promise.all([
        CsvToString(dailyFYCFile),
        CsvToString(dailyFYPFile),
      ]).then(([dailyFYCData, dailyFYPData]) => {
        const dailyFYCDataParsed = parseDailyFYCFromCSV(dailyFYCData)
        const dailyFYPDataParsed = parseDailyFYPFromCSV(dailyFYPData)
        onSubmit(
          dailyFYCDataParsed,
          dailyFYPDataParsed
        )
      }).catch((error) => {
        console.error(error)
        alert('Error parsing files. Please check the files and try again.')
      }).finally(() => {
        setIsLoading(false)
      })

      return
    }
  }

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
          title="Upload Daily FYP File"
          onUpload={(file) => setDailyFYPFile(file)}
        />
      </div>
      {/* <div className="flex flex-col md:flex-row gap-4">
        <UploadArea className="w-full md:w-1/2" title="Upload Daily FYP File" />
        <UploadArea className="w-full md:w-1/2" title="Upload Daily FYP File" />
      </div> */}
    </Container>
  )
}

export default AmsFormUpload