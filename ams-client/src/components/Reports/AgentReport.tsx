import type { AgentReportEntity } from "../../entities/agent_report_entity"
import ContainerHeader from "../Labels/ContainerHeader"
import Container from "../containers/Container"
import { ReportHeader } from "./ReportHeader"

const AgentReport = ({
  agentReports,
}: {
  agentReports: AgentReportEntity[],
}) => {
  return (
    <Container>
      <ContainerHeader
        title="Agent Report"
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Export
        </button>
      </ContainerHeader>

      <div className="h-8" />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <ReportHeader>
                RT3 VP7
              </ReportHeader>
              <ReportHeader colSpan={4}>
                YTD
              </ReportHeader>
              <ReportHeader colSpan={6}>
                MTD
              </ReportHeader>
            </tr>
            <tr>
              <ReportHeader rowSpan={2}>
                Agent
              </ReportHeader>
              <ReportHeader rowSpan={2}>
                Case
              </ReportHeader>
              <ReportHeader rowSpan={2}>
                FYP
              </ReportHeader>
              <ReportHeader rowSpan={2}>
                FYC (ALL)
              </ReportHeader>
              <ReportHeader rowSpan={2}>
                FYC (L)
              </ReportHeader>
              <ReportHeader colSpan={2}>
                Case Life
              </ReportHeader>
              <ReportHeader colSpan={2}>
                FYP Life
              </ReportHeader>
              <ReportHeader rowSpan={2}>
                FYC All
              </ReportHeader>
              <ReportHeader rowSpan={2}>
                FYC Life
              </ReportHeader>
            </tr>
            <tr>
              <ReportHeader>
                Submitted
              </ReportHeader>
              <ReportHeader>
                Approved
              </ReportHeader>
              <ReportHeader>
                Submitted
              </ReportHeader>
              <ReportHeader>
                Approved
              </ReportHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agentReports.map((agent) => (
              <tr key={agent.agentId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex flex-col">
                    <span className="font-medium">{agent.fullName}</span>
                    <span className="text-xs text-gray-500">{agent.agentId}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.yearToDate.case.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.yearToDate.fyp.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.yearToDate.fyc.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.yearToDate.fycLife.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.caseLifeSubmitted.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.caseLifeApproved.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.fypLifeSubmitted.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.fypLifeApproved.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.fycAll.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.fycLife.toLocaleString()}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
}

export default AgentReport