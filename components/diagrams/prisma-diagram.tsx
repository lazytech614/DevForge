"use client";

import { forwardRef } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import PrismaNode from "./prisma-node";
import PrismaEnumNode from "./prisma-enum-node";

const nodeTypes = {
  prismaNode: PrismaNode,
  prismaEnumNode: PrismaEnumNode,
};

interface Props {
  initialNodes: any[];
  initialEdges: any[];
}

const PrismaDiagram = forwardRef<
  HTMLDivElement,
  Props
>(
  (
    {
      initialNodes,
      initialEdges,
    },
    ref
  ) => {
    const [
      nodes,
      setNodes,
      onNodesChange,
    ] = useNodesState(initialNodes);

    const [
      edges,
      setEdges,
      onEdgesChange,
    ] = useEdgesState(initialEdges);

    return (
      <div
        ref={ref}
        className="h-212.5 rounded-xl border overflow-hidden"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={
            onNodesChange
          }
          onEdgesChange={
            onEdgesChange
          }
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.3,
          }}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
        >
          <Controls />

          <MiniMap
            zoomable
            pannable
          />

          <Background
            gap={20}
            size={1}
          />
        </ReactFlow>
      </div>
    );
  }
);

PrismaDiagram.displayName = "PrismaDiagram";

export default PrismaDiagram;