import { CopyButton } from "@/components/CopyButton";
import type { TemplateResource } from "@/types/content";

interface TemplateCardProps {
  item: TemplateResource;
}

export function TemplateCard({ item }: TemplateCardProps) {
  return (
    <article className="card templateCard">
      <div className="cardBody">
        <div className="splitRow">
          <span className="label">{item.category}</span>
          <CopyButton text={item.template} label="复制模板" />
        </div>
        <h3>{item.title}</h3>
        <p className="muted">使用场景：{item.scenario}</p>
        <p>
          <strong>适合对象：</strong>
          {item.targetUsers}
        </p>
        <p>
          <strong>输入要求：</strong>
          {item.inputRequirements.join(" / ")}
        </p>
        <p className="highlight">输出示例：{item.outputExample}</p>
        <pre className="templatePreview">{item.template}</pre>
      </div>
    </article>
  );
}
