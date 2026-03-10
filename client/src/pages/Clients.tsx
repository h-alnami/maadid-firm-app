import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Users, Search, Plus, Phone, Mail, MapPin, Briefcase, Edit, Trash2, User } from "lucide-react";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  casesCount: number;
  status: string;
  type: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "صالح الدوسري", phone: "0501234567", email: "saleh@example.com", city: "الرياض", casesCount: 2, status: "نشط", type: "فرد" },
    { id: 2, name: "نورة الشريم", phone: "0559876543", email: "noura@example.com", city: "جدة", casesCount: 1, status: "نشط", type: "فرد" },
    { id: 3, name: "خالد العتيبي", phone: "0531122334", email: "khalid@example.com", city: "الرياض", casesCount: 3, status: "نشط", type: "فرد" },
    { id: 4, name: "فاطمة الحربي", phone: "0545566778", email: "fatima@example.com", city: "الدمام", casesCount: 1, status: "نشط", type: "فرد" },
    { id: 5, name: "شركة الأفق للتجارة", phone: "0112345678", email: "info@ufq.com", city: "الرياض", casesCount: 4, status: "نشط", type: "شركة" },
    { id: 6, name: "أحمد آل سعود", phone: "0567890123", email: "ahmed@example.com", city: "مكة", casesCount: 1, status: "غير نشط", type: "فرد" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
    city: "الرياض",
    type: "فرد",
    status: "نشط",
  });

  const filteredClients = clients.filter(c =>
    c.name.includes(searchTerm) || c.phone.includes(searchTerm) || c.city.includes(searchTerm)
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone) {
      toast({ title: "خطأ", description: "يرجى إدخال الاسم ورقم الهاتف", variant: "destructive" });
      return;
    }
    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    setClients([...clients, { id: newId, ...newClient, casesCount: 0 }]);
    setNewClient({ name: "", phone: "", email: "", city: "الرياض", type: "فرد", status: "نشط" });
    setIsAddOpen(false);
    toast({ title: "تم بنجاح", description: "تمت إضافة العميل الجديد" });
  };

  const handleEditClient = () => {
    if (!editingClient) return;
    setClients(clients.map(c => c.id === editingClient.id ? editingClient : c));
    setIsEditOpen(false);
    setEditingClient(null);
    toast({ title: "تم بنجاح", description: "تم تحديث بيانات العميل" });
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(c => c.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف العميل بنجاح" });
  };

  const openEditDialog = (c: Client) => {
    setEditingClient({ ...c });
    setIsEditOpen(true);
  };

  const activeClients = clients.filter(c => c.status === "نشط").length;
  const totalCases = clients.reduce((sum, c) => sum + c.casesCount, 0);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">العملاء</h1>
          <p className="text-muted-foreground mt-2">إدارة قاعدة بيانات العملاء والموكلين ({clients.length} عميل)</p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 h-12 px-6 text-lg font-bold">
              <Plus className="w-5 h-5" />
              عميل جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl">إضافة عميل جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>الاسم الكامل</Label>
                <Input
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="أدخل اسم العميل..."
                />
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Select value={newClient.city} onValueChange={(v) => setNewClient({ ...newClient, city: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الرياض">الرياض</SelectItem>
                      <SelectItem value="جدة">جدة</SelectItem>
                      <SelectItem value="الدمام">الدمام</SelectItem>
                      <SelectItem value="مكة">مكة المكرمة</SelectItem>
                      <SelectItem value="المدينة">المدينة المنورة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>النوع</Label>
                  <Select value={newClient.type} onValueChange={(v) => setNewClient({ ...newClient, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="فرد">فرد</SelectItem>
                      <SelectItem value="شركة">شركة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddClient} className="w-full h-12 text-lg font-bold">
                حفظ العميل
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "إجمالي العملاء", value: clients.length, icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "العملاء النشطون", value: activeClients, icon: User, color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "إجمالي القضايا", value: totalCases, icon: Briefcase, color: "text-amber-600", bg: "bg-amber-100" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="بحث عن عميل..."
          className="pr-10 h-12 bg-card"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            لا يوجد عملاء مطابقون للبحث
          </div>
        ) : (
          filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-all group border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{client.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{client.type}</Badge>
                        <Badge className={`text-xs ${client.status === "نشط" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                          {client.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => openEditDialog(client)}>
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive hover:text-destructive" onClick={() => handleDeleteClient(client.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary/60" />
                    <span dir="ltr">{client.phone}</span>
                  </div>
                  {client.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary/60" />
                      <span dir="ltr" className="truncate">{client.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary/60" />
                    <span>{client.city}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">عدد القضايا</span>
                  <Badge variant="secondary" className="font-bold">{client.casesCount} قضية</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl">تعديل بيانات العميل</DialogTitle>
          </DialogHeader>
          {editingClient && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>الاسم الكامل</Label>
                <Input
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                  dir="ltr"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Select value={editingClient.city} onValueChange={(v) => setEditingClient({ ...editingClient, city: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الرياض">الرياض</SelectItem>
                      <SelectItem value="جدة">جدة</SelectItem>
                      <SelectItem value="الدمام">الدمام</SelectItem>
                      <SelectItem value="مكة">مكة المكرمة</SelectItem>
                      <SelectItem value="المدينة">المدينة المنورة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select value={editingClient.status} onValueChange={(v) => setEditingClient({ ...editingClient, status: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نشط">نشط</SelectItem>
                      <SelectItem value="غير نشط">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleEditClient} className="w-full h-12 text-lg font-bold">
                حفظ التعديلات
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
