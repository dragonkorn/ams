const Container = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="container mx-auto bg-white rounded-lg shadow-md p-4">{children}</div>
  )
}

export default Container