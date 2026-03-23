/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import type { ShortVideoItem } from "@/types/portal";

interface ShortVideoWallProps {
  videos: ShortVideoItem[];
}

export function ShortVideoWall({ videos }: ShortVideoWallProps) {
  const [refreshSeed, setRefreshSeed] = useState(0);
  const picked = useMemo(() => pickMixed(videos, 6, refreshSeed), [videos, refreshSeed]);
  const [activeId, setActiveId] = useState<string>(picked[0]?.id ?? "");

  const active = picked.find((item) => item.id === activeId) ?? picked[0];

  const handleRefresh = () => {
    setRefreshSeed((prev) => prev + 1);
    const next = pickMixed(videos, 6, refreshSeed + 1);
    setActiveId(next[0]?.id ?? "");
  };

  if (!active) {
    return <div className="empty">当前暂无短视频数据。</div>;
  }

  return (
    <section className="section">
      <div className="sectionHead">
        <div>
          <h2>短视频科普（抖音 + YouTube）</h2>
          <p className="muted">统一视频流 + 封面图展示，支持刷新推荐，学习更轻松</p>
        </div>
        <button type="button" className="linkBtn" onClick={handleRefresh}>
          刷新推荐视频
        </button>
      </div>

      <div className="videoHero">
        <div className="videoPlayerBox">
          {active.embedUrl ? (
            <iframe
              key={`${active.id}-${refreshSeed}`}
              src={active.embedUrl}
              title={active.title}
              className="videoFrame"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; encrypted-media; clipboard-write; picture-in-picture"
            />
          ) : (
            <div className="videoFallback">
              {active.coverImage ? (
                <img src={active.coverImage} alt={active.title} className="videoCoverImage" />
              ) : (
                <div className="videoCoverPlaceholder">暂无封面</div>
              )}
              <p className="smallLine">该平台限制内嵌播放，已展示封面预览。</p>
            </div>
          )}
          <p className="smallLine">
            若因平台策略无法直接内嵌播放，点击下方按钮可直接打开原视频页。
          </p>
          <a href={active.link} target="_blank" rel="noreferrer" className="linkBtn">
            打开当前视频原页
          </a>
        </div>

        <div className="videoMetaBox">
          {active.coverImage ? (
            <img src={active.coverImage} alt={`${active.title} 封面`} className="videoMetaCover" />
          ) : null}
          <h3>{active.title}</h3>
          <p className="muted">
            平台：{active.platform} · 创作者：{active.creator} · 时长：{active.duration} · 难度：{active.level}
          </p>
          <p>{active.summary}</p>
          <div className="badgeRow">
            <span className="badge">主题：{active.topic}</span>
            <span className={active.subtitleAvailable ? "badge ok" : "badge warn"}>
              中文字幕：{active.subtitleAvailable ? "有" : "无"}
            </span>
            <span className={active.chineseBriefReady ? "badge ok" : "badge warn"}>
              中文要点：{active.chineseBriefReady ? "已整理" : "待整理"}
            </span>
          </div>
          <ul className="detailList">
            {active.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="videoPickGrid">
        {picked.map((item) => (
          <button
            type="button"
            key={item.id}
            className={item.id === active.id ? "videoPickCard active" : "videoPickCard"}
            onClick={() => setActiveId(item.id)}
          >
            {item.coverImage ? <img src={item.coverImage} alt={item.title} className="videoPickImage" /> : null}
            <span className="playBadge">▶ {item.platform}</span>
            <strong>{item.title}</strong>
            <span className="smallLine">{item.creator} · {item.duration}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function pickMixed(items: ShortVideoItem[], count: number, seed: number) {
  const sorted = [...items].sort((a, b) => hash(`${a.id}-${seed}`) - hash(`${b.id}-${seed}`));
  const douyin = sorted.filter((item) => item.platform === "抖音");
  const youtube = sorted.filter((item) => item.platform === "YouTube");

  const result: ShortVideoItem[] = [];
  const used = new Set<string>();

  if (douyin.length > 0 && youtube.length > 0) {
    const minEach = Math.min(2, Math.floor(count / 2));
    douyin.slice(0, minEach).forEach((item) => {
      result.push(item);
      used.add(item.id);
    });
    youtube.slice(0, minEach).forEach((item) => {
      result.push(item);
      used.add(item.id);
    });
  }

  sorted.forEach((item) => {
    if (result.length >= Math.min(count, items.length)) {
      return;
    }
    if (used.has(item.id)) {
      return;
    }
    result.push(item);
    used.add(item.id);
  });

  return result;
}

function hash(input: string) {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) {
    value = (value * 31 + input.charCodeAt(i)) % 1000003;
  }
  return value;
}
