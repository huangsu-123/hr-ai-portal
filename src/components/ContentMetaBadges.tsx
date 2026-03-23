import { regionLabel } from "@/lib/portal";
import type { ContentItem } from "@/types/portal";

export function ContentMetaBadges({ content }: { content: ContentItem }) {
  return (
    <div className="badgeRow">
      <span className="badge">{regionLabel[content.sourceRegion]}</span>
      <span className="badge">原始语言：{content.originalLanguage}</span>
      <span className={content.translationAvailable ? "badge ok" : "badge warn"}>
        中文摘要：{content.translationAvailable ? "有" : "无"}
      </span>
      <span className={content.subtitleAvailable ? "badge ok" : "badge warn"}>
        中文字幕：{content.subtitleAvailable ? "有" : "无"}
      </span>
    </div>
  );
}
