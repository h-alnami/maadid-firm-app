import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar as CalendarIcon, ArrowUpLeft, ChevronLeft, Gavel, Scale, TrendingUp, Users, Briefcase, Receipt } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const recentCases = [
    { id: 1, name: "صالح الدوسري", type: "نزاع عقاري", typeColor: "bg-amber-100 text-amber-800", date: "2023/1147", status: "قيد التسجيل", statusColor: "bg-amber-100 text-amber-800" },
    { id: 2, name: "نورة الشريم", type: "تحصيل ديون", typeColor: "bg-red-100 text-red-800", date: "2022/551", status: "استئناف", statusColor: "bg-red-100 text-red-800" },
    { id: 3, name: "خالد العتيبي", type: "نزاع عقاري", typeColor: "bg-emerald-100 text-emerald-800", date: "2021/493", status: "جلسة", statusColor: "bg-emerald-100 text-emerald-800" },
  ];

  const stats = [
    { label: "القضايا النشطة", value: "24", icon: Briefcase, color: "text-primary", bg: "bg-primary/10", href: "/cases" },
    { label: "العملاء", value: "18", icon: Users, color: "text-blue-600", bg: "bg-blue-100", href: "/clients" },
    { label: "الفواتير المعلقة", value: "7", icon: Receipt, color: "text-amber-600", bg: "bg-amber-100", href: "/invoices" },
    { label: "نسبة النجاح", value: "92%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100", href: "/reports" },
  ];

  return (
    <Layout>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">لوحة المعلومات</h1>
          <p className="text-muted-foreground mt-2">مرحباً بك، لديك 3 جلسات قادمة هذا الأسبوع</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="font-bold text-2xl">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Cases */}
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">آخر القضايا</h2>
                <Link href="/cases" className="text-sm text-primary hover:underline">عرض الكل</Link>
             </div>
             <div className="space-y-3">
                {recentCases.map((c, i) => (
                  <motion.div 
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-card p-4 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer"
                  >
                     <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", c.typeColor)}>
                           <Gavel className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{c.name}</h3>
                           <p className="text-xs text-muted-foreground">{c.type}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">{c.date}</span>
                        <Badge className={cn("px-3 py-1 border-0", c.statusColor)}>
                           {c.status}
                        </Badge>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-[#143d30] text-white border-none overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-accent blur-[100px]" />
                  <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-emerald-500 blur-[100px]" />
              </div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2 text-emerald-200/80">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium">الجلسة القادمة</span>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="font-bold text-white text-sm">محكمة الرياض العامة</p>
                    </div>
                    <p className="text-xs text-emerald-200/60 mt-1">القضية رقم: 2024/892</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-4">
                   <div className="text-7xl font-bold font-mono tracking-tighter text-white drop-shadow-lg tabular-nums">
                      09:05:30
                   </div>
                   <div className="text-2xl font-light text-amber-400 mt-2 flex items-baseline gap-2">
                      <span className="font-bold text-4xl">26</span>
                      <span>يوم</span>
                   </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                   <button className="flex items-center gap-2 text-sm text-emerald-100/60 hover:text-white transition-colors group">
                      التفاصيل
                      <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
           <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-base">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span>الجلسات القادمة</span>
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                 <Calendar
                    mode="single"
                    selected={new Date()}
                    className="rounded-md border-0 w-full p-0"
                    classNames={{
                       month: "space-y-3 w-full",
                       caption: "flex justify-center pt-1 relative items-center mb-3",
                       caption_label: "text-sm font-bold text-primary",
                       nav: "space-x-1 flex items-center absolute left-0",
                       table: "w-full border-collapse",
                       head_row: "flex justify-between w-full mb-1",
                       head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.75rem] flex justify-center",
                       row: "flex w-full mt-1 justify-between",
                       cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                       day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-muted rounded-full flex items-center justify-center transition-colors text-xs",
                       day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-md",
                       day_today: "bg-accent/20 text-accent-foreground font-bold border border-accent",
                    }}
                 />
                 <div className="mt-4 space-y-3">
                    <h4 className="font-bold text-xs text-muted-foreground">المواعيد القادمة</h4>
                    {[
                      { day: 22, title: "جلسة نطق بالحكم", court: "المحكمة الجزائية", time: "09:00 ص" },
                      { day: 25, title: "مراجعة مكتب الخبراء", court: "وزارة العدل", time: "11:30 ص" },
                      { day: 28, title: "جلسة استئناف", court: "محكمة الاستئناف", time: "10:00 ص" },
                    ].map((event, i) => (
                       <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
                          <div className="w-9 h-9 rounded-full bg-primary/5 flex flex-col items-center justify-center border border-primary/10 flex-shrink-0">
                             <span className="text-xs font-bold text-primary">{event.day}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="text-xs font-bold truncate">{event.title}</p>
                             <p className="text-[10px] text-muted-foreground">{event.court} • {event.time}</p>
                          </div>
                          <ChevronLeft className="w-4 h-4 text-muted-foreground rtl:rotate-180 flex-shrink-0" />
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </Layout>
  );
}
