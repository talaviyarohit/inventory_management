import React, { useState } from 'react'

import Sidebar from './Sidebar';
import MainContent from './MainContent';

function DashBoard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
        <>
        <div className="app-container">
          
          <Sidebar />
          <div className="main-content">
        <h1>DashBoard</h1>
            <MainContent />
          </div>
        </div>
        </>
      );
    };
  

export default DashBoard
