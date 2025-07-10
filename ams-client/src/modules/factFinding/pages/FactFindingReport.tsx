import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas-pro';

import {
  PageTemplate,
  Container,
  ContainerHeader,
  Button,
} from "../../../components";
import type { RootState } from '../../../store';
import jsPDF from 'jspdf';

const FactFindingReport = () => {
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);
  const { formData, isSubmitted } = useSelector((state: RootState) => state.factFinding);

  useEffect(() => {
    if (!isSubmitted || !formData) {
      navigate('/fact-finding');
    }
  }, [isSubmitted, formData, navigate]);

  const handleExportPDF = async () => {
    if (!reportRef.current) return

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    const filename = `fact-finding-report-${formData?.clientName || 'client'}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)
  }

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('th-TH').format(parseFloat(amount) || 0);
  };

  const getMaritalStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      single: 'โสด',
      married: 'แต่งงานแล้ว',
      divorced: 'หย่า',
      widowed: 'หม้าย'
    };
    return statusMap[status] || status;
  };

  const getInsuranceText = (insurance: string) => {
    const insuranceMap: { [key: string]: string } = {
      none: 'ไม่มี',
      life: 'ประกันชีวิต',
      health: 'ประกันสุขภาพ',
      accident: 'ประกันอุบัติเหตุ',
      multiple: 'หลายประเภท'
    };
    return insuranceMap[insurance] || insurance;
  };

  const getRiskToleranceText = (risk: string) => {
    const riskMap: { [key: string]: string } = {
      conservative: 'อนุรักษ์นิยม (เสี่ยงต่ำ)',
      moderate: 'ปานกลาง',
      aggressive: 'ก้าวร้าว (เสี่ยงสูง)'
    };
    return riskMap[risk] || risk;
  };

  const getHealthConditionText = (health: string) => {
    const healthMap: { [key: string]: string } = {
      excellent: 'ดีมาก',
      good: 'ดี',
      fair: 'ปานกลาง',
      poor: 'ไม่ดี'
    };
    return healthMap[health] || health;
  };

  if (!isSubmitted || !formData) {
    return (
      <PageTemplate>
        <div className="min-h-screen bg-gray-50 py-8">
          <Container>
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-700">ไม่พบข้อมูลรายงาน</h2>
              <p className="text-gray-500 mt-2">กรุณากรอกข้อมูล Fact Finding ก่อน</p>
            </div>
          </Container>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <ContainerHeader title="Fact Finding Report - รายงานข้อมูลลูกค้า">
            <div className="flex space-x-2">
              <Button
                onClick={() => navigate('/fact-finding')}
                className="bg-gray-500 hover:bg-gray-600"
              >
                กลับไปหน้าฟอร์ม
              </Button>
              <Button
                onClick={handleExportPDF}
                className="bg-green-600 hover:bg-green-700"
              >
                Export PDF
              </Button>
            </div>
          </ContainerHeader>

          <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-sm border mt-6">
            {/* Report Header */}
            <div className="text-center mb-8 border-b pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Fact Finding Report</h1>
              <h2 className="text-xl text-gray-700">รายงานข้อมูลลูกค้า</h2>
              <p className="text-gray-500 mt-2">วันที่สร้างรายงาน: {new Date().toLocaleDateString('th-TH')}</p>
            </div>

            {/* Client Information */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                ข้อมูลลูกค้า
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">ข้อมูลส่วนตัว</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">ชื่อ-นามสกุล:</span> {formData.clientName}</div>
                    <div><span className="font-medium">อายุ:</span> {formData.clientAge} ปี</div>
                    <div><span className="font-medium">อาชีพ:</span> {formData.clientOccupation}</div>
                    <div><span className="font-medium">สถานะการสมรส:</span> {getMaritalStatusText(formData.clientMaritalStatus)}</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">ข้อมูลทางการเงิน</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">รายได้ต่อเดือน:</span> {formatCurrency(formData.monthlyIncome)} บาท</div>
                    <div><span className="font-medium">ค่าใช้จ่ายต่อเดือน:</span> {formatCurrency(formData.monthlyExpenses)} บาท</div>
                    <div><span className="font-medium">เงินออมปัจจุบัน:</span> {formatCurrency(formData.currentSavings)} บาท</div>
                    <div><span className="font-medium">ประกันที่มีอยู่:</span> {getInsuranceText(formData.existingInsurance)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Goals */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                เป้าหมายทางการเงิน
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">เป้าหมายระยะสั้น (1-3 ปี)</h4>
                  <p className="text-sm text-gray-700">{formData.shortTermGoal}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">เป้าหมายระยะยาว (5-20 ปี)</h4>
                  <p className="text-sm text-gray-700">{formData.longTermGoal}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">จำนวนเงินเป้าหมาย</h4>
                  <p className="text-lg font-bold text-green-700">{formatCurrency(formData.targetAmount)} บาท</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">ระยะเวลาเป้าหมาย</h4>
                  <p className="text-lg font-bold text-green-700">{formData.timeHorizon} ปี</p>
                </div>
              </div>
            </div>

            {/* Risk Profile */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                โปรไฟล์ความเสี่ยง
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">ระดับความเสี่ยง</h4>
                  <p className="text-sm text-gray-700">{getRiskToleranceText(formData.riskTolerance)}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">ประสบการณ์การลงทุน</h4>
                  <p className="text-sm text-gray-700">{formData.investmentExperience}</p>
                </div>
              </div>
            </div>

            {/* Insurance Needs */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                ความต้องการประกัน
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">ข้อมูลครอบครัว</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">จำนวนผู้อยู่ในอุปการะ:</span> {formData.familyDependents} คน</div>
                    <div><span className="font-medium">สภาพสุขภาพ:</span> {getHealthConditionText(formData.healthCondition)}</div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">ข้อมูลสุขภาพ</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">โรคประจำตัว:</span></div>
                    <p className="text-sm text-gray-700">{formData.existingMedicalConditions || 'ไม่มี'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Analysis */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm mr-3">5</span>
                การวิเคราะห์ทางการเงิน
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">เงินออมต่อเดือน</h4>
                  <p className="text-2xl font-bold text-yellow-700">
                    {formatCurrency((parseFloat(formData.monthlyIncome) - parseFloat(formData.monthlyExpenses)).toString())} บาท
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">อัตราส่วนเงินออม</h4>
                  <p className="text-2xl font-bold text-yellow-700">
                    {((parseFloat(formData.monthlyIncome) - parseFloat(formData.monthlyExpenses)) / parseFloat(formData.monthlyIncome) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">ระยะเวลาบรรลุเป้าหมาย</h4>
                  <p className="text-2xl font-bold text-yellow-700">
                    {Math.ceil(parseFloat(formData.targetAmount) / ((parseFloat(formData.monthlyIncome) - parseFloat(formData.monthlyExpenses)) * 12))} ปี
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">6</span>
                คำแนะนำเบื้องต้น
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">ผลิตภัณฑ์ที่แนะนำ:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>ประกันชีวิตแบบคุ้มครองชั่วคราว</li>
                      <li>ประกันสุขภาพแบบเหมาจ่าย</li>
                      <li>กองทุนรวมเพื่อการออม</li>
                      <li>ประกันอุบัติเหตุ</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">คำแนะนำการออม:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>ตั้งเป้าหมายการออมอย่างน้อย 20% ของรายได้</li>
                      <li>สร้างเงินออมฉุกเฉิน 6 เท่าของค่าใช้จ่ายต่อเดือน</li>
                      <li>กระจายการลงทุนตามระดับความเสี่ยง</li>
                      <li>ทบทวนแผนการเงินเป็นประจำทุกปี</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-6 border-t">
              <p className="text-sm text-gray-500">
                รายงานนี้สร้างขึ้นโดยระบบ AI Agent สำหรับการวิเคราะห์และให้คำแนะนำทางการเงิน
              </p>
              <p className="text-xs text-gray-400 mt-2">
                วันที่สร้าง: {new Date().toLocaleString('th-TH')}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </PageTemplate>
  );
};

export default FactFindingReport;