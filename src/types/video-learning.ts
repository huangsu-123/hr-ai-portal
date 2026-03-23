export type VideoTrack = "short" | "long";

export type VideoPlatform = "抖音" | "YouTube" | "Bilibili" | "抖音精选";

export type LearningLevel = "入门" | "进阶";

export interface VideoLearningItem {
  id: string;
  title: string;
  track: VideoTrack;
  platform: VideoPlatform;
  creator: string;
  duration: string;
  level: LearningLevel;
  topic: string;
  problemSolved: string;
  summary: string;
  keyPoints: string[];
  immediateAction: string;
  notSuitableFor: string;
  sourceUrl: string;
  publishDate: string;
  crawledAt: string;
  verifiedAt: string;
  sourceRegion: "CN" | "GLOBAL";
  subtitleAvailable: boolean;
  chineseBriefReady: boolean;
}
