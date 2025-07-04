import NavBar from "./NavBar"

const PageTemplate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col h-screen w-screen align-top">
      <NavBar />
      {children}
    </div>
  )
}

export default PageTemplate