import { Account } from "@/types/Account";
import { NextRequest, NextResponse } from "next/server";


async function fetchAccount(id: string): Promise<Account> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/accounts/${id}`, {
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
    accountId: raw.accountId,
    name: raw.name,
  };
}

async function updateAccount(id: string, account: Partial<Account>): Promise<Account> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/accounts/${id}`, {
    method: "PUT",
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

async function deleteAccount(id: string): Promise<void> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/accounts/${id}`, {
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
    const account = await fetchAccount(params.id);
    return NextResponse.json(account);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    console.log("Updating account:", params.id, data);
    const updated = await updateAccount(params.id, data);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteAccount(params.id);
    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
