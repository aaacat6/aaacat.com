import React, { useEffect, useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
export interface TocItem {
  id: string;
  label: string;
  children?: {
    id: string;
    label: string;
  }[];
}
export const TOC_ITEMS: TocItem[] = [
{
  id: 'core-judgment',
  label: '核心判断'
},
{
  id: 'sources',
  label: '资料来源'
},
{
  id: 'fundamentals',
  label: '基本面',
  children: [
  {
    id: 'company-overview',
    label: '公司概况'
  },
  {
    id: 'industry-analysis',
    label: '行业分析'
  },
  {
    id: 'competitiveness',
    label: '公司竞争力'
  },
  {
    id: 'operations',
    label: '经营分析'
  }]

},
{
  id: 'financials',
  label: '财务与估值',
  children: [
  {
    id: 'financial-analysis',
    label: '财务分析'
  },
  {
    id: 'valuation',
    label: '估值分析'
  }]

},
{
  id: 'framework',
  label: '投资框架',
  children: [
  {
    id: 'assumptions',
    label: '关键假设'
  },
  {
    id: 'risks',
    label: '相关风险'
  },
  {
    id: 'thoughts',
    label: '自己想法'
  },
  {
    id: 'watchlist',
    label: '未来关注'
  },
  {
    id: 'decision',
    label: '决策'
  }]

}];

const ALL_IDS = TOC_ITEMS.flatMap((item) => [
item.id,
...(item.children?.map((c) => c.id) ?? [])]
);
function useActiveSection() {
  const [activeId, setActiveId] = useState<string>(ALL_IDS[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.
        filter((e) => e.isIntersecting).
        sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-15% 0px -70% 0px'
      }
    );
    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return activeId;
}
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
function TocLinks({
  activeId,
  onNavigate



}: {activeId: string;onNavigate?: () => void;}) {
  const isParentActive = (item: TocItem) =>
  activeId === item.id || item.children?.some((c) => c.id === activeId);
  return (
    <ul className="space-y-0.5">
      {TOC_ITEMS.map((item) =>
      <li key={item.id}>
          <button
          onClick={() => {
            scrollTo(item.id);
            onNavigate?.();
          }}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${isParentActive(item) ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
          
            {item.label}
          </button>
          {item.children && isParentActive(item) &&
        <ul className="mt-0.5 mb-1 ml-3 border-l border-border pl-2 space-y-0.5">
              {item.children.map((child) =>
          <li key={child.id}>
                  <button
              onClick={() => {
                scrollTo(child.id);
                onNavigate?.();
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-[13px] transition-colors ${activeId === child.id ? 'text-blue-700 font-medium bg-blue-50/60' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
              
                    {child.label}
                  </button>
                </li>
          )}
            </ul>
        }
        </li>
      )}
    </ul>);

}
export function TocSidebar() {
  const activeId = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="目录"
        className="hidden lg:block fixed top-0 left-0 h-screen w-64 border-r border-border bg-white z-30">
        
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
          <div className="flex items-center justify-center size-8 rounded-md bg-blue-700 text-white">
            <FileText className="size-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Intel 投研记录</p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              NASDAQ: INTC
            </p>
          </div>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase px-3 mb-2">
            目录
          </p>
          <TocLinks activeId={activeId} />
        </div>
      </nav>

      {/* Mobile sticky top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-7 rounded-md bg-blue-700 text-white">
              <FileText className="size-3.5" aria-hidden="true" />
            </div>
            <p className="text-sm font-bold">Intel 投研记录</p>
          </div>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? '关闭目录' : '打开目录'}
            aria-expanded={mobileOpen}
            className="flex items-center justify-center size-9 rounded-md hover:bg-muted transition-colors">
            
            {mobileOpen ?
            <X className="size-5" /> :

            <Menu className="size-5" />
            }
          </button>
        </div>
        {mobileOpen &&
        <nav
          aria-label="目录"
          className="border-t border-border px-3 py-3 max-h-[60vh] overflow-y-auto bg-white">
          
            <TocLinks
            activeId={activeId}
            onNavigate={() => setMobileOpen(false)} />
          
          </nav>
        }
      </div>
    </>);

}