import { useState } from "react"
import UploadArea from "../Inputs/UploadArea"
import ContainerHeader from "../Labels/ContainerHeader"
import Container from "../Layouts/Container"

const AmsFormUpload = ({
  onSubmit,
}: {
  onSubmit: (dailyFYC: File | null, dailyFYP: File | null) => void
}) => {

  const [dailyFYCFile, setDailyFYCFile] = useState<File | null>(null)
  const [dailyFYPFile, setDailyFYPFile] = useState<File | null>(null)

  const handleSubmit = () => {
    // verify dailyFYCFile and dailyFYPFile are not null
    if (!dailyFYCFile || !dailyFYPFile) {
      alert('Please upload both daily FYC and daily FYP files')
      return
    }

    if (typeof onSubmit === 'function') {
      onSubmit(dailyFYCFile, dailyFYPFile)
      return
    }
  }

  return (
    <Container>
      <ContainerHeader
        title="Upload Report Files"
      >
        <button
          className="bg-green-700 text-white px-4 py-2 rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          Upload
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
      <div className="flex flex-col md:flex-row gap-4">
        <UploadArea className="w-full md:w-1/2" title="Upload Daily FYP File" />
        <UploadArea className="w-full md:w-1/2" title="Upload Daily FYP File" />
      </div>
    </Container>
  )
}

export default AmsFormUpload