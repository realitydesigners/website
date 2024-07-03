import Spline from '@splinetool/react-spline';
import React from 'react';

const SplineScene = ({ onSplineMouseDown, onLoad }) => {
 
    return (
        <main className="w-screen h-screen">
              <Spline
                    scene="https://prod.spline.design/F8Ai8x7DGCb4SMM4/scene.splinecode" // Replace with your actual scene URL
                    onSplineMouseDown={onSplineMouseDown}
                    onLoad={onLoad}
                />
        </main>
    );
};

export default SplineScene;
