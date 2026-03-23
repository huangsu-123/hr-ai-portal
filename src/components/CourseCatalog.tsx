"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import {
  courseCategories,
  courseLevels,
  courseStages,
  hrRoles,
  languageFilters,
  regions,
} from "@/data/taxonomy";
import { courses } from "@/data/courses";

const all = "全部";

export function CourseCatalog() {
  const [category, setCategory] = useState<string>(all);
  const [stage, setStage] = useState<string>(all);
  const [level, setLevel] = useState<string>(all);
  const [role, setRole] = useState<string>(all);
  const [region, setRegion] = useState<string>("ALL");
  const [language, setLanguage] = useState<string>("全部");

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchCategory = category === all || course.category === category;
      const matchStage = stage === all || course.stage === stage;
      const matchLevel = level === all || course.level === level;
      const matchRole = role === all || course.roles.includes(role as never);
      const matchRegion = region === "ALL" || course.sourceRegion === region;

      const matchLanguage =
        language === "全部" ||
        (language === "中文" && course.originalLanguage === "中文") ||
        (language === "非中文" && course.originalLanguage !== "中文") ||
        (language === "有中文摘要" && course.translationAvailable) ||
        (language === "有中文字幕" && course.subtitleAvailable);

      return (
        matchCategory && matchStage && matchLevel && matchRole && matchRegion && matchLanguage
      );
    });
  }, [category, language, level, region, role, stage]);

  return (
    <div className="stackLarge">
      <section className="panel">
        <div className="filtersGrid">
          <FilterGroup
            label="主题分类"
            options={[all, ...courseCategories]}
            value={category}
            onChange={setCategory}
          />
          <FilterGroup
            label="学习阶段"
            options={[all, ...courseStages]}
            value={stage}
            onChange={setStage}
          />
          <FilterGroup
            label="难度等级"
            options={[all, ...courseLevels]}
            value={level}
            onChange={setLevel}
          />
          <FilterGroup
            label="适合角色"
            options={[all, ...hrRoles]}
            value={role}
            onChange={setRole}
          />
          <FilterGroup
            label="内容地区"
            options={regions.map((item) => item.label)}
            value={regions.find((item) => item.key === region)?.label ?? "全部"}
            onChange={(label) => {
              const target = regions.find((item) => item.label === label);
              setRegion(target?.key ?? "ALL");
            }}
          />
          <FilterGroup
            label="语言与辅助"
            options={[...languageFilters]}
            value={language}
            onChange={setLanguage}
          />
        </div>
      </section>

      <section className="sectionBlock">
        <div className="splitRow">
          <h2>课程列表</h2>
          <p className="muted">共 {filtered.length} 门课程</p>
        </div>
        <div className="cardGrid threeCols">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {!filtered.length ? (
          <div className="emptyState">当前筛选条件下暂无课程，请调整筛选项。</div>
        ) : null}
      </section>
    </div>
  );
}

interface FilterGroupProps {
  label: string;
  options: readonly string[] | string[];
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
