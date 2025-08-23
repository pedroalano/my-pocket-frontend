"use client";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useRouter } from "next/navigation";

interface CreateAccountModalProps {
  onCreated?: () => void; // callback para atualizar a lista após criar
}

export default function CreateAccountModal({ onCreated }: CreateAccountModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      setName("");
      closeModal();
      router.refresh();
      onCreated?.();
    } catch (err) {
      alert("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button className="btn btn-primary" onClick={openModal}>
        New Account
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] m-4">
        <div className="w-full max-w-[400px] rounded-3xl bg-white p-4 dark:bg-gray-900">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Create Account
          </h4>
          <form className="flex flex-col gap-4" onSubmit={handleCreate}>
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
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}