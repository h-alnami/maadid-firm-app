import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Search, Filter, Plus, Gavel, Clock, X, Trash2, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Case {
  id: number;
  name: string;
  type: string;
  caseNo: string;
  status: string;
  date: string;
}

export default function Cases() {
  const [cases, setCases] = useState<Case[]>([
    { id: 1, name: "صالح الدوسري", type: "نزاع عقاري", caseNo: "2023/1147", status: "قيد التسجيل", date: "2023/11/20" },
    { id: 2, name: "نورة الشريم", type: "تحصيل ديون", caseNo: "2022/551", status: "استئناف", date: "2022/05/15" },
    { id: 3, name: "خالد العتيبي", type: "نزاع عقاري", caseNo: "2021/493", status: "جلسة", date: "2021/08/10" },
    { id: 4, name: "شركة الأفق", type: "قضية عمالية", caseNo: "2024/102", status: "جديدة", date: "2024/01/05" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [newCase, setNewCase] = useState({ name: "", type: "نزاع عقاري", status: "جديدة" });

  const filteredCases = cases.filter(c => 
    c.name.includes(searchTerm) || c.caseNo.includes(searchTerm) || c.type.includes(searchTerm)
  );

  const handleAddCase = () => {
    if (!newCase.name) {
      toast({ title: "خطأ", description: "يرجى إدخال اسم الموكل", variant: "destructive" });
      return;
    }
    const newId = Math.max(...cases.map(c => c.id)) + 1;
    const today = new Date();
    const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
    const caseNo = `${today.getFullYear()}/${newId + 100}`;
    
    setCases([...cases, { 
      id: newId, 
      name: newCase.name, 
      type: newCase.type, 
      caseNo, 
      status: newCase.status, 
      date: dateStr 
    }]);
    setNewCase({ name: "", type: "نزاع عقاري", status: "جديدة" });
    setIsAddOpen(false);
    toast({ title: "تم بنجاح", description: "تمت إضافة القضية الجديدة" });
  };

  const handleEditCase = () => {
    if (!editingCase) return;
    setCases(cases.map(c => c.id === editingCase.id ? editingCase : c));
    setIsEditOpen(false);
    setEditingCase(null);
    toast({ title: "تم بنجاح", description: "تم تحديث بيانات القضية" });
  };

  const handleDeleteCase = (id: number) => {
    setCases(cases.filter(c => c.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف القضية بنجاح" });
  };

  const openEditDialog = (c: Case) => {
    setEditingCase({ ...c });
    setIsEditOpen(true);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">القضايا</h1>
          <p className="text-muted-foreground mt-2">إدارة ومتابعة جميع القضايا القانونية ({cases.length} قضية)</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 h-12 px-6 text-lg font-bold" data-testid="button-add-case">
              <Plus className="w-5 h-5" />
              قضية جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl">إضافة قضية جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>اسم الموكل</Label>
                <Input 
                  value={newCase.name} 
                  onChange={(e) => setNewCase({...newCase, name: e.target.value})}
                  placeholder="أدخل اسم الموكل..."
                  data-testid="input-client-name"
                />
              </div>
              <div className="space-y-2">
                <Label>نوع القضية</Label>
                <Select value={newCase.type} onValueChange={(v) => setNewCase({...newCase, type: v})}>
                  <SelectTrigger data-testid="select-case-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نزاع عقاري">نزاع عقاري</SelectItem>
                    <SelectItem value="تحصيل ديون">تحصيل ديون</SelectItem>
                    <SelectItem value="قضية عمالية">قضية عمالية</SelectItem>
                    <SelectItem value="قضية جنائية">قضية جنائية</SelectItem>
                    <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select value={newCase.status} onValueChange={(v) => setNewCase({...newCase, status: v})}>
                  <SelectTrigger data-testid="select-case-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="جديدة">جديدة</SelectItem>
                    <SelectItem value="قيد التسجيل">قيد التسجيل</SelectItem>
                    <SelectItem value="جلسة">جلسة</SelectItem>
                    <SelectItem value="استئناف">استئناف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddCase} className="w-full h-12 text-lg font-bold" data-testid="button-save-case">
                حفظ القضية
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="بحث عن قضية، رقم، أو موكل..." 
            className="pr-10 h-12 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-search-cases"
          />
        </div>
        <Button variant="outline" className="h-12 gap-2">
          <Filter className="w-5 h-5" />
          تصفية
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredCases.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            لا توجد قضايا مطابقة للبحث
          </div>
        ) : (
          filteredCases.map((c) => (
            <Card key={c.id} className="hover:shadow-md transition-all cursor-pointer border-r-4 border-r-transparent hover:border-r-primary group overflow-hidden" data-testid={`card-case-${c.id}`}>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold">{c.name}</h3>
                      <Badge variant="outline" className="font-mono text-xs">{c.caseNo}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Gavel className="w-4 h-4" /> {c.type}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {c.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-none pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">الحالة</p>
                    <Badge className={cn(
                      "px-4 py-1",
                      c.status === "استئناف" ? "bg-red-100 text-red-800" : 
                      c.status === "جلسة" ? "bg-emerald-100 text-emerald-800" :
                      "bg-amber-100 text-amber-800"
                    )}>
                      {c.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => openEditDialog(c)} data-testid={`button-edit-case-${c.id}`}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:text-destructive" onClick={() => handleDeleteCase(c.id)} data-testid={`button-delete-case-${c.id}`}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl">تعديل القضية</DialogTitle>
          </DialogHeader>
          {editingCase && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>اسم الموكل</Label>
                <Input 
                  value={editingCase.name} 
                  onChange={(e) => setEditingCase({...editingCase, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>نوع القضية</Label>
                <Select value={editingCase.type} onValueChange={(v) => setEditingCase({...editingCase, type: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نزاع عقاري">نزاع عقاري</SelectItem>
                    <SelectItem value="تحصيل ديون">تحصيل ديون</SelectItem>
                    <SelectItem value="قضية عمالية">قضية عمالية</SelectItem>
                    <SelectItem value="قضية جنائية">قضية جنائية</SelectItem>
                    <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select value={editingCase.status} onValueChange={(v) => setEditingCase({...editingCase, status: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="جديدة">جديدة</SelectItem>
                    <SelectItem value="قيد التسجيل">قيد التسجيل</SelectItem>
                    <SelectItem value="جلسة">جلسة</SelectItem>
                    <SelectItem value="استئناف">استئناف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditCase} className="w-full h-12 text-lg font-bold">
                حفظ التعديلات
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
