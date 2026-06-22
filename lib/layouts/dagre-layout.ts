import dagre from "dagre";
import { Edge, Node } from "@xyflow/react";

const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(() => ({}));

const NODE_WIDTH = 260;
const NODE_HEIGHT = 180;

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[]
) {
  dagreGraph.setGraph({
    rankdir: "TB",
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(
      edge.source,
      edge.target
    );
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map(
    (node) => {
      const position =
        dagreGraph.node(node.id);

      return {
        ...node,
        position: {
          x: position.x,
          y: position.y,
        },
      };
    }
  );

  return {
    nodes: layoutedNodes,
    edges,
  };
}