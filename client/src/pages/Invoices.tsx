import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, Receipt, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Invoice {
  id: number;
  caseRef: string;
  description: string;
  amount: string;
  date: string;
  status: string;
}

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, caseRef: "2023/1147 - صالح الدوسري", description: "أتعاب المرافعة الأولى", amount: "5000", date: "2024-01-15", status: "مدفوعة" },
    { id: 2, caseRef: "2022/551 - نورة الشريم", description: "رسوم الاستئناف", amount: "3500", date: "2024-02-20", status: "معلقة" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    caseRef: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "معلقة"
  });

  const handleAddInvoice = () => {
    if (!newInvoice.caseRef || !newInvoice.amount) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    const newId = invoices.length > 0 ? Math.max(...invoices.map(i => i.id)) + 1 : 1;
    setInvoices([...invoices, { id: newId, ...newInvoice }]);
    setNewInvoice({ caseRef: "", description: "", amount: "", date: new Date().toISOString().split('T')[0], status: "معلقة" });
    setIsAddOpen(false);
    toast({ title: "تم بنجاح", description: "تمت إضافة الفاتورة الجديدة" });
  };

  const handleDeleteInvoice = (id: number) => {
    setInvoices(invoices.filter(i => i.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف الفاتورة بنجاح" });
  };

  const toggleStatus = (id: number) => {
    setInvoices(invoices.map(i => 
      i.id === id ? { ...i, status: i.status === "مدفوعة" ? "معلقة" : "مدفوعة" } : i
    ));
    toast({ title: "تم التحديث", description: "تم تحديث حالة الفاتورة" });
  };

  const totalAmount = invoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
  const paidAmount = invoices.filter(i => i.status === "مدفوعة").reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">الفواتير</h1>
          <p className="text-muted-foreground mt-2">إدارة الفواتير والمستحقات المالية</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 h-12 px-6 text-lg font-bold" data-testid="button-add-invoice">
              <Plus className="w-5 h-5" />
              فاتورة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl">إضافة فاتورة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>القضية</Label>
                <Select value={newInvoice.caseRef} onValueChange={(v) => setNewInvoice({...newInvoice, caseRef: v})}>
                  <SelectTrigger className="h-12" data-testid="select-invoice-case">
                    <SelectValue placeholder="اختر القضية المرتبطة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023/1147 - صالح الدوسري">قضية 2023/1147 - صالح الدوسري</SelectItem>
                    <SelectItem value="2022/551 - نورة الشريم">قضية 2022/551 - نورة الشريم</SelectItem>
                    <SelectItem value="2021/493 - خالد العتيبي">قضية 2021/493 - خالد العتيبي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>الوصف</Label>
                <Textarea 
                  placeholder="وصف تفصيلي للخدمة المقدمة..." 
                  className="min-h-[80px] resize-none"
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                  data-testid="input-invoice-description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>المبلغ (ر.س)</Label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="h-12"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                    data-testid="input-invoice-amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ الإصدار</Label>
                  <Input 
                    type="date" 
                    className="h-12"
                    value={newInvoice.date}
                    onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                    data-testid="input-invoice-date"
                  />
                </div>
              </div>

              <Button onClick={handleAddInvoice} size="lg" className="w-full h-12 text-lg font-bold gap-2" data-testid="button-save-invoice">
                <Save className="w-5 h-5" />
                حفظ الفاتورة
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Receipt className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">إجمالي الفواتير</p>
              <p className="text-2xl font-bold">{totalAmount.toLocaleString()} ر.س</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المدفوع</p>
              <p className="text-2xl font-bold text-emerald-600">{paidAmount.toLocaleString()} ر.س</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Receipt className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المعلق</p>
              <p className="text-2xl font-bold text-amber-600">{(totalAmount - paidAmount).toLocaleString()} ر.س</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">قائمة الفواتير</h2>
        {invoices.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            لا توجد فواتير حالياً
          </div>
        ) : (
          <div className="grid gap-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-md transition-all group" data-testid={`card-invoice-${invoice.id}`}>
                <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Receipt className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{invoice.caseRef}</h3>
                      <p className="text-sm text-muted-foreground">{invoice.description || "بدون وصف"}</p>
                      <p className="text-xs text-muted-foreground mt-1">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <p className="text-xl font-bold">{parseFloat(invoice.amount).toLocaleString()} ر.س</p>
                      <Badge 
                        className={`cursor-pointer ${invoice.status === "مدفوعة" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}`}
                        onClick={() => toggleStatus(invoice.id)}
                        data-testid={`badge-status-${invoice.id}`}
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteInvoice(invoice.id)} data-testid={`button-delete-invoice-${invoice.id}`}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
