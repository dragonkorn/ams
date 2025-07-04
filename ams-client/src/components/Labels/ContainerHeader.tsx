const ContainerHeader = ({
  title = "Header",
  description,
}: {
  title?: string
  description?: string
}) => {
  return (
    <div>
      <h2 className="mb-2 align-baseline text-left">
        {title}
      </h2>
      <p>{description}</p>
    </div>
  )
}

export default ContainerHeader