import { ContentLibrary } from "@/components/ContentLibrary";

export default function LibraryPage() {
  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">资料中心 / 内容库</p>
        <h1>国内 + 海外免费 AI 学习资料库</h1>
        <p className="muted">
          覆盖国内与海外的免费公开资料，重点保留“免登录可查看”的课程与文档。课程仅展示最近 3 个月内容，并按时间倒序排列。
        </p>
      </section>
      <ContentLibrary />
    </div>
  );
}
