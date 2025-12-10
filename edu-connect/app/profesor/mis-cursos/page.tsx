"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  code: string;
  startDate: string;
  students: number;
  status: string;
  competencies: string[];
  icon: string;
}

export default function MisCursosPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error cargando cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  const handleViewDetails = (courseId: number) => {
    router.push(`/profesor/mis-cursos/${courseId}`);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const activeCourses = courses.filter((c) => c.status === "Activo").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">EC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">EduConnect - Panel de Profesor</h1>
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
          <h2 className="text-lg font-bold text-gray-900 mb-6">Panel de Profesor</h2>
          <nav className="space-y-4">
            <a
              href="/profesor/mis-cursos"
              className="flex items-center gap-3 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium"
            >
              <span>📚</span> Mis Cursos
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Mis Cursos</h2>
              <p className="text-gray-600 mt-2">Gestiona tus cursos y estudiantes</p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              + Crear Curso
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Cursos</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{courses.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Estudiantes</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{totalStudents}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="text-center text-gray-500 py-8">Cargando cursos...</div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No se encontraron cursos</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{course.icon}</div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === "Activo"
                            ? "bg-green-200 text-green-800"
                            : course.status === "Borrador"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-sm opacity-90">{course.description}</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📋</span> Código: <span className="font-semibold text-gray-900">{course.code}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📅</span> {course.startDate}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>👥</span> {course.students} estudiantes
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Competencias:</p>
                      <div className="flex flex-wrap gap-2">
                        {course.competencies.map((comp, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(course.id)}
                      className="w-full py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded transition-colors"
                    >
                      Ver detalles →
                    </button>
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
