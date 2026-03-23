"use client";

import { useMemo, useState } from "react";
import { templates } from "@/data/portal";

const all = "全部";

export default function TemplatesPage() {
  const [category, setCategory] = useState(all);
  const categories = [all, ...Array.from(new Set(templates.map((item) => item.category)))];

  const filtered = useMemo(
    () => templates.filter((item) => category === all || item.category === category),
    [category],
  );

  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">模板资源页</p>
        <h1>可复用提示词与 SOP 模板库</h1>
        <p className="muted">覆盖招聘模板、面试模板、HRBP 模板、汇报模板、提示词模板、SOP/工作流模板。</p>
      </section>

      <section className="section">
        <div className="chipRow">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={item === category ? "chip active" : "chip"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid2">
          {filtered.map((item) => (
            <article key={item.id} className="card">
              <h3>{item.title}</h3>
              <p className="muted">{item.scenario}</p>
              <p className="smallLine">适用对象：{item.targetAudience.join("、")}</p>
              <p className="smallLine">输入要求：{item.inputRequirements.join("、")}</p>
              <p className="smallLine">输出格式：{item.outputFormat}</p>
              <pre className="templateBlock">{item.template}</pre>
              <p className="smallLine">使用建议：{item.usageTip}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
