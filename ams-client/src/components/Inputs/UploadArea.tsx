import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

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
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result
        console.log(binaryStr)
        // Try different encodings for Thai language support
        let csv = ''
        try {
          // Try Windows-874 (Thai encoding)
          csv = new TextDecoder('windows-874').decode(binaryStr as ArrayBuffer)
        } catch (error) {
          try {
            // Try ISO-8859-11 (Thai encoding)
            csv = new TextDecoder('iso-8859-11').decode(binaryStr as ArrayBuffer)
          } catch (error) {
            // Fallback to UTF-8 with replacement character
            csv = new TextDecoder('utf-8', { fatal: false }).decode(binaryStr as ArrayBuffer)
          }
        }
        console.log(csv)
      }
      reader.readAsArrayBuffer(file)
    })
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1
  })

  return (
    <div
      className={`container mx-auto p-4 bg-blue-50 rounded-lg border-2 border-blue-200 border-dashed h-40 ${className}`}
      {...getRootProps()}
    >
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
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
          {files.length > 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p>Files uploaded: {files.length}</p>
              <ul>
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <h3>{title}</h3>
              <p>{description}</p>
            </>
          )
          }
        </div >
      )}

    </div >
  )
}

export default UploadArea