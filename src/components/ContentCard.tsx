import Link from "next/link";
import { typeLabel } from "@/lib/portal";
import type { ContentItem } from "@/types/portal";
import { ContentMetaBadges } from "@/components/ContentMetaBadges";
import { ContentCover } from "@/components/ContentCover";

export function ContentCard({ item }: { item: ContentItem }) {
  return (
    <article className="card">
      <ContentCover item={item} />
      <div className="cardTop">
        <span className="pill">{typeLabel[item.type]}</span>
        <span className="mutedSmall">{item.publishDate ?? item.duration ?? "持续更新"}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="muted">{item.summary}</p>
      <ContentMetaBadges content={item} />
      <p className="smallLine">与 HR 的关系：{item.relevanceToHR}</p>
      <div className="cardFoot">
        <Link href={`/content/${item.slug}`} className="linkBtn">
          查看详情
        </Link>
        <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="textLink">
          原始链接
        </a>
      </div>
    </article>
  );
}
