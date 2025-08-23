"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Category } from "@/types/Category";
import EditCategoryModal from "@/components/categories/EditCategoryModal";
import { useRouter } from "next/navigation";

interface CategoriesTableProps {
  categories: Category[];
}

export default function CategoriesTable({ categories }: CategoriesTableProps) { 
  
  const router = useRouter();

  const handleDelete = async (categoryId: number | string) => {
    if (!confirm("Tem certeza que deseja deletar esta categoria?")) return;
    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erro ao deletar categoria");
        return;
      }
      router.refresh();
    } catch (err) {
      alert("Erro ao deletar categoria");
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
                  Type
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
              {categories.map((category) => (
                <TableRow key={category.categoryId}>
                  <TableCell className="px-5 py-4 text-start">
                    {category.categoryId}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {category.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {category.categoryType}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <EditCategoryModal category={category} onUpdated={() => {}} />
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(category.categoryId)}
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