import {
  Edge,
  Node,
} from "@xyflow/react";

import { getLayoutedElements } from "./dagre-layout";

export function autoLayout(
  nodes: Node[],
  edges: Edge[]
) {
  return getLayoutedElements(
    nodes,
    edges
  );
}