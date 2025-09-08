import { Transaction } from "@/types/Transaction";
import { NextRequest, NextResponse } from "next/server";


async function fetchTransaction(id: string): Promise<Transaction> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/transactions/${id}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "my-pocket-frontend/1.0",
    },
  });

  if (!res.ok) throw new Error(`Upstream error (${res.status})`);

  const raw = await res.json();

  if (!raw || typeof raw !== "object") throw new Error("Unexpected payload shape");

  return {
    id: raw.id,
    amount: raw.amount,
    date: raw.date,
    description: raw.description,
    transactionType: raw.transactionType,
    category: raw.category,
    transactionStatus: raw.transactionStatus,
    Account: raw.Account,
  };
}

async function updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/transactions/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "my-pocket-frontend/1.0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  if (!res.ok) throw new Error(`Upstream error (${res.status})`);

  const raw = await res.json();

  if (!raw || typeof raw !== "object") throw new Error("Unexpected payload shape");

  return {
    id: raw.id,
    amount: raw.amount,
    date: raw.date,
    description: raw.description,
    transactionType: raw.transactionType,
    category: raw.category,
    transactionStatus: raw.transactionStatus,
    Account: raw.Account,
  };
}

async function deleteTransaction(id: string): Promise<void> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/transactions/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "my-pocket-frontend/1.0",
    },
  });

  if (!res.ok) throw new Error(`Upstream error (${res.status})`);
}


export async function GET({params}: { params: { id: string } }) {
  try {
    const transaction = await fetchTransaction(params.id);
    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    console.log("Updating transaction:", params.id, data);
    const updated = await updateTransaction(params.id, data);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteTransaction(params.id);
    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
