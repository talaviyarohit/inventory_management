

import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, Form } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './InventoryList.css'; // For custom styles

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); // Track the item being edited
  const [editedItem, setEditedItem] = useState({ itemName: '', quantity: '', category: '', supplier: '' }); // Temporary item for editing
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState({ category: '', supplier: '' });

  useEffect(() => {
    const fetchInventory = async () => {
      const querySnapshot = await getDocs(collection(db, 'inventory'));
      const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setInventory(items);
    };

    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteDoc(doc(db, 'inventory', id));
      // Update state after deletion
      setInventory(inventory.filter((item) => item.id !== id));
    }
  };

  // Begin editing the selected item
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditedItem(item); // Load item data into the editable fields
  };

  // Handle changes to the form input during inline editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  // Save the changes made to the item
  const handleSave = async (id) => {
    const itemRef = doc(db, 'inventory', id);

    try {
      // Ensure all fields are included when updating the document
      await updateDoc(itemRef, {
        itemName: editedItem.itemName,
        quantity: Number(editedItem.quantity), // Convert quantity to number
        category: editedItem.category,
        supplier: editedItem.supplier
      });

      // Update the inventory state with the modified item without page refresh
      setInventory(
        inventory.map((item) => (item.id === id ? { ...editedItem, id } : item))
      );

      setEditingItemId(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const filteredInventory = inventory.filter((item) => {
    return (
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterBy.category === '' || item.category === filterBy.category) &&
      (filterBy.supplier === '' || item.supplier === filterBy.supplier)
    );
  });

  return (
    <>
      <FormControl
        type="text"
        placeholder="Search by item name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      <FormControl
        as="select"
        value={filterBy.category}
        onChange={(e) => setFilterBy({ ...filterBy, category: e.target.value })}
        className="mb-3"
      >
        <option value="">Filter by Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
      </FormControl>

      <FormControl
        as="select"
        value={filterBy.supplier}
        onChange={(e) => setFilterBy({ ...filterBy, supplier: e.target.value })}
        className="mb-3"
      >
        <option value="">Filter by Supplier</option>
        <option value="Supplier A">Flipkart</option>
        <option value="Supplier B">amazon</option>
      </FormControl>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Stock Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item.id}>
              {editingItemId === item.id ? (
                // Render input fields for inline editing
                <>
                  <td>
                    <Form.Control
                      type="text"
                      name="itemName"
                      value={editedItem.itemName}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={editedItem.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="category"
                      value={editedItem.category}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="supplier"
                      value={editedItem.supplier}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <span
                      className={`stock-status ${
                        editedItem.quantity < 10 ? 'low-stock' : 'sufficient-stock'
                      }`}
                    >
                      {editedItem.quantity < 10 ? 'Low' : 'Sufficient'}
                    </span>
                  </td>
                  <td>
                    <Button variant="success" onClick={() => handleSave(item.id)}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setEditingItemId(null)} className="ml-2">
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                // Render regular table view
                <>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td>{item.supplier}</td>
                  <td>
                    <span
                      className={`stock-status ${
                        item.quantity < 10 ? 'low-stock' : 'sufficient-stock'
                      }`}
                    >
                      {item.quantity < 10 ? 'Low' : 'Sufficient'}
                    </span>
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(item.id)} className="ml-2">
                      Delete
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default InventoryList;
