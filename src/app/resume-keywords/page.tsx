import { KeywordRadarBoard } from "@/components/KeywordRadarBoard";

export default function ResumeKeywordsPage() {
  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">招聘实战 / 关键词雷达</p>
        <h1>简历关键词与技术术语解释中心</h1>
        <p className="muted">
          面向非技术 HR，解释候选人简历中常见 AI 关键词的真实含义、应用场景和行业最新讨论，帮助你更快判断候选人是否“真做过”。
        </p>
      </section>
      <KeywordRadarBoard />
    </div>
  );
}
