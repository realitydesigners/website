import Spline from '@splinetool/react-spline';
// SplineScene.jsx
import React from 'react';

const SplineScene = ({ onSplineMouseDown }) => {
    function handleSplineMouseDown(e) {
        // Call onSplineMouseDown with the event
        onSplineMouseDown(e);
    }

    function onLoad(spline) {
        try {
            const obj = spline.findObjectById('82833606-2348-48d4-b846-5a8e2ea948cd');
            if (obj) {
                console.log('Found object by ID:', obj);
            } else {
                console.log('Object with ID 82833606-2348-48d4-b846-5a8e2ea948cd not found in the Spline scene.');
            }
        } catch (error) {
            console.error('Error loading Spline scene:', error);
        }
    }

    return (
        <main className="w-screen h-screen">
            <Spline
                scene="https://prod.spline.design/KWwl1PhEzFMKj770/scene.splinecode" // Replace with your actual scene URL
                onLoad={onLoad}
                onSplineMouseDown={handleSplineMouseDown} // Pass click handler
            />
        </main>
    );
};

export default SplineScene;
