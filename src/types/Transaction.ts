export interface Transaction {
  transactionId: number;
  value: number;
  date: string;
  description: string;
  type : "INCOME" | "EXPENSE";
  categoryId: number;
  status: "PLANNED" | "ACTUAL";
  accountId: number;
}
