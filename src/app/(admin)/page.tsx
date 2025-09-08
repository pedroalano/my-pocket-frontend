import type { Metadata } from "next";
import { TotalsMetrics } from "@/components/dashboard/TotalsMetrics";
import React from "react";
import ExpensesTransactions from "@/components/dashboard/ExpensesTransactions";
import IncomesTransactions from "@/components/dashboard/IncomesTransactions";
import { DashboardCategorySummary } from "@/types/DashboardCategorySummary";

export const metadata: Metadata = {
  title: "Financial Dashboard | Income and Expense Summary",
  description: "View the monthly financial summary with detailed income and expenses.",
};

export default async function Dashboard() {

  const searchParams = new URLSearchParams({
    // month: String(new Date().getMonth()),
    month: String(7),
    year: String(new Date().getFullYear()),
    account: "3", // Você pode tornar isso dinâmico também, se necessário
  });

  const resSummary = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/dashboards?${searchParams.toString()}`,
    {
      cache: "no-store",
    }
  );

  const summary: { income: DashboardCategorySummary[]; expense: DashboardCategorySummary[] } = await resSummary.json();

  const totalExpensesReal = summary.expense.reduce((acc, curr) => acc + curr.totalActual, 0);
  const totalIncomesReal = summary.income.reduce((acc, curr) => acc + curr.totalActual, 0);

  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/categories`,
    {
      cache: "no-store",
    }
  );

  const categoriesData = await categories.json();

  const accounts = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/accounts`,
    {
      cache: "no-store",
    }
  );

  const accountsData = await accounts.json();

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <TotalsMetrics
          totalExpensesReal={totalExpensesReal}
          totalIncomesReal={totalIncomesReal}
          accounts={accountsData}
        />
      </div>


      <div className="col-span-12 xl:col-span-6">
        <ExpensesTransactions
          expenses={summary.expense}
          categories={categoriesData}
        />
      </div>
      <div className="col-span-12 xl:col-span-6">
        <IncomesTransactions
          incomes={summary.income}
          categories={categoriesData}
        />
      </div>
    </div>
  );
}
