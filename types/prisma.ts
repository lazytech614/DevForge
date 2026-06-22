export interface PrismaField {
  name: string;
  type: string;
}

export interface PrismaModel {
  name: string;
  fields: PrismaField[];
}

export interface PrismaRelation {
  source: string;
  target: string;
  label: string;
}

export interface PrismaStatsProps {
  models: number;
  fields: number;
  relations: number;
}