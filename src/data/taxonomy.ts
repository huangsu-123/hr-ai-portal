import type { CourseLevel, CourseStage, HRRole } from "@/types/content";

export const courseCategories = [
  "AI Agent 认知",
  "招聘实战",
  "HRBP 实战",
  "提示词能力",
  "Agent 搭建",
  "合规治理",
  "行业案例",
  "海外趋势",
] as const;

export const courseStages: CourseStage[] = ["快速认知", "场景应用", "实战搭建", "治理合规"];

export const courseLevels: CourseLevel[] = ["L1-入门", "L2-进阶", "L3-实战"];

export const hrRoles: HRRole[] = [
  "招聘 HR",
  "HRBP",
  "COE/OD",
  "HR 管理者",
  "业务支持角色",
];

export const languageFilters = ["全部", "中文", "非中文", "有中文摘要", "有中文字幕"] as const;

export const regions = [
  { key: "ALL", label: "全部" },
  { key: "CN", label: "国内" },
  { key: "GLOBAL", label: "海外" },
] as const;

export const updateCategories = ["模型与Agent", "招聘实践", "HRBP效率", "合规与风险", "工具与工作流"];

export const templateCategories = [
  "招聘模板",
  "面试模板",
  "HRBP 模板",
  "汇报模板",
  "提示词模板",
  "SOP/工作流模板",
];
