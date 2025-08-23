"use client";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useRouter } from "next/navigation";
import { Category } from "@/types/Category";
import Select from "../form/Select";

interface EditCategoryModalProps {
  category: Category;
  onUpdated?: () => void;
}

export default function EditCategoryModal({ category, onUpdated }: EditCategoryModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [categoryType, setCategoryType] = useState<"INCOME" | "EXPENSE">(category.categoryType);
  const [order, setOrder] = useState(category.order);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/categories/${category.categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, categoryType, order }),
      });
      closeModal();
      router.refresh();
      onUpdated?.();
    } catch (err) {
      alert("Erro ao editar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="text-blue-600 hover:underline mr-3"
        onClick={openModal}
        type="button"
      >
        Edit
      </button>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] m-4">
        <div className="w-full max-w-[400px] rounded-3xl bg-white p-4 dark:bg-gray-900">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Category
          </h4>
          <form className="flex flex-col gap-4" onSubmit={handleEdit}>
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Category name"
              />
            </div>
            <div>
              <Label>Type</Label>
             <select
                value={categoryType}
                onChange={e => setCategoryType(e.target.value as "INCOME" | "EXPENSE")}
                required
              >
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </select>
            </div>
            <div>
              <Label>Order</Label>
              <Input
                type="number"
                value={order}
                onChange={e => setOrder(Number(e.target.value))}
                required
                placeholder="Category order"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button size="sm" variant="outline" onClick={closeModal} type="button">
                Cancel
              </Button>
              <Button size="sm" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}