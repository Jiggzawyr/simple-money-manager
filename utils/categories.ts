import { ExpensesCategory, IncomeCategory, RecordType } from "../models/record";

export function getCategories(recordType: RecordType): Array<String> {
  const categories: string[] = Object.values(
    recordType === RecordType.EXPENSE ? ExpensesCategory : IncomeCategory
  );
  return categories;
}
