import React from 'react';
import { Table, Button } from 'react-bootstrap';

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact Details</th>
          <th>Items Supplied</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier.id}>
            <td>{supplier.name}</td>
            <td>{supplier.contact}</td>
            <td>{supplier.itemsSupplied}</td>
            <td>
              <Button variant="warning"  onClick={() => onEdit(supplier)}>
                Edit
              </Button>||
              <Button variant="danger" onClick={() => onDelete(supplier.id)} className="ml-2 ">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SupplierList;
