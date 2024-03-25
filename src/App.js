import { Routes, Route } from 'react-router-dom';
import ItemManagement from './components/common/itemmanagement/itemmanagement';
import CustomerList from './components/common/customerList/customerlist';
import HomePage from './components/common/homePage/homepage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item-management" element={<ItemManagement />} />
        <Route path="/customer-list" element={<CustomerList />} />
      </Routes>
    </div>
  );
}

export default App;
