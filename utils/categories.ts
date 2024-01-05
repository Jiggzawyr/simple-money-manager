import { ISingleSelectDataType } from "@freakycoder/react-native-single-select";
import { ExpensesCategory, IncomeCategory, RecordType } from "../models/record";

export function getCategories(
  recordType: RecordType
): Array<ISingleSelectDataType> {
  const incomeCategories: string[] = Object.values(
    recordType === RecordType.EXPENSE ? ExpensesCategory : IncomeCategory
  );
  return incomeCategories.map((category, index) => {
    const singleSelectCategory: ISingleSelectDataType = {
      id: index,
      value: category,
    };
    return singleSelectCategory;
  });
}
