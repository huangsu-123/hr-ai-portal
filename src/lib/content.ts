import { courses } from "@/data/courses";
import type { Course } from "@/types/content";

export const getRelatedCourses = (course: Course): Course[] => {
  const related = courses.filter((item) => course.relatedCourseSlugs.includes(item.slug));
  return related.slice(0, 3);
};

export const toneClassMap = {
  teal: "toneTeal",
  ink: "toneInk",
  amber: "toneAmber",
  mint: "toneMint",
} as const;

export const regionLabelMap = {
  CN: "国内",
  GLOBAL: "海外",
} as const;
