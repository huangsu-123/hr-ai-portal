import { agentGuides, collections, contents, shortVideos, templates, updates } from "@/data/portal";
import type { ContentItem } from "@/types/portal";

export const regionLabel: Record<string, string> = {
  CN: "国内",
  GLOBAL: "海外",
};

export const typeLabel: Record<string, string> = {
  course: "课程",
  video: "视频",
  article: "文章",
  news: "动态",
  template: "模板",
  case: "案例",
};

export const getContentBySlug = (slug: string) => contents.find((item) => item.slug === slug);

export const getRelatedContents = (content: ContentItem) => {
  const related = contents.filter(
    (item) =>
      item.slug !== content.slug &&
      (item.collectionIds.some((id) => content.collectionIds.includes(id)) ||
        item.tags.some((tag) => content.tags.includes(tag))),
  );
  return related.slice(0, 6);
};

export const getCollectionContents = (collectionId: string) => {
  const target = collections.find((item) => item.id === collectionId);
  if (!target) {
    return [];
  }
  return target.contentSlugs
    .map((slug) => contents.find((item) => item.slug === slug))
    .filter((item): item is ContentItem => Boolean(item));
};

export const stats = {
  contentCount: contents.length,
  updateCount: updates.length,
  templateCount: templates.length,
  agentCount: agentGuides.length,
  shortVideoCount: shortVideos.length,
  overseasCount: contents.filter((item) => item.sourceRegion === "GLOBAL").length,
  translatedCount: contents.filter((item) => item.translationAvailable).length,
};

export const latestDate = updates.reduce(
  (max, item) => (item.publishDate > max ? item.publishDate : max),
  "",
);
