import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Category } from "@/types/Category";
import { DashboardCategorySummary } from "@/types/DashboardCategorySummary";

interface IncomesitemsProps {
  incomes: DashboardCategorySummary[];
  categories: Category[];
}

export default async function Incomesitems({
  incomes,
  categories,
}: IncomesitemsProps) {
  const usedCategoryIds = incomes.map(item => item.categoryId);

  const filteredCategories = categories.filter(
  cat => !usedCategoryIds.includes(cat.categoryId) && cat.categoryType === "INCOME"
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Incomes
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Category
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                PLANNED
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                ACTUAL
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                DIFFERENCE
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {incomes.map((item) => (
              <TableRow key={item.categoryId}>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {item.categoryName || "Uncategorized"}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color="warning"
                  >
                  {typeof item.totalPlanned === "number"
                    ? item.totalPlanned.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                    : "-"}
                    </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color="success"
                  >
                    {typeof item.totalActual === "number"
                      ? item.totalActual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                      : "-"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      item.difference && item.difference < 0 ? "error" : "primary"}
                  >
                    {typeof item.difference === "number"
                      ? item.difference.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                      : "-"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredCategories.map((item) => (
              <TableRow key={item.categoryId}>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {item.name || "Uncategorized"}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color="warning"
                  >
                    R$ 0,00
                    </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color="success"
                  >
                    R$ 0,00
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color="primary"
                  >
                    R$ 0,00
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
