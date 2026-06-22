import { PrismaParseResult } from "../parsers/prisma-perser";

export function validatePrismaSchema(
  parsed: PrismaParseResult
): string[] {
  const errors: string[] = [];

  if (
    parsed.models.length === 0 &&
    parsed.enums.length === 0
  ) {
    errors.push(
      "Schema does not contain any models or enums."
    );
  }

  const modelNames = new Set<string>();

  parsed.models.forEach((model) => {
    if (modelNames.has(model.name)) {
      errors.push(
        `Duplicate model "${model.name}".`
      );
    }

    modelNames.add(model.name);
  });

  const enumNames = new Set<string>();

  parsed.enums.forEach((enumItem) => {
    if (enumNames.has(enumItem.name)) {
      errors.push(
        `Duplicate enum "${enumItem.name}".`
      );
    }

    enumNames.add(enumItem.name);
  });

  parsed.relations.forEach(
    (relation) => {
      const target =
        relation.target.replace(
          "enum-",
          ""
        );

      const modelExists =
        parsed.models.some(
          (model) =>
            model.name === target
        );

      const enumExists =
        parsed.enums.some(
          (enumItem) =>
            enumItem.name === target
        );

      if (
        !modelExists &&
        !enumExists
      ) {
        errors.push(
          `Relation target "${target}" not found.`
        );
      }
    }
  );

  parsed.models.forEach((model) => {
    if (model.fields.length === 0) {
      errors.push(
        `Model "${model.name}" has no fields.`
      );
    }
  });

  return errors;
}