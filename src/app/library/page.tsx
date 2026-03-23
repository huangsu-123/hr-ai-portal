import { ContentLibrary } from "@/components/ContentLibrary";

export default function LibraryPage() {
  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">资料中心 / 内容库</p>
        <h1>AI 学习资料统一内容库</h1>
        <p className="muted">
          支持按内容类型、主题、来源地区、语言、翻译状态与适用对象筛选，帮助 HR 团队快速找到可直接落地的资料。
        </p>
      </section>
      <ContentLibrary />
    </div>
  );
}
