import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Save, Building2 } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_geometric_logo_for_legal_firm_maadid_with_arabic_calligraphy_influence_in_gold_on_dark_green.png";

export default function Settings() {
  const [firmName, setFirmName] = useState("شركة معاضد للمحاماة");
  const [firmNameEn, setFirmNameEn] = useState("Maadid Law Firm");
  const [phone, setPhone] = useState("0112345678");
  const [email, setEmail] = useState("info@maadid.com");
  const [address, setAddress] = useState("الرياض، المملكة العربية السعودية");
  const [notifications, setNotifications] = useState({
    sessions: true,
    invoices: true,
    cases: false,
    email: true,
  });

  const handleSave = () => {
    toast({ title: "تم الحفظ", description: "تم حفظ الإعدادات بنجاح" });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">الإعدادات</h1>
          <p className="text-muted-foreground mt-2">إدارة إعدادات الشركة والحساب</p>
        </div>
        <Button onClick={handleSave} className="gap-2 h-12 px-6 text-lg font-bold">
          <Save className="w-5 h-5" />
          حفظ التغييرات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Firm Info */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-primary" />
                معلومات الشركة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم الشركة (عربي)</Label>
                  <Input
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>اسم الشركة (إنجليزي)</Label>
                  <Input
                    value={firmNameEn}
                    onChange={(e) => setFirmNameEn(e.target.value)}
                    className="h-11"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>رقم الهاتف</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                معلومات الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الاسم الكامل</Label>
                  <Input defaultValue="راكان المحامي" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label>المسمى الوظيفي</Label>
                  <Input defaultValue="محامٍ أول" className="h-11" />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>كلمة المرور الحالية</Label>
                <Input type="password" placeholder="••••••••" className="h-11" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>كلمة المرور الجديدة</Label>
                  <Input type="password" placeholder="••••••••" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label>تأكيد كلمة المرور</Label>
                  <Input type="password" placeholder="••••••••" className="h-11" />
                </div>
              </div>
              <Button variant="outline" className="h-11">
                <Shield className="w-4 h-4 ml-2" />
                تغيير كلمة المرور
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-primary" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "sessions", label: "تذكير بالجلسات القادمة", desc: "إشعار قبل 24 ساعة من موعد الجلسة" },
                { key: "invoices", label: "تنبيهات الفواتير المستحقة", desc: "إشعار عند اقتراب موعد سداد الفاتورة" },
                { key: "cases", label: "تحديثات القضايا", desc: "إشعار عند تغيير حالة أي قضية" },
                { key: "email", label: "إشعارات البريد الإلكتروني", desc: "إرسال نسخة من الإشعارات للبريد" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Logo Preview */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="w-5 h-5 text-primary" />
                هوية الشركة
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-[#1a3d2b] flex items-center justify-center overflow-hidden border-4 border-[#c9a84c]/30 shadow-lg">
                <img src={logoImage} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl text-[#1a3d2b]">{firmName}</h3>
                <p className="text-sm text-muted-foreground font-mono">{firmNameEn}</p>
              </div>
              <Button variant="outline" className="w-full h-11">
                تغيير الشعار
              </Button>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-primary" />
                معلومات التطبيق
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "الإصدار", value: "1.0.0" },
                { label: "آخر تحديث", value: "مارس 2024" },
                { label: "اللغة", value: "العربية" },
                { label: "المنطقة الزمنية", value: "توقيت الرياض" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/20 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-destructive">منطقة الخطر</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                هذه الإجراءات لا يمكن التراجع عنها. يرجى التأكد قبل المتابعة.
              </p>
              <Button variant="destructive" className="w-full h-11" onClick={() => toast({ title: "تحذير", description: "هذه الميزة غير متاحة حالياً", variant: "destructive" })}>
                حذف جميع البيانات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
