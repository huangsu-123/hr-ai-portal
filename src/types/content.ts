export type SourceRegion = "CN" | "GLOBAL";

export type ContentLanguage = "中文" | "英文" | "日文" | "多语言";

export type CourseStage = "快速认知" | "场景应用" | "实战搭建" | "治理合规";

export type CourseLevel = "L1-入门" | "L2-进阶" | "L3-实战";

export type HRRole =
  | "招聘 HR"
  | "HRBP"
  | "COE/OD"
  | "HR 管理者"
  | "业务支持角色";

export interface VideoAsset {
  provider: string;
  title: string;
  cover: string;
  duration: string;
  originalLanguage: ContentLanguage;
  subtitleAvailable: boolean;
  translationAvailable: boolean;
  chineseSummary: string;
}

export interface CourseOutlineItem {
  title: string;
  points: string[];
}

export interface ConceptCard {
  term: string;
  explanation: string;
  hrValue: string;
}

export interface PromptSnippet {
  title: string;
  scenario: string;
  prompt: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  level: CourseLevel;
  stage: CourseStage;
  roles: HRRole[];
  estimatedTime: string;
  lessons: number;
  sourceRegion: SourceRegion;
  originalLanguage: ContentLanguage;
  translationAvailable: boolean;
  subtitleAvailable: boolean;
  chineseSummary: string;
  isFeatured: boolean;
  coverTone: "teal" | "ink" | "amber" | "mint";
  suitableFor: string[];
  learningObjectives: string[];
  outline: CourseOutlineItem[];
  video: VideoAsset;
  articleSections: ArticleSection[];
  conceptCards: ConceptCard[];
  promptSnippets: PromptSnippet[];
  relatedCourseSlugs: string[];
  sourceName: string;
  sourceUrl?: string;
  updatedAt: string;
}

export interface UpdateItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  sourceName: string;
  sourceRegion: SourceRegion;
  originalLanguage: ContentLanguage;
  publishDate: string;
  relevanceToHR: string;
  recommendedAction: string;
  isFeatured: boolean;
  translationAvailable: boolean;
  subtitleAvailable: boolean;
  chineseBrief: string;
  sourceUrl?: string;
}

export interface AgentScenario {
  id: string;
  name: string;
  users: string;
  problem: string;
  input: string[];
  output: string[];
  risks: string[];
  promptExample: string;
}

export interface TemplateResource {
  id: string;
  title: string;
  category: string;
  scenario: string;
  targetUsers: string;
  inputRequirements: string[];
  outputExample: string;
  template: string;
}
