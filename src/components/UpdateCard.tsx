import { ContentBadges } from "@/components/ContentBadges";
import type { UpdateItem } from "@/types/content";

interface UpdateCardProps {
  item: UpdateItem;
}

export function UpdateCard({ item }: UpdateCardProps) {
  return (
    <article className="card updateCard">
      <div className="cardBody">
        <div className="splitRow">
          <span className="label">{item.category}</span>
          <time className="muted">{item.publishDate}</time>
        </div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <p className="highlight">与 HR 的关系：{item.relevanceToHR}</p>
        <p>
          <strong>建议动作：</strong>
          {item.recommendedAction}
        </p>
        {item.sourceRegion === "GLOBAL" ? (
          <div className="translationBox">
            <strong>中文辅助理解：</strong>
            <p>{item.chineseBrief}</p>
          </div>
        ) : null}
        <ContentBadges
          sourceRegion={item.sourceRegion}
          originalLanguage={item.originalLanguage}
          translationAvailable={item.translationAvailable}
          subtitleAvailable={item.subtitleAvailable}
          compact
        />
        <div className="tagRow">
          {item.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
