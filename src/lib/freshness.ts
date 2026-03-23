export function computeFreshnessScore(publishDate: string) {
  const now = new Date();
  const published = new Date(`${publishDate}T00:00:00Z`);

  if (Number.isNaN(published.getTime())) {
    return 0;
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const ageDays = Math.max(0, Math.floor((now.getTime() - published.getTime()) / dayMs));

  if (ageDays <= 30) {
    return 100 - Math.floor(ageDays * 1.2);
  }

  if (ageDays <= 90) {
    return Math.max(55, 82 - Math.floor((ageDays - 30) * 0.45));
  }

  return Math.max(20, 55 - Math.floor((ageDays - 90) * 0.28));
}

export function freshnessLevel(score: number) {
  if (score >= 85) {
    return "高";
  }
  if (score >= 60) {
    return "中";
  }
  return "低";
}
