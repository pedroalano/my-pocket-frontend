import {Category} from "@/types/Category";
import { NextRequest, NextResponse } from "next/server";


async function fetchCategory(id: string): Promise<Category> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/categories/${id}`, {
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
    categoryId: raw.categoryId,
    name: raw.name,
    categoryType: raw.categoryType,
  };
}

async function updateCategory(id: string, category: Partial<Category>): Promise<Category> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/categories/${id}`, {
    method: "PUT",
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
  };
}

async function deleteCategory(id: string): Promise<void> {
  const base = process.env.API_BASE_URL;
  const token = process.env.API_TOKEN;
  if (!base) throw new Error("API_BASE_URL not set");
  if (!token) throw new Error("API_TOKEN not set");

  const res = await fetch(`${base}/api/categories/${id}`, {
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
    const category = await fetchCategory(params.id);
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    console.log("Updating category:", params.id, data);
    const updated = await updateCategory(params.id, data);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteCategory(params.id);
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
