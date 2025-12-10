"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  icon: string;
}

export default function PerfilHabilidadesPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        // Obtener usuario del localStorage
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const userData = JSON.parse(userStr);
          setUser(userData);

          // Cargar habilidades del usuario
          const response = await fetch("/users.json");
          const data = await response.json();
          const currentUser = data.users.find((u: any) => u.id === userData.id);
          if (currentUser && currentUser.skills) {
            setSkills(currentUser.skills);
          }
        }
      } catch (error) {
        console.error("Error cargando habilidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSkills();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleUpdateSkill = (skillId: number) => {
    alert(`Actualizar habilidad ${skillId}`);
  };

  const handleAddSkill = () => {
    alert("Agregar nueva habilidad");
  };

  // Agrupar habilidades por categoría
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory);
  const advancedSkills = skills.filter((s) => s.level === "Avanzado").length;

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-yellow-100 text-yellow-800";
      case "Intermedio":
        return "bg-blue-100 text-blue-800";
      case "Avanzado":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">EC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">EduConnect - Panel de Estudiante</h1>
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
          <h2 className="text-lg font-bold text-gray-900 mb-6">Panel de Estudiante</h2>
          <nav className="space-y-4">
            <a
              href="/estudiante/mis-cursos"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span>📚</span> Mis Cursos
            </a>
            <a
              href="/estudiante/perfil-habilidades"
              className="flex items-center gap-3 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium"
            >
              <span>⭐</span> Perfil de Habilidades
            </a>
            <a href="/estudiante/ofertas-laborales" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span>💼</span> Ofertas Laborales
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Perfil de Habilidades</h2>
              <p className="text-gray-600 mt-2">Gestiona las habilidades para mejorar tu empleabilidad</p>
            </div>
            <button
              onClick={handleAddSkill}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Añadir Habilidad
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-2">💡 Importancia del Perfil de Habilidades</h3>
            <p className="text-blue-800">
              Un perfil completo te ayuda a obtener mejores coincidencias con ofertas laborales. El sistema compara tus habilidades con los requisitos de las empresas para mostrarte las oportunidades más relevantes.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Habilidades</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{skills.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Categorías</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{categories.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Nivel Avanzado</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{advancedSkills}</p>
            </div>
          </div>

          {/* Skills by Category */}
          {loading ? (
            <div className="text-center text-gray-500 py-8">Cargando habilidades...</div>
          ) : skills.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 mb-4">No tienes habilidades registradas aún</p>
              <button
                onClick={handleAddSkill}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Añadir tu Primera Habilidad
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{category}</h3>
                  <div className="space-y-4">
                    {skillsByCategory[category].map((skill) => (
                      <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{skill.icon}</div>
                            <div>
                              <h4 className="font-bold text-gray-900">{skill.name}</h4>
                              <p className="text-sm text-gray-600">{category}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleUpdateSkill(skill.id)}
                            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors font-semibold text-sm"
                          >
                            Actualizar
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                skill.level === "Principiante"
                                  ? "bg-yellow-500 w-1/3"
                                  : skill.level === "Intermedio"
                                  ? "bg-blue-500 w-2/3"
                                  : "bg-green-500 w-full"
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
