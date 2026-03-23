import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { KeywordRadarBoard } from "@/components/KeywordRadarBoard";
import { VideoLearningSection } from "@/components/VideoLearningSection";
import { collections, contents } from "@/data/portal";
import { longVideoFeed, shortVideoFeed } from "@/data/video-learning";
import { getRealtimeUpdatesWithMeta } from "@/lib/live-updates";
import { stats } from "@/lib/portal";

const recentCourseCutoff = "2025-12-23";

const featured = contents.filter((item) => item.featured).slice(0, 6);
const globalFreeCourses = contents
  .filter(
    (item) =>
      item.type === "course" &&
      item.sourceRegion === "GLOBAL" &&
      !item.loginRequired &&
      (item.publishDate ?? "") >= recentCourseCutoff,
  )
  .sort((a, b) => (b.publishDate ?? "").localeCompare(a.publishDate ?? ""))
  .slice(0, 4);
const domesticHighlights = contents.filter((item) => item.sourceRegion === "CN").slice(0, 4);
const practicalExamples = contents
  .filter(
    (item) =>
      item.type === "video" ||
      item.type === "case" ||
      item.tags.includes("流程自动化") ||
      item.tags.includes("实操"),
  )
  .slice(0, 4);

export const revalidate = 600;

export default async function HomePage() {
  const { items: realtimeUpdates, mode, generatedAt } = await getRealtimeUpdatesWithMeta(18);
  const latestDate = realtimeUpdates.reduce((max, item) => (item.publishDate > max ? item.publishDate : max), "");
  const latestUpdates = realtimeUpdates.filter((item) => item.publishDate === latestDate).slice(0, 6);

  return (
    <div className="container pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">内容中台 + 资料门户</p>
          <h1>HR AI 学习资料库与行业情报站</h1>
          <p>
            面向游戏和互联网 HR 团队，集中沉淀全球免费 AI 学习资料、行业动态、模板与场景案例。每条海外内容都提供中文辅助理解，支持团队快速分享和复用。
          </p>
          <div className="heroActions">
            <Link href="/library" className="btn primary">
              进入资料中心
            </Link>
            <Link href="/intel" className="btn ghost">
              查看每日情报
            </Link>
          </div>
        </div>
        <div className="heroPanel">
          <h3>平台价值点</h3>
          <ul>
            <li>全球免费：课程/文章/视频/模板统一检索</li>
            <li>实时更新：每 10 分钟刷新一次情报数据</li>
            <li>中文辅助：海外内容标注中文摘要与字幕状态</li>
            <li>方便分享：详情页、专题合集、转发摘要一次到位</li>
          </ul>
          <div className="statsGrid">
            <div>
              <strong>{stats.contentCount}</strong>
              <span>资料条目</span>
            </div>
            <div>
              <strong>{stats.updateCount}</strong>
              <span>种子情报</span>
            </div>
            <div>
              <strong>{stats.templateCount}</strong>
              <span>模板资源</span>
            </div>
            <div>
              <strong>{stats.agentCount}</strong>
              <span>Agent 场景</span>
            </div>
            <div>
              <strong>{stats.shortVideoCount}</strong>
              <span>短视频科普</span>
            </div>
          </div>
        </div>
      </section>

      <VideoLearningSection shortItems={shortVideoFeed.slice(0, 3)} longItems={longVideoFeed.slice(0, 3)} />

      <section className="section">
        <div className="sectionHead">
          <h2>最近更新</h2>
          <Link href="/intel" className="textLink">
            进入行业情报页
          </Link>
        </div>
        <p className="muted smallLine">
          实时状态：{mode === "live" ? "实时抓取中" : "回退种子数据"} · 最近抓取：{formatDatetime(generatedAt)}
        </p>
        <div className="listBoard">
          {latestUpdates.map((item) => (
            <article key={item.id} className="listItem">
              <div className={`updateThumb ${item.sourceRegion === "GLOBAL" ? "global" : "cn"}`}>
                <span>{item.sourceRegion === "GLOBAL" ? "海外" : "国内"}</span>
                <strong>{item.category}</strong>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.chineseSummary}</p>
                <p className="smallLine">与 HR 的关系：{item.relevanceToHR}</p>
              </div>
              <span>{item.publishDate}</span>
            </article>
          ))}
          {!latestUpdates.length ? <div className="empty">当前暂无更新，稍后自动刷新。</div> : null}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>精选资料</h2>
          <p className="muted">图文/视频封面化展示，降低阅读门槛</p>
          <Link href="/library" className="textLink">
            查看全部资料
          </Link>
        </div>
        <div className="grid3">
          {featured.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>海外免登录课程专区</h2>
        </div>
        <div className="grid2">
          {globalFreeCourses.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>国内内容专区</h2>
        </div>
        <div className="grid2">
          {domesticHighlights.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>图文与实操案例专区</h2>
        </div>
        <div className="grid2">
          {practicalExamples.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <KeywordRadarBoard compact />
      <section className="section">
        <div className="sectionHead">
          <h2>关键词雷达深度入口</h2>
          <Link href="/resume-keywords" className="textLink">
            查看完整关键词解释与实时信号
          </Link>
        </div>
      </section>

      <section className="section shortcuts">
        <Link href="/agent-playbook" className="shortcutCard">
          <h3>HR Agent 专题入口</h3>
          <p>6 个 HR 场景 + 方法论 + 课程/模板关联</p>
        </Link>
        <Link href="/templates" className="shortcutCard">
          <h3>模板资源入口</h3>
          <p>10 个可复用提示词/SOP/工作流模板</p>
        </Link>
        <Link href="/collections" className="shortcutCard">
          <h3>专题合集入口</h3>
          <p>支持团队转发的一页式合集</p>
        </Link>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>热门分享内容</h2>
        </div>
        <div className="listBoard">
          {collections.slice(0, 4).map((item) => (
            <article key={item.id} className="listItem">
              <div>
                <h3>{item.title}</h3>
                <p>{item.shareSummary}</p>
              </div>
              <Link href="/collections" className="textLink">
                查看合集
              </Link>
            </article>
          ))}
        </div>
      </section>
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
