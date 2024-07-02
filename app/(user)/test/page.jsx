"use client"
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
        const objectId = e.target.uuid;
        setSelectedObjectId(objectId);
        setModalOpen(true);
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

const Modal = ({ isOpen, onClose, objectId }) => {
    return (
        <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Object Details</h2>
                <p>Object ID: {objectId}</p>
                <button  type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
            </div>
        </dialog>
    );
};