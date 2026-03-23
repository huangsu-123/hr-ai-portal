import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { agentGuides, contents } from "@/data/portal";

const recommended = contents.filter((item) => item.tags.includes("Agent 基础")).slice(0, 6);

export default function AgentPlaybookPage() {
  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">Agent 专题</p>
        <h1>HR Agent 专题资料中心</h1>
        <p className="muted">
          什么是 HR Agent、如何设计场景、如何治理风险、如何把课程和模板打通，这里给出可直接复用的专题结构。
        </p>
      </section>

      <section className="section split">
        <article className="panelBox">
          <h2>什么是 HR Agent</h2>
          <p>
            HR Agent 是针对 HR 任务定义目标、输入、规则与输出的流程执行体。它不是“自动决策者”，而是“先执行再交由人判断”的效率组件。
          </p>
          <h3>搭建方法论</h3>
          <ol>
            <li>先选低风险、高频、可模板化场景</li>
            <li>定义输入字段、输出格式、人工复核边界</li>
            <li>建立评估指标（准确率、返工率、时效）</li>
            <li>将提示词和 SOP 沉淀到模板库</li>
          </ol>
        </article>
        <article className="panelBox">
          <h2>可分享专题结构</h2>
          <ul>
            <li>第一部分：场景问题定义</li>
            <li>第二部分：Agent 流程设计</li>
            <li>第三部分：风险与治理</li>
            <li>第四部分：模板与课程推荐</li>
            <li>第五部分：团队试点计划</li>
          </ul>
          <Link href="/collections" className="textLink">
            查看可直接转发的合集
          </Link>
        </article>
      </section>

      <section className="section">
        <h2>HR Agent 场景库</h2>
        <div className="grid2">
          {agentGuides.map((item) => (
            <article key={item.id} className="card">
              <h3>{item.title}</h3>
              <p className="muted">问题：{item.problem}</p>
              <p className="smallLine">触发时机：{item.trigger}</p>
              <p className="smallLine">输出：{item.outputs.join("、")}</p>
              <p className="smallLine">风险：{item.risks.join("、")}</p>
              <p className="smallLine">指标：{item.metrics.join("、")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>推荐课程 / 文章 / 模板</h2>
          <Link href="/templates" className="textLink">
            查看模板资源
          </Link>
        </div>
        <div className="grid3">
          {recommended.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
