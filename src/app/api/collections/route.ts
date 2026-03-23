import { NextResponse } from "next/server";
import { collections } from "@/data/portal";
import { getCollectionContents } from "@/lib/portal";

export function GET() {
  return NextResponse.json({
    total: collections.length,
    items: collections.map((collection) => ({
      ...collection,
      contents: getCollectionContents(collection.id),
    })),
  });
}
