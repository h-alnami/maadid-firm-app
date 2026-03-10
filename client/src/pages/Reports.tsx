import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Filter, Calendar, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reports() {
  const reports = [
    { id: 1, title: "تقرير الإنجاز الشهري - مارس", type: "إداري", date: "2024/03/31", size: "2.4 MB" },
    { id: 2, title: "كشف القضايا المنتهية", type: "قانوني", date: "2024/04/01", size: "1.1 MB" },
    { id: 3, title: "تقرير المصروفات والأتعاب", type: "مالي", date: "2024/03/15", size: "850 KB" },
    { id: 4, title: "إحصائيات الجلسات الربع سنوية", type: "تحليلي", date: "2024/03/10", size: "3.2 MB" },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">التقارير</h1>
          <p className="text-muted-foreground mt-2">تحليل البيانات وإصدار التقارير الدورية</p>
        </div>
        <Button variant="outline" className="gap-2 h-12">
          <Filter className="w-5 h-5" />
          تصفية التقارير
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "تقارير مكتملة", value: "128", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "قيد المراجعة", value: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
          { label: "معدل النمو", value: "+15%", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden group">
            <CardContent className="p-6 flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">آخر التقارير المصدرة</h2>
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-all border-border/50 group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold group-hover:text-primary transition-colors">{report.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="bg-muted px-2 py-0.5 rounded">{report.type}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {report.date}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Download className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
