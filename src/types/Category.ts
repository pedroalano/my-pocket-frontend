export interface Category {
    categoryId: number;
    name: string;
    categoryType: "INCOME" | "EXPENSE";
    order: number;
}