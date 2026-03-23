export type ContentType = "course" | "video" | "article" | "news" | "template" | "case";
export type SourceRegion = "CN" | "GLOBAL";
export type Language = "中文" | "英文" | "多语言" | "其他";
export type AudienceType = "招聘 HR" | "HRBP" | "COE / OD" | "HR 管理者" | "通用 HR";

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  type: ContentType;
  access: "free" | "freemium" | "paid";
  sourceName: string;
  sourceUrl: string;
  sourceRegion: SourceRegion;
  originalLanguage: Language;
  publishDate?: string;
  duration?: string;
  tags: string[];
  audience: AudienceType[];
  summary: string;
  chineseSummary: string;
  relevanceToHR: string;
  translationAvailable: boolean;
  subtitleAvailable: boolean;
  recommendedAudience: string;
  recommendedAction: string;
  shareSummary: string;
  featured: boolean;
  collectionIds: string[];
  body?: string;
  highlights?: string[];
  keyTakeaways?: string[];
}

export interface UpdateItem {
  id: string;
  title: string;
  publishDate: string;
  sourceName: string;
  sourceUrl: string;
  sourceRegion: SourceRegion;
  originalLanguage: Language;
  category: string;
  tags: string[];
  summary: string;
  chineseSummary: string;
  relevanceToHR: string;
  hrFocus: boolean;
  toolUpdate: boolean;
  translationAvailable: boolean;
}

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  scenario: string;
  targetAudience: AudienceType[];
  tags: string[];
  inputRequirements: string[];
  outputFormat: string;
  template: string;
  usageTip: string;
  steps?: string[];
  qualityChecklist?: string[];
  commonPitfalls?: string[];
  exampleInput?: string;
  exampleOutput?: string;
}

export interface AgentGuide {
  id: string;
  title: string;
  problem: string;
  suitableFor: AudienceType[];
  trigger: string;
  inputs: string[];
  workflow: string[];
  outputs: string[];
  risks: string[];
  metrics: string[];
  promptStarter: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  cover: string;
  shareSummary: string;
  contentSlugs: string[];
}

export interface FeedSource {
  id: string;
  name: string;
  type: "rss" | "api" | "manual";
  region: SourceRegion;
  lang: Language;
  url: string;
  enabled: boolean;
  note: string;
}

export interface ShortVideoItem {
  id: string;
  title: string;
  platform: "抖音";
  creator: string;
  duration: string;
  level: "入门" | "进阶";
  topic: string;
  summary: string;
  keyPoints: string[];
  link: string;
  subtitleAvailable: boolean;
  chineseBriefReady: boolean;
}
