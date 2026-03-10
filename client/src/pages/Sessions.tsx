import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Trash2, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Session {
  id: number;
  title: string;
  caseNo: string;
  court: string;
  date: string;
  time: string;
  status: string;
}

export default function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, title: "1 قضية", caseNo: "482/2023", court: "المحكمة الجزائية - الرياض", date: "2024-04-15", time: "09:30", status: "scheduled" },
    { id: 2, title: "2 قضية", caseNo: "193/2024", court: "محكمة الأحوال الشخصية", date: "2024-04-18", time: "10:15", status: "review" },
    { id: 3, title: "3 قضية", caseNo: "882/2023", court: "المحكمة التجارية", date: "2024-04-22", time: "11:00", status: "scheduled" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 3, minutes: 15, seconds: 24 });
  const [newSession, setNewSession] = useState({
    caseNo: "",
    court: "",
    date: "",
    time: "",
    status: "scheduled"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddSession = () => {
    if (!newSession.caseNo || !newSession.court || !newSession.date) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    const newId = sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1;
    setSessions([...sessions, { 
      id: newId, 
      title: `${newId} قضية`,
      ...newSession 
    }]);
    setNewSession({ caseNo: "", court: "", date: "", time: "", status: "scheduled" });
    setIsAddOpen(false);
    toast({ title: "تم بنجاح", description: "تمت إضافة الجلسة الجديدة" });
  };

  const handleDeleteSession = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف الجلسة بنجاح" });
  };

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">الجلسات</h1>
          <p className="text-muted-foreground mt-2">إدارة ومتابعة الجلسات القادمة والسابقة</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-3xl font-mono font-bold text-primary tabular-nums">
            {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
          </div>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 h-12 px-6" data-testid="button-add-session">
                <Plus className="w-5 h-5" />
                جلسة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-xl">إضافة جلسة جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>رقم القضية</Label>
                  <Input 
                    value={newSession.caseNo} 
                    onChange={(e) => setNewSession({...newSession, caseNo: e.target.value})}
                    placeholder="مثال: 482/2023"
                    data-testid="input-session-case"
                  />
                </div>
                <div className="space-y-2">
                  <Label>المحكمة</Label>
                  <Select value={newSession.court} onValueChange={(v) => setNewSession({...newSession, court: v})}>
                    <SelectTrigger data-testid="select-session-court">
                      <SelectValue placeholder="اختر المحكمة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="المحكمة الجزائية - الرياض">المحكمة الجزائية - الرياض</SelectItem>
                      <SelectItem value="محكمة الأحوال الشخصية">محكمة الأحوال الشخصية</SelectItem>
                      <SelectItem value="المحكمة التجارية">المحكمة التجارية</SelectItem>
                      <SelectItem value="المحكمة العامة">المحكمة العامة</SelectItem>
                      <SelectItem value="محكمة الاستئناف">محكمة الاستئناف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>التاريخ</Label>
                    <Input 
                      type="date"
                      value={newSession.date} 
                      onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                      data-testid="input-session-date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الوقت</Label>
                    <Input 
                      type="time"
                      value={newSession.time} 
                      onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                      data-testid="input-session-time"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select value={newSession.status} onValueChange={(v) => setNewSession({...newSession, status: v})}>
                    <SelectTrigger data-testid="select-session-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">مجدولة</SelectItem>
                      <SelectItem value="review">مراجعة</SelectItem>
                      <SelectItem value="session">جلسة</SelectItem>
                      <SelectItem value="paid">مسددة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddSession} className="w-full h-12 text-lg font-bold" data-testid="button-save-session">
                  حفظ الجلسة
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="scheduled" className="w-full">
        <TabsList className="w-full max-w-md bg-muted/50 p-1 mb-8 h-12">
          <TabsTrigger value="paid" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all">مسددة</TabsTrigger>
          <TabsTrigger value="session" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all">جلسة</TabsTrigger>
          <TabsTrigger value="review" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all">مراجعة</TabsTrigger>
          <TabsTrigger value="scheduled" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all">مجدولة</TabsTrigger>
        </TabsList>

        {["scheduled", "review", "session", "paid"].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4">
            {tabValue === "scheduled" && (
              <div className="text-center py-4 mb-4">
                <h3 className="text-xl font-medium text-muted-foreground">الجلسة القادمة خلال</h3>
                <div className="text-5xl font-bold text-primary mt-2 font-mono tabular-nums">
                  {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {sessions.filter(s => s.status === tabValue).length === 0 ? (
                <div className="p-12 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                  لا توجد جلسات في هذا التصنيف حالياً
                </div>
              ) : (
                sessions.filter(s => s.status === tabValue).map((session) => (
                  <Card key={session.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-primary group" data-testid={`card-session-${session.id}`}>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <span className="font-bold text-lg">{session.title}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-background">{session.caseNo}</Badge>
                            <h3 className="font-bold text-lg">{session.court}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{session.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteSession(session.id)} data-testid={`button-delete-session-${session.id}`}>
                          <Trash2 className="w-5 h-5" />
                        </Button>
                        <Badge className="bg-primary hover:bg-primary/90 px-4 py-2">التفاصيل</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Layout>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
