import type { ContentLanguage, SourceRegion } from "@/types/content";

interface ContentBadgesProps {
  sourceRegion: SourceRegion;
  originalLanguage: ContentLanguage;
  translationAvailable: boolean;
  subtitleAvailable: boolean;
  compact?: boolean;
}

export function ContentBadges({
  sourceRegion,
  originalLanguage,
  translationAvailable,
  subtitleAvailable,
  compact,
}: ContentBadgesProps) {
  return (
    <div className={compact ? "badgeRow compact" : "badgeRow"}>
      <span className={sourceRegion === "CN" ? "badge badgeRegionCN" : "badge badgeRegionGlobal"}>
        {sourceRegion === "CN" ? "国内" : "海外"}
      </span>
      <span className="badge badgeLanguage">原始语言：{originalLanguage}</span>
      <span className={translationAvailable ? "badge badgeGood" : "badge badgeMuted"}>
        {translationAvailable ? "中文摘要可用" : "暂无中文摘要"}
      </span>
      <span className={subtitleAvailable ? "badge badgeGood" : "badge badgeMuted"}>
        {subtitleAvailable ? "中文字幕可用" : "无中文字幕"}
      </span>
    </div>
  );
}
