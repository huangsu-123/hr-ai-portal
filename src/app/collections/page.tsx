import { ContentCard } from "@/components/ContentCard";
import { collections } from "@/data/portal";
import { getCollectionContents } from "@/lib/portal";

export default function CollectionsPage() {
  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">专题合集 / 分享页</p>
        <h1>团队可转发专题合集</h1>
        <p className="muted">每个合集都包含分享摘要，适合在飞书/企业微信内直接转发。</p>
      </section>

      {collections.map((collection) => {
        const items = getCollectionContents(collection.id);
        return (
          <section key={collection.id} className="section">
            <div className="sectionHead">
              <div>
                <h2>{collection.title}</h2>
                <p className="muted">{collection.description}</p>
              </div>
            </div>
            <article className="shareBox">
              <h3>转发摘要</h3>
              <p>{collection.shareSummary}</p>
            </article>
            <div className="grid3">
              {items.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
