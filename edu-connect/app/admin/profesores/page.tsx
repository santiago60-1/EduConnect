"use client";

import AdminLayout from "@/app/components/AdminLayout";
import { useState, useEffect } from "react";

interface Professor {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
  courses: number;
  students: number;
  status: string;
  avatar: string;
}

export default function ProfesoresPage() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simular carga de datos del backend
    const fetchProfessors = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        const profs = data.users.filter((user: any) => user.role === "profesor");
        setProfessors(profs);
      } catch (error) {
        console.error("Error cargando profesores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  const handleEdit = (id: number) => {
    alert(`Editar profesor ${id}`);
  };

  const handleDelete = (id: number) => {
    setProfessors(professors.filter((p) => p.id !== id));
  };

  const filteredProfessors = professors.filter(
    (prof) =>
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeProfessors = professors.filter((p) => p.status === "Activo").length;

  return (
    <AdminLayout>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Gestión de Profesores</h2>
              <p className="text-gray-600 mt-2">Administra los profesores y sus credenciales</p>
            </div>
            <a
              href="/admin/profesores/nuevo"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Nuevo Profesor
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Profesores</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{professors.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Activos</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{activeProfessors}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Buscar profesores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900"
            />
          </div>

          {/* Professors Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Cargando profesores...</div>
            ) : filteredProfessors.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No se encontraron profesores</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cursos</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estudiantes</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProfessors.map((professor) => (
                      <tr key={professor.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${professor.avatar} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                              {professor.initials}
                            </div>
                            <span className="font-medium text-gray-900">{professor.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{professor.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{professor.courses}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{professor.students}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              professor.status === "Activo"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {professor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(professor.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(professor.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
    </AdminLayout>
  );
}
