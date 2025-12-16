"use client";

import TeacherLayout from "@/app/components/TeacherLayout";
import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoCursoPage() {
  const router = useRouter();
  const { user, loading, authorized } = useAuth('profesor');
  const [formData, setFormData] = useState({
    titulo: "",
    codigo: "",
    descripcion: "",
    categoria: "",
    nivel: "",
    duracion: "",
    estudiantes_max: "",
    fecha_inicio: "",
    competencias: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Curso creado: ${formData.titulo}`);
    setFormData({
      titulo: "",
      codigo: "",
      descripcion: "",
      categoria: "",
      nivel: "",
      duracion: "",
      estudiantes_max: "",
      fecha_inicio: "",
      competencias: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">No tienes permiso para acceder a esta página</p>
      </div>
    );
  }

  return (
    <TeacherLayout userName={user?.name || "Profesor"} userInitials={user?.initials || "PR"}>
      <div className="max-w-2xl mx-auto">
        {/* Botón Volver Atrás */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
        >
          <span className="text-xl">←</span>
          Volver atrás
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Crear Nuevo Curso</h2>
          <p className="text-gray-600 mt-2">Registra un nuevo curso para tus estudiantes</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Curso *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                placeholder="Ej: Programación Web Avanzada"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Código */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código del Curso *
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
                placeholder="Ej: PWA-2025-A1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Descripción detallada del curso..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              ></textarea>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">Selecciona una categoría</option>
                <option value="programacion">Programación</option>
                <option value="bases-datos">Bases de Datos</option>
                <option value="web">Desarrollo Web</option>
                <option value="movil">Desarrollo Móvil</option>
                <option value="devops">DevOps</option>
              </select>
            </div>

            {/* Nivel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel *
              </label>
              <select
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">Selecciona un nivel</option>
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>

            {/* Duración */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (semanas)
              </label>
              <input
                type="number"
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                min="1"
                placeholder="Ej: 12"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Estudiantes Máximo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Máximo de Estudiantes
              </label>
              <input
                type="number"
                name="estudiantes_max"
                value={formData.estudiantes_max}
                onChange={handleChange}
                min="1"
                placeholder="Ej: 30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Fecha de Inicio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Inicio
              </label>
              <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            {/* Competencias */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Competencias (separadas por comas)
              </label>
              <textarea
                name="competencias"
                value={formData.competencias}
                onChange={handleChange}
                rows={3}
                placeholder="Ej: JavaScript, React, Node.js"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              ></textarea>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
              >
                Crear Curso
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-medium cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
}
