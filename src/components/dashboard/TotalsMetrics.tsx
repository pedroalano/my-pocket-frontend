"use client";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, BalanceIcon, CoinInIcon, CoinOutIcon} from "@/icons";

type TotalsMetricsProps = {
  totalExpensesReal: number;
  totalIncomesReal: number;
};

export const TotalsMetrics = ({ totalExpensesReal, totalIncomesReal }: TotalsMetricsProps) => {

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
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
      {/* <!-- Metric Item Start --> */}
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
        </div>
      </div>
          {/* <!-- Metric Item End --> */}  
    </div>
  );
};
