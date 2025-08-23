import { Category } from "@/types/Category";
import { NextRequest, NextResponse } from "next/server";


async function fetchCategories(): Promise<Category[]> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/categories`, {
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

  return list.map((d: Category) => ({
    categoryId: d.categoryId,
    name: d.name,
    categoryType: d.categoryType,
    order: d.order,
  }));
}

async function createCategory(category: Category): Promise<Category> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  console.log("Creating category:", category);
  const res = await fetch(`${base}/api/categories`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "my-pocket-frontend/1.0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!res.ok) throw new Error(`Upstream error (${res.status})`);

  const raw = await res.json();

  if (!raw || typeof raw !== "object") throw new Error("Unexpected payload shape");

  return {
    categoryId: raw.categoryId,
    name: raw.name,
    categoryType: raw.categoryType,
    order: raw.order,
  };
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received data:", data);
    const created = await createCategory(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

