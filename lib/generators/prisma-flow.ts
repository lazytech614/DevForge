import {
  Edge,
  Node,
} from "@xyflow/react";
import { PrismaParseResult } from "../parsers/prisma-perser";

export function generateFlow(
  parsed: PrismaParseResult
) {
  const nodes: Node[] = parsed.models.map(
    (model, index) => ({
      id: model.name,

      type: "prismaNode",

      position: {
        x: (index % 3) * 320,
        y: Math.floor(index / 3) * 250,
      },

      data: {
        name: model.name,
        fields: model.fields,
      },
    })
  );

  const edges: Edge[] =
    parsed.relations.map((relation, index) => ({
      id: `edge-${index}`,

      source: relation.source,
      target: relation.target,

      animated: true,
    }));

  return {
    nodes,
    edges,
  };
}