import { getRealtimeUpdatesWithMeta } from "@/lib/live-updates";
import { regionLabel } from "@/lib/portal";
import type { UpdateItem } from "@/types/portal";

export const revalidate = 600;

export default async function IntelPage() {
  const { items, mode, generatedAt } = await getRealtimeUpdatesWithMeta(30);
  const latestDate = items.reduce((max, item) => (item.publishDate > max ? item.publishDate : max), "");
  const todayUpdates = items.filter((item) => item.publishDate === latestDate);
  const weekHighlights = items.slice(0, 8);
  const cnUpdates = items.filter((item) => item.sourceRegion === "CN");
  const globalUpdates = items.filter((item) => item.sourceRegion === "GLOBAL");
  const hrFocus = items.filter((item) => item.hrFocus);
  const toolUpdates = items.filter((item) => item.toolUpdate);
  const hotTags = Array.from(new Set(items.flatMap((item) => item.tags))).slice(0, 12);

  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">每日更新 / 行业情报</p>
        <h1>AI / Agent / HR 实时情报台</h1>
        <p className="muted">
          内容每 10 分钟自动抓取一次（失败自动回退到本地种子数据），按国内/海外分层呈现，并附中文摘要，方便 HR 团队快速判断价值。
        </p>
        <div className="badgeRow">
          <span className={mode === "live" ? "badge ok" : "badge warn"}>
            实时状态：{mode === "live" ? "实时抓取中" : "回退种子数据"}
          </span>
          <span className="badge">最近抓取：{formatDatetime(generatedAt)}</span>
          <span className="badge">数据范围：全球公开免费 + 国内精选</span>
        </div>
      </section>

      <section className="section">
        <h2>热点标签</h2>
        <div className="chipRow">
          {hotTags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>今日更新（{latestDate}）</h2>
        <UpdateList items={todayUpdates} />
      </section>

      <section className="section">
        <h2>本周重点</h2>
        <UpdateList items={weekHighlights} />
      </section>

      <section className="section split">
        <article className="panelBox">
          <h2>国内动态</h2>
          <UpdateList items={cnUpdates.slice(0, 8)} compact />
        </article>
        <article className="panelBox">
          <h2>海外动态（含中文摘要）</h2>
          <UpdateList items={globalUpdates.slice(0, 8)} compact />
        </article>
      </section>

      <section className="section">
        <h2>全部动态快览</h2>
        <UpdateList items={items.slice(0, 10)} compact />
      </section>

      <section className="section split">
        <article className="panelBox">
          <h2>HR 重点关注</h2>
          <UpdateList items={hrFocus.slice(0, 8)} compact />
        </article>
        <article className="panelBox">
          <h2>工具更新</h2>
          <UpdateList items={toolUpdates.slice(0, 8)} compact />
        </article>
      </section>
    </div>
  );
}

function UpdateList({
  items,
  compact,
}: {
  items: UpdateItem[];
  compact?: boolean;
}) {
  if (!items.length) {
    return <div className="empty">当前分组暂无数据，稍后会自动刷新。</div>;
  }

  return (
    <div className={compact ? "listBoard compact" : "listBoard"}>
      {items.map((item) => (
        <article key={item.id} className="listItem">
          <div className={`updateThumb ${item.sourceRegion === "GLOBAL" ? "global" : "cn"}`}>
            <span>{item.sourceRegion === "GLOBAL" ? "海外" : "国内"}</span>
            <strong>{item.category}</strong>
          </div>
          <div>
            <h3>{item.title}</h3>
            <p>{item.chineseSummary}</p>
            <p className="smallLine">与 HR 的关系：{item.relevanceToHR}</p>
            <p className="smallLine">
              {regionLabel[item.sourceRegion]} · {item.originalLanguage} · 中文摘要：
              {item.translationAvailable ? "有" : "无"}
            </p>
          </div>
          <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="textLink">
            来源
          </a>
        </article>
      ))}
    </div>
  );
}

function formatDatetime(raw: string) {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return raw;
  }
  return date.toLocaleString("zh-CN", { hour12: false });
}
