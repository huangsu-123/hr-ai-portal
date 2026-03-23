import { feedSources } from "@/data/portal";

export interface SyncPreviewResult {
  sourceId: string;
  sourceName: string;
  fetchedAt: string;
  mode: "manual" | "rss" | "api";
  status: "ready" | "disabled";
  nextAction: string;
}

export function getSyncPreview(): SyncPreviewResult[] {
  return feedSources.map((source) => ({
    sourceId: source.id,
    sourceName: source.name,
    fetchedAt: new Date().toISOString(),
    mode: source.type,
    status: source.enabled ? "ready" : "disabled",
    nextAction: source.enabled
      ? "进入抓取 -> 去重 -> 中文摘要 -> 人工审核 -> 入库流程"
      : "源已停用，等待管理员开启",
  }));
}
