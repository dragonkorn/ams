import UploadArea from "../Inputs/UploadArea"
import ContainerHeader from "../Labels/ContainerHeader"
import Container from "../Layouts/Container"

const AmsFormUpload = () => {
  return (
    <Container>
      <ContainerHeader
        title="Upload Report Files"
      />
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <UploadArea className="w-full md:w-1/2" title="Upload Daily FYC File" />
        <UploadArea className="w-full md:w-1/2" title="Upload Daily FYP File" />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <UploadArea className="w-full md:w-1/2" title="Upload Daily FYP File" />
        <UploadArea className="w-full md:w-1/2" title="Upload Daily FYP File" />
      </div>
    </Container>
  )
}

export default AmsFormUpload