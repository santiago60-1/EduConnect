"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  enrollDate: string;
  progress: number;
  initials: string;
}

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
  enrolledStudents: Student[];
}

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        const foundCourse = data.courses.find((c: Course) => c.id === parseInt(courseId as string));
        setCourse(foundCourse);
      } catch (error) {
        console.error("Error cargando curso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleLogout = () => {
    router.push("/login");
  };

  const handleViewProfile = (studentId: number) => {
    alert(`Ver perfil del estudiante ${studentId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Curso no encontrado</p>
      </div>
    );
  }

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
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push("/profesor/mis-cursos")}
              className="text-blue-600 hover:text-blue-700 font-semibold mb-4 flex items-center gap-2"
            >
              ← Volver a Mis Cursos
            </button>

            <div className="bg-white rounded-lg shadow p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{course.icon}</div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                      <p className="text-gray-600 mt-2">{course.description}</p>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    course.status === "Activo"
                      ? "bg-green-100 text-green-800"
                      : course.status === "Borrador"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Código de Inscripción</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{course.code}</p>
                  <p className="text-xs text-gray-500 mt-2">Comparte este código con tus estudiantes para que se unan al curso</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Fecha de Inicio</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">📅 {course.startDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Estudiantes Inscritos</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">👥 {course.enrolledStudents.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Competencies */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Competencias del Curso</h2>
            <div className="flex flex-wrap gap-3">
              {course.competencies.map((comp, idx) => (
                <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Enrolled Students */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Estudiantes Inscritos</h2>

            {course.enrolledStudents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay estudiantes inscritos aún</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estudiante</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fecha Inscripción</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Progreso</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {course.enrolledStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {student.initials}
                            </div>
                            <span className="font-medium text-gray-900">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{student.enrollDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                              <div
                                className="bg-green-600 h-2 rounded-full transition-all"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewProfile(student.id)}
                            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                          >
                            Ver Perfil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
