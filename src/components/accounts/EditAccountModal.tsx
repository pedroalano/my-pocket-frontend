"use client";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useRouter } from "next/navigation";
import { Account } from "@/types/Account";

interface EditAccountModalProps {
  account: Account;
  onUpdated?: () => void;
}

export default function EditAccountModal({ account, onUpdated }: EditAccountModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const [name, setName] = useState(account.name);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/accounts/${account.accountId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
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
            Edit Account
          </h4>
          <form className="flex flex-col gap-4" onSubmit={handleEdit}>
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Account name"
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