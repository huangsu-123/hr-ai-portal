import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { ShortVideoCard } from "@/components/ShortVideoCard";
import { collections, contents, shortVideos, updates } from "@/data/portal";
import { latestDate, stats } from "@/lib/portal";

const featured = contents.filter((item) => item.featured).slice(0, 6);
const domestic = contents.filter((item) => item.sourceRegion === "CN").slice(0, 4);
const global = contents.filter((item) => item.sourceRegion === "GLOBAL").slice(0, 4);
const latestUpdates = updates.filter((item) => item.publishDate === latestDate).slice(0, 6);

export default function HomePage() {
  return (
    <div className="container pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">内容中台 + 资料门户</p>
          <h1>HR AI 学习资料库与行业情报站</h1>
          <p>
            面向游戏和互联网 HR 团队，集中沉淀 AI/Agent 学习资料、行业动态、模板与场景案例。每条海外内容都提供中文辅助理解，支持团队快速分享和复用。
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
            <li>资料集中：课程/文章/视频/模板统一检索</li>
            <li>持续更新：每日与每周行业情报结构化沉淀</li>
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
              <span>情报更新</span>
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

      <section className="section">
        <div className="sectionHead">
          <h2>短视频科普（抖音）</h2>
          <p className="muted">3-4 分钟快速理解一个 AI Agent 重点，学习更轻松</p>
        </div>
        <div className="grid3">
          {shortVideos.map((item) => (
            <ShortVideoCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>最近更新</h2>
          <Link href="/intel" className="textLink">
            进入行业情报页
          </Link>
        </div>
        <div className="listBoard">
          {latestUpdates.map((item) => (
            <article key={item.id} className="listItem">
              <div>
                <h3>{item.title}</h3>
                <p>{item.chineseSummary}</p>
              </div>
              <span>{item.publishDate}</span>
            </article>
          ))}
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
          <h2>国内内容专区</h2>
        </div>
        <div className="grid2">
          {domestic.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>海外内容专区（含中文辅助）</h2>
        </div>
        <div className="grid2">
          {global.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
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
