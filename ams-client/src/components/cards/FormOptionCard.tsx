const FormOptionCard = ({
  title,
  description,
  icon,
  onClick,
  isSelected,
  unselectedStyle,
  selectedStyle,
}: {
  title: string,
  description?: string,
  icon: React.ReactNode,
  onClick: () => void,
  isSelected: boolean,
  unselectedStyle?: React.HTMLAttributes<HTMLDivElement>['className'],
  selectedStyle?: React.HTMLAttributes<HTMLDivElement>['className'],
}) => {
  return <div
    className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
      ? selectedStyle
      : unselectedStyle
      }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-grow flex-col">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {description}
        </p>
      </div>
    </div>
  </div>
}

export default FormOptionCard