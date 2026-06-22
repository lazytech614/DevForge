"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import PrismaNode from "./prisma-node";

const nodeTypes = {
  prismaNode: PrismaNode,
};

interface Props {
  nodes: any[];
  edges: any[];
}

export default function PrismaDiagram({
  nodes,
  edges,
}: Props) {
  return (
    <div className="h-200 rounded-xl border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        fitViewOptions={{
          padding: 0.3,
        }}
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}