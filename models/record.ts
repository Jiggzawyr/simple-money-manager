export enum RecordType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum IncomeCategory {
  SALARY = "Salary",
  BONUS = "Bonus",
  OTHER = "Other",
}

export enum ExpensesCategory {
  FOOD = "Food",
  UTILITIES = "Utilities",
  RENT_MORTGAGE = "Rent/Mortgage",
  TRANSPORTATION = "Transportation",
  HEALTHCARE = "Healthcare",
  CLOTHING = "Clothing",
  TRAVEL = "Travel",
  OTHER = "Other",
}

export interface Record {
  id?: number;
  name?: string;
  type?: RecordType;
  category?: IncomeCategory | ExpensesCategory;
  amount?: number;
  date?: Date;
}
