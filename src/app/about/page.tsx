import { SectionHeader } from "@/components/SectionHeader";

const audiences = [
  {
    title: "非技术背景 HR",
    detail: "快速看懂 AI 与工作关系，找到可立即上手的起点。",
  },
  {
    title: "业务型 HR / HRBP",
    detail: "聚焦效率提升，优先解决招聘、沟通、汇报、组织支持等高频任务。",
  },
  {
    title: "团队管理者 / 推动者",
    detail: "建设课程体系、落地路径和模板资产，推动团队规模化应用。",
  },
];

const roadmap = [
  "第一阶段：课程与模板驱动的内部试运行",
  "第二阶段：接入自动抓取 + 人工审核的每日更新流",
  "第三阶段：接入登录权限、学习进度、收藏与推荐",
  "第四阶段：接入企业知识库、字幕管理和自动翻译摘要",
];

export default function AboutPage() {
  return (
    <div className="pageContainer pageStack">
      <section className="pageIntro">
        <SectionHeader
          eyebrow="关于平台"
          title="为什么做这个 HR AI 学习与实战门户"
          description="目标不是做一个展示页，而是做一个可持续维护、可扩展、可在团队内部试运行的知识产品。"
        />
      </section>

      <section className="sectionBlock">
        <article className="card">
          <div className="cardBody">
            <h2>平台定位</h2>
            <p>
              平台面向游戏和互联网 HR 团队，核心解决四件事：快速认知 AI Agent、持续跟进行业变化、完成实战搭建、沉淀模板资产。
            </p>
            <p>
              所有内容均围绕“这和 HR 的实际工作有什么关系”来组织，避免泛 AI 宣传和技术术语堆砌。
            </p>
          </div>
        </article>
      </section>

      <section className="sectionBlock">
        <h2>适合谁用</h2>
        <div className="cardGrid threeCols">
          {audiences.map((item) => (
            <article key={item.title} className="card">
              <div className="cardBody">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <h2>平台解决的问题</h2>
        <article className="card">
          <div className="cardBody">
            <ul className="plainList">
              <li>AI 内容多但分散：平台把课程、动态、案例、模板统一在一个入口。</li>
              <li>海外信息难吸收：统一展示原始语言、中文字幕、中文摘要状态。</li>
              <li>学习后难落地：提供 Agent 场景和可复制提示词，直接进入实战。</li>
              <li>团队经验难复用：模板库支持沉淀 SOP 与工作流，降低重复试错。</li>
            </ul>
          </div>
        </article>
      </section>

      <section className="sectionBlock">
        <h2>后续如何持续更新</h2>
        <article className="card">
          <div className="cardBody">
            <ul className="plainList">
              {roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted">
              已预留扩展方向：登录与权限、收藏课程、学习进度、后台内容管理、每日动态自动更新、内部知识库接入、标签推荐、字幕与翻译管理。
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
