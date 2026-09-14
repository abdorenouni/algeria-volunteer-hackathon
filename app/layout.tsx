import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "الهاكاثون الوطني للابتكار في العمل التطوعي | وزارة الشباب والرياضة",
  description: "المنصة الرسمية للهاكاثون الوطني للابتكار في العمل التطوعي المنظم تحت رعاية وزارة الشباب والرياضة يومي 19 و 20 سبتمبر 2026 - برنامج عمل وزارة الشباب",
  keywords: ["الهاكاثون الوطني للابتكار", "وزارة الشباب والرياضة", "العمل التطوعي الجزائر", "مؤسسات الشباب", "دار الشباب", "التطوع 2026"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-[#F8FAFC] text-slate-900 selection:bg-emerald-700 selection:text-white antialiased">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
