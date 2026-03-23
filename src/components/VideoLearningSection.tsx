import Link from "next/link";
import { computeFreshnessScore, freshnessLevel } from "@/lib/freshness";
import type { VideoLearningItem } from "@/types/video-learning";

interface VideoLearningSectionProps {
  shortItems: VideoLearningItem[];
  longItems: VideoLearningItem[];
}

export function VideoLearningSection({ shortItems, longItems }: VideoLearningSectionProps) {
  return (
    <section className="section">
      <div className="sectionHead">
        <div>
          <h2>视频学习中心</h2>
          <p className="muted">短视频快速吸收，长视频系统学习；每条都带问题导向和新鲜度标签。</p>
        </div>
        <Link href="/video-learning" className="textLink">
          进入完整视频中心
        </Link>
      </div>

      <div className="videoLearningGrid">
        <article className="videoTrackCol">
          <div className="videoTrackHead">
            <h3>短视频速学</h3>
            <span className="badge">抖音 / YouTube / B站</span>
          </div>
          <p className="smallLine">5-10分钟解决一个问题，适合当天直接应用。</p>
          <div className="videoCardList">
            {shortItems.map((item) => (
              <VideoLearningCard key={item.id} item={item} />
            ))}
          </div>
        </article>

        <article className="videoTrackCol">
          <div className="videoTrackHead">
            <h3>长视频深学</h3>
            <span className="badge">Bilibili / 抖音精选 / YouTube</span>
          </div>
          <p className="smallLine">40-80分钟专题学习，适合完整建立方法论。</p>
          <div className="videoCardList">
            {longItems.map((item) => (
              <VideoLearningCard key={item.id} item={item} />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function VideoLearningCard({ item }: { item: VideoLearningItem }) {
  const freshnessScore = computeFreshnessScore(item.publishDate);
  const level = freshnessLevel(freshnessScore);

  return (
    <article className="videoLearningCard">
      <div className="cardTop">
        <span className="pill">{item.platform}</span>
        <span className="smallLine">{item.duration}</span>
      </div>
      <h4>{item.title}</h4>
      <p className="smallLine">问题：{item.problemSolved}</p>
      <p>{item.summary}</p>
      <div className="badgeRow">
        <span className="badge">主题：{item.topic}</span>
        <span className="badge">难度：{item.level}</span>
        <span className={freshnessScore >= 85 ? "badge ok" : freshnessScore >= 60 ? "badge" : "badge warn"}>
          新鲜度 {freshnessScore}（{level}）
        </span>
      </div>
      <ul className="detailList">
        {item.keyPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className="smallLine">看完就做：{item.immediateAction}</p>
      <p className="smallLine">不适用：{item.notSuitableFor}</p>
      <p className="smallLine">
        发布：{item.publishDate} · 抓取：{formatDateTime(item.crawledAt)} · 校验：{formatDateTime(item.verifiedAt)}
      </p>
      <a className="linkBtn" href={item.sourceUrl} target="_blank" rel="noreferrer">
        打开视频来源
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
