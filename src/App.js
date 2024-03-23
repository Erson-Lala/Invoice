import { Routes, Route } from 'react-router-dom';
import ItemManagement from './components/common/itemmanagement/itemmanagement';
import HomePage from './components/common/homePage/homepage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item-management" element={<ItemManagement />} />
      </Routes>
    </div>
  );
}

export default App;
