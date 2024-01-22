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
  HOUSING = "Housing",
  TRANSPORTATION = "Transportation",
  HEALTH = "Health",
  CLOTHING = "Clothing",
  TRAVEL = "Travel",
  ENTERTAINMENT = "Entertainment",
  GIFTS = "Gifts",
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
