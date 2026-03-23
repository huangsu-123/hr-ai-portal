import { NextResponse } from "next/server";
import { contents } from "@/data/portal";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const region = searchParams.get("region");
  const type = searchParams.get("type");
  const audience = searchParams.get("audience");

  const filtered = contents.filter((item) => {
    const matchQ =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q));
    const matchRegion = !region || item.sourceRegion === region;
    const matchType = !type || item.type === type;
    const matchAudience = !audience || item.audience.includes(audience as never);

    return matchQ && matchRegion && matchType && matchAudience;
  });

  return NextResponse.json({
    total: filtered.length,
    items: filtered,
  });
}
