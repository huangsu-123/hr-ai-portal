import { typeLabel } from "@/lib/portal";
import type { ContentItem } from "@/types/portal";

const iconByType: Record<ContentItem["type"], string> = {
  course: "课程",
  video: "短视频",
  article: "图文",
  news: "情报",
  template: "模板",
  case: "案例",
};

export function ContentCover({ item, compact = true }: { item: ContentItem; compact?: boolean }) {
  const coverClass = `contentCover cover-${item.type} ${item.sourceRegion === "GLOBAL" ? "isGlobal" : ""}`;

  return (
    <div className={coverClass}>
      <div className="coverHeader">
        <span className="coverBadge">{iconByType[item.type]}</span>
        <span className="coverMeta">{item.sourceRegion === "CN" ? "国内" : "海外"}</span>
      </div>
      <h4>{item.title}</h4>
      <p>{compact ? item.chineseSummary.slice(0, 42) : item.chineseSummary}</p>
      <div className="coverFooter">{typeLabel[item.type]} · {item.publishDate ?? item.duration ?? "持续更新"}</div>
    </div>
  );
}
