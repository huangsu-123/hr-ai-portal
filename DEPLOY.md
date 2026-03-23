# GitHub + Vercel 快速部署

## 1. 本地检查

```bash
cd /Users/edy/Desktop/codexworkspace/hr-ai-portal
npm install
npm run lint
npm run build
```

## 2. 推送到 GitHub

```bash
git init
git add .
git commit -m "feat: add video learning center with freshness metadata"
git branch -M main
git remote add origin <你的仓库地址>
git push -u origin main
```

如果已有仓库，只需要：

```bash
git add .
git commit -m "feat: update video learning and homepage"
git push
```

## 3. 连接 Vercel

1. 登录 Vercel，点击 `Add New Project`
2. 选择 GitHub 仓库 `hr-ai-portal`
3. Framework Preset 选择 `Next.js`
4. Build Command 使用默认：`next build`
5. Output Directory 使用默认：`.next`
6. 点击 `Deploy`

## 4. 自动发布

后续只要执行：

```bash
git add .
git commit -m "content: weekly refresh"
git push
```

Vercel 会自动触发新部署。

## 5. 推荐环境变量（后续接真实抓取时）

- `CRON_SECRET`
- `CONTENT_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

当前 MVP 不依赖环境变量也可直接运行。
