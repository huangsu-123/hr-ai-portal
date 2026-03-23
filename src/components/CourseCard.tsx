import Link from "next/link";
import { ContentBadges } from "@/components/ContentBadges";
import type { Course } from "@/types/content";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="card courseCard">
      <div className={`cardHero tone-${course.coverTone}`}>
        <span>{course.category}</span>
        <p>{course.stage}</p>
      </div>
      <div className="cardBody">
        <h3>{course.title}</h3>
        <p className="muted">{course.subtitle}</p>
        <p>{course.description}</p>
        <div className="metaRow">
          <span>{course.level}</span>
          <span>{course.estimatedTime}</span>
          <span>{course.lessons} 节</span>
        </div>
        <ContentBadges
          sourceRegion={course.sourceRegion}
          originalLanguage={course.originalLanguage}
          translationAvailable={course.translationAvailable}
          subtitleAvailable={course.subtitleAvailable}
          compact
        />
        <div className="tagRow">
          {course.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="cardFooter">
        <Link href={`/courses/${course.slug}`} className="textLink">
          查看课程详情
        </Link>
      </div>
    </article>
  );
}
