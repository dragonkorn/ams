import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { FactFindingStartPage } from './modules/factFinding/pages/FactFindingStartPage';
import Basic from './modules/factFinding/pages/Basic';
import FactFindingReport from './modules/factFinding/pages/FactFindingReport';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<FactFindingStartPage />} />
            <Route path="/fact-finding" element={<FactFindingStartPage />} />
            <Route path="/fact-finding/form" element={<Basic />} />
            <Route path="/fact-finding/report" element={<FactFindingReport />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
