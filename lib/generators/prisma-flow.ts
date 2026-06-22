import {
  Edge,
  Node,
} from "@xyflow/react";

import { PrismaParseResult } from "../parsers/prisma-perser";

import { getLayoutedElements } from "../layouts/dagre-layout";

export function generateFlow(
  parsed: PrismaParseResult
) {
  const nodes: Node[] =
    parsed.models.map((model) => ({
      id: model.name,

      type: "prismaNode",

      position: {
        x: 0,
        y: 0,
      },

      data: {
        name: model.name,
        fields: model.fields,
      },
    }));

  const edges: Edge[] =
    parsed.relations.map(
      (relation, index) => ({
        id: `edge-${index}`,

        source: relation.source,

        target: relation.target,

        animated: true,

        label: relation.label,
      })
    );

  return getLayoutedElements(
    nodes,
    edges
  );
}