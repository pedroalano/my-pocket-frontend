"use client";
import React, { useEffect, useState } from "react";
import { TotalsMetrics } from "./TotalsMetrics";
import ExpensesTransactions from "./ExpensesTransactions";
import IncomesTransactions from "./IncomesTransactions";
import { DashboardCategorySummary } from "@/types/DashboardCategorySummary";
import { useDashboardFilters } from "./DashboardFiltersProvider";
import { DashboardFilters } from "./DashboardFilters";

type DashboardContentProps = {
    accountsData: any[];
    categoriesData: any[];
};

export const DashboardContent = ({ accountsData, categoriesData }: DashboardContentProps) => {
    const { selectedMonth, selectedYear, selectedAccount } = useDashboardFilters();
    const [summary, setSummary] = useState<{ income: DashboardCategorySummary[]; expense: DashboardCategorySummary[] }>({
        income: [],
        expense: [],
    });

    useEffect(() => {
        if (selectedMonth && selectedYear && selectedAccount) {
            const fetchSummary = async () => {
                const searchParams = new URLSearchParams({
                    month: String(selectedMonth),
                    year: String(selectedYear),
                    account: String(selectedAccount),
                });

                const resSummary = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/dashboards?${searchParams.toString()}`,
                    { cache: "no-store" }
                );
                const data = await resSummary.json();
                setSummary(data);
            };
            fetchSummary();
        }
    }, [selectedMonth, selectedYear, selectedAccount]);

    const totalExpensesReal = summary.expense.reduce((acc, curr) => acc + curr.totalActual, 0);
    const totalIncomesReal = summary.income.reduce((acc, curr) => acc + curr.totalActual, 0);

    return (
        <>
            <div className="col-span-12 space-y-6 xl:col-span-12">
                <DashboardFilters accounts={accountsData} />
            </div>
            <div className="col-span-12 space-y-6 xl:col-span-12">
                <TotalsMetrics
                    totalExpensesReal={totalExpensesReal}
                    totalIncomesReal={totalIncomesReal}
                />
            </div>
            <div className="col-span-12 xl:col-span-6">
                <ExpensesTransactions expenses={summary.expense} categories={categoriesData} />
            </div>
            <div className="col-span-12 xl:col-span-6">
                <IncomesTransactions incomes={summary.income} categories={categoriesData} />
            </div>
        </>
    );
};