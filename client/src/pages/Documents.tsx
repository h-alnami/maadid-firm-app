import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { FileText, Search, Plus, Download, Trash2, Upload, FolderOpen, File, FileImage, FileSpreadsheet } from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: string;
  caseRef: string;
  date: string;
  size: string;
  status: string;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "PDF": return <FileText className="w-6 h-6 text-red-500" />;
    case "صورة": return <FileImage className="w-6 h-6 text-blue-500" />;
    case "Excel": return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
    default: return <File className="w-6 h-6 text-gray-500" />;
  }
};

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: "صك ملكية عقارية", type: "PDF", caseRef: "2023/1147 - صالح الدوسري", date: "2023/11/20", size: "2.4 MB", status: "موثق رسمياً" },
    { id: 2, name: "عقد الوكالة الشاملة", type: "PDF", caseRef: "2022/874 - فاطمة الحربي", date: "2022/09/01", size: "1.1 MB", status: "بانتظار التوقيع" },
    { id: 3, name: "مذكرة الاستئناف", type: "PDF", caseRef: "2022/551 - نورة الشريم", date: "2023/11/22", size: "850 KB", status: "صادرة" },
    { id: 4, name: "مكرنة تجارية", type: "صورة", caseRef: "2023/1092 - أحمد الحربي", date: "2023/11/23", size: "3.2 MB", status: "موثق رسمياً" },
    { id: 5, name: "الورقة الدالة", type: "PDF", caseRef: "2021/493 - خالد العتيبي", date: "2021/09/19", size: "560 KB", status: "صادرة" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("الكل");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: "",
    type: "PDF",
    caseRef: "",
    status: "بانتظار التوقيع",
  });

  const filteredDocs = documents.filter(d => {
    const matchSearch = d.name.includes(searchTerm) || d.caseRef.includes(searchTerm);
    const matchType = filterType === "الكل" || d.type === filterType;
    return matchSearch && matchType;
  });

  const handleAddDoc = () => {
    if (!newDoc.name) {
      toast({ title: "خطأ", description: "يرجى إدخال اسم المستند", variant: "destructive" });
      return;
    }
    const newId = documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1;
    const today = new Date();
    const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
    setDocuments([...documents, {
      id: newId,
      ...newDoc,
      date: dateStr,
      size: "0 KB",
    }]);
    setNewDoc({ name: "", type: "PDF", caseRef: "", status: "بانتظار التوقيع" });
    setIsAddOpen(false);
    toast({ title: "تم بنجاح", description: "تمت إضافة المستند" });
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف المستند بنجاح" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "موثق رسمياً": return "bg-emerald-100 text-emerald-800";
      case "بانتظار التوقيع": return "bg-amber-100 text-amber-800";
      case "صادرة": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">المستندات</h1>
          <p className="text-muted-foreground mt-2">إدارة وتنظيم جميع المستندات القانونية ({documents.length} مستند)</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 h-12">
            <Upload className="w-5 h-5" />
            رفع ملف
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 h-12 px-6 font-bold">
                <Plus className="w-5 h-5" />
                مستند جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-xl">إضافة مستند جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>اسم المستند</Label>
                  <Input
                    value={newDoc.name}
                    onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                    placeholder="أدخل اسم المستند..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>نوع الملف</Label>
                  <Select value={newDoc.type} onValueChange={(v) => setNewDoc({ ...newDoc, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="صورة">صورة</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                      <SelectItem value="Word">Word</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>القضية المرتبطة</Label>
                  <Select value={newDoc.caseRef} onValueChange={(v) => setNewDoc({ ...newDoc, caseRef: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القضية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023/1147 - صالح الدوسري">2023/1147 - صالح الدوسري</SelectItem>
                      <SelectItem value="2022/551 - نورة الشريم">2022/551 - نورة الشريم</SelectItem>
                      <SelectItem value="2021/493 - خالد العتيبي">2021/493 - خالد العتيبي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select value={newDoc.status} onValueChange={(v) => setNewDoc({ ...newDoc, status: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="موثق رسمياً">موثق رسمياً</SelectItem>
                      <SelectItem value="بانتظار التوقيع">بانتظار التوقيع</SelectItem>
                      <SelectItem value="صادرة">صادرة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddDoc} className="w-full h-12 text-lg font-bold">
                  حفظ المستند
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="البحث في المستندات..."
            className="pr-10 h-12 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["الكل", "PDF", "صورة", "Excel"].map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              className="h-12"
              onClick={() => setFilterType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-muted-foreground font-medium">
          <div className="col-span-4 text-right">اسم المستند</div>
          <div className="col-span-4 text-right">القضية</div>
          <div className="col-span-2 text-right">الحالة</div>
          <div className="col-span-2 text-right">الإجراءات</div>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            لا توجد مستندات مطابقة
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-all group border-border/50">
              <CardContent className="p-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      {getFileIcon(doc.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{doc.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span className="bg-muted px-1.5 py-0.5 rounded">{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <p className="text-sm text-muted-foreground truncate">{doc.caseRef || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </Badge>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
}
