"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import BaseLayout from "@/components/layouts/BaseLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BaseLayout
      showHeader={false}
      showFooter={false}
      className="bg-[var(--background)]"
    >
      <div className="flex flex-1">
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </BaseLayout>
  );
} 