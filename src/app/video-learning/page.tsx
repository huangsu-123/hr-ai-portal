import { longVideoFeed, shortVideoFeed, videoLearningFeed } from "@/data/video-learning";
import { computeFreshnessScore, freshnessLevel } from "@/lib/freshness";

export const revalidate = 600;

export default function VideoLearningPage() {
  const shortLatest = shortVideoFeed.slice(0, 6);
  const longLatest = longVideoFeed.slice(0, 6);
  const avgFreshness = Math.round(
    videoLearningFeed.reduce((sum, item) => sum + computeFreshnessScore(item.publishDate), 0) /
      Math.max(videoLearningFeed.length, 1),
  );

  return (
    <div className="container pageStack">
      <section className="section">
        <p className="eyebrow">视频学习 / 问题导向</p>
        <h1>短视频速学 + 长视频深学</h1>
        <p className="muted">
          所有视频都按“解决什么问题”组织，并展示发布时间、抓取时间、最后校验时间，默认优先推荐近30天内容。
        </p>
        <div className="badgeRow">
          <span className={avgFreshness >= 85 ? "badge ok" : avgFreshness >= 60 ? "badge" : "badge warn"}>
            全站视频新鲜度均值：{avgFreshness}
          </span>
          <span className="badge">短视频：5-10分钟快速吸收</span>
          <span className="badge">长视频：40-80分钟系统学习</span>
          <span className="badge">覆盖：抖音 / YouTube / Bilibili / 抖音精选</span>
        </div>
      </section>

      <section className="section split">
        <article className="panelBox">
          <h2>短视频速学</h2>
          <p className="smallLine">优先解决当天就要落地的操作问题。</p>
          <div className="videoCardList">
            {shortLatest.map((item) => (
              <VideoLearningCard key={item.id} {...item} />
            ))}
          </div>
        </article>

        <article className="panelBox">
          <h2>长视频深学</h2>
          <p className="smallLine">用于建立完整方法论和团队共学。</p>
          <div className="videoCardList">
            {longLatest.map((item) => (
              <VideoLearningCard key={item.id} {...item} />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function VideoLearningCard({
  title,
  platform,
  duration,
  topic,
  level,
  problemSolved,
  summary,
  keyPoints,
  immediateAction,
  notSuitableFor,
  sourceUrl,
  publishDate,
  crawledAt,
  verifiedAt,
}: (typeof videoLearningFeed)[number]) {
  const freshnessScore = computeFreshnessScore(publishDate);

  return (
    <article className="videoLearningCard">
      <div className="cardTop">
        <span className="pill">{platform}</span>
        <span className="smallLine">{duration}</span>
      </div>
      <h3>{title}</h3>
      <p className="smallLine">问题：{problemSolved}</p>
      <p>{summary}</p>
      <div className="badgeRow">
        <span className="badge">主题：{topic}</span>
        <span className="badge">难度：{level}</span>
        <span className={freshnessScore >= 85 ? "badge ok" : freshnessScore >= 60 ? "badge" : "badge warn"}>
          新鲜度 {freshnessScore}（{freshnessLevel(freshnessScore)}）
        </span>
      </div>
      <ul className="detailList">
        {keyPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className="smallLine">看完就做：{immediateAction}</p>
      <p className="smallLine">不适用：{notSuitableFor}</p>
      <p className="smallLine">
        发布：{publishDate} · 抓取：{formatDateTime(crawledAt)} · 校验：{formatDateTime(verifiedAt)}
      </p>
      <a href={sourceUrl} target="_blank" rel="noreferrer" className="linkBtn">
        打开原视频
      </a>
    </article>
  );
}

function formatDateTime(raw: string) {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return raw;
  }
  return date.toLocaleString("zh-CN", { hour12: false });
}
