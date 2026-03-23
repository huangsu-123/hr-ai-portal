"use client";

import { useMemo, useState } from "react";
import type { UpdateItem } from "@/types/content";

const draftKey = "hr-ai-updates-draft-v1";

interface AdminPayload {
  updates: UpdateItem[];
  updatedAt?: string;
}

const emptyItem: UpdateItem = {
  id: "u-new",
  title: "",
  summary: "",
  category: "模型与Agent",
  tags: ["待补充"],
  sourceName: "",
  sourceRegion: "CN",
  originalLanguage: "中文",
  publishDate: "2026-03-23",
  relevanceToHR: "",
  recommendedAction: "",
  isFeatured: false,
  translationAvailable: true,
  subtitleAvailable: false,
  chineseBrief: "",
};

export function AdminUpdatesConsole({ initialUpdates }: { initialUpdates: UpdateItem[] }) {
  const [editorText, setEditorText] = useState(() => JSON.stringify(initialUpdates, null, 2));
  const [status, setStatus] = useState("可编辑");
  const [busy, setBusy] = useState(false);

  const stats = useMemo(() => {
    try {
      const parsed = JSON.parse(editorText) as UpdateItem[];
      const today = parsed.filter((item) => item.publishDate === latestDate(parsed)).length;
      const featured = parsed.filter((item) => item.isFeatured).length;
      const globalCount = parsed.filter((item) => item.sourceRegion === "GLOBAL").length;
      return { total: parsed.length, today, featured, globalCount };
    } catch {
      return { total: 0, today: 0, featured: 0, globalCount: 0 };
    }
  }, [editorText]);

  const addNewItem = () => {
    try {
      const parsed = JSON.parse(editorText) as UpdateItem[];
      const next: UpdateItem = {
        ...emptyItem,
        id: `u-${Date.now()}`,
      };
      parsed.unshift(next);
      setEditorText(JSON.stringify(parsed, null, 2));
      setStatus("已插入一条空白动态，请编辑后发布");
    } catch {
      setStatus("JSON 解析失败，无法新增");
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(editorText);
      setEditorText(JSON.stringify(parsed, null, 2));
      setStatus("JSON 已格式化");
    } catch {
      setStatus("JSON 格式错误，无法格式化");
    }
  };

  const saveDraft = () => {
    localStorage.setItem(draftKey, editorText);
    setStatus("草稿已保存到浏览器本地");
  };

  const loadDraft = () => {
    const draft = localStorage.getItem(draftKey);
    if (!draft) {
      setStatus("本地无草稿");
      return;
    }
    setEditorText(draft);
    setStatus("已加载本地草稿");
  };

  const clearDraft = () => {
    localStorage.removeItem(draftKey);
    setStatus("本地草稿已清空");
  };

  const reloadFromServer = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/updates", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("加载失败");
      }
      const payload = (await res.json()) as AdminPayload;
      setEditorText(JSON.stringify(payload.updates, null, 2));
      setStatus("已恢复服务器版本");
    } catch {
      setStatus("恢复失败，请稍后重试");
    } finally {
      setBusy(false);
    }
  };

  const publish = async () => {
    setBusy(true);
    setStatus("正在校验并发布...");

    try {
      const parsed = JSON.parse(editorText);
      const list = validateUpdates(parsed);

      const res = await fetch("/api/admin/updates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates: list }),
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload?.error ?? "发布失败");
      }

      setEditorText(JSON.stringify(payload.updates, null, 2));
      setStatus(`发布成功：共 ${payload.count} 条，已写入 src/data/updates.ts`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "发布失败";
      setStatus(`发布失败：${message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="stackLarge">
      <section className="panel">
        <div className="splitRow">
          <div>
            <h2>每日更新管理台（V1）</h2>
            <p className="muted">先维护“每日更新”模块，发布后写入代码数据源，可直接进入部署流程。</p>
          </div>
          <span className="label">状态：{status}</span>
        </div>
        <div className="miniMetricGrid adminMetrics">
          <div>
            <strong>{stats.total}</strong>
            <span>总条目</span>
          </div>
          <div>
            <strong>{stats.today}</strong>
            <span>最新日期条目</span>
          </div>
          <div>
            <strong>{stats.featured}</strong>
            <span>精选条目</span>
          </div>
          <div>
            <strong>{stats.globalCount}</strong>
            <span>海外条目</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="adminActions">
          <button type="button" className="button primary" onClick={publish} disabled={busy}>
            一键发布到内容库
          </button>
          <button type="button" className="button ghostDark" onClick={addNewItem} disabled={busy}>
            新增空白动态
          </button>
          <button type="button" className="button ghostDark" onClick={formatJson} disabled={busy}>
            格式化 JSON
          </button>
          <button type="button" className="button ghostDark" onClick={reloadFromServer} disabled={busy}>
            恢复服务器版本
          </button>
          <button type="button" className="button ghostDark" onClick={saveDraft} disabled={busy}>
            保存草稿
          </button>
          <button type="button" className="button ghostDark" onClick={loadDraft} disabled={busy}>
            读取草稿
          </button>
          <button type="button" className="button ghostDark" onClick={clearDraft} disabled={busy}>
            清空草稿
          </button>
        </div>
        <p className="muted">
          发布说明：点击“一键发布”会覆盖
          <code>src/data/updates.ts</code>。发布完成后请执行 <code>git add . && git commit && git push</code>。
        </p>
      </section>

      <section className="panel">
        <h3>JSON 编辑区</h3>
        <p className="muted">
          每条动态必须包含：id、title、summary、category、tags、sourceRegion、originalLanguage、publishDate、relevanceToHR、recommendedAction、translationAvailable、subtitleAvailable、chineseBrief。
        </p>
        <textarea
          className="adminTextarea"
          value={editorText}
          onChange={(event) => setEditorText(event.target.value)}
          spellCheck={false}
        />
      </section>
    </div>
  );
}

function latestDate(list: UpdateItem[]) {
  return list.reduce((max, item) => (item.publishDate > max ? item.publishDate : max), "");
}

function validateUpdates(input: unknown): UpdateItem[] {
  if (!Array.isArray(input)) {
    throw new Error("最外层必须是数组");
  }

  const items = input as UpdateItem[];

  if (!items.length) {
    throw new Error("至少保留 1 条动态");
  }

  const ids = new Set<string>();

  items.forEach((item, index) => {
    const line = `第 ${index + 1} 条`;

    if (!item.id || typeof item.id !== "string") {
      throw new Error(`${line} 缺少 id`);
    }

    if (ids.has(item.id)) {
      throw new Error(`${line} 的 id 重复：${item.id}`);
    }
    ids.add(item.id);

    const requiredStrings: (keyof UpdateItem)[] = [
      "title",
      "summary",
      "category",
      "sourceName",
      "publishDate",
      "relevanceToHR",
      "recommendedAction",
      "chineseBrief",
      "originalLanguage",
    ];

    requiredStrings.forEach((key) => {
      const value = item[key];
      if (typeof value !== "string" || !value.trim()) {
        throw new Error(`${line} 的 ${String(key)} 不能为空`);
      }
    });

    if (!Array.isArray(item.tags) || !item.tags.length) {
      throw new Error(`${line} 的 tags 至少保留 1 个`);
    }

    if (!["CN", "GLOBAL"].includes(item.sourceRegion)) {
      throw new Error(`${line} 的 sourceRegion 必须是 CN 或 GLOBAL`);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.publishDate)) {
      throw new Error(`${line} 的 publishDate 必须是 YYYY-MM-DD`);
    }

    if (typeof item.translationAvailable !== "boolean" || typeof item.subtitleAvailable !== "boolean") {
      throw new Error(`${line} 的翻译或字幕字段必须是布尔值`);
    }

    if (typeof item.isFeatured !== "boolean") {
      throw new Error(`${line} 的 isFeatured 必须是布尔值`);
    }
  });

  return items;
}
