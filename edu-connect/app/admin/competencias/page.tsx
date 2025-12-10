"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Competency {
  id: number;
  name: string;
  category: string;
  description: string;
  usage: number;
  icon: string;
}

export default function CompetenciasPage() {
  const router = useRouter();
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        setCompetencies(data.competencies);
      } catch (error) {
        console.error("Error cargando competencias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetencies();
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  const handleEdit = (id: number) => {
    alert(`Editar competencia ${id}`);
  };

  const handleDelete = (id: number) => {
    setCompetencies(competencies.filter((c) => c.id !== id));
  };

  // Obtener categorías únicas
  const categories = ["Todas", ...new Set(competencies.map((c) => c.category))];

  // Filtrar competencias
  const filteredCompetencies = competencies.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || comp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Competencias más usadas
  const mostUsed = competencies.sort((a, b) => b.usage - a.usage).slice(0, 3);

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
            <a
              href="/admin"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span>📊</span> Analítica
            </a>
            <a
              href="/admin/profesores"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span>👥</span> Profesores
            </a>
            <a
              href="/admin/competencias"
              className="flex items-center gap-3 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium"
            >
              <span>📚</span> Competencias
            </a>
            <a href="/admin/empleos" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span>👨‍💼</span> Empleos
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Gestión de Competencias</h2>
              <p className="text-gray-600 mt-2">Administra las competencias disponibles en el sistema</p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              + Nueva Competencia
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Competencias</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{competencies.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Categorías</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{categories.length - 1}</p>
            </div>
          </div>

          {/* Most Used Competencies */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <h3 className="col-span-full text-lg font-bold text-gray-900">Más Usadas</h3>
            {mostUsed.map((comp) => (
              <div key={comp.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{comp.icon}</div>
                  <span className="text-2xl font-bold text-blue-600">{comp.usage}</span>
                </div>
                <h4 className="font-bold text-gray-900">{comp.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{comp.category}</p>
                <p className="text-xs text-gray-500 mt-2">{comp.description}</p>
              </div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="🔍 Buscar competencias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Competencies Grid */}
            {loading ? (
              <div className="text-center text-gray-500 py-8">Cargando competencias...</div>
            ) : filteredCompetencies.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No se encontraron competencias</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCompetencies.map((competency) => (
                  <div key={competency.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{competency.icon}</span>
                          <h4 className="font-bold text-gray-900">{competency.name}</h4>
                        </div>
                        <p className="text-xs font-medium text-blue-600">{competency.category}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(competency.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(competency.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{competency.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Uso en perfiles</span>
                      <span className="font-bold text-gray-900">{competency.usage}</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${competency.usage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
