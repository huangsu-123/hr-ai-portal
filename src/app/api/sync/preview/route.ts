import { NextResponse } from "next/server";
import { getSyncPreview } from "@/lib/sync";

export function GET() {
  return NextResponse.json({
    items: getSyncPreview(),
  });
}
