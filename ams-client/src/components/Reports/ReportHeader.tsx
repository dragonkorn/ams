export const ReportHeader = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: {
  children: React.ReactNode,
  className?: string,
  colSpan?: number,
  rowSpan?: number,
}) => {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b ${className}`}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </th>
  )
}