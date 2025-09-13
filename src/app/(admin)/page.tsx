import type { Metadata } from "next";
import { DashboardFiltersProvider } from "@/components/dashboard/DashboardFiltersProvider";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Financial Dashboard | Income and Expense Summary",
  description: "View the monthly financial summary with detailed income and expenses.",
};

export default async function Dashboard() {
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/categories`,
    { cache: "no-store" }
  );
  const categoriesData = await categoriesRes.json();

  const accountsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/accounts`,
    { cache: "no-store" }
  );
  const accountsData = await accountsRes.json();

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
        <DashboardFiltersProvider >
          <DashboardContent accountsData={accountsData} categoriesData={categoriesData} />
        </DashboardFiltersProvider>
    </div>
  );
}