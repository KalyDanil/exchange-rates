import React from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import FirstPage from './pages/FirstPage/FirstPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SecondPage from './pages/SecondPage/SecondPage';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/exchanger" />} />
        <Route path="/exchanger" element={<FirstPage/>} />
        <Route path="/exchange-rate" element={<SecondPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
