import '../../App.css'
import {
  PageTemplate,
  AmsFormUpload,
} from '../../components'
import type { DailyFYCData } from '../../entities/daily_fyc'
import type { DailyFYP } from '../../entities/daily_fyp'
function MainPage() {
  // const [count, setCount] = useState(0)

  const handleSubmit = (dailyFYC: DailyFYCData, dailyFYP: DailyFYP[]) => {
    console.log(dailyFYC, dailyFYP)
  }

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center mb-4">
        <h1>Report Assistant</h1>
        <p className="px-40 text-center">
          Upload AIA report CSV files and get instant insights into your team's performance. Streamline your weekly reporting process with automated data processing and visualization.
        </p>
      </div>
      <AmsFormUpload
        onSubmit={handleSubmit}
      />
    </PageTemplate>
  )
}


export default MainPage

/**
 * <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
 */
