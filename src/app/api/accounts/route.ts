import { NextResponse } from "next/server";

type Account = { id: number | string; name: string };

// ----- Serviço (puro, sem NextResponse) -----
async function fetchAccounts(): Promise<Account[]> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) return NextResponse.json({ error: "API_BASE_URL not set" }, { status: 500 });
  if (!token) return NextResponse.json({ error: "API_TOKEN not set" }, { status: 500 });

  const res = await fetch(`${base}/api/accounts`,{
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "my-pocket-frontend/1.0",
      },
    });

  if (!res.ok) throw new Error(`Upstream error (${res.status})`);

  const raw = await res.json();

  // Aceita tanto um array direto quanto { data: [...] }
  const list = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
  if (!Array.isArray(list)) throw new Error("Unexpected payload shape");

  return list.map((d: any) => ({
    id: d.accountId,
    name: d.name,
  }));
}

// ----- Handler da rota /api/accounts -----
export async function GET() {
  try {
    const items = await fetchAccounts();
    return NextResponse.json(items, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" }, // <- message, não "mensagem"
      { status: 500 }
    );
  }
}

export { fetchAccounts };

