export interface PrismaField {
  name: string;
  type: string;
  raw?: string;
  isId?: boolean;
  isUnique?: boolean;
  isRelation?: boolean;
}

export interface PrismaEnum {
  name: string;
  values: string[];
}

export interface PrismaModelMetadata {
  indexes: string[];
  uniques: string[];
  compositeIds: string[];
}

export interface PrismaModel {
  name: string;
  fields: PrismaField[];
  metadata: PrismaModelMetadata;
}

export interface PrismaRelation {
  source: string;
  target: string;
  type:
    | "1:1"
    | "1:N"
    | "N:N"
    | "ENUM";
  foreignKey?: string;
}

export interface PrismaStatsProps {
  models: number;
  fields: number;
  relations: number;
}