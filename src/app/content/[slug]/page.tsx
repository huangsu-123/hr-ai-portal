import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { ContentMetaBadges } from "@/components/ContentMetaBadges";
import { contents } from "@/data/portal";
import { getContentBySlug, getRelatedContents, typeLabel } from "@/lib/portal";

interface DetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return contents.map((item) => ({ slug: item.slug }));
}

export default async function ContentDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedContents(item);

  return (
    <div className="container pageStack">
      <section className="section">
        <Link href="/library" className="textLink">
          ← 返回资料中心
        </Link>
        <h1>{item.title}</h1>
        <p className="muted">{item.summary}</p>
        <ContentMetaBadges content={item} />
        <div className="metaGrid">
          <p>
            <strong>内容类型：</strong>
            {typeLabel[item.type]}
          </p>
          <p>
            <strong>来源：</strong>
            {item.sourceName}
          </p>
          <p>
            <strong>发布时间/时长：</strong>
            {item.publishDate ?? item.duration ?? "持续更新"}
          </p>
          <p>
            <strong>适合直接分享：</strong>
            {item.translationAvailable ? "是（含中文辅助）" : "建议先做导读"}
          </p>
        </div>
      </section>

      <section className="section split">
        <article className="panelBox">
          <h2>中文导读 / 翻译摘要</h2>
          <p>{item.chineseSummary}</p>
          <h3>与 HR 的关系</h3>
          <p>{item.relevanceToHR}</p>
          <h3>推荐给谁看</h3>
          <p>{item.recommendedAudience}</p>
          <h3>推荐使用方式</h3>
          <p>{item.recommendedAction}</p>
        </article>

        <article className="panelBox">
          <h2>分享摘要</h2>
          <p>{item.shareSummary}</p>
          <h3>标签</h3>
          <div className="badgeRow">
            {item.tags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
          <h3>适用对象</h3>
          <div className="badgeRow">
            {item.audience.map((role) => (
              <span key={role} className="badge">
                {role}
              </span>
            ))}
          </div>
          <div className="heroActions">
            <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="btn primary">
              打开原始来源
            </a>
            <button type="button" className="btn ghost" disabled>
              分享按钮（预留）
            </button>
          </div>
        </article>
      </section>

      {(item.body || item.highlights || item.keyTakeaways) && (
        <section className="section">
          <h2>正文与重点整理</h2>
          {item.body ? <p>{item.body}</p> : null}
          {item.highlights?.length ? (
            <>
              <h3>Highlights</h3>
              <ul>
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </>
          ) : null}
          {item.keyTakeaways?.length ? (
            <>
              <h3>Key Takeaways</h3>
              <ul>
                {item.keyTakeaways.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      )}

      <section className="section">
        <div className="sectionHead">
          <h2>相关推荐</h2>
        </div>
        <div className="grid3">
          {related.map((target) => (
            <ContentCard key={target.id} item={target} />
          ))}
        </div>
      </section>
    </div>
  );
}
