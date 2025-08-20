import Link from "next/link";
import { fetchAccounts } from "@/app/api/accounts/route"

type Account = {
  id: number;
  name: string;
};

export default async function accountsPage() {
  const accounts = await fetchAccounts();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Accounts</h1>
      {accounts.length === 0 ? (
        <p className="text-sm text-slate-600">Sem registros.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((a) => (
            <li key={a.id} className="rounded border p-4 shadow-sm">
              <p className="font-medium">{a.name}</p>
              <p className="text-xs text-slate-500">ID: {a.id}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
