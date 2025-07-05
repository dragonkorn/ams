import type { AgentReportEntity } from "../../entities/agent_report_entity"
import ContainerHeader from "../Labels/ContainerHeader"
import Container from "../Layouts/Container"

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Agent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Case
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                FYP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                FYC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                FYC Life
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Case Life Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Case Life Approved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                FYP Life Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                FYP Life Approved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                FYC All
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                FYC Life
              </th>
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
                    <div className="text-xs text-gray-500">YTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.yearToDate.fyp.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">YTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.yearToDate.fyc.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">YTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.yearToDate.fycLife.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">YTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.caseLifeSubmitted.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">MTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.caseLifeApproved.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">MTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.fypLifeSubmitted.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">MTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.fypLifeApproved.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">MTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.fycAll.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">MTD</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-center">
                    <div className="font-medium">{agent.monthToDate.fycLife.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">MTD</div>
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