import { PrismaEnum, PrismaField, PrismaModel, PrismaRelation } from "@/types/prisma";

export interface PrismaParseResult {
  models: PrismaModel[];
  enums: PrismaEnum[];
  relations: PrismaRelation[];
}

export function parsePrismaSchema(
  schema: string
): PrismaParseResult {
  const models: PrismaModel[] = [];

  const modelRegex = /model\s+(\w+)\s*\{([\s\S]*?)\}/g;

  let match;

  while ((match = modelRegex.exec(schema)) !== null) {
    const modelName = match[1];
    const body = match[2];

    const fields: PrismaField[] = [];

    body
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line &&
          !line.startsWith("//") &&
          !line.startsWith("@@")
      )
      .forEach((line) => {
        const parts = line.split(/\s+/);

        if (parts.length >= 2) {
          fields.push({
            name: parts[0],
            type: parts[1],
          });
        }
      });

    models.push({
      name: modelName,
      fields,
    });
  }

  const modelNames = new Set(
    models.map((m) => m.name)
  );

  const relations: PrismaRelation[] = [];

  models.forEach((model) => {
    model.fields.forEach((field) => {
      const cleanType = field.type.replace(
        /\[\]|\?/g,
        ""
      );

      if (
        modelNames.has(cleanType) &&
        cleanType !== model.name
      ) {
        const isMany = field.type.includes("[]");

        relations.push({
          source: model.name,
          target: cleanType,
          label: isMany ? "1:N" : "1:1",
        });
      }
    });
  });

  const enums: PrismaEnum[] = [];

  const enumRegex = /enum\s+(\w+)\s*\{([\s\S]*?)\}/g;

  let enumMatch;

  while ((enumMatch = enumRegex.exec(schema)) !== null) {
    const enumName = enumMatch[1];
    const enumBody = enumMatch[2];

    const values = enumBody
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line &&
          !line.startsWith("//")
      );

    enums.push({
      name: enumName,
      values,
    });
  }

  return {
    models,
    enums,
    relations,
  };
}