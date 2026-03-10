import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar as CalendarIcon, ChevronLeft, Gavel, CheckCircle2, AlertCircle } from "lucide-react";

export default function CalendarPage() {
  const events = [
    { id: 1, title: "جلسة نطق بالحكم", court: "المحكمة الجزائية", time: "09:00 ص", status: "قادم", type: "جلسة" },
    { id: 2, title: "مراجعة مكتب الخبراء", court: "وزارة العدل", time: "11:30 ص", status: "مكتمل", type: "مراجعة" },
    { id: 3, title: "اجتماع مع موكل", court: "مكتب الرياض", time: "01:00 م", status: "هام", type: "اجتماع" },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">التقويم</h1>
          <p className="text-muted-foreground mt-2">متابعة المواعيد والجلسات المجدولة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 border-none shadow-sm overflow-hidden">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">أبريل 2024</h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="px-4 py-1">اليوم</Badge>
                <div className="flex border rounded-md">
                   <button className="p-2 hover:bg-muted border-l"><ChevronLeft className="w-4 h-4 rotate-180" /></button>
                   <button className="p-2 hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-border border rounded-xl overflow-hidden">
               {['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'].map((day) => (
                 <div key={day} className="bg-muted/30 p-4 text-center text-sm font-bold text-muted-foreground">{day}</div>
               ))}
               {Array.from({ length: 35 }).map((_, i) => {
                 const day = i - 3;
                 const isToday = day === 22;
                 const hasEvent = [15, 22, 28].includes(day);
                 return (
                   <div key={i} className={`bg-card min-h-[120px] p-2 border-border/50 relative hover:bg-primary/5 transition-colors cursor-pointer ${day < 1 || day > 30 ? 'opacity-20 pointer-events-none' : ''}`}>
                      <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-white' : ''}`}>
                        {day > 0 && day <= 30 ? day : ''}
                      </span>
                      {hasEvent && (
                        <div className="mt-2 space-y-1">
                           <div className="text-[10px] bg-emerald-100 text-emerald-800 p-1 rounded border border-emerald-200 truncate font-bold">جلسة قضائية</div>
                        </div>
                      )}
                   </div>
                 );
               })}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                أجندة اليوم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="relative pr-4 border-r-2 border-primary/20 hover:border-primary transition-colors py-1 group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{event.title}</h3>
                    <span className="text-[10px] text-muted-foreground font-mono">{event.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.court}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-[9px] px-2 h-4">{event.type}</Badge>
                    {event.status === "مكتمل" ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    ) : event.status === "هام" ? (
                      <AlertCircle className="w-3 h-3 text-red-500" />
                    ) : null}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
