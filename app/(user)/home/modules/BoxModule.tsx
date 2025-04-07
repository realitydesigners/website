'use client';
import React, { useRef, useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

// Types
interface BoxDimensions {
    size: number;
    scale: number;
    position: { x: number; y: number; z: number };
}

type BoxPosition = 'Up' | 'Down';
type BoxConfig = 'Up' | 'Down';
type BoxesConfig = [BoxConfig, BoxConfig, BoxConfig, BoxConfig, BoxConfig];

interface BoxState {
    name: string;
    position: BoxPosition;
}

interface ConfigState {
    config: BoxesConfig;
    label: string;
}

interface BoxModuleProps {
    splineRef: React.MutableRefObject<any>;
}

export const BoxModule = ({ splineRef }: BoxModuleProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [boxStates, setBoxStates] = useState<BoxState[]>([
        { name: 'Box 1', position: 'Up' },
        { name: 'Box 2', position: 'Up' },
        { name: 'Box 3', position: 'Up' },
        { name: 'Box 4', position: 'Up' },
        { name: 'Box 5', position: 'Up' },
    ]);

    // Constants
    const ANIMATION_DURATION = 500;
    const ANIMATION_STEPS = 30;
    const CORNER_THRESHOLD = 0.05;
    const GREEN_BOXES = ['1g', '2g', '3g', '4g', '5g'];

    // Helper functions
    const calculateBoxDimensions = (index: number, baseSize: number, scaleFactor: number): BoxDimensions => {
        const scale = Math.pow(1 / scaleFactor, index);
        return {
            size: baseSize * scale,
            scale,
            position: { x: 0, y: 0, z: 0 },
        };
    };

    const calculateCornerOffset = (currentBox: BoxDimensions, parentBox: BoxDimensions, scaleFactor: number): number => {
        const cornerDistance = ((parentBox.size - currentBox.size) / 2 + currentBox.size / 2) * (1 / Math.sqrt(1.2));
        return cornerDistance;
    };

    const generateConfigs = (): ConfigState[] => {
        const configs: ConfigState[] = [];
        for (let i = 0; i < Math.pow(2, 5); i++) {
            const binary = i.toString(2).padStart(5, '0');
            const config = binary.split('').map((b) => (b === '0' ? 'Up' : 'Down')) as BoxesConfig;
            configs.push({
                config,
                label: config.map((c) => (c === 'Up' ? 'U' : 'D')).join(''),
            });
        }
        return configs;
    };

    const configs = generateConfigs();

    // Box manipulation functions
    const applyBoxConfiguration = async (config: BoxesConfig) => {
        if (isAnimating) return;

        const spline = splineRef.current;
        if (!spline) return;

        setIsAnimating(true);
        setBoxStates((prevStates) =>
            prevStates.map((box, index) => ({
                ...box,
                position: config[index],
            }))
        );

        try {
            const boxes = new Map<
                number,
                {
                    box: any;
                    startY: number;
                    cornerOffset: number;
                    finalY: number;
                }
            >();

            let currentParentY = 0;
            for (let i = 1; i <= 4; i++) {
                const box = spline.findObjectByName(GREEN_BOXES[i]);
                const parentBox = spline.findObjectByName(GREEN_BOXES[i - 1]);

                if (box && parentBox) {
                    const currentDimensions = calculateBoxDimensions(i, 100, Math.sqrt(2));
                    const parentDimensions = calculateBoxDimensions(i - 1, 100, Math.sqrt(2));
                    const cornerOffset = calculateCornerOffset(currentDimensions, parentDimensions, Math.sqrt(2));

                    const finalY = currentParentY + (config[i] === 'Up' ? cornerOffset : -cornerOffset);
                    currentParentY = finalY;

                    boxes.set(i, {
                        box,
                        startY: box.position.y,
                        cornerOffset,
                        finalY,
                    });
                }
            }

            const totalSteps = 30;
            const stepDuration = 500 / totalSteps;

            for (let step = 0; step <= totalSteps; step++) {
                const progress = step / totalSteps;

                for (let i = 4; i >= 1; i--) {
                    const data = boxes.get(i);
                    if (data) {
                        const { box, startY, finalY } = data;
                        const newY = startY + (finalY - startY) * progress;
                        box.position.y = newY;
                    }
                }

                await new Promise((resolve) => setTimeout(resolve, stepDuration));
            }

            for (let i = 4; i >= 1; i--) {
                const data = boxes.get(i);
                if (data) {
                    data.box.position.y = data.finalY;
                }
            }
        } finally {
            setIsAnimating(false);
        }
    };

    // Initial box setup
    useEffect(() => {
        const spline = splineRef.current;
        if (!spline) return;

        const positionNestedBoxes = (boxNames: string[]) => {
            boxNames.forEach((name, index) => {
                const currentBox = spline.findObjectByName(name);

                if (currentBox) {
                    console.log(`Found box: ${name}`, currentBox);

                    try {
                        // Get current box dimensions
                        const currentDimensions = calculateBoxDimensions(index, 100, Math.sqrt(2));

                        // Apply scale
                        currentBox.scale.x = currentDimensions.scale;
                        currentBox.scale.y = currentDimensions.scale;
                        currentBox.scale.z = currentDimensions.scale;

                        if (index > 0) {
                            const parentName = GREEN_BOXES[index - 1];
                            const parentBox = spline.findObjectByName(parentName);

                            if (parentBox) {
                                // Get parent box dimensions
                                const parentDimensions = calculateBoxDimensions(index - 1, 100, Math.sqrt(2));

                                // Calculate corner offset using sqrt(2) relationship
                                const cornerOffset = calculateCornerOffset(currentDimensions, parentDimensions, Math.sqrt(2));

                                // Position smaller box in corner of parent box
                                currentBox.position.x = parentBox.position.x + cornerOffset;
                                currentBox.position.y = parentBox.position.y + cornerOffset;
                                currentBox.position.z = parentBox.position.z - cornerOffset;

                                console.log(`Box ${name} - Size: ${currentDimensions.size}, ` + `Parent Size: ${parentDimensions.size}, ` + `Corner Offset: ${cornerOffset}`);
                            }
                        } else {
                            // First box at origin
                            currentBox.position.x = 0;
                            currentBox.position.y = 0;
                            currentBox.position.z = 0;
                        }
                    } catch (error) {
                        console.error(`Error manipulating box ${name}:`, error);
                        console.log('Box object structure:', currentBox);
                    }
                } else {
                    console.warn(`Box not found: ${name}`);
                }
            });
        };

        // Position the boxes
        positionNestedBoxes(GREEN_BOXES);
    }, [splineRef.current]); // Only run when splineRef.current changes

    // UI Component
    return (
        <div className='mt- fixed top-50 right-0 mr-2 flex w-[400px] flex-col gap-2'>
            <div className='overflow-hidden rounded-md border border-[#222] bg-black/95 shadow-xl backdrop-blur-sm'>
                <div className='font-kodemono flex h-8 items-center justify-between border-b border-[#222] px-4 text-xs font-medium tracking-wider text-[#818181]'>
                    <div className='flex items-center gap-2'>
                        <span className='uppercase'>Box Controls</span>
                        <FaChevronDown size={8} className='opacity-50' />
                    </div>
                </div>

                <div className='divide-y divide-[#222]'>
                    {/* Status Section */}
                    <div className='p-2'>
                        <div className='font-kodemono mb-2 text-[11px] tracking-wider text-[#666] uppercase'>Current State</div>
                        <div className='grid grid-cols-5 gap-1'>
                            {boxStates.map((box, index) => (
                                <div key={box.name} className='group flex flex-col items-center rounded border border-transparent bg-[#111] p-2 transition-all hover:border-[#333]'>
                                    <span className='font-outfit text-[11px] font-medium text-[#666]'>Box {index + 1}</span>
                                    <span className={`font-kodemono text-[13px] font-bold tracking-wider ${box.position === 'Up' ? 'text-blue-400' : 'text-blue-300'}`}>
                                        {box.position}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Configurations Section */}
                    <div className='p-2'>
                        <div className='font-kodemono mb-2 text-[11px] tracking-wider text-[#666] uppercase'>Available Patterns</div>
                        <div className='grid grid-cols-4 gap-1'>
                            {configs.map((config, index) => (
                                <button
                                    key={index}
                                    onClick={() => applyBoxConfiguration(config.config)}
                                    disabled={isAnimating}
                                    className={`group font-outfit flex h-9 items-center justify-center rounded border border-transparent bg-[#111] px-2 text-[13px] font-bold tracking-wider transition-all ${
                                        isAnimating ? 'cursor-not-allowed opacity-50' : 'hover:border-[#333] hover:bg-[#181818]'
                                    }`}>
                                    <span className='text-white'>{config.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className='p-2'>
                        <div className='font-kodemono mb-2 text-[11px] tracking-wider text-[#666] uppercase'>Legend</div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex items-center gap-2 rounded bg-[#111] p-2'>
                                <div className='h-2 w-2 rounded-full bg-blue-400' />
                                <span className='font-outfit text-[11px] text-[#666]'>Up - Top Corner</span>
                            </div>
                            <div className='flex items-center gap-2 rounded bg-[#111] p-2'>
                                <div className='h-2 w-2 rounded-full bg-blue-300' />
                                <span className='font-outfit text-[11px] text-[#666]'>Down - Bottom Corner</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export type { BoxModuleProps, BoxesConfig };
