import { Account } from "@/types/Account";
import { NextRequest, NextResponse } from "next/server";


async function fetchAccounts(): Promise<Account[]> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/accounts`, {
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

  return list.map((d: Account) => ({
    accountId: d.accountId,
    name: d.name,
  }));
}

async function createAccount(account: Account): Promise<Account> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/accounts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "my-pocket-frontend/1.0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

  if (!res.ok) throw new Error(`Upstream error (${res.status})`);

  const raw = await res.json();

  if (!raw || typeof raw !== "object") throw new Error("Unexpected payload shape");

  return {
    accountId: raw.accountId,
    name: raw.name,
  };
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const created = await createAccount(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const accounts = await fetchAccounts();
    return NextResponse.json(accounts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

