import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TransactionTable from "@/components/transactions/TransactionTable";
import CreateTransactionModal from "@/components/transactions/CreateTransactionModal";

export default async function TransactionPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/transactions`, {
    cache: "no-store",
  });

  const transactions = await res.json();


  return (
    <div>
      <PageBreadcrumb pageTitle="Transactions" />
      <div className="space-y-6">
        <ComponentCard title="">
           <div className="flex justify-end mb-4">
              <CreateTransactionModal />
            </div>
          <TransactionTable transactions={transactions} />
        </ComponentCard>
      </div>
    </div>
  );
}