import Spline from '@splinetool/react-spline';
import React from 'react';

const SplineScene = ({ onSplineMouseDown, }) => {
 
    return (
        <main className="w-screen h-screen">
              <Spline
                    scene="https://prod.spline.design/KWwl1PhEzFMKj770/scene.splinecode" // Replace with your actual scene URL
                    onSplineMouseDown={onSplineMouseDown}
                />
        </main>
    );
};

export default SplineScene;