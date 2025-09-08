import { DashboardCategorySummary } from "@/types/DashboardCategorySummary";
import { NextRequest, NextResponse } from "next/server";

type DashboardFilter = {
    month?: string | null;
    year?: string | null;
    account?: string | null;
};

async function fetchDashboardCategoriesSummary(
    filter: DashboardFilter
): Promise<{ income: DashboardCategorySummary[]; expense: DashboardCategorySummary[] }> {
    const base = process.env.API_BASE_URL;
    const token = process.env.API_TOKEN;
    if (!base) throw new Error("API_BASE_URL not set");
    if (!token) throw new Error("API_TOKEN not set");

    const params = new URLSearchParams();
    if (filter.month) params.append("month", filter.month);
    if (filter.year) params.append("year", filter.year);
    if (filter.account) params.append("account", filter.account);

    const res = await fetch(`${base}/api/dashboard?${params.toString()}`, {
        cache: "no-store",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "User-Agent": "my-pocket-frontend/1.0",
        },
    });

    if (!res.ok) throw new Error(`Upstream error (${res.status})`);

    const raw = await res.json();
    const income = Array.isArray(raw?.income) ? raw.income : [];
    const expense = Array.isArray(raw?.expense) ? raw.expense : [];

    return { income, expense };
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const month = searchParams.get("month");
        const year = searchParams.get("year");
        const account = searchParams.get("account");
        const summary = await fetchDashboardCategoriesSummary({ month, year, account } as DashboardFilter);
        return NextResponse.json(summary);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}