

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const InventoryForm = ({ currentId, setCurrentId }) => {
    const initialFormState = { itemName: '', quantity: '', category: '', supplier: '' };
    const [item, setItem] = useState(initialFormState);
    const navigate = useNavigate();

    // Fetch the item if currentId is set (for updating)
    useEffect(() => {
        const fetchItem = async () => {
            if (currentId) {
                const docRef = doc(db, 'inventory', currentId);
                const itemDoc = await getDoc(docRef);
                if (itemDoc.exists()) {
                    setItem(itemDoc.data());
                }
            } else {
                setItem(initialFormState); // Clear form when no currentId
            }
        };
        fetchItem();
    }, [currentId]);

    // Handle form submission for adding or updating items
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            // Update the document in Firestore
            const itemRef = doc(db, 'inventory', currentId);
            await updateDoc(itemRef, item);
        } else {
            // Add a new document to the 'inventory' collection
            await addDoc(collection(db, 'inventory'), item);
        }
        setItem(initialFormState); // Reset form
        setCurrentId(''); // Clear current ID for updating
        navigate('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    return (
        <>
            <div className="app-container">

                <Sidebar />
                <div className="main-content">
<h1>Add  Inventory Item</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="itemName"
                                value={item.itemName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={item.category}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control
                                type="text"
                                name="supplier"
                                value={item.supplier}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className='mt-4'>{currentId ? 'Update' : 'Add'} Item</Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default InventoryForm;
