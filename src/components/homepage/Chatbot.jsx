import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

const RobotModel = ({ onClick }) => {
  const { scene } = useGLTF("/models/Robot.glb");
  const [isJumping, setIsJumping] = useState(false);

  const { positionY } = useSpring({
    positionY: isJumping ? 0.5 : 0,
    config: { tension: 170, friction: 6 },
    onRest: () => setIsJumping(false),
  });

  const handleClick = () => {
    setIsJumping(true);
    onClick();
  };

  return (
    <animated.group position-y={positionY} onClick={handleClick}>
      <primitive object={scene} scale={1.2} />
    </animated.group>
  );
};

const ChatbotPanel = ({ onClose }) => (
  <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-6 animate-slide-in">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">Chatbot 🤖</h2>
      <button
        onClick={onClose}
        className="text-red-500 hover:text-red-700 font-semibold"
      >
        Close
      </button>
    </div>
    <div className="text-gray-700">
      {/* Chatbot content goes here */}
      <p>Hello! How can I help you today?</p>
    </div>
  </div>
);

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleRoboClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {!isChatOpen && (
        <div className="fixed bottom-4 right-4 w-60 h-60 z-40">
          <Canvas
            camera={{ position: [0, 1, 5] }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 2]} />
            <RobotModel onClick={handleRoboClick} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      )}

      {isChatOpen && <ChatbotPanel onClose={handleCloseChat} />}
    </>
  );
};

export default Chatbot;
