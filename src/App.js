import { Routes, Route } from 'react-router-dom';
import HomePage from './components/common/homePage/homepage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
