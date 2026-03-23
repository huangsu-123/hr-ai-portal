import { NextResponse } from "next/server";
import { getKeywordRadar } from "@/lib/keyword-radar";

export const revalidate = 600;

export async function GET() {
  const result = await getKeywordRadar(24);
  return NextResponse.json({
    total: result.items.length,
    ...result,
  });
}
