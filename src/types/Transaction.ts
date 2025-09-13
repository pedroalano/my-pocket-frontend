export interface Transaction {
  transactionId: number;
  value: number;
  date: string;
  description: string;
  type : "INCOME" | "EXPENSE";
  categoryId: number;
  categoryName: string;
  status: "PLANNED" | "ACTUAL";
  accountId: number;
}
