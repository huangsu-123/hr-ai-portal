"use client";

import { useMemo, useState } from "react";
import { templates } from "@/data/portal";
import type { TemplateItem } from "@/types/portal";

const all = "全部";

export default function TemplatesPage() {
  const [category, setCategory] = useState(all);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const categories = [all, ...Array.from(new Set(templates.map((item) => item.category)))];

  const filtered = useMemo(
    () => templates.filter((item) => category === all || item.category === category),
    [category],
  );

  const handleCopy = async (item: TemplateItem) => {
    const detailText = [
      `# ${item.title}`,
      "",
      `场景：${item.scenario}`,
      `适用对象：${item.targetAudience.join("、")}`,
      `输入要求：${item.inputRequirements.join("、")}`,
      `输出格式：${item.outputFormat}`,
      "",
      "## 提示词模板",
      item.template,
      "",
      "## 使用建议",
      item.usageTip,
      "",
      item.steps?.length ? `## 使用步骤\n${item.steps.map((step, idx) => `${idx + 1}. ${step}`).join("\n")}` : "",
      item.qualityChecklist?.length
        ? `## 质量检查\n${item.qualityChecklist.map((line, idx) => `${idx + 1}. ${line}`).join("\n")}`
        : "",
      item.commonPitfalls?.length
        ? `## 常见坑位\n${item.commonPitfalls.map((line, idx) => `${idx + 1}. ${line}`).join("\n")}`
        : "",
      item.exampleInput ? `## 示例输入\n${item.exampleInput}` : "",
      item.exampleOutput ? `## 示例输出\n${item.exampleOutput}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(detailText);
      setCopiedId(item.id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === item.id ? null : prev));
      }, 1800);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">模板资源页</p>
        <h1>可复用提示词与 SOP 模板库</h1>
        <p className="muted">
          覆盖招聘模板、面试模板、HRBP 模板、汇报模板、提示词模板、SOP/工作流模板。每个模板都提供步骤、检查清单、常见坑位和示例输入输出。
        </p>
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
              <div className="heroActions">
                <button
                  type="button"
                  className={copiedId === item.id ? "linkBtn copyBtn done" : "linkBtn copyBtn"}
                  onClick={() => handleCopy(item)}
                >
                  {copiedId === item.id ? "已复制完整模板" : "一键复制完整模板"}
                </button>
              </div>
              <pre className="templateBlock">{item.template}</pre>
              <p className="smallLine">使用建议：{item.usageTip}</p>
              {item.steps?.length ? (
                <TemplateSection title="使用步骤" items={item.steps} ordered />
              ) : null}
              {item.qualityChecklist?.length ? (
                <TemplateSection title="质量检查清单" items={item.qualityChecklist} />
              ) : null}
              {item.commonPitfalls?.length ? (
                <TemplateSection title="常见坑位" items={item.commonPitfalls} />
              ) : null}
              {item.exampleInput ? (
                <section className="templateSection">
                  <h4>示例输入</h4>
                  <pre className="templateBlock">{item.exampleInput}</pre>
                </section>
              ) : null}
              {item.exampleOutput ? (
                <section className="templateSection">
                  <h4>示例输出</h4>
                  <pre className="templateBlock">{item.exampleOutput}</pre>
                </section>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function TemplateSection({
  title,
  items,
  ordered,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  return (
    <section className="templateSection">
      <h4>{title}</h4>
      {ordered ? (
        <ol className="detailList">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="detailList">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
