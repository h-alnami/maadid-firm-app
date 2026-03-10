import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, BrainCircuit, Search, Sparkles, MessageSquare, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SmartMemory() {
  const memories = [
    { id: 1, text: "صالح الدوسري - تم تأجيل الجلسة بسبب نقص الوثائق العقارية الأساسية", date: "منذ ساعتين", tag: "ملاحظة" },
    { id: 2, text: "نظام الاستئناف الجديد يتطلب تقديم المذكرات قبل ٤٨ ساعة من موعد الجلسة", date: "أمس", tag: "تنبيه" },
    { id: 3, text: "موعد تجديد رخصة ممارسة المهنة للمكتب في شهر يونيو ٢٠٢٤", date: "قبل ٣ أيام", tag: "إداري" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 py-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
            <BrainCircuit className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold">الذاكرة الذكية</h1>
          <p className="text-muted-foreground text-lg">مساعدك الذكي لتذكر كافة التفاصيل القانونية والإدارية</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-card rounded-2xl p-2 flex items-center shadow-xl">
            <Input 
              placeholder="ماذا تريد أن تتذكر أو تبحث عنه؟" 
              className="border-none text-xl h-16 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-6"
            />
            <Button size="lg" className="h-14 px-8 gap-2 rounded-xl text-lg font-bold">
              <Sparkles className="w-5 h-5" />
              اسأل الذكاء
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              آخر الإضافات
            </h2>
            <div className="space-y-4">
              {memories.map((m) => (
                <Card key={m.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{m.tag}</span>
                      <span className="text-[10px] text-muted-foreground">{m.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              اقتراحات ذكية
            </h2>
            <div className="space-y-3">
              {[
                "لخص قضية صالح الدوسري",
                "ما هي المواعيد الهامة للأسبوع القادم؟",
                "استخرج التواريخ من مذكرة الاستئناف",
                "ذكرني بمراجعة ملفات نورة الشريم"
              ].map((suggestion, i) => (
                <button key={i} className="w-full text-right p-4 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm flex items-center justify-between group">
                  <span>{suggestion}</span>
                  <Sparkles className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
