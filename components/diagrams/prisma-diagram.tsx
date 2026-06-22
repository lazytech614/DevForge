"use client";

import { forwardRef, useMemo } from "react";
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
import DiagramSearchFocus from "./prisma-diagram-search-focus";

const nodeTypes = {
  prismaNode: PrismaNode,
  prismaEnumNode: PrismaEnumNode,
};

interface Props {
  initialNodes: any[];
  initialEdges: any[];
  search?: string;
}

const PrismaDiagram = forwardRef<
  HTMLDivElement,
  Props
>(
  (
    {
      initialNodes,
      initialEdges,
      search,
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

    const displayNodes = useMemo(() => {
      return nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          highlighted:
            search &&
            node.data.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ),
        },
      }));
    }, [nodes, search]);

    return (
      <div
        ref={ref}
        className="h-212.5 rounded-xl border overflow-hidden"
      >
        <ReactFlow
          nodes={displayNodes}
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
          <DiagramSearchFocus
            search={search}
            nodes={nodes}
            setNodes={setNodes}
          />
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