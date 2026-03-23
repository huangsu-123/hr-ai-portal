import { updates } from "@/data/portal";
import { latestDate, regionLabel } from "@/lib/portal";

const todayUpdates = updates.filter((item) => item.publishDate === latestDate);
const weekHighlights = updates.slice(0, 7);
const cnUpdates = updates.filter((item) => item.sourceRegion === "CN");
const globalUpdates = updates.filter((item) => item.sourceRegion === "GLOBAL");
const hrFocus = updates.filter((item) => item.hrFocus);
const toolUpdates = updates.filter((item) => item.toolUpdate);

export default function IntelPage() {
  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">每日更新 / 行业情报</p>
        <h1>AI / Agent / HR 行业情报台</h1>
        <p className="muted">
          重点展示今日更新、本周重点、国内/海外动态、HR 重点关注和工具更新。所有海外动态都提供中文摘要，便于直接团队传播。
        </p>
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
  items: typeof updates;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "listBoard compact" : "listBoard"}>
      {items.map((item) => (
        <article key={item.id} className="listItem">
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
