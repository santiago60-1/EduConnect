"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface TeacherLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userInitials?: string;
}

export default function TeacherLayout({ children, userName = "Profesor", userInitials = "PR" }: TeacherLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cerrar sidebar cuando cambia la ruta
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: "/profesor/mis-cursos", label: "Mis Cursos", icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white"
              title="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm md:text-base">EC</span>
            </div>
            <h1 className="text-sm md:text-xl font-bold text-gray-900 hidden sm:block">EduConnect</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xs md:text-sm">{userInitials}</span>
              </div>
              <span className="text-sm text-gray-700 hidden md:block">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Fixed Sidebar */}
      <aside
        className={`fixed left-0 top-16 md:top-20 bottom-0 w-64 bg-white shadow-md p-4 md:p-6 z-30 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto`}
      >
        <h2 className="text-base md:text-lg font-bold text-gray-900 mb-6">Menú</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg md:text-xl">{item.icon}</span>
              <span className="text-sm md:text-base">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-20 top-16"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="pt-16 md:pt-20 md:ml-64 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
