import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const SupplierForm = ({ currentSupplier, onSubmit, clearCurrentSupplier }) => {
  const [supplier, setSupplier] = useState({
    name: '',
    contact: '',
    itemsSupplied: '',
  });

  useEffect(() => {
    if (currentSupplier) {
      setSupplier(currentSupplier);
    } else {
      setSupplier({
        name: '',
        contact: '',
        itemsSupplied: '',
      });
    }
  }, [currentSupplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(supplier);
    clearCurrentSupplier(); // Clear form after submit
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formSupplierName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={supplier.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSupplierContact">
        <Form.Label>Contact Details</Form.Label>
        <Form.Control
          type="text"
          name="contact"
          value={supplier.contact}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSupplierItems">
        <Form.Label>Items Supplied</Form.Label>
        <Form.Control
          type="text"
          name="itemsSupplied"
          value={supplier.itemsSupplied}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className='mt-4'>
        {currentSupplier ? 'Update Supplier' : 'Add Supplier'}
      </Button>
    </Form>
  );
};

export default SupplierForm;
