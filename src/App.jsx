import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
