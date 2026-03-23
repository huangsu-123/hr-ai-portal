# HR AI 学习与实战门户（原型）

面向游戏行业与互联网行业 HR 团队的内部学习与实战平台原型。

## 技术栈

- Next.js (App Router)
- React
- TypeScript
- CSS（结构化样式 + 响应式）

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 已实现页面

- `/` 首页
- `/courses` 课程列表页
- `/courses/[slug]` 课程详情页
- `/updates` 每日更新页
- `/agent-playbook` Agent 实战页
- `/templates` 模板资源页
- `/admin` 简易后台（每日更新 JSON 录入 + 一键发布）
- `/about` 关于页

## 数据结构

所有内容均从独立数据文件读取，便于后续接 CMS 或接口：

- `src/data/courses.ts` 课程数据
- `src/data/updates.ts` 每日动态
- `src/data/agents.ts` Agent 场景与方法论
- `src/data/templates.ts` 模板资源
- `src/data/taxonomy.ts` 分类与标签

关键字段已覆盖：
- `sourceRegion`
- `originalLanguage`
- `translationAvailable`
- `subtitleAvailable`
- `chineseSummary` / `chineseBrief`

## 后续扩展建议

- 每日动态自动更新：新增抓取任务写入 `updates` 数据源，并增加人工审核流。
- 后台管理：把 `src/data/*` 替换为 CMS API，前端保留同字段渲染。
- 翻译与字幕：新增翻译服务层，写回 `translationAvailable/subtitleAvailable/chineseSummary`。
- 用户能力：接入登录、收藏、学习进度、推荐系统。

## 内容发布流程（V1）

说明：`/admin` 的“一键发布”会写入仓库文件，建议在本地运行项目后使用，再通过 Git 推到线上。

1. 运行站点并打开 `/admin`
2. 在 JSON 编辑区维护每日动态（支持本地草稿）
3. 点击“一键发布到内容库”（会覆盖 `src/data/updates.ts`）
4. 执行：

```bash
git add .
git commit -m "content: update daily feed"
git push
```

5. Vercel 会自动触发部署并上线新内容
