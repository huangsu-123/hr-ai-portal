"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "@/components/ContentCard";
import { contents } from "@/data/portal";
import { typeLabel } from "@/lib/portal";
import type { AudienceType, ContentType } from "@/types/portal";

const all = "全部";

const typeOptions: (ContentType | "全部")[] = ["全部", "course", "video", "article", "news", "template", "case"];
const themeOptions = ["全部", "AI Agent", "招聘", "HRBP", "提示词", "合规治理", "行业趋势"];
const regionOptions = ["全部", "国内", "海外"];
const langOptions = ["全部", "中文", "英文", "多语言", "其他"];
const statusOptions = ["全部", "已翻译", "有中文字幕", "有中文摘要"];
const audienceOptions: (AudienceType | "全部")[] = [
  "全部",
  "招聘 HR",
  "HRBP",
  "HR 管理者",
  "COE / OD",
  "通用 HR",
];

export function ContentLibrary() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ContentType | "全部">("全部");
  const [theme, setTheme] = useState("全部");
  const [region, setRegion] = useState("全部");
  const [lang, setLang] = useState("全部");
  const [status, setStatus] = useState("全部");
  const [audience, setAudience] = useState<AudienceType | "全部">("全部");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return contents.filter((item) => {
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.chineseSummary.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchType = type === all || item.type === type;
      const matchTheme = theme === all || item.tags.includes(theme);
      const matchRegion = region === all || (region === "国内" ? item.sourceRegion === "CN" : item.sourceRegion === "GLOBAL");
      const matchLang = lang === all || item.originalLanguage === lang;
      const matchAudience = audience === all || item.audience.includes(audience);

      const matchStatus =
        status === all ||
        (status === "已翻译" && item.translationAvailable) ||
        (status === "有中文字幕" && item.subtitleAvailable) ||
        (status === "有中文摘要" && item.translationAvailable);

      return matchQuery && matchType && matchTheme && matchRegion && matchLang && matchStatus && matchAudience;
    });
  }, [audience, lang, query, region, status, theme, type]);

  return (
    <div className="section pageStack">
      <div className="filterGrid">
        <label className="field">
          搜索
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="输入标题、标签或关键词"
          />
        </label>
        <Select label="内容类型" value={type} onChange={setType} options={typeOptions} />
        <Select label="主题" value={theme} onChange={setTheme} options={themeOptions} />
        <Select label="来源地区" value={region} onChange={setRegion} options={regionOptions} />
        <Select label="语言" value={lang} onChange={setLang} options={langOptions} />
        <Select label="状态" value={status} onChange={setStatus} options={statusOptions} />
        <Select label="适合对象" value={audience} onChange={setAudience} options={audienceOptions} />
      </div>
      <div className="sectionHead">
        <h2>资料列表</h2>
        <p className="muted">共 {filtered.length} 条</p>
      </div>
      <div className="grid3">
        {filtered.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
      {filtered.length === 0 ? <div className="empty">当前筛选条件暂无内容，请调整筛选。</div> : null}
      <p className="muted small">
        类型映射：course={typeLabel.course}、video={typeLabel.video}、article={typeLabel.article}、case={typeLabel.case}
      </p>
    </div>
  );
}

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}

function Select<T extends string>({ label, value, options, onChange }: SelectProps<T>) {
  return (
    <label className="field">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
