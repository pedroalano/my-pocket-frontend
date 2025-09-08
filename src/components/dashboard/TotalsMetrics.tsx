"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, BalanceIcon, ChevronDownIcon, CoinInIcon, CoinOutIcon, WalletIcon } from "@/icons";
import Label from "../form/Label";
import Select from "../form/Select";

type TotalsMetricsProps = {
  totalExpensesReal: number;
  totalIncomesReal: number;
  accounts: { accountId: number; name: string; balance: number }[];

};

export const TotalsMetrics = ({ totalExpensesReal, totalIncomesReal, accounts }: TotalsMetricsProps) => {

  const optionsMonths = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const optionsYears = [
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
    { value: 2027, label: "2027" },
    { value: 2028, label: "2028" },
    { value: 2029, label: "2029" },
    { value: 2030, label: "2030" },
  ];

  const optionsAccounts = accounts.map(account => ({ value: account.accountId, label: account.name }));
  

  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const onAccountChange = (accountId: number | null) => {
    setSelectedAccount(accountId);
  };

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const onMonthChange = (month: number | null) => {
    setSelectedMonth(month);
  };

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const onYearChange = (year: number | null) => {
    setSelectedYear(year);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CoinOutIcon className="text-error-799 dark:text-error-900" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Expenses
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalExpensesReal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CoinInIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Incomes
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalIncomesReal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </h4>
          </div>

        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 sm:col-span-2 md:col-span-1">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BalanceIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Balance
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {(totalIncomesReal - totalExpensesReal).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge>
        </div>
      </div>

      {/* <!-- Dashboard Filters --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 sm:col-span-2 md:col-span-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 shrink-0">
              <WalletIcon className="text-gray-800 dark:text-white/90" />
            </div>
            <div className="flex-1">
              <div className="relative">
                <Select
                  options={optionsAccounts}
                  placeholder="Select account"
                  value={selectedAccount}
                  onChange={onAccountChange}
                  className="dark:bg-dark-900 w-full"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div className="space-y-6">
            <div>
              <Label>Month</Label>
              <div className="relative">
                <Select
                  options={optionsMonths}
                  placeholder="Select month"
                  value={selectedMonth}
                  onChange={onMonthChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label>Year</Label>
              <div className="relative">
                <Select
                  options={optionsYears}
                  placeholder="Select year"
                  value={selectedYear}
                  onChange={onYearChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
