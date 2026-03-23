import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { updates } from "@/data/updates";
import type { UpdateItem } from "@/types/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const targetPath = path.join(process.cwd(), "src/data/updates.ts");

export async function GET() {
  return NextResponse.json({
    updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { updates?: unknown };
    const items = validateUpdates(body.updates);

    const sorted = [...items].sort((a, b) => {
      if (a.publishDate === b.publishDate) {
        return a.id.localeCompare(b.id);
      }
      return a.publishDate > b.publishDate ? -1 : 1;
    });

    const content = buildUpdatesFile(sorted);
    await fs.writeFile(targetPath, content, "utf8");

    return NextResponse.json({
      ok: true,
      count: sorted.length,
      updates: sorted,
      targetPath: "src/data/updates.ts",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "发布失败";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

function validateUpdates(input: unknown): UpdateItem[] {
  if (!Array.isArray(input)) {
    throw new Error("updates 必须是数组");
  }

  const items = input as UpdateItem[];

  if (!items.length) {
    throw new Error("至少需要 1 条动态");
  }

  const ids = new Set<string>();

  items.forEach((item, index) => {
    const prefix = `第 ${index + 1} 条`;

    if (!item.id || typeof item.id !== "string") {
      throw new Error(`${prefix} 缺少 id`);
    }

    if (ids.has(item.id)) {
      throw new Error(`${prefix} 的 id 重复：${item.id}`);
    }
    ids.add(item.id);

    const requiredStrings: (keyof UpdateItem)[] = [
      "title",
      "summary",
      "category",
      "sourceName",
      "publishDate",
      "relevanceToHR",
      "recommendedAction",
      "chineseBrief",
      "originalLanguage",
    ];

    requiredStrings.forEach((key) => {
      const value = item[key];
      if (typeof value !== "string" || !value.trim()) {
        throw new Error(`${prefix} 的 ${String(key)} 不能为空`);
      }
    });

    if (!Array.isArray(item.tags) || !item.tags.length) {
      throw new Error(`${prefix} 的 tags 至少需要 1 个`);
    }

    if (item.sourceRegion !== "CN" && item.sourceRegion !== "GLOBAL") {
      throw new Error(`${prefix} 的 sourceRegion 必须是 CN 或 GLOBAL`);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.publishDate)) {
      throw new Error(`${prefix} 的 publishDate 必须是 YYYY-MM-DD`);
    }

    if (typeof item.translationAvailable !== "boolean" || typeof item.subtitleAvailable !== "boolean") {
      throw new Error(`${prefix} 的翻译/字幕字段必须是布尔值`);
    }

    if (typeof item.isFeatured !== "boolean") {
      throw new Error(`${prefix} 的 isFeatured 必须是布尔值`);
    }
  });

  return items;
}

function buildUpdatesFile(items: UpdateItem[]) {
  const json = JSON.stringify(items, null, 2);

  return `import type { UpdateItem } from "@/types/content";

export const updates: UpdateItem[] = ${json} as UpdateItem[];

const latestPublishDate = updates.reduce(
  (max, item) => (item.publishDate > max ? item.publishDate : max),
  "",
);

export const todayUpdates = updates.filter((item) => item.publishDate === latestPublishDate);

export const weeklyFeaturedUpdates = updates.filter((item) => item.isFeatured).slice(0, 8);
`;
}
