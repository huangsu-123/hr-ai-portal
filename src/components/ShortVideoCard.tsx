import type { ShortVideoItem } from "@/types/portal";

export function ShortVideoCard({ item }: { item: ShortVideoItem }) {
  return (
    <article className="shortVideoCard">
      <div className="shortVideoCover">
        <span className="playBadge">▶ 抖音科普</span>
        <strong>{item.duration}</strong>
      </div>
      <h3>{item.title}</h3>
      <p className="muted">创作者：{item.creator} · 难度：{item.level}</p>
      <p>{item.summary}</p>
      <div className="badgeRow">
        <span className="badge">主题：{item.topic}</span>
        <span className={item.subtitleAvailable ? "badge ok" : "badge warn"}>
          中文字幕：{item.subtitleAvailable ? "有" : "无"}
        </span>
        <span className={item.chineseBriefReady ? "badge ok" : "badge warn"}>
          中文要点：{item.chineseBriefReady ? "已整理" : "待整理"}
        </span>
      </div>
      <ul className="videoPointList">
        {item.keyPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <a href={item.link} target="_blank" rel="noreferrer" className="linkBtn">
        查看抖音相关内容
      </a>
    </article>
  );
}
