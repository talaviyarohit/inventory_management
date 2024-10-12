import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css'; // Optional for custom styles
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link as={Link}  to={'/'}>Dashboard</Nav.Link>
        <Nav.Link as={Link} to={'/add'}>Add Inventory</Nav.Link>
        <Nav.Link as={Link} to={'/suppliermanagement'}>Supplier information</Nav.Link>
        <Nav.Link href="#reports">Reports</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
