import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  InfoContainer,
  PageTemplate,
  Container,
  ContainerHeader,
  UploadArea,
  EditIcon,
  AddIcon,
  Button,
} from "../../../components"
import FormOptionCard from "../../../components/cards/FormOptionCard"
import { NavLink } from "react-router-dom"
import { refreshRecentForms, setFormData } from "../slices/factFindingSlice"
import type { RootState, AppDispatch } from "../../../store"

export const FactFindingStartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { recentForms } = useSelector((state: RootState) => state.factFinding);
  const [selectedOption, setSelectedOption] = useState<'new' | 'edit' | null>(null)
  const [uploadedData, setUploadedData] = useState<any>(null)

  useEffect(() => {
    dispatch(refreshRecentForms());
  }, [dispatch]);

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

  const handleLoadRecentForm = (formData: any) => {
    dispatch(setFormData(formData));
    navigate('/fact-finding/report');
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

            {/* Recent Forms Section */}
            {recentForms.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">📋</span>
                  ฟอร์มล่าสุด
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentForms.slice(0, 3).map((form, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {form.clientName || 'ไม่ระบุชื่อ'}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {form.submittedAt ? formatDate(form.submittedAt) : 'ไม่ระบุวันที่'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <div>อายุ: {form.clientAge} ปี</div>
                        <div>อาชีพ: {form.clientOccupation}</div>
                        <div>รายได้: {new Intl.NumberFormat('th-TH').format(parseFloat(form.monthlyIncome) || 0)} บาท/เดือน</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleLoadRecentForm(form)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm"
                        >
                          ดูรายงาน
                        </Button>
                        <Button
                          onClick={() => {
                            dispatch(setFormData(form));
                            navigate('/fact-finding/form');
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
                        >
                          แก้ไข
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {recentForms.length > 3 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-blue-700">
                      และฟอร์มอื่นๆ อีก {recentForms.length - 3} รายการ
                    </p>
                  </div>
                )}
              </div>
            )}

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