import { feedSources } from "@/data/portal";
import { stats } from "@/lib/portal";

export default function AdminPage() {
  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">后台管理入口（V1 占位）</p>
        <h1>内容管理与同步配置</h1>
        <p className="muted">
          当前版本提供数据总览、来源配置、接口预览。后续可接入登录权限、CMS、定时同步与审核流。
        </p>
      </section>

      <section className="section">
        <h2>数据总览</h2>
        <div className="statsGrid adminGrid">
          <div>
            <strong>{stats.contentCount}</strong>
            <span>内容总数</span>
          </div>
          <div>
            <strong>{stats.updateCount}</strong>
            <span>情报总数</span>
          </div>
          <div>
            <strong>{stats.templateCount}</strong>
            <span>模板总数</span>
          </div>
          <div>
            <strong>{stats.overseasCount}</strong>
            <span>海外内容</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>同步源配置（预留）</h2>
        <div className="listBoard">
          {feedSources.map((source) => (
            <article key={source.id} className="listItem">
              <div>
                <h3>{source.name}</h3>
                <p>
                  {source.type.toUpperCase()} · {source.region} · {source.lang}
                </p>
                <p className="smallLine">{source.note}</p>
              </div>
              <a href={source.url} target="_blank" rel="noreferrer" className="textLink">
                查看来源
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>接口预留</h2>
        <ul>
          <li>/api/contents：支持筛选检索（后续可接数据库）</li>
          <li>/api/updates：行业情报数据接口</li>
          <li>/api/collections：专题合集接口</li>
          <li>/api/sync/preview：自动抓取/翻译/字幕同步流程预览接口</li>
        </ul>
      </section>
    </div>
  );
}
