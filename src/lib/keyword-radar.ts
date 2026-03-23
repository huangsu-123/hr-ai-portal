import { getRealtimeUpdatesWithMeta } from "@/lib/live-updates";
import type { KeywordRadarItem, UpdateItem } from "@/types/portal";

interface RadarTermSeed {
  id: string;
  keyword: string;
  aliases: string[];
  meaning: string;
  resumeHint: string;
  hrUseCases: string[];
}

interface KeywordRadarResult {
  items: KeywordRadarItem[];
  mode: "live" | "fallback";
  generatedAt: string;
}

const radarSeeds: RadarTermSeed[] = [
  {
    id: "kw-001",
    keyword: "Agentic Workflow",
    aliases: ["agentic", "workflow", "multi-agent", "agent"],
    meaning: "把任务拆成多个可执行步骤，由 AI 自动规划、调用工具并回传结果。",
    resumeHint: "候选人写了 Agentic Workflow，通常意味着他参与过流程自动化，不只是写提示词。",
    hrUseCases: ["招聘周报自动生成", "简历初筛流程自动分发", "政策问答升级转人工"],
  },
  {
    id: "kw-002",
    keyword: "RAG",
    aliases: ["rag", "retrieval", "知识库", "vector"],
    meaning: "检索增强生成，先查企业知识库再回答，降低幻觉。",
    resumeHint: "简历中出现 RAG，可追问候选人是否做过知识切片、召回、引用证据。",
    hrUseCases: ["员工政策问答", "组织制度检索", "面试题库查询"],
  },
  {
    id: "kw-003",
    keyword: "Prompt Engineering",
    aliases: ["prompt", "instruction", "提示词"],
    meaning: "通过角色、上下文、格式约束设计高稳定输出。",
    resumeHint: "可追问是否做过提示词版本管理、失败样本复盘与 A/B 对比。",
    hrUseCases: ["JD 优化", "面试问题生成", "管理汇报材料改写"],
  },
  {
    id: "kw-004",
    keyword: "LLMOps",
    aliases: ["llmops", "evaluation", "监控", "govern", "safety"],
    meaning: "管理大模型应用上线后的评估、监控、回滚与治理。",
    resumeHint: "简历写 LLMOps 时，要看是否有质量指标和线上监控经验。",
    hrUseCases: ["HR Agent 质量评估", "合规留痕", "高风险场景人工复核"],
  },
  {
    id: "kw-005",
    keyword: "Function Calling",
    aliases: ["function calling", "tool", "api", "tool execution"],
    meaning: "模型按定义调用外部工具/API，而不是只返回文本。",
    resumeHint: "可追问候选人如何处理工具调用失败、重试和审计日志。",
    hrUseCases: ["招聘数据看板自动拉取", "ATS 状态同步", "周报自动填充"],
  },
  {
    id: "kw-006",
    keyword: "MCP",
    aliases: ["mcp", "model context protocol", "context protocol"],
    meaning: "统一模型连接外部系统和工具的上下文协议。",
    resumeHint: "简历提 MCP 时，可追问是否做过多系统接入与权限控制。",
    hrUseCases: ["连接企业知识库", "接入 HRIS/ATS", "多系统上下文统一"],
  },
  {
    id: "kw-007",
    keyword: "向量数据库",
    aliases: ["vector database", "embedding", "向量检索"],
    meaning: "用于相似度检索，支持语义搜索和知识召回。",
    resumeHint: "可追问候选人是否理解召回率、精确率和重排策略。",
    hrUseCases: ["政策检索", "候选人技能匹配", "历史面试案例搜索"],
  },
  {
    id: "kw-008",
    keyword: "Copilot",
    aliases: ["copilot", "assistant", "智能助手"],
    meaning: "半自动助手，核心是“建议 + 人工确认”，强调协作而非替代。",
    resumeHint: "简历写 Copilot，要看他是否有流程嵌入能力而非单点聊天机器人。",
    hrUseCases: ["面试纪要整理", "周会准备提纲", "日常答疑草稿"],
  },
  {
    id: "kw-009",
    keyword: "Fine-tuning",
    aliases: ["fine-tuning", "finetune", "微调", "sft"],
    meaning: "在特定业务数据上继续训练模型，使其更贴近特定任务表现。",
    resumeHint: "可追问是否做过数据清洗、评估基线和回滚机制。",
    hrUseCases: ["内部语料风格统一", "行业术语适配", "高频文书输出稳定化"],
  },
  {
    id: "kw-010",
    keyword: "ReAct",
    aliases: ["react", "reason+act", "reasoning and acting"],
    meaning: "先思考再行动的模式，模型可边推理边调用工具。",
    resumeHint: "可追问候选人如何控制推理链长度与错误传播。",
    hrUseCases: ["复杂候选人画像分析", "跨数据源对比", "多步骤问答流程"],
  },
  {
    id: "kw-011",
    keyword: "Guardrails",
    aliases: ["guardrails", "安全护栏", "规则引擎", "policy check"],
    meaning: "在生成前后增加规则校验，拦截越界回答或高风险输出。",
    resumeHint: "可追问是否有规则库、敏感词策略、违规留痕。",
    hrUseCases: ["合规面试问答", "政策答复校验", "候选人隐私保护"],
  },
  {
    id: "kw-012",
    keyword: "Hallucination",
    aliases: ["hallucination", "幻觉", "错误事实", "fabrication"],
    meaning: "模型输出看似合理但不真实的信息。",
    resumeHint: "可追问候选人如何降低幻觉：引用、检索、人工复核。",
    hrUseCases: ["政策问答风险提醒", "招聘结论证据化", "管理汇报事实校验"],
  },
  {
    id: "kw-013",
    keyword: "Evaluation Dataset",
    aliases: ["evaluation", "benchmark", "测试集", "评测"],
    meaning: "用于持续测量模型在关键任务上的稳定性和可用性。",
    resumeHint: "可追问是否建立过业务样本集与评分标准。",
    hrUseCases: ["招聘筛选准确率跟踪", "模板质量周评估", "输出可执行性度量"],
  },
  {
    id: "kw-014",
    keyword: "A/B Testing",
    aliases: ["a/b", "ab test", "实验组", "对照组"],
    meaning: "对比两套方案在同一业务场景下的效果差异。",
    resumeHint: "可追问实验指标、样本量和显著性判断方式。",
    hrUseCases: ["Prompt 版本对比", "面试问题模板优化", "周报输出结构验证"],
  },
  {
    id: "kw-015",
    keyword: "Latency Optimization",
    aliases: ["latency", "响应时延", "性能优化", "推理速度"],
    meaning: "降低系统响应时间，提升用户使用体验。",
    resumeHint: "可追问是否做过缓存、异步处理和超时兜底。",
    hrUseCases: ["政策问答实时回复", "周会助手快速产出", "面试纪要即时整理"],
  },
  {
    id: "kw-016",
    keyword: "Cost Optimization",
    aliases: ["cost", "token", "成本优化", "预算控制"],
    meaning: "在保证质量前提下降低模型调用成本。",
    resumeHint: "可追问是否有模型分层策略、调用阈值和成本监控。",
    hrUseCases: ["团队 AI 预算规划", "高频任务轻量模型替换", "调用上限治理"],
  },
  {
    id: "kw-017",
    keyword: "Multi-modal",
    aliases: ["multi-modal", "multimodal", "多模态", "图文音视频"],
    meaning: "模型可同时处理文本、图片、音频或视频输入。",
    resumeHint: "可追问是否有跨模态场景落地与准确率校验。",
    hrUseCases: ["面试录音整理", "简历图片 OCR", "培训视频知识提取"],
  },
  {
    id: "kw-018",
    keyword: "ASR / STT",
    aliases: ["asr", "stt", "speech to text", "语音转文本"],
    meaning: "把语音内容转成可分析的结构化文本。",
    resumeHint: "可追问对口音、噪音、行业术语的识别优化经验。",
    hrUseCases: ["面试录音纪要", "会议复盘", "候选人电话访谈记录"],
  },
  {
    id: "kw-019",
    keyword: "OCR",
    aliases: ["ocr", "文字识别", "文档识别", "image to text"],
    meaning: "把图片或扫描件中的文字提取出来进行后续处理。",
    resumeHint: "可追问复杂版式、手写体和准确率优化方法。",
    hrUseCases: ["证书信息提取", "简历扫描件识别", "合同条款核对"],
  },
  {
    id: "kw-020",
    keyword: "Embeddings",
    aliases: ["embedding", "向量化", "语义向量", "文本向量"],
    meaning: "把文本映射为向量，便于相似度计算和语义检索。",
    resumeHint: "可追问候选人是否做过相似度阈值和召回策略设置。",
    hrUseCases: ["技能相似岗位推荐", "候选人匹配", "组织知识聚类"],
  },
  {
    id: "kw-021",
    keyword: "Knowledge Graph",
    aliases: ["knowledge graph", "知识图谱", "skills graph", "关系图谱"],
    meaning: "用实体关系组织知识，支持复杂关联查询。",
    resumeHint: "可追问图谱构建、更新频率和质量校验方式。",
    hrUseCases: ["技能关系梳理", "岗位画像建模", "人才盘点分析"],
  },
  {
    id: "kw-022",
    keyword: "Talent Intelligence",
    aliases: ["talent intelligence", "人才情报", "人才分析", "人才洞察"],
    meaning: "利用数据和模型洞察人才供需、技能趋势和招聘效率。",
    resumeHint: "可追问是否有业务落地指标，而非仅做数据看板。",
    hrUseCases: ["招聘策略调整", "渠道投入优化", "人才市场趋势监测"],
  },
  {
    id: "kw-023",
    keyword: "People Analytics",
    aliases: ["people analytics", "组织分析", "人力分析", "员工数据"],
    meaning: "通过数据分析支持组织决策和人才管理优化。",
    resumeHint: "可追问如何把分析结果转为可执行动作。",
    hrUseCases: ["离职风险预警", "组织健康监测", "绩效沟通支持"],
  },
  {
    id: "kw-024",
    keyword: "ATS Integration",
    aliases: ["ats", "applicant tracking system", "招聘系统", "系统集成"],
    meaning: "将 AI 能力接入招聘系统，实现流程数据自动同步。",
    resumeHint: "可追问字段映射、权限模型和异常处理能力。",
    hrUseCases: ["简历状态自动更新", "面试安排联动", "招聘漏斗自动看板"],
  },
  {
    id: "kw-025",
    keyword: "LoRA",
    aliases: ["lora", "low-rank adaptation", "低秩适配"],
    meaning: "一种参数高效微调技术，用更小成本适配业务模型。",
    resumeHint: "可追问是否做过训练参数选择与效果对比。",
    hrUseCases: ["企业定制语气风格", "低成本模型迭代", "内部知识问答优化"],
  },
  {
    id: "kw-026",
    keyword: "RLHF",
    aliases: ["rlhf", "human feedback", "人类反馈强化学习"],
    meaning: "通过人类反馈优化模型输出偏好和安全性。",
    resumeHint: "可追问反馈数据采集流程与标注质量控制。",
    hrUseCases: ["面试问答口径优化", "答复语气规范", "高风险回答约束"],
  },
  {
    id: "kw-027",
    keyword: "Model Distillation",
    aliases: ["distillation", "蒸馏", "teacher-student"],
    meaning: "将大模型能力迁移到更轻量模型，降低成本和时延。",
    resumeHint: "可追问候选人是否做过精度与成本权衡。",
    hrUseCases: ["高频低成本问答", "移动端助手部署", "日常流程自动化"],
  },
  {
    id: "kw-028",
    keyword: "Prompt Injection",
    aliases: ["prompt injection", "提示词注入", "越权指令"],
    meaning: "恶意输入试图绕过系统规则，导致不安全输出。",
    resumeHint: "可追问候选人是否设计过防注入策略与测试用例。",
    hrUseCases: ["政策问答安全防护", "候选人数据保护", "系统权限边界控制"],
  },
  {
    id: "kw-029",
    keyword: "Observability",
    aliases: ["observability", "可观测性", "日志追踪", "trace"],
    meaning: "通过日志、指标、链路追踪监控 AI 系统运行状态。",
    resumeHint: "可追问是否建立报警规则和异常分析流程。",
    hrUseCases: ["Agent 异常排查", "周度质量复盘", "上线后稳定性管理"],
  },
  {
    id: "kw-030",
    keyword: "Workflow Orchestration",
    aliases: ["orchestration", "流程编排", "dag", "节点编排"],
    meaning: "把多个任务节点按规则串联，形成可控自动化流程。",
    resumeHint: "可追问候选人是否做过失败重试和人工审批插入。",
    hrUseCases: ["招聘流程自动编排", "HRBP 周会准备链路", "模板批量生产流程"],
  },
];

export async function getKeywordRadar(limit = 24): Promise<KeywordRadarResult> {
  const updateResult = await getRealtimeUpdatesWithMeta(40);
  const radar = rankKeywords(updateResult.items).slice(0, limit);

  return {
    items: radar,
    mode: updateResult.mode,
    generatedAt: updateResult.generatedAt,
  };
}

function rankKeywords(items: UpdateItem[]): KeywordRadarItem[] {
  const corpus = items
    .map((item) => `${item.title} ${item.summary} ${item.chineseSummary} ${item.tags.join(" ")}`)
    .join("\n")
    .toLowerCase();

  return radarSeeds
    .map((seed) => {
      const matched = items
        .filter((item) => {
          const text = `${item.title} ${item.summary} ${item.chineseSummary} ${item.tags.join(" ")}`.toLowerCase();
          return seed.aliases.some((alias) => text.includes(alias.toLowerCase()));
        })
        .slice(0, 3);

      const mentionCount = seed.aliases.reduce((count, alias) => {
        const escaped = escapeRegExp(alias.toLowerCase());
        const regex = new RegExp(escaped, "g");
        return count + (corpus.match(regex)?.length ?? 0);
      }, 0);

      const score = mentionCount * 5 + matched.length * 20;

      return {
        id: seed.id,
        keyword: seed.keyword,
        meaning: seed.meaning,
        resumeHint: seed.resumeHint,
        hrUseCases: seed.hrUseCases,
        latestDiscussion: matched[0]?.title ?? "本周相关讨论暂少，建议结合团队业务场景先小规模试点。",
        trendingSignals:
          matched.length > 0
            ? matched.map((item) => `${item.publishDate} · ${item.sourceName}：${item.title}`)
            : ["暂无强相关实时信号，建议关注 Agent / RAG / Copilot 动态"],
        trendScore: score,
      } satisfies KeywordRadarItem;
    })
    .sort((a, b) => b.trendScore - a.trendScore);
}

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
