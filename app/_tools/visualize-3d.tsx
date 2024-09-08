/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { Skeleton } from "@/components/ui/skeleton";
import "../../app/globals.css";
import { Slider } from "@/components/ui/slider"
import { Gauge } from 'lucide-react';
import { Chip } from "@nextui-org/react";
import { atomicData } from '@/constant/atoms-color';
import Image from 'next/image';
import { emptyLab } from '../_components/images/images';
const API_URL = process.env.NEXT_PUBLIC_DATA_URL;
interface AtomProps {
    position: [number, number, number];
    element: number;
    compoundName: string; // Added this prop to include compound name
}

interface BondProps {
    start: [number, number, number];
    end: [number, number, number];
    radius: number; // Added radius for bond thickness
    compoundName: string; // Added this prop to include compound name
    bondOrder: number;
}

interface AxisProps {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
}

interface BoxBorderProps {
    size: number;
}

// Placeholder for initial state
const initialCompoundData = {
    PC_Compounds: [
        {
            atoms: {
                aid: [],
                element: [],
            },
            bonds: {
                aid1: [],
                aid2: [],
                order: [],
            },
            coords: [
                {
                    conformers: [
                        {
                            x: [],
                            y: [],
                        },
                    ],
                },
            ],
        },
    ],
};





const Atom: React.FC<AtomProps> = ({ position, element, compoundName }) => {
    const [showTooltip, setShowTooltip] = useState(false); // Manage tooltip visibility
    const color = atomicData[element]?.color || "#333";
    // Handlers for hover events
    const handlePointerOver = () => setShowTooltip(true);
    const handlePointerOut = () => setShowTooltip(false);

    return (
        <group position={position}>
            {/* Adjusted size for hover detection */}
            <mesh
                onPointerOver={handlePointerOver} // Detect hover directly on atom
                onPointerOut={handlePointerOut}   // Detect when pointer leaves the atom
                scale={1.05}  // Slightly increase the hitbox size (very close to the actual size)
                visible={false}  // Invisible hitbox
            >
                <sphereGeometry args={[0.3, 32, 32]} /> {/* Adjust hitbox geometry to match atom size */}
                <meshStandardMaterial transparent opacity={0} /> {/* Fully transparent */}
            </mesh>

            {/* Visible atom */}
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[0.3, 32, 32]} /> {/* Atom's actual geometry */}
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Tooltip to show compound details when hovered */}
            {showTooltip && (
                <Html position={[0, 0.5, 0]} center>
                    <div style={{
                        color: 'black',
                        background: 'white',
                        padding: '5px',
                        borderRadius: '5px',
                        pointerEvents: 'none'
                    }}>
                        {compoundName} <br />
                        Atomic Number: {element}
                    </div>
                </Html>
            )}
        </group>
    );
};

const Bond: React.FC<BondProps> = ({ start, end, radius, compoundName, bondOrder }) => {
    const ref = useRef<THREE.Mesh>(null);

    // Calculate start and end positions for the bond vectors
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);

    // Calculate bond length and direction
    const bondLength = startVec.distanceTo(endVec);
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const direction = new THREE.Vector3().subVectors(endVec, startVec).normalize();

    // Calculate a perpendicular vector for offsetting multiple bonds
    const arbitraryVector = new THREE.Vector3(1, 0, 0); // Arbitrary axis
    let perpVec = direction.clone().cross(arbitraryVector).normalize();
    if (perpVec.length() === 0) {
        perpVec = direction.clone().cross(new THREE.Vector3(0, 1, 0)).normalize(); // Use Y-axis if needed
    }

    // Adjust bond offset based on bond order (single, double, triple)
    const bondOffset = bondOrder === 2 ? 0.4 : bondOrder === 3 ? 0.2 : 0; // Offset for double/triple bonds
    const bondColors = ["blue", "green", "purple"]; // Colors for different bond types

    // Create bonds based on bond order (single/double/triple)
    const bonds = [];
    for (let i = 0; i < bondOrder; i++) {
        // Calculate the offset direction for each bond (space them apart)
        const offsetFactor = (i - (bondOrder - 1) / 2) * bondOffset; // Offsetting to space the bonds
        const cylinderPosition = new THREE.Vector3().addVectors(midPoint, perpVec.clone().multiplyScalar(offsetFactor));

        // Set rotation of the bond cylinder to align with bond direction
        const cylinderQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        bonds.push(
            <mesh ref={ref} position={cylinderPosition} quaternion={cylinderQuaternion} key={i}>
                <cylinderGeometry args={[radius * 0.3, radius * 0.3, bondLength, 32]} />
                <meshStandardMaterial color={bondColors[Math.min(i, bondColors.length - 1)]} />
            </mesh>
        );
    }

    return (
        <group>
            {bonds}
            {/* Tooltip for bond information */}
            <Html position={midPoint.toArray()} center>
                <div className="tooltip">
                    {compoundName} <br />
                    Bond Length: {bondLength.toFixed(2)} <br />
                    Bond Type: {bondOrder === 1 ? "Single" : bondOrder === 2 ? "Double" : "Triple"}
                </div>
            </Html>
        </group>
    );
};

const Axis: React.FC<AxisProps> = ({ start, end, color }) => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];

    return (
        <line>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length}
                    array={new Float32Array(points.flatMap((p) => p.toArray()))}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color={color} />
        </line>
    );
};

const BoxBorder: React.FC<BoxBorderProps> = ({ size }) => {
    const halfSize = size / 4;
    const vertices = [
        -halfSize, -halfSize, -halfSize,
        halfSize, -halfSize, -halfSize,
        halfSize, halfSize, -halfSize,
        -halfSize, halfSize, -halfSize,
        -halfSize, -halfSize, halfSize,
        halfSize, -halfSize, halfSize,
        halfSize, halfSize, halfSize,
        -halfSize, halfSize, halfSize,
        -halfSize, -halfSize, -halfSize,
        -halfSize, -halfSize, halfSize,
        halfSize, -halfSize, -halfSize,
        halfSize, -halfSize, halfSize,
        halfSize, halfSize, -halfSize,
        halfSize, halfSize, halfSize,
        -halfSize, halfSize, -halfSize,
        -halfSize, halfSize, halfSize,
    ];

    return (
        <lineSegments>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={vertices.length / 3}
                    array={new Float32Array(vertices)}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="black" linewidth={1} />
        </lineSegments>
    );
};

const Molecule: React.FC<{ compoundData: typeof initialCompoundData; compoundName: string }> = ({ compoundData, compoundName }) => {
    const { atoms, bonds, coords } = compoundData.PC_Compounds[0];
    const atomPositions = coords[0]?.conformers[0];

    if (!atomPositions) return null;

    const centerX = atomPositions.x.reduce((a, b) => a + b, 0) / atomPositions.x.length;
    const centerY = atomPositions.y.reduce((a, b) => a + b, 0) / atomPositions.y.length;

    return (
        <group>
            {atoms.aid.map((aid, index) => (
                <Atom
                    key={aid}
                    position={[
                        atomPositions.x[index] - centerX,
                        atomPositions.y[index] - centerY,
                        0,
                    ]}
                    element={atoms.element[index]}
                    compoundName={compoundName}
                />
            ))}
            {bonds.aid1.map((aid1, index) => (
                <Bond
                    key={index}
                    start={[
                        atomPositions.x[atoms.aid.indexOf(aid1)] - centerX,
                        atomPositions.y[atoms.aid.indexOf(aid1)] - centerY,
                        0,
                    ]}
                    end={[
                        atomPositions.x[atoms.aid.indexOf(bonds.aid2[index])] - centerX,
                        atomPositions.y[atoms.aid.indexOf(bonds.aid2[index])] - centerY,
                        0,
                    ]}
                    radius={0.1}
                    compoundName={compoundName}
                    bondOrder={bonds.order[index]} // Use bond order here (1 for single, 2 for double, 3 for triple)
                />
            ))}

        </group>
    );
};

const Visualize3D = () => {
    const [compoundName, setCompoundName] = useState("");
    const [compoundData, setCompoundData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sliderValue, setSliderValue] = useState(2);
    const [autoRotate, setAutoRotate] = useState(false);
    const [metaData, setMetaData] = useState({
        iupacName: "",
        molecularFormula: "",
    });

    const handleSubmit = async () => {
        try {
            if (!compoundName) {
                toast({
                    title: "Error",
                    description: "Please enter a compound name",
                    variant: "destructive",
                });
                return;
            }
            setLoading(true);
            setError(false);
            
            const response = await fetch(`${API_URL}/${compoundName}/JSON`);
            if (response.status === 200) {
                const data = await response.json();
                setCompoundData(data);
                const iupacName = data.PC_Compounds[0]?.props.find((prop: { urn: { label: string; }; }) => prop.urn.label === "IUPAC Name")?.value.sval || "";
                const molecularFormula = data.PC_Compounds[0]?.props.find((prop: { urn: { label: string; }; }) => prop.urn.label === "Molecular Formula")?.value.sval || "";
                setMetaData({ iupacName, molecularFormula });
                setLoading(false);
            } else if (response.status === 404) {
                setLoading(false);
                setError(true);
                toast({
                    title: "Error",
                    description: "Failed to fetch compound data",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast({
                title: "Error",
                description: "Failed to fetch compound data",
                variant: "destructive",
            });
        }
    };

    const toggleAutoRotate = () => {
        setAutoRotate(!autoRotate);
    };

    return (
        <div className="flex flex-col items-center">
            <Toaster />
            <div className="flex flex-row items-center justify-between mx-2 gap-2 w-full">
                <Input
                    type="text"
                    value={compoundName}
                    onChange={(e) => setCompoundName(e.target.value)}
                    placeholder="Enter compound name"
                    className="p-2 border rounded text-black"
                />
                <Button variant="default" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>

            <section className="flex flex-col md:flex-row items-start justify-start w-full h-fit md:h-[50vh]">
                {!loading && compoundData && (
                    <Canvas style={{ height: "50vh", background: "white" }} className="mt-5 border-[2px] border-slate-300 rounded-lg w-full md:width-[20vw]">
                        <ambientLight />
                        <pointLight position={[20, 20, 20]} />
                        <Molecule compoundData={compoundData} compoundName={compoundName} />
                        <Axis start={[-10, 0, 0]} end={[10, 0, 0]} color="red" />
                        <Axis start={[0, -10, 0]} end={[0, 10, 0]} color="green" />
                        <Axis start={[0, 0, -10]} end={[0, 0, 10]} color="blue" />
                        <BoxBorder size={20} />
                        <OrbitControls autoRotate={autoRotate} autoRotateSpeed={sliderValue} />
                    </Canvas>
                )}
                {metaData.iupacName && <section className="w-full md:w-[30vw] h-full mt-5 ml-0 md:ml-3 rounded-xl border-[2px] border-slate-300 p-3">
                    <div className="flex flex-col items-start justify-start gap-5">
                        <Button variant="default" onClick={toggleAutoRotate}>
                            {autoRotate ? "Disable Auto-Rotate" : "Enable Auto-Rotate"}
                        </Button>
                        <div className="flex flex-row gap-2 w-full">
                            <Gauge color='purple' width={30} height={30} />
                            <Slider
                                value={[sliderValue]} // Bind the slider to the state
                                max={20}
                                step={1}
                                onValueChange={(newValue) => {
                                    if (Array.isArray(newValue)) {
                                        setSliderValue(newValue[0]);
                                    }
                                }} // Update state when slider changes
                                aria-label="Rotation Speed"
                            />
                        </div>
                        <p className="text-slate-400 font-bold text-sm">Consisting atoms</p>
                        <div className="grid grid-cols-3 gap-4 w-full h-[150px]">
                            {compoundData &&
                                <div className="grid grid-cols-2 items-center justify-center w-max h-fit gap-2">
                                    {compoundData &&
                                        Array.from(new Set(compoundData.PC_Compounds[0].atoms.element)).map(
                                            (value: unknown, index: number) => {
                                                const atomicNumber = value as number;
                                                const atomicInfo = atomicData[atomicNumber];
                                                return (
                                                    <Chip
                                                        key={index}
                                                        style={{ backgroundColor: atomicInfo?.color || "#CCC" }}
                                                    >
                                                        <p className="text-white font-bold">
                                                            {atomicInfo?.name}({atomicNumber})
                                                        </p>
                                                    </Chip>
                                                );
                                            }
                                        )
                                    }
                                </div>

                            }
                        </div>


                    </div>
                </section>}
                {!metaData.iupacName && !loading &&
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <Image
                            src={emptyLab}
                            alt="No data"
                            width={100}
                            height={100}
                            style={{
                                opacity: 0.5
                            }}
                        />
                    </div>
                }
                {loading && (
                    <div className="flex flex-col items-start justify-center h-[20vh] gap-3">
                        <Skeleton className="w-[50vw] h-[5vh] rounded-xl" />
                        <Skeleton className="w-[40vw] h-[5vh] rounded-xl" />
                        <Skeleton className="w-[30vw] h-[5vh] rounded-xl" />
                    </div>
                )}
            </section>
            <section className="p-3 flex flex-col items-start justify-start w-full">
                {metaData.iupacName && <h2 className="flex flex-row items-center justify-start gap-2 w-full text-black font-bold text-lg pt-2 bg-purple-100 rounded-md px-2 mt-5">
                    <span>
                        IUPAC:
                    </span>
                    <span className="text-red-500 font-bold text-lg">{metaData.iupacName}</span>
                </h2>}
                {metaData.molecularFormula && <h2 className="flex flex-row items-center justify-start gap-2 w-full text-black font-bold text-lg pt-2 bg-purple-100 rounded-md px-2 mt-5">
                    <span>
                        Molecular-Formula:
                    </span>
                    <span className="text-red-500 font-bold text-lg">{metaData.molecularFormula}</span>
                </h2>}
            </section>
        </div>
    );
};

export default Visualize3D;