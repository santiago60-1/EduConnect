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
  professor: string;
  enrolledStudents: any[];
}

export default function MisCursosEstudiantePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollCode, setEnrollCode] = useState("");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        setCourses(data.courses);
        // Simular que el estudiante está inscrito en los primeros 2 cursos
        setEnrolledCourses([1, 2]);
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

  const handleEnroll = () => {
    if (enrollCode.trim()) {
      alert(`Inscrito con código: ${enrollCode}`);
      setEnrollCode("");
      setShowEnrollModal(false);
    }
  };

  const handleViewCourse = (courseId: number) => {
    router.push(`/estudiante/mis-cursos/${courseId}`);
  };

  const myEnrolledCourses = courses.filter((c) => enrolledCourses.includes(c.id));

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
              className="flex items-center gap-3 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium"
            >
              <span>📚</span> Mis Cursos
            </a>
            <a href="/estudiante/perfil-habilidades" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
              <h2 className="text-3xl font-bold text-gray-900">Mis Cursos</h2>
              <p className="text-gray-600 mt-2">Gestiona tus cursos y progreso</p>
            </div>
            <button
              onClick={() => setShowEnrollModal(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              + Unirse a Curso
            </button>
          </div>

          {/* Enroll Modal */}
          {showEnrollModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Tienes un código de curso?</h3>
                <p className="text-gray-600 mb-6">Ingresa el código proporcionado por tu profesor para unirte a un curso</p>
                <input
                  type="text"
                  placeholder="Ingresa el código aquí"
                  value={enrollCode}
                  onChange={(e) => setEnrollCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleEnroll}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Inscribir
                  </button>
                  <button
                    onClick={() => setShowEnrollModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Enrolled Courses */}
          {loading ? (
            <div className="text-center text-gray-500 py-8">Cargando cursos...</div>
          ) : myEnrolledCourses.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="mb-4">No estás inscrito en ningún curso aún</p>
              <button
                onClick={() => setShowEnrollModal(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Unirse a un Curso
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myEnrolledCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{course.icon}</div>
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        ✓ Inscrito
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-sm opacity-90">Código: {course.code}</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>👨‍🏫</span> Profesor: <span className="font-semibold text-gray-900">{course.professor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📅</span> {course.startDate}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-semibold text-gray-700">Progreso</p>
                        <p className="text-sm font-bold text-gray-900">75%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-600 h-3 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>

                    {/* Competencies */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Competencias del Curso:</p>
                      <div className="flex flex-wrap gap-2">
                        {course.competencies.map((comp, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewCourse(course.id)}
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
