import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import {
  Container,
  ContainerHeader,
  Button,
  InfoContainer,
} from "../../../components";

// Validation schema
const FactFindingSchema = Yup.object().shape({
  // Personal Information
  clientName: Yup.string().required('กรุณากรอกชื่อลูกค้า'),
  clientAge: Yup.number()
    .min(18, 'อายุต้องมากกว่า 18 ปี')
    .max(100, 'อายุต้องไม่เกิน 100 ปี')
    .required('กรุณากรอกอายุ'),
  clientOccupation: Yup.string().required('กรุณากรอกอาชีพ'),
  clientMaritalStatus: Yup.string().required('กรุณาเลือกสถานะการสมรส'),

  // Financial Information
  monthlyIncome: Yup.number()
    .min(0, 'รายได้ต้องไม่ติดลบ')
    .required('กรุณากรอกรายได้ต่อเดือน'),
  monthlyExpenses: Yup.number()
    .min(0, 'ค่าใช้จ่ายต้องไม่ติดลบ')
    .required('กรุณากรอกค่าใช้จ่ายต่อเดือน'),
  currentSavings: Yup.number()
    .min(0, 'เงินออมต้องไม่ติดลบ')
    .required('กรุณากรอกเงินออมปัจจุบัน'),
  existingInsurance: Yup.string().required('กรุณาเลือกประกันที่มีอยู่'),

  // Financial Goals
  shortTermGoal: Yup.string().required('กรุณากรอกเป้าหมายระยะสั้น'),
  longTermGoal: Yup.string().required('กรุณากรอกเป้าหมายระยะยาว'),
  targetAmount: Yup.number()
    .min(0, 'จำนวนเงินเป้าหมายต้องไม่ติดลบ')
    .required('กรุณากรอกจำนวนเงินเป้าหมาย'),
  timeHorizon: Yup.number()
    .min(1, 'ระยะเวลาต้องมากกว่า 1 ปี')
    .max(50, 'ระยะเวลาต้องไม่เกิน 50 ปี')
    .required('กรุณากรอกระยะเวลาเป้าหมาย'),

  // Risk Profile
  riskTolerance: Yup.string().required('กรุณาเลือกระดับความเสี่ยง'),
  investmentExperience: Yup.string().required('กรุณาเลือกประสบการณ์การลงทุน'),

  // Insurance Needs
  familyDependents: Yup.number()
    .min(0, 'จำนวนผู้อยู่ในอุปการะต้องไม่ติดลบ')
    .required('กรุณากรอกจำนวนผู้อยู่ในอุปการะ'),
  healthCondition: Yup.string().required('กรุณาเลือกสภาพสุขภาพ'),
  existingMedicalConditions: Yup.string().required('กรุณากรอกโรคประจำตัว (ถ้ามี)'),
});

const Basic = () => {
  useEffect(() => {
    document.addEventListener("keydown", function (event: any) {
      if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
        var form = event.target.form;
        var index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 2].focus();
        event.preventDefault();
      }
    });
  }, [])

  const initialValues = {
    // Personal Information
    clientName: '',
    clientAge: '',
    clientOccupation: '',
    clientMaritalStatus: '',

    // Financial Information
    monthlyIncome: '',
    monthlyExpenses: '',
    currentSavings: '',
    existingInsurance: '',

    // Financial Goals
    shortTermGoal: '',
    longTermGoal: '',
    targetAmount: '',
    timeHorizon: '',

    // Risk Profile
    riskTolerance: '',
    investmentExperience: '',

    // Insurance Needs
    familyDependents: '',
    healthCondition: '',
    existingMedicalConditions: '',
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log('Form submitted:', values);
    // Here you can send data to backend or navigate to next step
    setSubmitting(false);
  };

  return (
    <Container>
      <ContainerHeader title="Fact Finding Form - ข้อมูลลูกค้า">
        <h4>กรุณากรอกข้อมูลลูกค้าเพื่อสร้างรายงาน</h4>
      </ContainerHeader>


      <InfoContainer
        title="คำแนะนำสำหรับ AI Agent"
        description="กรุณาสัมภาษณ์ลูกค้าและกรอกข้อมูลให้ครบถ้วน เพื่อการวิเคราะห์และแนะนำผลิตภัณฑ์ที่เหมาะสม"
      />

      <div className="mt-8" />

      <Formik
        initialValues={initialValues}
        validationSchema={FactFindingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-8">

            {/* Personal Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                ข้อมูลส่วนตัว
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อ-นามสกุล *
                  </label>
                  <Field
                    name="clientName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="กรอกชื่อ-นามสกุล"
                  />
                  <ErrorMessage name="clientName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    อายุ *
                  </label>
                  <Field
                    name="clientAge"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="อายุ"
                  />
                  <ErrorMessage name="clientAge" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    อาชีพ *
                  </label>
                  <Field
                    name="clientOccupation"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="อาชีพ"
                  />
                  <ErrorMessage name="clientOccupation" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    สถานะการสมรส *
                  </label>
                  <Field
                    name="clientMaritalStatus"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">เลือกสถานะ</option>
                    <option value="single">โสด</option>
                    <option value="married">แต่งงานแล้ว</option>
                    <option value="divorced">หย่า</option>
                    <option value="widowed">หม้าย</option>
                  </Field>
                  <ErrorMessage name="clientMaritalStatus" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Financial Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                ข้อมูลทางการเงิน
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    รายได้ต่อเดือน (บาท) *
                  </label>
                  <Field
                    name="monthlyIncome"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="รายได้ต่อเดือน"
                  />
                  <ErrorMessage name="monthlyIncome" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ค่าใช้จ่ายต่อเดือน (บาท) *
                  </label>
                  <Field
                    name="monthlyExpenses"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ค่าใช้จ่ายต่อเดือน"
                  />
                  <ErrorMessage name="monthlyExpenses" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เงินออมปัจจุบัน (บาท) *
                  </label>
                  <Field
                    name="currentSavings"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="เงินออมปัจจุบัน"
                  />
                  <ErrorMessage name="currentSavings" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ประกันที่มีอยู่ *
                  </label>
                  <Field
                    name="existingInsurance"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">เลือกประกัน</option>
                    <option value="none">ไม่มี</option>
                    <option value="life">ประกันชีวิต</option>
                    <option value="health">ประกันสุขภาพ</option>
                    <option value="accident">ประกันอุบัติเหตุ</option>
                    <option value="multiple">หลายประเภท</option>
                  </Field>
                  <ErrorMessage name="existingInsurance" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Financial Goals Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                เป้าหมายทางการเงิน
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เป้าหมายระยะสั้น (1-3 ปี) *
                  </label>
                  <Field
                    name="shortTermGoal"
                    as="textarea"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="เช่น ซื้อรถ, ไปเที่ยวต่างประเทศ, เก็บเงินดาวน์บ้าน"
                  />
                  <ErrorMessage name="shortTermGoal" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เป้าหมายระยะยาว (5-20 ปี) *
                  </label>
                  <Field
                    name="longTermGoal"
                    as="textarea"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="เช่น ซื้อบ้าน, เงินเกษียณ, ศึกษาต่อ"
                  />
                  <ErrorMessage name="longTermGoal" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      จำนวนเงินเป้าหมาย (บาท) *
                    </label>
                    <Field
                      name="targetAmount"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="จำนวนเงินเป้าหมาย"
                    />
                    <ErrorMessage name="targetAmount" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ระยะเวลาเป้าหมาย (ปี) *
                    </label>
                    <Field
                      name="timeHorizon"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ระยะเวลา"
                    />
                    <ErrorMessage name="timeHorizon" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Profile Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                โปรไฟล์ความเสี่ยง
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ระดับความเสี่ยง *
                  </label>
                  <Field
                    name="riskTolerance"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">เลือกระดับความเสี่ยง</option>
                    <option value="conservative">อนุรักษ์นิยม (เสี่ยงต่ำ)</option>
                    <option value="moderate">ปานกลาง</option>
                    <option value="aggressive">ก้าวร้าว (เสี่ยงสูง)</option>
                  </Field>
                  <ErrorMessage name="riskTolerance" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ประสบการณ์การลงทุน *
                  </label>
                  <Field
                    name="investmentExperience"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">เลือกประสบการณ์</option>
                    <option value="none">ไม่มีประสบการณ์</option>
                    <option value="beginner">เริ่มต้น (1-3 ปี)</option>
                    <option value="intermediate">ปานกลาง (3-10 ปี)</option>
                    <option value="advanced">ขั้นสูง (10+ ปี)</option>
                  </Field>
                  <ErrorMessage name="investmentExperience" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Insurance Needs Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">5</span>
                ความต้องการประกัน
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    จำนวนผู้อยู่ในอุปการะ *
                  </label>
                  <Field
                    name="familyDependents"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="จำนวนคน"
                  />
                  <ErrorMessage name="familyDependents" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    สภาพสุขภาพ *
                  </label>
                  <Field
                    name="healthCondition"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">เลือกสภาพสุขภาพ</option>
                    <option value="excellent">ดีมาก</option>
                    <option value="good">ดี</option>
                    <option value="fair">ปานกลาง</option>
                    <option value="poor">ไม่ดี</option>
                  </Field>
                  <ErrorMessage name="healthCondition" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    โรคประจำตัว (ถ้ามี)
                  </label>
                  <Field
                    name="existingMedicalConditions"
                    as="textarea"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ระบุโรคประจำตัว (ถ้ามี) หรือพิมพ์ 'ไม่มี'"
                  />
                  <ErrorMessage name="existingMedicalConditions" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center space-x-4">
              <Button
                type="button"
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => window.history.back()}
              >
                ย้อนกลับ
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกและสร้างรายงาน'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Basic;