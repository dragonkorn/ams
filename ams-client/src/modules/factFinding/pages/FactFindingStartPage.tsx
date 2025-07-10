import { useState } from "react"
import {
  InfoContainer,
  PageTemplate,
  Container,
  ContainerHeader,
  UploadArea,
  EditIcon,
  AddIcon,
} from "../../../components"
import FormOptionCard from "../../../components/cards/FormOptionCard"
import { NavLink } from "react-router"

export const FactFindingStartPage = () => {
  const [selectedOption, setSelectedOption] = useState<'new' | 'edit' | null>(null)
  const [uploadedData, setUploadedData] = useState<any>(null)

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string)
        setUploadedData(jsonData)
        setSelectedOption('edit')
      } catch (error) {
        alert('Invalid JSON file. Please upload a valid JSON file.')
      }
    }
    reader.readAsText(file)
  }

  const handleStartNewForm = () => {
    setSelectedOption('new')
    setUploadedData(null)
  }

  const handleEditForm = () => {
    setSelectedOption('edit')
  }

  return (
    <PageTemplate>
      <div className="py-8">
        <Container>
          <ContainerHeader title="Fact Finding Form - AI Agent Portal">
            <h4>
              Welcome to the Fact Finding Form
            </h4>
          </ContainerHeader>

          <div className="mt-8 space-y-6">
            {/* Header Section */}
            <InfoContainer
              title="AI Agent Instructions"
              description="คุณกำลังเข้าสู่ระบบ Fact Finding Form สำหรับการสร้างรายงานลูกค้า
            กรุณาเลือกตัวเลือกด้านล่างเพื่อเริ่มต้นการทำงาน"
            />

            {/* Options Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Form Option */}
              <FormOptionCard
                title="สร้างฟอร์มใหม่"
                description="เริ่มต้นสร้าง Fact Finding Form ใหม่สำหรับลูกค้า"
                icon={<AddIcon className="text-blue-500" />}
                onClick={handleStartNewForm}
                isSelected={selectedOption === 'new'}
                unselectedStyle="border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                selectedStyle="border-blue-500 bg-blue-50"
              />

              {/* Edit Previous Form Option */}
              <FormOptionCard
                title="แก้ไขฟอร์มที่บันทึกไว้"
                description="อัปโหลดไฟล์ JSON เพื่อแก้ไขฟอร์มที่บันทึกไว้ก่อนหน้า"
                icon={<EditIcon className="text-green-500" />}
                onClick={handleEditForm}
                isSelected={selectedOption === 'edit'}
                unselectedStyle="border-gray-200 hover:border-green-300 hover:bg-green-25"
                selectedStyle="border-green-500 bg-green-50"
              />
            </div>

            {/* Upload Section - Show when edit is selected */}
            {selectedOption === 'edit' && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  อัปโหลดไฟล์ JSON ที่บันทึกไว้
                </h4>
                <UploadArea
                  title="อัปโหลดไฟล์ JSON"
                  description="ลากไฟล์ JSON มาที่นี่หรือคลิกเพื่อเลือกไฟล์"
                  onUpload={handleFileUpload}
                  className="max-w-2xl"
                />
              </div>

            )}
            {uploadedData && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  ข้อมูลที่อัปโหลด
                </h4>
              </div>
            )}

            {/* Continue Button */}
            {selectedOption && (
              <div className="mt-8 flex justify-center">
                <NavLink
                  to={selectedOption === 'new' ? '/fact-finding/form' : '/fact-finding/form'}
                  className="text-white px-4 py-2 rounded-md"
                >
                  {selectedOption === 'new' ? 'เริ่มต้นฟอร์มใหม่' : 'แก้ไขฟอร์ม'}

                </NavLink>
              </div>
            )}
          </div>
        </Container>
      </div>
    </PageTemplate >
  )
}