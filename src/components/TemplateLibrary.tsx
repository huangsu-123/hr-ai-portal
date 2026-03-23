"use client";

import { useMemo, useState } from "react";
import { TemplateCard } from "@/components/TemplateCard";
import { templateResources } from "@/data/templates";
import { templateCategories } from "@/data/taxonomy";

const ALL = "全部";

export function TemplateLibrary() {
  const [category, setCategory] = useState<string>(ALL);

  const filtered = useMemo(() => {
    return templateResources.filter((item) => category === ALL || item.category === category);
  }, [category]);

  return (
    <div className="stackLarge">
      <section className="panel">
        <div className="filterGroup">
          <p>模板分类</p>
          <div className="chipRow">
            {[ALL, ...templateCategories].map((option) => (
              <button
                key={option}
                type="button"
                className={option === category ? "chip active" : "chip"}
                onClick={() => setCategory(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionBlock">
        <div className="splitRow">
          <h2>模板列表</h2>
          <p className="muted">共 {filtered.length} 个模板</p>
        </div>
        <div className="cardGrid twoCols">
          {filtered.map((item) => (
            <TemplateCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
