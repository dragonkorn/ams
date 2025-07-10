import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
// import App from './App.tsx'
import { MainPage } from './pages'
import UploadFormPage from './modules/report_creator/pages/UploadFormPage'
import { store } from './store'
import { Provider } from 'react-redux'
import { FactFindingFormPage } from './modules/factFinding/pages/FactFindingFormPage';
import { FactFindingStartPage } from './modules/factFinding/pages/FactFindingStartPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/form-report" element={<UploadFormPage />} />
          <Route path="/fact-finding" element={<FactFindingStartPage />} />
          <Route path="/fact-finding/form" element={<FactFindingFormPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
