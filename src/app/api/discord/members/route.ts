import { NextResponse } from "next/server";

const INVITE_CODE = "FMvB3uyE";

export async function GET() {
  try {
    const res = await fetch(`https://discord.com/api/v9/invites/${INVITE_CODE}?with_counts=true`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Erro ao buscar dados do Discord." }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json({ members: data.approximate_member_count || 0 });
  } catch {
    return NextResponse.json({ error: "Erro inesperado." }, { status: 500 });
  }
} 