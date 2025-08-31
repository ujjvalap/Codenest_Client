import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { motion } from "framer-motion";

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

const ChatbotPanel = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today? 😊" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // Fake Bot Reply (replace with API later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `You said: "${input}"` },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Chatbot 🤖</h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {!isChatOpen && (
        <div className="fixed bottom-4 right-4 w-60 h-60 z-40 cursor-pointer">
          <Canvas camera={{ position: [0, 1, 5] }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 2]} />
            <RobotModel onClick={() => setIsChatOpen(true)} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      )}

      {isChatOpen && <ChatbotPanel onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default Chatbot;
