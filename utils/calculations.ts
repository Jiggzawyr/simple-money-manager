import { Record, RecordType } from "../models/record";
import { Summary } from "../models/summary";

export function getSummary(records: Record[]): Summary {
  const totalIncome = records.reduce((acc, record) => {
    if (record.type === RecordType.INCOME) {
      return acc + record.amount;
    }
    return acc;
  }, 0);
  const totalExpenses = records.reduce((acc, record) => {
    if (record.type === RecordType.EXPENSE) {
      return acc + record.amount;
    }
    return acc;
  }, 0);
  const startDate = records.at(0).date;
  const endDate = records.at(records.length - 1).date;
  const summary: Summary = {
    startDate,
    endDate,
    totalIncome,
    totalExpenses,
  };
  return summary;
}
