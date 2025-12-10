"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">EC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">EduConnect - Panel de Administración</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Panel de Administración</h2>
          <nav className="space-y-4">
            <a href="/admin" className="flex items-center gap-3 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium">
              <span>📊</span> Analítica
            </a>
            <a href="/admin/profesores" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span>👥</span> Profesores
            </a>
            <a href="/admin/competencias" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span>📚</span> Competencias
            </a>
            <a href="/admin/empleos" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span>👨‍💼</span> Empleos
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analítica del Sistema</h2>
          <p className="text-gray-600 mb-8">Visualiza métricas clave y KPIs de la plataforma</p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Estudiantes</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">1,284</p>
              <p className="text-green-600 text-sm mt-2">↑ +12.5% este mes</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Cursos Activos</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">47</p>
              <p className="text-green-600 text-sm mt-2">↑ +8.3% este mes</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Competencias</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">156</p>
              <p className="text-gray-600 text-sm mt-2">En 12 categorías</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Ofertas Laborales</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">38</p>
              <p className="text-green-600 text-sm mt-2">↑ +15 esta semana</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Chart 1: Estudiantes por Curso */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Estudiantes por Curso</h3>
              <div className="flex items-end justify-around h-64">
                {[
                  { name: "Programación Web", value: 45 },
                  { name: "Base de Datos", value: 38 },
                  { name: "Redes", value: 32 },
                  { name: "IA", value: 28 },
                  { name: "Móvil", value: 25 },
                ].map((course, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 bg-blue-600 rounded-t"
                      style={{ height: `${(course.value / 45) * 200}px` }}
                    ></div>
                    <p className="text-xs text-gray-600 text-center max-w-16">{course.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Habilidades Más Frecuentes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Habilidades Más Frecuentes</h3>
              <div className="flex justify-center items-center h-64">
                <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
                  {/* Pie Chart */}
                  <circle cx="100" cy="100" r="80" fill="#3B82F6" opacity="0.8" />
                  <circle cx="100" cy="100" r="60" fill="white" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="50 251" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#EF4444" strokeWidth="20" strokeDasharray="45 251" strokeDashoffset="-50" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#8B5CF6" strokeWidth="20" strokeDasharray="40 251" strokeDashoffset="-95" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#EC4899" strokeWidth="20" strokeDasharray="35 251" strokeDashoffset="-135" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#10B981" strokeWidth="20" strokeDasharray="30 251" strokeDashoffset="-170" />
                </svg>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span>JavaScript: 85</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Python: 72</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>React: 68</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span>SQL: 61</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Git: 55</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cursos Creados por Período */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Cursos Creados por Período</h3>
            <div className="flex items-end justify-around h-64">
              {[
                { period: "Ene-Mar", value: 12 },
                { period: "Abr-Jun", value: 15 },
                { period: "Jul-Sep", value: 18 },
                { period: "Oct-Dic", value: 13 },
              ].map((period, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 bg-green-500 rounded-t"
                    style={{ height: `${(period.value / 18) * 200}px` }}
                  ></div>
                  <p className="text-sm text-gray-600">{period.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coincidencia Habilidades-Ofertas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Coincidencia Habilidades-Ofertas</h3>
            <div className="space-y-4">
              {[
                { skill: "90-100%", percentage: 95 },
                { skill: "70-89%", percentage: 85 },
                { skill: "50-69%", percentage: 65 },
                { skill: "30-49%", percentage: 45 },
                { skill: "0-29%", percentage: 25 },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-20 text-sm font-medium text-gray-700">{item.skill}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{item.percentage}%</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-6">
              El 47% de los estudiantes tienen más de 70% de coincidencia con al menos una oferta laboral.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
