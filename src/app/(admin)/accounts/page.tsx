import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AccountsTable from "@/components/accounts/AccountsTable";
import CreateAccountModal from "@/components/accounts/CreateAccountModal";

export default async function accountsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/accounts`, {
    cache: "no-store",
  });

  const accounts = await res.json();


  return (
    <div>
      <PageBreadcrumb pageTitle="Accounts" />
      <div className="space-y-6">
        <ComponentCard title="">
           <div className="flex justify-end mb-4">
              <CreateAccountModal />
            </div>
          <AccountsTable accounts={accounts} />
        </ComponentCard>
      </div>
    </div>
  );
}