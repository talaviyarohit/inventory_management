import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';
import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './components/DashBoard';
import SupplierManagement from './components/SupplierManagement';


function App() {
  const [currentId, setCurrentId] = useState('');

  return (
    <Router>
      <Container className="mt-4">
        <Routes>
        <Route path="/" element={<DashBoard />} />
          <Route path="/add" element={<InventoryForm currentId={currentId} setCurrentId={setCurrentId} />} />
          <Route path="/list" element={<InventoryList setCurrentId={setCurrentId} />} />
        <Route path="/suppliermanagement" element={<SupplierManagement />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
