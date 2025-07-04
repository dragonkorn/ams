const ContainerHeader = ({
  title = "Header",
  children,
}: {
  title?: string
  children?: React.ReactNode
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="mb-2 align-baseline text-left">
        {title}
      </h2>
      {children}
    </div>
  )
}

export default ContainerHeader