"use client";

import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Panel,
} from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, Lock, Map, Construction, 
  Sparkles, ArrowRight, X, Info 
} from "lucide-react";
import "@xyflow/react/dist/style.css";

/**
 * MOCK DATA: Based on your XMind structure
 * This serves as the "Interactive Draft" for the board to see.
 */
const initialNodes: Node[] = [
  {
    id: "root",
    type: "input",
    data: { label: "🌟 VOCABULARY MASTER" },
    position: { x: 250, y: 0 },
    style: { background: "#4B3621", color: "#fff", borderRadius: "15px", fontWeight: "900", padding: "15px" },
  },
  {
    id: "emotions",
    data: { label: "😊 Emotions" },
    position: { x: 0, y: 150 },
    style: { background: "#7e8b43", color: "#fff", borderRadius: "12px", fontWeight: "bold" },
  },
  { id: "emo-positive", data: { label: "Positive (Clarity, Positive)" }, position: { x: -150, y: 250 } },
  { id: "emo-negative", data: { label: "Negative (Overwhelmed)" }, position: { x: 50, y: 250 } },
  {
    id: "work",
    data: { label: "💼 Work & Life" },
    position: { x: 500, y: 150 },
    style: { background: "#D2691E", color: "#fff", borderRadius: "12px", fontWeight: "bold" },
  },
  { id: "work-manager", data: { label: "Role (Manager)" }, position: { x: 400, y: 250 } },
  { id: "work-tasks", data: { label: "Tasks (On my plate)" }, position: { x: 650, y: 250 } },
];

const initialEdges: Edge[] = [
  { id: "e-root-emo", source: "root", target: "emotions", animated: true },
  { id: "e-root-work", source: "root", target: "work", animated: true },
  { id: "e-emo-pos", source: "emotions", target: "emo-positive" },
  { id: "e-emo-neg", source: "emotions", target: "emo-negative" },
  { id: "e-work-man", source: "work", target: "work-manager" },
  { id: "e-work-task", source: "work", target: "work-tasks" },
];

export default function CombinedMindmapPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleOpenXMind = () => {
    window.open("https://app.xmind.com/share/M8fL9Yqe", "_blank");
  };

  return (
    <main className="w-full h-screen bg-[#FDFCFB] flex flex-col overflow-hidden font-sans">
      
      {/* HEADER SECTION */}
      <header className="p-6 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm z-20">
        <div>
          <h1 className="text-2xl font-black text-[#4B3621] flex items-center gap-2">
            V-STUDIO <span className="text-[#7e8b43]">MINDMAP</span>
          </h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Interactive Draft v0.65</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAnnouncement(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-black hover:bg-orange-100 transition-all"
          >
            <Info size={16} /> VIEW FULL BLUEPRINT
          </button>
        </div>
      </header>

      {/* REACT FLOW CANVAS (The "I have started working on it" part) */}
      <div className="flex-1 relative z-10">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          snapToGrid
        >
          <Background color="#f1f5f9" gap={20} />
          <Controls />
          <MiniMap 
            nodeStrokeColor={(n) => (n.id === "root" ? "#4B3621" : "#7e8b43")}
            nodeColor={(n) => (n.style?.background as string) || "#fff"}
          />
          
          <Panel position="bottom-left" className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-lg max-w-xs">
            <h4 className="font-black text-[#4B3621] text-xs uppercase tracking-tighter mb-1">Canvas Instructions</h4>
            <p className="text-[10px] text-gray-500 font-medium">
              Interact with the draft nodes above. This is the foundation of the upcoming native mindmap engine.
            </p>
          </Panel>
        </ReactFlow>
      </div>

      {/* OVERLAY ANNOUNCEMENT (The "Explore the full XMind" part) */}
      <AnimatePresence>
        {showAnnouncement && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#4B3621]/20 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl max-w-2xl w-full relative border border-white"
            >
              <button 
                onClick={() => setShowAnnouncement(false)}
                className="absolute top-8 right-8 p-2 text-gray-300 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mx-auto transform -rotate-6">
                    <Construction size={40} />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 text-[#7e8b43]" size={24} />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-[#4B3621]">Blueprint Ready. <br/>Implementation in Progress.</h2>
                  <p className="text-gray-500 text-sm font-medium">
                    While the native interactive canvas is being finalized, you can access the complete pedagogical architecture on XMind.
                  </p>
                </div>

                {/* XMIND ACCESS CARD */}
                <div className="bg-[#FDFCFB] border-2 border-dashed border-gray-200 rounded-3xl p-6 text-left flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-[#4B3621]">
                      <Map size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Master Blueprint</p>
                      <h4 className="font-black text-gray-800 text-sm">Vocab Architecture v1.0</h4>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 mt-1">
                        <Lock size={12} /> PASSWORD: 2526
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleOpenXMind}
                    className="w-full md:w-auto px-6 py-3 bg-[#4B3621] text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
                  >
                    EXPLORE FULL XMIND <ExternalLink size={14} />
                  </button>
                </div>

                {/* PROGRESS BAR */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase">
                    <span>Native Integration Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-[#7e8b43]"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setShowAnnouncement(false)}
                  className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] hover:text-[#4B3621] transition-colors"
                >
                  Continue to Draft Canvas <ArrowRight size={10} className="inline ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STYLE OVERRIDES */}
      <style jsx global>{`
        .react-flow__node {
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border: 1px solid #f1f5f9 !important;
        }
        .react-flow__edge-path {
          stroke: #cbd5e1;
          stroke-width: 2;
        }
      `}</style>
    </main>
  );
}