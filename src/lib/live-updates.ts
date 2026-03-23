import { updates as fallbackUpdates } from "@/data/portal";
import type { UpdateItem } from "@/types/portal";

interface LiveFeed {
  id: string;
  sourceName: string;
  sourceUrl: string;
  tag: string;
}

type RealtimeMode = "live" | "fallback";

export interface RealtimeUpdatesResult {
  items: UpdateItem[];
  mode: RealtimeMode;
  generatedAt: string;
  feedCount: number;
}

const REQUEST_TIMEOUT_MS = 8000;

const liveFeeds: LiveFeed[] = [
  {
    id: "openai-blog",
    sourceName: "OpenAI Blog",
    sourceUrl: "https://openai.com/blog/rss.xml",
    tag: "模型进展",
  },
  {
    id: "anthropic-news",
    sourceName: "Anthropic News",
    sourceUrl: "https://www.anthropic.com/news/rss.xml",
    tag: "行业动态",
  },
  {
    id: "huggingface-blog",
    sourceName: "Hugging Face Blog",
    sourceUrl: "https://huggingface.co/blog/feed.xml",
    tag: "工具实践",
  },
  {
    id: "google-developers-ai",
    sourceName: "Google Developers AI",
    sourceUrl: "https://developers.googleblog.com/en/tags/ai/rss/",
    tag: "开发实践",
  },
];

export async function getRealtimeUpdates(limit = 24): Promise<UpdateItem[]> {
  const result = await getRealtimeUpdatesWithMeta(limit);
  return result.items;
}

export async function getRealtimeUpdatesWithMeta(limit = 24): Promise<RealtimeUpdatesResult> {
  try {
    const all = (
      await Promise.all(
        liveFeeds.map(async (feed) => {
          const res = await fetch(feed.sourceUrl, {
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
            next: { revalidate: 600 },
          });

          if (!res.ok) {
            throw new Error(`fetch failed ${feed.sourceUrl}`);
          }

          const xml = await res.text();
          return parseFeed(xml, feed);
        }),
      )
    ).flat();

    const deduped = dedupeByTitle(all).sort((a, b) => (a.publishDate > b.publishDate ? -1 : 1));
    const cnSeeds = fallbackUpdates.filter((item) => item.sourceRegion === "CN").slice(0, 10);
    const mixed = dedupeByTitle([...cnSeeds, ...deduped]).sort((a, b) => (a.publishDate > b.publishDate ? -1 : 1));

    if (!mixed.length) {
      return buildFallback(limit);
    }

    return {
      items: mixed.slice(0, limit),
      mode: "live",
      generatedAt: new Date().toISOString(),
      feedCount: liveFeeds.length,
    };
  } catch {
    return buildFallback(limit);
  }
}

function buildFallback(limit: number): RealtimeUpdatesResult {
  return {
    items: fallbackUpdates.slice(0, limit),
    mode: "fallback",
    generatedAt: new Date().toISOString(),
    feedCount: liveFeeds.length,
  };
}

function parseFeed(xml: string, feed: LiveFeed): UpdateItem[] {
  const items = extractBlocks(xml, "item");
  const entries = items.length ? items : extractBlocks(xml, "entry");
  const parsed: UpdateItem[] = [];

  entries.forEach((block, idx) => {
    const title = cleanText(extractTag(block, "title"));
    const description = cleanText(
      extractTag(block, "description") || extractTag(block, "summary") || extractTag(block, "content"),
    );

    if (!title) {
      return;
    }

    const dateRaw = extractTag(block, "pubDate") || extractTag(block, "updated") || extractTag(block, "published") || "";
    const link = extractTag(block, "link") || extractLinkHref(block) || feed.sourceUrl;
    const publishDate = normalizeDate(dateRaw);
    const relevanceToHR = inferHRRelevance(title, description);

    parsed.push({
      id: `${feed.id}-${slugify(title)}-${idx}`,
      title,
      publishDate,
      sourceName: feed.sourceName,
      sourceUrl: link,
      sourceRegion: "GLOBAL",
      originalLanguage: "英文",
      category: "全球实时动态",
      tags: buildTags(title, feed.tag),
      summary: trimText(description || title, 160),
      chineseSummary: buildChineseBrief(title, description),
      relevanceToHR,
      hrFocus: true,
      toolUpdate: /release|launch|tool|api|model|agent|framework/i.test(`${title} ${description}`),
      translationAvailable: true,
    });
  });

  return parsed;
}

function extractBlocks(xml: string, tagName: string) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "gi");
  return Array.from(xml.matchAll(regex)).map((match) => match[1]);
}

function extractTag(block: string, tagName: string) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i");
  const match = block.match(regex);
  return match?.[1]?.trim() ?? "";
}

function extractLinkHref(block: string) {
  const match = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? "";
}

function cleanText(input: string) {
  return decodeHtml(
    input
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function decodeHtml(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeDate(raw: string) {
  const date = raw ? new Date(raw) : new Date();
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

function inferHRRelevance(title: string, description: string) {
  const text = `${title} ${description}`.toLowerCase();

  if (/hiring|recruit|candidate|resume|interview/.test(text)) {
    return "可直接迁移到招聘沟通、面试提纲、简历初筛等场景。";
  }
  if (/agent|workflow|automation|ops|assistant/.test(text)) {
    return "可用于优化 HR 例行流程，提升周报、会议准备和政策问答效率。";
  }
  if (/safety|risk|govern|compliance|policy/.test(text)) {
    return "适合用于完善 HR AI 使用边界、合规审批和人工复核策略。";
  }
  return "可帮助 HR 团队持续跟进 AI 方向，快速判断是否值得引入到内部流程。";
}

function buildChineseBrief(title: string, description: string) {
  const base = description ? trimText(description, 100) : title;
  return `中文速览：${base}；建议从“与 HR 的关系 + 可执行动作”角度评估后再试点。`;
}

function buildTags(title: string, fallbackTag: string) {
  const text = title.toLowerCase();
  const tags = [fallbackTag, "全球", "免费"];

  if (/agent/i.test(text)) tags.push("Agent");
  if (/prompt|instruction/i.test(text)) tags.push("提示词");
  if (/hiring|recruit|interview/i.test(text)) tags.push("招聘");
  if (/govern|safety|risk|policy/i.test(text)) tags.push("治理");

  return Array.from(new Set(tags));
}

function trimText(input: string, max = 120) {
  if (input.length <= max) {
    return input;
  }
  return `${input.slice(0, max)}...`;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 36);
}

function dedupeByTitle(items: UpdateItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
