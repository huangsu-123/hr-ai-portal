"use client";

import { useMemo, useState } from "react";
import { UpdateCard } from "@/components/UpdateCard";
import { updates } from "@/data/updates";
import { languageFilters, regions, updateCategories } from "@/data/taxonomy";

const ALL = "全部";

const uniqueTags = Array.from(new Set(updates.flatMap((item) => item.tags))).slice(0, 12);

export function UpdatesBoard() {
  const [category, setCategory] = useState<string>(ALL);
  const [region, setRegion] = useState<string>("ALL");
  const [language, setLanguage] = useState<string>("全部");
  const [tag, setTag] = useState<string>(ALL);

  const filtered = useMemo(() => {
    return updates.filter((item) => {
      const matchCategory = category === ALL || item.category === category;
      const matchRegion = region === "ALL" || item.sourceRegion === region;
      const matchTag = tag === ALL || item.tags.includes(tag);
      const matchLanguage =
        language === "全部" ||
        (language === "中文" && item.originalLanguage === "中文") ||
        (language === "非中文" && item.originalLanguage !== "中文") ||
        (language === "有中文摘要" && item.translationAvailable) ||
        (language === "有中文字幕" && item.subtitleAvailable);

      return matchCategory && matchRegion && matchTag && matchLanguage;
    });
  }, [category, language, region, tag]);

  const todayList = filtered.filter((item) => item.publishDate === "2026-03-23");
  const featuredList = filtered.filter((item) => item.isFeatured);

  return (
    <div className="stackLarge">
      <section className="panel">
        <div className="filtersGrid">
          <FilterGroup
            label="动态分类"
            options={[ALL, ...updateCategories]}
            value={category}
            onChange={setCategory}
          />
          <FilterGroup
            label="地区"
            options={regions.map((item) => item.label)}
            value={regions.find((item) => item.key === region)?.label ?? "全部"}
            onChange={(label) => {
              const target = regions.find((item) => item.label === label);
              setRegion(target?.key ?? "ALL");
            }}
          />
          <FilterGroup
            label="语言辅助"
            options={[...languageFilters]}
            value={language}
            onChange={setLanguage}
          />
          <FilterGroup
            label="标签"
            options={[ALL, ...uniqueTags]}
            value={tag}
            onChange={setTag}
          />
        </div>
      </section>

      <section className="sectionBlock">
        <div className="splitRow">
          <h2>今日更新</h2>
          <p className="muted">{todayList.length} 条</p>
        </div>
        <div className="cardGrid twoCols">
          {todayList.map((item) => (
            <UpdateCard key={item.id} item={item} />
          ))}
        </div>
        {!todayList.length ? <div className="emptyState">今日暂无符合筛选条件的更新。</div> : null}
      </section>

      <section className="sectionBlock">
        <div className="splitRow">
          <h2>本周精选</h2>
          <p className="muted">{featuredList.length} 条</p>
        </div>
        <div className="cardGrid twoCols">
          {featuredList.map((item) => (
            <UpdateCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <div className="splitRow">
          <h2>全部动态</h2>
          <p className="muted">{filtered.length} 条</p>
        </div>
        <div className="cardGrid twoCols">
          {filtered.map((item) => (
            <UpdateCard key={`${item.id}-all`} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface FilterGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function FilterGroup({ label, options, value, onChange }: FilterGroupProps) {
  return (
    <div className="filterGroup">
      <p>{label}</p>
      <div className="chipRow">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={value === option ? "chip active" : "chip"}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
