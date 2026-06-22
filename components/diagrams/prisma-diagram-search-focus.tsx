"use client";

import { useEffect } from "react";
import {
  useReactFlow,
} from "@xyflow/react";

interface Props {
  search?: string;
  nodes: any[];
  setNodes: any;
}

export default function DiagramSearchFocus({
  search,
  nodes,
  setNodes,
}: Props) {
  const reactFlow = useReactFlow();

  useEffect(() => {
    if (!search) return;

    const foundNode = nodes.find(
        (node) =>
        node.data.name
            ?.toLowerCase()
            .includes(
            search.toLowerCase()
            )
    );

    if (!foundNode) return;

    reactFlow.fitView({
        nodes: [foundNode],
        duration: 800,
        padding: 0.5,
    });
  }, [search]);

  return null;
}