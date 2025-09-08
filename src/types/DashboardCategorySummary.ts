export interface DashboardCategorySummary {
  categoryId: number | null;
  categoryName: string;
  totalPlanned: number;
  totalActual: number;
  difference: number;
  type: "INCOME" | "EXPENSE";
  month: number;
}