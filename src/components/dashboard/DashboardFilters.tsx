"use client";
import React, { useEffect } from "react";
import { ChevronDownIcon, WalletIcon } from "@/icons";
import Label from "../form/Label";
import Select from "../form/Select";
import { useDashboardFilters } from "./DashboardFiltersProvider";

type TotalsMetricsProps = {
  accounts: { accountId: number; name: string; balance: number }[];
};

export const DashboardFilters = ({ accounts }: TotalsMetricsProps) => {
  const {
    selectedAccount,
    setSelectedAccount,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
  } = useDashboardFilters();

  const optionsAccounts = accounts.map(account => ({ value: account.accountId, label: account.name }));

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


    useEffect(() => {

      if (selectedMonth === null) setSelectedMonth(new Date().getMonth() + 1);
      if (selectedYear === null) setSelectedYear(new Date().getFullYear());

      if (optionsAccounts.length > 0 && selectedAccount === null) {
        setSelectedAccount(optionsAccounts[0].value);
      }
    }, [optionsAccounts, selectedAccount, selectedMonth, selectedYear, setSelectedAccount, setSelectedMonth, setSelectedYear]);

    console.log({ selectedAccount, selectedMonth, selectedYear });


  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-end gap-4">
        {/* Wallet Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 shrink-0">
          <WalletIcon className="text-gray-800 dark:text-white/90" />
        </div>
        {/* Account Select */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <Label>Account</Label>
          <div className="relative">
            <Select
              id="account-select"
              options={optionsAccounts}
              placeholder="Select account"
              value={selectedAccount ?? ""}
              onChange={v => setSelectedAccount(Number(v))}
              className="dark:bg-dark-900 w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        {/* Month Select */}
        <div className="flex flex-col flex-1 min-w-[120px]">
          <Label>Month</Label>
          <div className="relative">
            <Select
              id="month-select"
              options={optionsMonths}
              placeholder="Select month"
              value={selectedMonth ?? ""}
              onChange={v => setSelectedMonth(Number(v))}
              className="dark:bg-dark-900 w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        {/* Year Select */}
        <div className="flex flex-col flex-1 min-w-[100px]">
          <Label>Year</Label>
          <div className="relative">
            <Select
              id="year-select"
              options={optionsYears}
              placeholder="Select year"
              value={selectedYear ?? ""}
              onChange={v => setSelectedYear(Number(v))}
              className="dark:bg-dark-900 w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};