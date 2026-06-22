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
}