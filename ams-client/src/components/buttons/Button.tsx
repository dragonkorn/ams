const Button = ({
  children,
  disabled = false,
  className = "",
  onClick,
  type = "button",
}: {
  children: React.ReactNode,
  disabled?: boolean,
  className?: string,
  onClick?: () => void,
  type?: "button" | "submit" | "reset",
}) => {
  return <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
}

export default Button