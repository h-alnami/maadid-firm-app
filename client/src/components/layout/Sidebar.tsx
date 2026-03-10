import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, Calendar, Gavel, FileText, Settings, LogOut, Receipt, Lightbulb, Users, FolderOpen } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_geometric_logo_for_legal_firm_maadid_with_arabic_calligraphy_influence_in_gold_on_dark_green.png";

const sidebarItems = [
  { icon: LayoutDashboard, label: "لوحة المعلومات", href: "/" },
  { icon: Briefcase, label: "القضايا", href: "/cases" },
  { icon: Users, label: "العملاء", href: "/clients" },
  { icon: Calendar, label: "التقويم", href: "/calendar" },
  { icon: Gavel, label: "الجلسات", href: "/sessions" },
  { icon: Receipt, label: "الفواتير", href: "/invoices" },
  { icon: FolderOpen, label: "المستندات", href: "/documents" },
  { icon: FileText, label: "التقارير", href: "/reports" },
  { icon: Lightbulb, label: "الذاكرة الذكية", href: "/smart-memory" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col border-l border-sidebar-border shadow-2xl fixed right-0 top-0 z-50 transition-all duration-300">
      <div className="p-6 flex flex-col items-center border-b border-sidebar-border/50">
        <div className="w-20 h-20 rounded-full bg-sidebar-primary/10 flex items-center justify-center mb-3 border-2 border-sidebar-primary/20 overflow-hidden shadow-inner">
             <img src={logoImage} alt="Maadid Firm" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-sidebar-foreground">شركة معاضد</h1>
        <p className="text-xs text-sidebar-foreground/60 uppercase tracking-widest mt-1 font-mono">MAADID FIRM</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-lg shadow-sidebar-primary/10"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-current opacity-50 rounded-r-full" />
                )}
                <item.icon className={cn("w-5 h-5 transition-transform duration-300 flex-shrink-0", isActive ? "stroke-[2.5px] scale-110" : "stroke-[1.5px] group-hover:scale-110")} />
                <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border/50 space-y-1">
        <Link href="/settings" className={cn(
          "flex w-full items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group",
          location === "/settings"
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}>
          <Settings className="w-5 h-5 stroke-[1.5px] group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-sm">الإعدادات</span>
        </Link>
        <Link href="/login" className="flex w-full items-center gap-3 px-4 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
          <LogOut className="w-5 h-5 stroke-[1.5px]" />
          <span className="text-sm">تسجيل خروج</span>
        </Link>
      </div>
    </div>
  );
}
