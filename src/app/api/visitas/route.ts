import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "visits.json");

async function getVisits() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data).total || 0;
  } catch {
    return 0;
  }
}

async function setVisits(total: number) {
  await fs.writeFile(filePath, JSON.stringify({ total }), "utf-8");
}

export async function GET() {
  const total = await getVisits();
  return NextResponse.json({ total });
}

export async function POST() {
  const total = (await getVisits()) + 1;
  await setVisits(total);
  return NextResponse.json({ total });
} 