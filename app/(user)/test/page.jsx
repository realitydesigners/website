"use client"
// Home.jsx
import Navbar from '@/components/navigation/Navbar';
import Spline from '@splinetool/react-spline';
import React, { useState } from 'react';

const Home = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedObjectId, setSelectedObjectId] = useState(null);

    function closeModal() {
        setModalOpen(false);
    }

    function onSplineMouseDown(e) {
        // Check if the e.target.obj has an id property
        const objectId = e.target.obj?.id || e.target?.id;
        
        if (objectId) {
            console.log('Clicked object ID:', objectId); // Debugging: Check the objectId captured
            setSelectedObjectId(objectId);
            setModalOpen(true);
        } else {
            console.error('Clicked object does not have an id property:', e.target);
        }
    }

    return (
        <main className="w-screen h-screen">
            <Navbar />
            <div className="relative w-screen h-screen">
                <Spline
                    scene="https://prod.spline.design/KWwl1PhEzFMKj770/scene.splinecode" // Replace with your actual scene URL
                    onSplineMouseDown={onSplineMouseDown}
                />
                {modalOpen && (
                    <Modal isOpen={modalOpen} onClose={closeModal} objectId={selectedObjectId} />
                )}
            </div>
        </main>
    );
};

export default Home;



// Modal.jsx
const Modal = ({ isOpen, onClose, objectId }) => {
    let modalContent = null;

    switch (objectId) {
        case '82833606-2348-48d4-b846-5a8e2ea948cd':
            modalContent = (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4">POSTS</h2>
                    <p>Object ID: {objectId}</p>
                    <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
                </div>
            );
            break;
        case 'f0d4c5a8-b2b8-4b98-968a-a31b775ef9bf':
            modalContent = (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4">VIDEOS</h2>
                    <p>Object ID: {objectId}</p>
                    <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
                </div>
            );
            break;
        default:
            modalContent = (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Unknown Object Type</h2>
                    <p>Object ID: {objectId}</p>
                    <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
                </div>
            );
            break;
    }

    return (
        <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {modalContent}
        </dialog>
    );
};
