import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pageContainer pageStack">
      <section className="pageIntro">
        <h1>页面不存在</h1>
        <p>你访问的内容可能已被移动或暂未发布。</p>
        <Link href="/" className="button primary">
          返回首页
        </Link>
      </section>
    </div>
  );
}
