"use client"
import Navbar from '@/components/navigation/Navbar';
import React, { useState } from 'react';
import SplineScene from './SplineScene';

const Home = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedObjectName, setSelectedObjectName] = useState(null);

    function closeModal() {
        setModalOpen(false);
    }

    function onSplineMouseDown(e) {
        const object = e.target.obj || e.target;

        if (object) {
            console.log('Clicked object:', object); 
            const objectName = object.name; 
            setSelectedObjectName(objectName);
            setModalOpen(true);
        } else {
            console.error('Clicked object does not have a name property:', e.target);
        }
    }

    return (
        <main className="w-screen h-screen">
            <Navbar />
            <div className="relative w-screen h-screen">
                <SplineScene onSplineMouseDown={onSplineMouseDown} />
                <Modal isOpen={modalOpen} onClose={closeModal} objectName={selectedObjectName} />
            </div>
        </main>
    );
};

export default Home;


const Modal = ({ isOpen, onClose, objectName }) => {
    if (!isOpen) return null; // Don't render anything if modal is not open

    let modalContent = null;

    switch (objectName) {
        case 'ClickThis':
            modalContent = (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4">POSTS</h2>
                    <p>Object Name: {objectName}</p>
                    <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
                </div>
            );
            break;
        case 'Monitor 2': 
            modalContent = (
                <div className="p-4 w-full h-full bg-black rounded-lg shadow-lg text-white">
                    <h2 className="text-lg font-bold mb-4">VIDEOS</h2>
                    <p>Object Name: {objectName}</p>
                    <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
                </div>
            );
            break;
        default:
            modalContent = null;
    }

    return (
        <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {modalContent}
        </dialog>
    );
};
