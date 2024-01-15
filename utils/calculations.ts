import { Record, RecordType } from "../models/record";
import { Summary, SummaryStatus } from "../models/summary";

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
  const startDate = records.at(0)?.date;
  const endDate = records.at(records.length - 1)?.date;
  const summary: Summary = {
    startDate,
    endDate,
    totalIncome,
    totalExpenses,
    records,
    status: SummaryStatus.ACTIVE,
  };
  return summary;
}

export function getChartData(records: Record[]): any[] {
  let group: { [key: string]: Record[] } = {};
  records.forEach((record) => {
    if (record.type === RecordType.INCOME) return;
    if (!group[record.category]) {
      group[record.category] = [];
    }
    group[record.category].push(record);
  });

  const total: number = records.reduce(
    (sum: number, record: Record) =>
      record.type === RecordType.EXPENSE ? sum + record.amount : sum,
    0
  );

  return Object.keys(group).map((key) => {
    const amount: number = group[key].reduce(
      (sum: number, record: Record) => sum + record.amount,
      0
    );
    const label: string =
      key + "\n" + ((amount / total) * 100).toFixed(2) + "%";
    return {
      x: label,
      y: amount,
    };
  });
}
