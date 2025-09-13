import { Transaction } from "@/types/Transaction";
import { NextRequest, NextResponse } from "next/server";


type TransactionFilter = {
  month?: string | null;
  year?: string | null;
  account?: string | null;
  status?: string | null;
  type?: string | null;
};

async function fetchTransactions(filter: TransactionFilter): Promise<Transaction[]> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const params = new URLSearchParams();
  if (filter.month) params.append("month", filter.month);
  if (filter.year) params.append("year", filter.year);
  if (filter.account) params.append("account", filter.account);
  if (filter.status) params.append("status", filter.status);
  if (filter.type) params.append("type", filter.type);

  const res = await fetch(`${base}/api/transactions?${params.toString()}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "my-pocket-frontend/1.0",
    },
  });

  if (!res.ok) throw new Error(`Upstream error (${res.status})`);

  const raw = await res.json();

  const list = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
  if (!Array.isArray(list)) throw new Error("Unexpected payload shape");

  return list.map((d: Transaction) => ({
    transactionId: d.transactionId,
    value: d.value,
    date: d.date,
    description: d.description,
    type: d.type,
    categoryId: d.categoryId,
    categoryName: d.categoryName,
    status: d.status,
    accountId: d.accountId,
  }));
}

async function createTransaction(transaction: Transaction): Promise<Transaction> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/transactions`, {
    method: "POST",
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
    transactionId: raw.id,
    value: raw.value,
    date: raw.date,
    description: raw.description,
    type: raw.transactionType,
    categoryId: raw.categoryId,
    categoryName: raw.categoryName,
    status: raw.transactionStatus,
    accountId: raw.accountId,
  };
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const transactions = await createTransaction(data);
    return NextResponse.json(transactions, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const account = searchParams.get("account");
    const status = searchParams.get("status");
    const type  = searchParams.get("type");
    const transactions = await fetchTransactions({ month, year, account, status, type } as TransactionFilter);
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

