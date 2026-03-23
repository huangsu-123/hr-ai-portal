"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/library", label: "资料中心" },
  { href: "/intel", label: "行业情报" },
  { href: "/agent-playbook", label: "Agent 专题" },
  { href: "/templates", label: "模板资源" },
  { href: "/collections", label: "专题合集" },
  { href: "/admin", label: "管理入口" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="siteHeader">
      <div className="container headerWrap">
        <Link href="/" className="brand">
          <span className="brandDot" />
          <span>
            HR AI 学习资料库与行业情报站
            <small>游戏 / 互联网 HR 团队统一入口</small>
          </span>
        </Link>
        <nav className="nav">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={active ? "navLink active" : "navLink"}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
