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
        metadata: model.metadata,
      },
    }));

  const edges: Edge[] =
    parsed.relations.map(
      (
        relation,
        index
      ) => ({
        id: `edge-${index}`,
        source: relation.source,
        target: relation.target,
        animated: relation.type !== "N:N",
        label: relation.foreignKey
          ? `${relation.type} (${relation.foreignKey})`
          : relation.type,
        data: {
          foreignKey:
            relation.foreignKey,
        },
        style: {
          strokeWidth:
            relation.type ===
            "N:N"
              ? 3
              : 2,
        },
      })
    );

  const enumNodes: Node[] =
    parsed.enums.map(
      (enumItem, index) => ({
        id: `enum-${enumItem.name}`,

        type: "prismaEnumNode",

        position: {
          x: 0,
          y: 0,
        },

        data: {
          name: enumItem.name,
          values: enumItem.values,
        },
      })
    );

  const allNodes = [
    ...nodes,
    ...enumNodes,
  ];

  return getLayoutedElements(
    allNodes,
    edges
  );
}