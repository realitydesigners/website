import Spline from '@splinetool/react-spline';
import React from 'react';

const SplineScene = ({ onObjectClicked }) => {
 
    const objects = [
        { id: '82833606-2348-48d4-b846-5a8e2ea948cd', name: 'Object 1' },
        { id: 'f0d4c5a8-b2b8-4b98-968a-a31b775ef9bf', name: 'Object 2' },
    ];

    function onLoad(spline) {
            for (let i = 0; i < objects.length; i++) {
                const obj = objects[i];
                const object = spline.findObjectById(obj.id);
                if (object) {
                    object.addEventListener('mousedown', () => onObjectClicked(obj.id));
                } 
            }
    }

    return (
        <main className="w-screen h-screen">
            <Spline
                scene="https://prod.spline.design/KWwl1PhEzFMKj770/scene.splinecode" // Replace with your actual scene URL
                onLoad={onLoad}
            />
        </main>
    );
};

export default SplineScene;
