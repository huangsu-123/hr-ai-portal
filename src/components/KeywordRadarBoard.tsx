"use client";

import { useCallback, useEffect, useState } from "react";
import type { KeywordRadarItem } from "@/types/portal";

interface KeywordRadarBoardProps {
  compact?: boolean;
}

interface KeywordRadarResponse {
  total: number;
  items: KeywordRadarItem[];
  mode: "live" | "fallback";
  generatedAt: string;
}

export function KeywordRadarBoard({ compact = false }: KeywordRadarBoardProps) {
  const [payload, setPayload] = useState<KeywordRadarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRadar = useCallback(async (manual = false) => {
    if (manual) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      setError(null);
      const res = await fetch("/api/keyword-radar", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("关键词雷达获取失败");
      }
      const data = (await res.json()) as KeywordRadarResponse;
      setPayload(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "关键词雷达获取失败");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRadar();
  }, [fetchRadar]);

  const items = compact ? payload?.items.slice(0, 8) ?? [] : payload?.items ?? [];

  return (
    <section className="section">
      <div className="sectionHead">
        <div>
          <h2>简历关键词与技术雷达</h2>
          <p className="muted">
            帮助 HR 快速理解简历常见关键词、应用场景与本周讨论热点，支持实时刷新。
          </p>
        </div>
        <button type="button" className="linkBtn" onClick={() => fetchRadar(true)} disabled={refreshing}>
          {refreshing ? "刷新中..." : "刷新关键词"}
        </button>
      </div>

      <div className="badgeRow">
        <span className={payload?.mode === "live" ? "badge ok" : "badge warn"}>
          数据状态：{payload?.mode === "live" ? "实时抓取" : "回退种子"}
        </span>
        <span className="badge">最近刷新：{payload?.generatedAt ? formatDatetime(payload.generatedAt) : "-"}</span>
      </div>

      {loading ? <div className="empty">正在加载关键词雷达...</div> : null}
      {error ? <div className="empty">{error}</div> : null}

      {!loading && !error ? (
        <div className={compact ? "grid2" : "grid3"}>
          {items.map((item) => (
            <article key={item.id} className="card keywordCard">
              <div className="cardTop">
                <span className="pill">{item.keyword}</span>
                <span className="badge ok">热度 {item.trendScore}</span>
              </div>
              <p className="smallLine"><strong>关键词含义：</strong>{item.meaning}</p>
              <p className="smallLine"><strong>简历识别提示：</strong>{item.resumeHint}</p>
              <p className="smallLine"><strong>最新讨论：</strong>{item.latestDiscussion}</p>
              <h4>可用于哪些事</h4>
              <ul className="detailList">
                {item.hrUseCases.map((useCase) => (
                  <li key={useCase}>{useCase}</li>
                ))}
              </ul>
              <h4>实时信号</h4>
              <ul className="detailList">
                {item.trendingSignals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function formatDatetime(raw: string) {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return raw;
  }
  return date.toLocaleString("zh-CN", { hour12: false });
}
