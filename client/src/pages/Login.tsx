import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_geometric_logo_for_legal_firm_maadid_with_arabic_calligraphy_influence_in_gold_on_dark_green.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setLocation("/");
    }, 800);
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Left Panel - Form */}
      <div className="flex-1 bg-[#f5f0e8] flex flex-col justify-center px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-5xl font-bold text-[#1a3d2b] mb-12 leading-tight">
            تسجيل الدخول
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#1a3d2b] text-base font-medium sr-only">
                البريد الإلكتروني
              </Label>
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-white/70 border-[#d4c9b0] rounded-xl text-right text-base placeholder:text-[#8a7a6a] focus:border-[#1a3d2b] focus:ring-[#1a3d2b]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#1a3d2b] text-base font-medium sr-only">
                كلمة المرور
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 bg-white/70 border-[#d4c9b0] rounded-xl text-right text-base placeholder:text-[#8a7a6a] focus:border-[#1a3d2b] focus:ring-[#1a3d2b] pl-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7a6a] hover:text-[#1a3d2b]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-left">
              <button
                type="button"
                className="text-sm text-[#5a4a3a] hover:text-[#1a3d2b] transition-colors"
              >
                نسيت كلمة المرور
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#1a3d2b] hover:bg-[#143020] text-white text-xl font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري الدخول...
                </div>
              ) : (
                "دخول"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Panel - Brand */}
      <div className="w-[45%] bg-[#1a3d2b] flex flex-col items-center justify-between py-16 px-12">
        <div className="flex flex-col items-center gap-6">
          <div className="w-32 h-32 flex items-center justify-center">
            <img
              src={logoImage}
              alt="Maadid Firm Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#c9a84c] mb-2">شركة معاضد</h2>
            <p className="text-[#c9a84c]/70 text-sm tracking-widest uppercase font-mono">
              MAADID FIRM
            </p>
          </div>
        </div>

        <nav className="flex flex-col items-center gap-8 text-[#d4c9b0]/80 text-xl">
          <span className="hover:text-[#c9a84c] transition-colors cursor-pointer">المعلومات</span>
          <span className="hover:text-[#c9a84c] transition-colors cursor-pointer">الفضايا</span>
          <span className="hover:text-[#c9a84c] transition-colors cursor-pointer">الفواتر</span>
          <span className="hover:text-[#c9a84c] transition-colors cursor-pointer">إعدادات</span>
        </nav>

        <div className="text-[#d4c9b0]/40 text-xs text-center">
          <p>© 2024 شركة معاضد للمحاماة</p>
          <p>جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
