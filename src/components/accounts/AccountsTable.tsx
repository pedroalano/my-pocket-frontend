"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Account } from "@/types/Account";
import EditAccountModal from "@/components/accounts/EditAccountModal";
import { useRouter } from "next/navigation";

interface AccountsTableProps {
  accounts: Account[];
}

export default function AccountsTable({ accounts }: AccountsTableProps) { 
  
  const router = useRouter();

  const handleDelete = async (accountId: number | string) => {
    if (!confirm("Tem certeza que deseja deletar esta conta?")) return;
    try {
      const res = await fetch(`/api/accounts/${accountId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erro ao deletar conta");
        return;
      }
      router.refresh();
    } catch (err) {
      alert("Erro ao deletar conta");
    }
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[400px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {accounts.map((account) => (
                <TableRow key={account.accountId}>
                  <TableCell className="px-5 py-4 text-start">
                    {account.accountId}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {account.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                   <EditAccountModal account={account} onUpdated={() => {}} />
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(account.accountId)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}