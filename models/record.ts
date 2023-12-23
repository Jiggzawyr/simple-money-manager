export enum RecordType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface Record {
  id?: number;
  name?: string;
  type?: RecordType;
  amount?: number;
  date?: Date;
}
