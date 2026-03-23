import type { Course } from "@/types/content";

export const courses: Course[] = [
  {
    id: "c-001",
    slug: "ai-agent-for-hr-101",
    title: "HR 应该了解的 AI Agent 知识",
    subtitle: "1 节课完成认知搭建：概念、边界与落地机会",
    description:
      "给非技术背景 HR 的一节速通课，用业务语言解释 AI Agent 的能力边界、常见误区与 HR 场景价值，帮助团队在 45 分钟内统一认知。",
    category: "AI Agent 认知",
    tags: ["入门必修", "Agent", "认知搭建", "团队共识"],
    level: "L1-入门",
    stage: "快速认知",
    roles: ["招聘 HR", "HRBP", "COE/OD", "HR 管理者"],
    estimatedTime: "45 分钟",
    lessons: 1,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary:
      "这是一节面向 HR 的 Agent 认知课，重点讲清 Agent 不是万能助手，而是可定义边界的任务执行体。",
    isFeatured: true,
    coverTone: "teal",
    suitableFor: [
      "第一次系统接触 AI 的招聘 HR/HRBP",
      "需要向团队解释 Agent 价值的 HR 管理者",
      "准备做内部 AI 试点的 COE",
    ],
    learningObjectives: [
      "能用一句话解释什么是 HR Agent",
      "能区分“聊天模型”与“可执行 Agent”",
      "能识别 6 类适合 HR 先落地的任务",
      "能列出必须由人负责的决策边界",
    ],
    outline: [
      {
        title: "模块 1：为什么 HR 现在要懂 Agent",
        points: ["行业变化速度", "HR 团队效率压力", "从工具使用到流程再设计"],
      },
      {
        title: "模块 2：Agent 的定义与边界",
        points: ["角色-任务-输入-输出", "可执行与不可执行任务", "错误输出与责任归属"],
      },
      {
        title: "模块 3：HR 的第一批应用场景",
        points: ["JD 优化", "简历初筛", "会议准备", "周报整理", "政策问答"],
      },
      {
        title: "模块 4：落地路线图",
        points: ["先做单点提效", "再做团队 SOP", "最后做数据闭环"],
      },
    ],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "HR Agent 认知速通课",
      cover: "/video-cover-1.png",
      duration: "45:00",
      originalLanguage: "中文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary:
        "从业务价值、职责边界、常见误区出发，带 HR 建立 Agent 的正确预期，避免把 AI 当自动决策者。",
    },
    articleSections: [
      {
        heading: "1. 先定义问题，不要先追模型",
        paragraphs: [
          "很多团队推进 AI 的第一步是问“该用哪个模型”，但 HR 场景更有效的起点是“哪类任务重复、耗时、结果格式稳定”。例如 JD 润色、招聘周报整理、会议纪要提炼，都具有高频、模板化特征，适合 Agent 先落地。",
          "如果问题定义不清，模型越强，输出越花哨但越难复用。对 HR 来说，可复用比一次性惊艳更重要。",
        ],
      },
      {
        heading: "2. Agent 不是替代 HR，而是让 HR 聚焦高价值判断",
        paragraphs: [
          "Agent 擅长把非结构化输入整理成结构化结果，例如把 20 份简历汇总为候选人画像对比表。它不擅长承担最终录用决策，也不应直接处理敏感个人信息而无审计。",
          "你可以把 Agent 理解为“具备上下文和规则的流程助手”：先按你定义的标准执行，再由 HR 做关键判断。",
        ],
      },
      {
        heading: "3. 一个可上线的 HR Agent 最少需要 7 个定义",
        paragraphs: [
          "角色：它是谁；任务：它要完成什么；输入：它依赖哪些信息；输出：你要什么格式；规则：有哪些红线；边界：什么必须转人工；评估：如何判断结果可用。",
          "这七个定义写清楚，才是从“会聊天”到“可落地”的关键。",
        ],
      },
      {
        heading: "4. 团队试运行建议",
        paragraphs: [
          "第 1 周：选择一个低风险场景（如招聘周报），先验证输出质量。",
          "第 2-3 周：沉淀提示词和复盘标准，形成可复制 SOP。",
          "第 4 周：扩展到第二个场景，并建立错误样本库，持续迭代。",
        ],
      },
    ],
    conceptCards: [
      {
        term: "任务边界",
        explanation: "明确 Agent 负责“整理、分析、建议”，不负责最终用人决策。",
        hrValue: "降低误用风险，避免责任不清。",
      },
      {
        term: "结构化输出",
        explanation: "要求固定字段、固定格式，便于团队复盘和复用。",
        hrValue: "减少“每次都要重改”的沟通成本。",
      },
      {
        term: "人工兜底",
        explanation: "对涉及候选人权益、薪酬、绩效判断的内容必须人工复核。",
        hrValue: "保证合规与业务可信度。",
      },
    ],
    promptSnippets: [
      {
        title: "一键解释 Agent 给团队听",
        scenario: "在部门周会上对非技术同事讲清概念",
        prompt:
          "请你用 HR 能听懂的语言解释“AI Agent”是什么。要求：1）不超过 180 字；2）至少给 2 个 HR 场景示例；3）强调它不能替代最终用人决策。",
      },
      {
        title: "识别高价值试点场景",
        scenario: "确定首批落地任务",
        prompt:
          "你是 HR 流程顾问。请基于“高频、规则明确、可模板化、低风险”四个维度，评估以下 8 项 HR 工作是否适合 Agent 试点，并给出优先级和理由。输出表格：任务 | 适配度(1-5) | 风险 | 首轮建议。",
      },
    ],
    relatedCourseSlugs: ["build-hr-agent-part1", "ai-recruitment-workflows", "ai-governance-privacy-hr"],
    sourceName: "HR AI 内部课程组",
    updatedAt: "2026-03-20",
  },
  {
    id: "c-002",
    slug: "ai-recruitment-workflows",
    title: "AI 在招聘中的应用：从 JD 到招聘周报",
    subtitle: "覆盖 JD、初筛、面试问题、招聘复盘四大场景",
    description:
      "围绕招聘链路的核心任务，提供可直接复制的工作流和提示词，强调“效率提升 + 风险控制”双目标。",
    category: "招聘实战",
    tags: ["招聘", "JD", "简历初筛", "面试", "周报"],
    level: "L2-进阶",
    stage: "场景应用",
    roles: ["招聘 HR", "HR 管理者", "业务支持角色"],
    estimatedTime: "68 分钟",
    lessons: 2,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary:
      "这门课拆解招聘链路中最适合 AI 介入的任务，重点在于如何把“建议”变成可复用流程。",
    isFeatured: true,
    coverTone: "amber",
    suitableFor: ["负责社招/校招的招聘 HR", "需要提升招聘效率的团队负责人"],
    learningObjectives: [
      "把 JD 优化流程标准化",
      "建立简历初筛评分框架",
      "快速生成分层面试问题",
      "自动产出招聘周报并形成复盘动作",
    ],
    outline: [
      {
        title: "第 1 课：招聘流程拆解与 AI 切入点",
        points: ["岗位理解", "JD 草稿优化", "候选人匹配标准"]
      },
      {
        title: "第 2 课：面试与复盘自动化",
        points: ["面试问题生成", "纪要整理", "周报与策略建议"]
      }
    ],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "招聘 AI 实战流程课",
      cover: "/video-cover-2.png",
      duration: "68:00",
      originalLanguage: "中文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary:
        "把招聘工作拆成四个 Agent 子任务，并给出可直接落地的提示词模板与复盘机制。",
    },
    articleSections: [
      {
        heading: "1. JD 优化不是润色，而是“招聘目标对齐”",
        paragraphs: [
          "很多 JD 的问题不是文字不漂亮，而是职责与优先级不清。Agent 应该先帮助你完成“岗位目标澄清”，再做语言优化。",
          "建议把输入结构固定为：业务阶段、核心指标、协作关系、必须能力、可培养能力。这样输出的 JD 更容易被候选人理解，也更便于简历筛选。",
        ],
      },
      {
        heading: "2. 简历初筛要先有“评分维度”再让 AI 执行",
        paragraphs: [
          "不要直接让模型判断“是否合适”。先定义评分维度（经验匹配、项目复杂度、稳定性、文化契合风险），再让 Agent 按维度打分并给证据来源。",
          "输出建议包含“推荐进入下一轮/建议补充信息/暂不推荐”三档，便于招聘节奏管理。",
        ],
      },
      {
        heading: "3. 面试问题要体现岗位层级差异",
        paragraphs: [
          "同一个岗位，初级与高级候选人的提问策略完全不同。Agent 需要根据层级、关键能力和历史面评，生成有区分度的问题。",
          "高质量输出应包括：问题目的、追问方向、优秀回答信号、风险回答信号。",
        ],
      },
      {
        heading: "4. 招聘周报要从“结果汇报”升级到“策略建议”",
        paragraphs: [
          "周报不应只写“投递多少、面试多少”，而要给出可执行建议：哪个渠道性价比高、哪个岗位卡点在薪酬还是画像、下周要不要调整流程。",
          "建议固定输出五段：数据概览、岗位进展、问题清单、原因假设、下周动作。",
        ],
      },
    ],
    conceptCards: [
      {
        term: "评分框架先行",
        explanation: "先定义评分标准，再让 AI 评估候选人。",
        hrValue: "降低主观偏差，方便团队协同。",
      },
      {
        term: "证据化输出",
        explanation: "每个推荐结论都要标注简历证据片段。",
        hrValue: "让业务方更信任筛选结果。",
      },
      {
        term: "动作导向周报",
        explanation: "周报必须包含下一步行动，不止是数据罗列。",
        hrValue: "提升招聘管理决策效率。",
      },
    ],
    promptSnippets: [
      {
        title: "JD 优化提示词",
        scenario: "业务方给出粗糙 JD 草稿时",
        prompt: `你是游戏行业招聘专家，请优化以下 JD。\n要求：\n1) 先输出岗位目标（不超过3条）；\n2) 区分“必须能力”和“加分能力”；\n3) 语言具体，避免空泛词；\n4) 额外给出“可能劝退优秀候选人的表达”与替代说法。\n输入：{JD草稿}`,
      },
      {
        title: "简历初筛提示词",
        scenario: "批量简历进入初筛池",
        prompt: `请按以下维度评估候选人：经验匹配、项目复杂度、跨团队协作、稳定性风险。\n输出表格：维度评分(1-5) | 证据 | 风险提醒 | 建议动作。\n最终结论仅可选：进入下一轮 / 补充信息 / 暂不推荐。`,
      },
    ],
    relatedCourseSlugs: ["prompt-engineering-for-hr", "ai-governance-privacy-hr", "gaming-internet-hr-cases"],
    sourceName: "招聘效能专项组",
    updatedAt: "2026-03-18",
  },
  {
    id: "c-003",
    slug: "ai-for-hrbp-efficiency",
    title: "AI 在 HRBP 工作中的应用",
    subtitle: "会议准备、沟通提纲、汇报材料、组织问题梳理",
    description:
      "聚焦 HRBP 高频任务，提供会议前中后完整辅助流程，帮助 HRBP 从“事务驱动”转向“问题驱动”。",
    category: "HRBP 实战",
    tags: ["HRBP", "会议准备", "沟通", "汇报"],
    level: "L2-进阶",
    stage: "场景应用",
    roles: ["HRBP", "COE/OD", "HR 管理者"],
    estimatedTime: "72 分钟",
    lessons: 2,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary:
      "课程以 HRBP 的周会和月度汇报为主线，展示 AI 如何缩短准备时间并提高分析质量。",
    isFeatured: true,
    coverTone: "ink",
    suitableFor: ["支持业务团队的 HRBP", "需要做管理层汇报的 HR 伙伴"],
    learningObjectives: [
      "快速生成会议准备清单",
      "形成结构化沟通提纲",
      "把零散信息汇总成管理层可读材料",
      "识别组织问题并输出可执行建议",
    ],
    outline: [
      {
        title: "第 1 课：HRBP 周会提效流程",
        points: ["业务信息采集", "会议议题优先级", "风险预判"]
      },
      {
        title: "第 2 课：组织诊断与汇报输出",
        points: ["组织问题拆解", "管理层汇报结构", "行动计划设计"]
      }
    ],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "HRBP AI 提效课",
      cover: "/video-cover-3.png",
      duration: "72:00",
      originalLanguage: "中文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary:
        "以实际 HRBP 周会为场景，示范如何把杂乱信息转成可执行的管理建议。",
    },
    articleSections: [
      {
        heading: "1. HRBP 不是记录业务，而是推动业务问题闭环",
        paragraphs: [
          "AI 在 HRBP 场景最有价值的地方，不是自动写材料，而是帮助你快速识别“问题-原因-动作”的链路。",
          "建议将会议输入固定化：核心业务目标、组织风险信号、人才动作进展、待决策事项。",
        ],
      },
      {
        heading: "2. 沟通提纲要按对象定制",
        paragraphs: [
          "同一个议题，对业务负责人、团队 manager、员工沟通的话术应不同。Agent 可以按对象输出版本化沟通提纲。",
          "你可以要求输出“要点版（3分钟）+展开版（15分钟）”，兼顾效率和深入讨论。",
        ],
      },
      {
        heading: "3. 汇报材料要有“管理动作建议”",
        paragraphs: [
          "管理层真正关注的是下一步该怎么做。汇报建议结构：现状判断、核心风险、影响范围、建议动作、衡量指标。",
          "Agent 输出后，HRBP 需根据业务语境做最后校准，避免“正确但不落地”的建议。",
        ],
      },
    ],
    conceptCards: [
      {
        term: "会议前置输入",
        explanation: "会前输入质量决定会中讨论质量。",
        hrValue: "减少临场补充信息导致的偏差。",
      },
      {
        term: "对象化沟通",
        explanation: "同议题面向不同对象生成不同表达与重点。",
        hrValue: "提升沟通效率和接受度。",
      },
      {
        term: "动作闭环",
        explanation: "每次汇报都要输出责任人、时间点和衡量指标。",
        hrValue: "避免“会后无动作”。",
      },
    ],
    promptSnippets: [
      {
        title: "HRBP 周会准备",
        scenario: "会前 30 分钟梳理重点",
        prompt: `你是支持互联网业务线的 HRBP。\n请根据输入信息输出：\n1) 本次周会建议议题优先级（高/中/低）；\n2) 每个议题的讨论目标；\n3) 需要业务负责人拍板的决策点；\n4) 会后动作清单（责任人+截止时间）。\n输入：{业务更新、人员变动、绩效风险、招聘进展}`,
      },
      {
        title: "组织问题分析",
        scenario: "连续两个月产能下降",
        prompt:
          "请从组织结构、角色匹配、协作机制、管理动作四个维度分析问题。输出格式：现象 | 可能原因 | 需要补充的数据 | 建议动作 | 风险。",
      },
    ],
    relatedCourseSlugs: ["build-hr-agent-part1", "hr-ai-roadmap-manager", "ai-governance-privacy-hr"],
    sourceName: "HRBP 卓越中心",
    updatedAt: "2026-03-19",
  },
  {
    id: "c-004",
    slug: "prompt-engineering-for-hr",
    title: "HR 提示词基础与进阶",
    subtitle: "角色定义、上下文补充、输出约束与常见错误",
    description:
      "从“会提问”升级到“可复用提示词”，面向 HR 场景讲清楚怎样稳定拿到高质量输出。",
    category: "提示词能力",
    tags: ["提示词", "结构化输出", "复用模板"],
    level: "L2-进阶",
    stage: "场景应用",
    roles: ["招聘 HR", "HRBP", "COE/OD", "业务支持角色"],
    estimatedTime: "60 分钟",
    lessons: 2,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary:
      "针对 HR 场景常见失败案例，讲清如何通过角色、上下文和输出格式约束提升结果稳定性。",
    isFeatured: false,
    coverTone: "mint",
    suitableFor: ["有基础使用经验但输出不稳定的 HR 同学"],
    learningObjectives: [
      "掌握 4 段式提示词结构",
      "降低空泛输出",
      "让结果可复制、可审阅",
    ],
    outline: [
      {
        title: "第 1 课：提示词基础结构",
        points: ["角色", "任务", "输入上下文", "输出格式"]
      },
      {
        title: "第 2 课：HR 常见错误修复",
        points: ["目标过宽", "缺失边界", "无评估标准"]
      }
    ],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "HR 提示词进阶",
      cover: "/video-cover-4.png",
      duration: "60:00",
      originalLanguage: "中文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary: "通过 12 个反例改写，形成可落地的 HR 提示词写法。",
    },
    articleSections: [
      {
        heading: "提示词的本质是任务说明书",
        paragraphs: [
          "HR 常见误区是把提示词写成一句需求。更好的方式是写成可执行说明书：谁来做、做什么、根据什么、产出什么、什么不能做。",
        ],
      },
      {
        heading: "进阶技巧：先要框架，再要内容",
        paragraphs: [
          "先让模型给出输出框架，再填充内容，能明显提升结果可控性。尤其适用于汇报和复盘类任务。",
        ],
      },
    ],
    conceptCards: [
      {
        term: "角色锚定",
        explanation: "指定岗位视角（如招聘负责人、HRBP），减少泛化输出。",
        hrValue: "更贴近业务语境。",
      },
      {
        term: "输出约束",
        explanation: "限定字段、长度和格式，保证团队可复用。",
        hrValue: "便于协作与沉淀模板。",
      },
    ],
    promptSnippets: [
      {
        title: "4 段式提示词模板",
        scenario: "通用 HR 文案任务",
        prompt:
          "你是{角色}。你的任务是{任务}。输入背景是{上下文}。请按{输出格式}输出，并遵守{边界规则}。",
      },
    ],
    relatedCourseSlugs: ["ai-recruitment-workflows", "build-hr-agent-part1"],
    sourceName: "AI 实战教研组",
    updatedAt: "2026-03-16",
  },
  {
    id: "c-005",
    slug: "build-hr-agent-part1",
    title: "如何搭建 HR 专属 Agent（上）：定义场景与输入输出",
    subtitle: "第 1 步先做对：角色、任务、输入、输出",
    description:
      "把抽象概念转成可执行设计文档，帮助 HR 在 1 节课内搭出第一个可运行 Agent 雏形。",
    category: "Agent 搭建",
    tags: ["Agent 设计", "输入输出", "方法论"],
    level: "L3-实战",
    stage: "实战搭建",
    roles: ["招聘 HR", "HRBP", "COE/OD", "HR 管理者"],
    estimatedTime: "75 分钟",
    lessons: 1,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary: "提供 HR Agent 设计画布，帮助你先把问题定义清楚再进入搭建。",
    isFeatured: true,
    coverTone: "teal",
    suitableFor: ["准备做 HR Agent 试点的人", "需要带团队实战的管理者"],
    learningObjectives: [
      "完成一个 Agent 设计画布",
      "定义高质量输入与可验收输出",
      "提前标注风险与人工接管节点",
    ],
    outline: [
      {
        title: "模块 1：场景选择",
        points: ["高频低风险", "数据可得", "结果可评估"],
      },
      {
        title: "模块 2：输入输出设计",
        points: ["输入字段", "缺失处理", "输出模板"],
      },
      {
        title: "模块 3：规则与边界",
        points: ["合规规则", "异常处理", "人工升级策略"],
      },
    ],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "搭建 HR Agent（上）",
      cover: "/video-cover-5.png",
      duration: "75:00",
      originalLanguage: "中文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary: "从 0 到 1 设计 HR Agent，重点是定义而不是堆技术术语。",
    },
    articleSections: [
      {
        heading: "1. 先做 Agent 设计画布",
        paragraphs: [
          "每个 Agent 上线前都应该有一页设计画布：角色、任务、输入、输出、规则、边界、评估。这页画布是跨团队协作和后续迭代的共同语言。",
        ],
      },
      {
        heading: "2. 输入质量决定 80% 输出质量",
        paragraphs: [
          "例如做候选人初筛，输入至少要包括岗位关键能力、必须条件、禁区条件、简历文本来源。输入字段缺失时，Agent 需先返回“需补充信息”而不是强行给结论。",
        ],
      },
      {
        heading: "3. 输出要可验收，不要泛泛建议",
        paragraphs: [
          "把“给出建议”改成“给出结论+证据+风险+下一步动作”，并固定字段。这样结果才可复盘、可追责、可规模化。",
        ],
      },
    ],
    conceptCards: [
      {
        term: "Agent 设计画布",
        explanation: "把搭建前的关键定义统一在一页中。",
        hrValue: "降低沟通成本，便于团队共建。",
      },
      {
        term: "缺失输入处理",
        explanation: "输入不完整时返回补充项，不直接下结论。",
        hrValue: "减少误判。",
      },
    ],
    promptSnippets: [
      {
        title: "Agent 设计画布生成器",
        scenario: "新场景立项",
        prompt:
          "请基于场景“{场景名称}”生成 HR Agent 设计画布，字段必须包含：角色、任务、输入字段、输出格式、规则、边界、评估指标。每个字段给出示例。",
      },
    ],
    relatedCourseSlugs: ["build-hr-agent-part2", "ai-agent-for-hr-101", "ai-governance-privacy-hr"],
    sourceName: "HR Agent 共创小组",
    updatedAt: "2026-03-21",
  },
  {
    id: "c-006",
    slug: "build-hr-agent-part2",
    title: "如何搭建 HR 专属 Agent（下）：知识库、迭代与评估",
    subtitle: "第 2 步：让 Agent 从可用到稳定",
    description: "讲解如何接入模板知识、建立评估机制并做持续迭代。",
    category: "Agent 搭建",
    tags: ["Agent 迭代", "评估机制", "知识库"],
    level: "L3-实战",
    stage: "实战搭建",
    roles: ["HRBP", "COE/OD", "HR 管理者"],
    estimatedTime: "70 分钟",
    lessons: 1,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary: "重点讲如何用评估集和错误样本持续优化 Agent，而不是一次上线后不再维护。",
    isFeatured: false,
    coverTone: "ink",
    suitableFor: ["完成了第一个 Agent 雏形的团队"],
    learningObjectives: ["建设轻量知识库", "设置质量评估指标", "形成月度迭代机制"],
    outline: [
      { title: "模块 1：知识沉淀", points: ["模板入库", "SOP 结构化", "版本管理"] },
      { title: "模块 2：评估体系", points: ["准确率", "可执行性", "人工修改率"] },
    ],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "搭建 HR Agent（下）",
      cover: "/video-cover-6.png",
      duration: "70:00",
      originalLanguage: "中文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary: "从“能用”走向“可持续维护”的方法。",
    },
    articleSections: [
      {
        heading: "用错误样本驱动优化",
        paragraphs: ["每周收集 10 条低质量输出，分类定位问题，再针对性优化提示词和规则。"],
      },
    ],
    conceptCards: [
      { term: "评估集", explanation: "固定样本用于比较版本效果。", hrValue: "确保升级不退步。" },
    ],
    promptSnippets: [
      {
        title: "错误样本复盘",
        scenario: "周度复盘",
        prompt: "请分析以下低质量输出，按“输入问题/提示词问题/规则问题/知识缺失”分类并给出修复建议。",
      },
    ],
    relatedCourseSlugs: ["build-hr-agent-part1", "hr-ai-roadmap-manager"],
    sourceName: "HR Agent 共创小组",
    updatedAt: "2026-03-21",
  },
  {
    id: "c-007",
    slug: "ai-governance-privacy-hr",
    title: "AI 使用风险、合规、隐私与边界",
    subtitle: "候选人信息、内部数据、错误输出、决策责任",
    description:
      "从 HR 高敏感数据出发，建立“可用、可控、可追溯”的 AI 使用红线与治理框架。",
    category: "合规治理",
    tags: ["合规", "隐私", "数据安全", "决策责任"],
    level: "L2-进阶",
    stage: "治理合规",
    roles: ["招聘 HR", "HRBP", "COE/OD", "HR 管理者"],
    estimatedTime: "55 分钟",
    lessons: 1,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: false,
    chineseSummary: "明确哪些 HR 信息可输入模型、哪些必须脱敏、哪些结论必须人工复核。",
    isFeatured: true,
    coverTone: "amber",
    suitableFor: ["负责 AI 推进和流程治理的团队"],
    learningObjectives: ["识别高风险输入", "设置人工审批点", "建立操作留痕机制"],
    outline: [
      { title: "合规模块", points: ["数据分级", "最小化输入", "授权与审计"] },
      { title: "责任模块", points: ["建议 vs 决策", "错误兜底", "告知机制"] },
    ],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "HR AI 合规边界",
      cover: "/video-cover-7.png",
      duration: "55:00",
      originalLanguage: "中文",
      subtitleAvailable: false,
      translationAvailable: true,
      chineseSummary: "聚焦候选人与员工数据处理红线。",
    },
    articleSections: [
      {
        heading: "先做数据分级，再谈自动化",
        paragraphs: ["将 HR 数据按公开、内部、敏感、严格敏感分级，不同级别对应不同处理规则。"],
      },
    ],
    conceptCards: [
      { term: "最小必要原则", explanation: "只输入完成任务所需最小数据。", hrValue: "降低隐私风险。" },
    ],
    promptSnippets: [
      {
        title: "脱敏检查",
        scenario: "发送内容前审查",
        prompt: "请检查文本是否包含身份证号、手机号、家庭住址、薪酬明细等敏感信息，并输出脱敏建议。",
      },
    ],
    relatedCourseSlugs: ["ai-agent-for-hr-101", "ai-recruitment-workflows"],
    sourceName: "法务与信息安全联合课程",
    updatedAt: "2026-03-17",
  },
  {
    id: "c-008",
    slug: "gaming-internet-hr-cases",
    title: "游戏/互联网 HR 的 AI 实战案例",
    subtitle: "贴近业务的一线案例拆解",
    description: "通过真实业务背景案例，展示从问题定义到结果复盘的完整过程。",
    category: "行业案例",
    tags: ["游戏行业", "互联网", "案例复盘"],
    level: "L2-进阶",
    stage: "场景应用",
    roles: ["招聘 HR", "HRBP", "HR 管理者"],
    estimatedTime: "58 分钟",
    lessons: 1,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary: "包含校招高峰期筛选提效、项目组扩张期组织沟通、跨地团队汇报优化等案例。",
    isFeatured: false,
    coverTone: "mint",
    suitableFor: ["希望参考同业实践的 HR 团队"],
    learningObjectives: ["学习可复制打法", "理解落地过程中的阻力与解决方案"],
    outline: [{ title: "3 个一线案例", points: ["招聘提效", "组织沟通", "管理汇报"] }],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "行业案例复盘",
      cover: "/video-cover-8.png",
      duration: "58:00",
      originalLanguage: "中文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary: "从案例中提炼可复用 SOP。",
    },
    articleSections: [
      {
        heading: "案例共性",
        paragraphs: ["所有成功案例都具备：场景明确、数据可得、输出可评估、负责人明确。"],
      },
    ],
    conceptCards: [
      { term: "小步快跑", explanation: "先做单场景 MVP，再扩展。", hrValue: "降低组织阻力。" },
    ],
    promptSnippets: [
      {
        title: "案例提炼模板",
        scenario: "团队复盘",
        prompt: "请按“背景-动作-结果-问题-下一步”结构整理以下项目复盘记录。",
      },
    ],
    relatedCourseSlugs: ["ai-for-hrbp-efficiency", "ai-recruitment-workflows"],
    sourceName: "行业实践研究组",
    updatedAt: "2026-03-15",
  },
  {
    id: "c-009",
    slug: "global-agent-tools-trend",
    title: "海外 AI / Agent 工具与趋势解读",
    subtitle: "看懂海外动态，并提供中文辅助理解",
    description: "聚焦海外工具与案例，帮助 HR 快速判断哪些趋势与中国团队相关、哪些暂不适用。",
    category: "海外趋势",
    tags: ["海外", "工具趋势", "中文摘要", "字幕说明"],
    level: "L2-进阶",
    stage: "快速认知",
    roles: ["招聘 HR", "HRBP", "COE/OD", "HR 管理者"],
    estimatedTime: "52 分钟",
    lessons: 1,
    sourceRegion: "GLOBAL",
    originalLanguage: "英文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary:
      "课程汇总海外最新 Agent 工具与企业实践，提供中文摘要、关键术语解释和可迁移建议。",
    isFeatured: true,
    coverTone: "ink",
    suitableFor: ["需要持续跟进国际趋势的 HR 推动者"],
    learningObjectives: ["看懂海外工具定位", "识别可迁移实践", "形成本地化落地建议"],
    outline: [
      { title: "模块 1：海外产品版图", points: ["模型平台", "自动化工具", "企业协作应用"] },
      { title: "模块 2：HR 相关趋势", points: ["招聘自动化", "员工服务 Agent", "治理框架"] },
    ],
    video: {
      provider: "海外原视频（可替换）",
      title: "Global HR Agent Trend Briefing",
      cover: "/video-cover-9.png",
      duration: "52:00",
      originalLanguage: "英文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary: "提供中文字幕状态和中文要点提炼，便于非英文受众快速理解。",
    },
    articleSections: [
      {
        heading: "海外内容如何被 HR 快速吸收",
        paragraphs: ["平台会标注原始语言、字幕状态、中文摘要可用性，避免“看不懂但又想跟进”的学习断层。"],
      },
    ],
    conceptCards: [
      { term: "可迁移性", explanation: "评估海外方案是否适合本地业务。", hrValue: "避免盲目跟风。" },
    ],
    promptSnippets: [
      {
        title: "海外资讯转行动",
        scenario: "阅读英文资讯后",
        prompt:
          "请把以下海外资讯整理成中文：核心观点、与 HR 的关系、在中国团队可尝试的 2 个动作、潜在风险。",
      },
    ],
    relatedCourseSlugs: ["ai-agent-for-hr-101", "ai-governance-privacy-hr"],
    sourceName: "Global HR Tech Brief",
    sourceUrl: "https://example.com/global-hr-tech",
    updatedAt: "2026-03-22",
  },
  {
    id: "c-010",
    slug: "hr-ai-roadmap-manager",
    title: "HR 管理者如何推动团队 AI 落地路线图",
    subtitle: "课程体系、试点机制、团队推广与复用",
    description: "帮助 HR 管理者从个人尝试走向团队机制建设。",
    category: "AI Agent 认知",
    tags: ["管理者", "路线图", "团队推广"],
    level: "L3-实战",
    stage: "实战搭建",
    roles: ["HR 管理者", "COE/OD"],
    estimatedTime: "48 分钟",
    lessons: 1,
    sourceRegion: "CN",
    originalLanguage: "中文",
    translationAvailable: true,
    subtitleAvailable: true,
    chineseSummary: "讲清楚管理者如何建立“学习-试点-复盘-推广”的团队落地机制。",
    isFeatured: false,
    coverTone: "amber",
    suitableFor: ["承担组织级 AI 推进任务的负责人"],
    learningObjectives: ["制定季度路线图", "设计试点机制", "建立复用与激励"],
    outline: [
      { title: "路线图设计", points: ["目标定义", "资源配置", "里程碑"] },
      { title: "组织机制", points: ["培训计划", "案例评审", "模板资产库"] },
    ],
    video: {
      provider: "内部学习视频位（可替换）",
      title: "HR 团队 AI 推进",
      cover: "/video-cover-10.png",
      duration: "48:00",
      originalLanguage: "中文",
      subtitleAvailable: true,
      translationAvailable: true,
      chineseSummary: "管理者版落地手册。",
    },
    articleSections: [
      {
        heading: "管理动作先于工具动作",
        paragraphs: ["先定义组织目标和评估机制，再选择工具，能显著提高落地成功率。"],
      },
    ],
    conceptCards: [
      { term: "机制化推进", explanation: "通过节奏和流程保障持续落地。", hrValue: "避免一次性活动。" },
    ],
    promptSnippets: [
      {
        title: "季度路线图助手",
        scenario: "制定季度计划",
        prompt: "请为 20 人 HR 团队生成 12 周 AI 落地路线图，包含目标、里程碑、负责人、风险与评估方式。",
      },
    ],
    relatedCourseSlugs: ["build-hr-agent-part1", "build-hr-agent-part2"],
    sourceName: "HR 管理实践项目组",
    updatedAt: "2026-03-14",
  },
];

export const featuredCourses = courses.filter((course) => course.isFeatured).slice(0, 4);

export const getCourseBySlug = (slug: string) => courses.find((course) => course.slug === slug);
