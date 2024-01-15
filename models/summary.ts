import { Record } from "./record";

export enum SummaryStatus {
  ACTIVE = "Active",
  ARCHIVED = "Archived",
}

export interface Summary {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  totalIncome?: number;
  totalExpenses?: number;
  status?: SummaryStatus;
  records?: Record[];
}
