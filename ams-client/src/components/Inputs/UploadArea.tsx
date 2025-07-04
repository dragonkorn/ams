const UploadArea = ({
  title = "Upload",
  description = "Drop your files here or click to upload",
  className = "",
  // onUpload,
}: {
  title?: string
  description?: string
  className?: string
  // onUpload: (file: File) => void
}) => {


  return (
    <div className={`container mx-auto p-4 bg-blue-50 rounded-lg border-2 border-blue-200 border-dashed ${className}`}>
      <div className="flex flex-col items-center justify-center">
        <svg
          className="w-10 h-10 text-blue-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default UploadArea