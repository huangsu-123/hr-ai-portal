import { NextResponse } from "next/server";
import { updates } from "@/data/portal";

export function GET() {
  return NextResponse.json({
    total: updates.length,
    items: updates,
  });
}
