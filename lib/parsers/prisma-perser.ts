import {
  PrismaEnum,
  PrismaField,
  PrismaModel,
  PrismaRelation,
} from "@/types/prisma";

export interface PrismaParseResult {
  models: PrismaModel[];
  enums: PrismaEnum[];
  relations: PrismaRelation[];
}

export function parsePrismaSchema(
  schema: string
): PrismaParseResult {
  const models: PrismaModel[] = [];

  const modelRegex =
    /model\s+(\w+)\s*\{([\s\S]*?)\}/g;

  let match;

  while (
    (match = modelRegex.exec(schema)) !== null
  ) {
    const modelName = match[1];
    const body = match[2];

    const fields: PrismaField[] = [];

    const indexes: string[] = [];
    const uniques: string[] = [];
    const compositeIds: string[] = [];

    body
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line &&
          !line.startsWith("//")
      )
      .forEach((line) => {
        if (
          line.startsWith("@@index")
        ) {
          indexes.push(line);
          return;
        }

        if (
          line.startsWith("@@unique")
        ) {
          uniques.push(line);
          return;
        }

        if (
          line.startsWith("@@id")
        ) {
          compositeIds.push(line);
          return;
        }

        const parts =
          line.split(/\s+/);

        if (parts.length < 2)
          return;

        fields.push({
          name: parts[0],
          type: parts[1],
          raw: line,

          isId:
            line.includes("@id"),

          isUnique:
            line.includes(
              "@unique"
            ),
        });
      });

    models.push({
      name: modelName,
      fields,

      metadata: {
        indexes,
        uniques,
        compositeIds,
      },
    });
  }

  const enums: PrismaEnum[] = [];

  const enumRegex =
    /enum\s+(\w+)\s*\{([\s\S]*?)\}/g;

  let enumMatch;

  while (
    (enumMatch =
      enumRegex.exec(schema)) !== null
  ) {
    const enumName =
      enumMatch[1];

    const enumBody =
      enumMatch[2];

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

  const modelNames = new Set(
    models.map((m) => m.name)
  );

  const enumNames = new Set(
    enums.map((e) => e.name)
  );

  const relations: PrismaRelation[] = [];

  const relationKeys =
    new Set<string>();

  models.forEach((model) => {
    const foreignKeyField =
      model.fields.find(
        (f) =>
          f.raw?.includes(
            "@relation"
          )
      );

    model.fields.forEach((field) => {
      const cleanType =
        field.type.replace(
          /\[\]|\?/g,
          ""
        );

      // ENUM RELATION
      if (
        enumNames.has(cleanType)
      ) {
        field.isRelation = true;

        relations.push({
          source: model.name,
          target: `enum-${cleanType}`,
          type: "ENUM",
        });

        return;
      }

      if (
        !modelNames.has(
          cleanType
        ) ||
        cleanType === model.name
      ) {
        return;
      }

      field.isRelation = true;

      const isArray =
        field.type.includes(
          "[]"
        );

      const reverseModel =
        models.find(
          (m) =>
            m.name === cleanType
        );

      const reverseField =
        reverseModel?.fields.find(
          (f) =>
            f.type.replace(
              /\[\]|\?/g,
              ""
            ) === model.name
        );

      const reverseIsArray =
        reverseField?.type.includes(
          "[]"
        );

      let relationType:
        | "1:1"
        | "1:N"
        | "N:N";

      if (
        isArray &&
        reverseIsArray
      ) {
        relationType = "N:N";
      } else if (
        isArray ||
        reverseIsArray
      ) {
        relationType = "1:N";
      } else {
        relationType = "1:1";
      }

      const relationKey =
        [model.name, cleanType]
          .sort()
          .join("-");

      if (
        relationKeys.has(
          relationKey
        )
      ) {
        return;
      }

      relationKeys.add(
        relationKey
      );

      relations.push({
        source: model.name,
        target: cleanType,
        type: relationType,
        foreignKey:
          foreignKeyField?.name,
      });
    });
  });

  return {
    models,
    enums,
    relations,
  };
}