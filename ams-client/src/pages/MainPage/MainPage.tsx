import { useMemo, useState } from 'react'
import '../../App.css'
import {
  PageTemplate,
  AmsFormUpload,
  AgentReport,
} from '../../components'
import type { DailyCase } from '../../entities/daily_case'
import type { DailyFYCData } from '../../entities/daily_fyc'
import type { DailyFYP } from '../../entities/daily_fyp'
import { constructAgentReports } from '../../entities/agent_report_entity'
function MainPage() {

  const [dailyFYC, setDailyFYC] = useState<DailyFYCData | null>(null)
  const [dailyFYCLife, setDailyFYCLife] = useState<DailyFYCData | null>(null)
  const [dailyFYP, setDailyFYP] = useState<DailyFYP[]>([])
  const [dailyCase, setDailyCase] = useState<DailyCase[]>([])
  const agentReports = useMemo(() => {
    if (!dailyFYC || !dailyFYCLife || !dailyFYP || !dailyCase) {
      console.log('no data')
      return []
    }
    console.log('constructing agent reports for ', { dailyFYC, dailyFYCLife, dailyFYP, dailyCase })
    const res = constructAgentReports(dailyFYC, dailyFYCLife, dailyFYP, dailyCase)
    console.log('agent reports: ', res)
    return res
  }, [dailyFYC, dailyFYCLife, dailyFYP, dailyCase])


  const handleSubmit = (
    dailyFYC: DailyFYCData,
    dailyFYCLife: DailyFYCData,
    dailyFYP: DailyFYP[],
    dailyCase: DailyCase[],
  ) => {
    console.log(dailyFYC, dailyFYCLife, dailyFYP, dailyCase, 'dailyFYC, dailyFYCLife, dailyFYP, dailyCase')
    setDailyFYC(dailyFYC)
    setDailyFYCLife(dailyFYCLife)
    setDailyFYP(dailyFYP)
    setDailyCase(dailyCase)
  }

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center mb-4">
        <h1>Report Assistant</h1>
        <p className="px-40 text-center">
          Upload AIA report CSV files and get instant insights into your team's performance. Streamline your weekly reporting process with automated data processing and visualization.
        </p>
      </div>
      <AmsFormUpload
        onSubmit={handleSubmit}
      />

      <div className="h-8" />

      <AgentReport
        agentReports={agentReports}
      />
      <div className="h-40" />
    </PageTemplate>
  )
}


export default MainPage
