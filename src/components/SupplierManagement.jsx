import React, { useState, useEffect } from 'react';
import SupplierForm from './SupplierForm';
import SupplierList from './SupplierList';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import Sidebar from './Sidebar';

const SupplierManagement = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [currentSupplier, setCurrentSupplier] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const querySnapshot = await getDocs(collection(db, 'suppliers'));
            const supplierList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setSuppliers(supplierList);
        };

        fetchSuppliers();
    }, []);

    const handleAddOrUpdateSupplier = async (supplier) => {
        if (currentSupplier) {
            const supplierRef = doc(db, 'suppliers', currentSupplier.id);
            await updateDoc(supplierRef, supplier);
            setSuppliers(
                suppliers.map((s) => (s.id === supplier.id ? supplier : s))
            );
        } else {
            const newSupplier = await addDoc(collection(db, 'suppliers'), supplier);
            setSuppliers([...suppliers, { ...supplier, id: newSupplier.id }]);
        }
        setCurrentSupplier(null); // Reset current supplier
    };

    const handleEditSupplier = (supplier) => {
        setCurrentSupplier(supplier);
    };

    const handleDeleteSupplier = async (id) => {
        await deleteDoc(doc(db, 'suppliers', id));
        setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    };

    const clearCurrentSupplier = () => {
        setCurrentSupplier(null);
    };

    return (
        <div>
            <div className="app-container">

                <Sidebar />
                <div className="main-content">

                    <h2>Supplier Management</h2>
                    <SupplierForm
                        currentSupplier={currentSupplier}
                        onSubmit={handleAddOrUpdateSupplier}
                        clearCurrentSupplier={clearCurrentSupplier}
                    />
                    <SupplierList
                        suppliers={suppliers}
                        onEdit={handleEditSupplier}
                        onDelete={handleDeleteSupplier}
                    />
                </div>
            </div>
        </div>
    );
};

export default SupplierManagement;
