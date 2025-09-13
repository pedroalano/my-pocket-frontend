"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type DashboardFilters = {
  selectedAccount: number | null;
  setSelectedAccount: (id: number | null) => void;
  selectedMonth: number | null;
  setSelectedMonth: (month: number | null) => void;
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
};

const DashboardFiltersContext = createContext<DashboardFilters | undefined>(undefined);

export const DashboardFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <DashboardFiltersContext.Provider
      value={{
        selectedAccount,
        setSelectedAccount,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </DashboardFiltersContext.Provider>
  );
};

export const useDashboardFilters = () => {
  const context = useContext(DashboardFiltersContext);
  if (!context) throw new Error("useDashboardFilters must be used within DashboardFiltersProvider");
  return context;
};