"use client";

import AdminLayout from "@/app/components/AdminLayout";
import { useState } from "react";

export default function NuevaCompetenciaPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    nivel: "",
    demanda: "",
    icono: "📚",
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
    alert(`Competencia creada: ${formData.nombre}`);
    setFormData({
      nombre: "",
      categoria: "",
      descripcion: "",
      nivel: "",
      demanda: "",
      icono: "📚",
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Nueva Competencia</h2>
          <p className="text-gray-600 mt-2">Registra una nueva competencia en el sistema</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Competencia *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: JavaScript"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              >
                <option value="">Selecciona una categoría</option>
                <option value="programacion">Programación</option>
                <option value="soft-skills">Soft Skills</option>
                <option value="herramientas">Herramientas</option>
                <option value="bases-datos">Bases de Datos</option>
                <option value="frameworks">Frameworks</option>
                <option value="devops">DevOps</option>
              </select>
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
                placeholder="Descripción detallada de la competencia..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              ></textarea>
            </div>

            {/* Nivel de Dificultad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de Dificultad *
              </label>
              <select
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              >
                <option value="">Selecciona un nivel</option>
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
                <option value="experto">Experto</option>
              </select>
            </div>

            {/* Demanda en el Mercado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Demanda en el Mercado (%)
              </label>
              <input
                type="number"
                name="demanda"
                value={formData.demanda}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="Ej: 85"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Icono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icono (Emoji)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="icono"
                  value={formData.icono}
                  onChange={handleChange}
                  maxLength="2"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="px-4 py-2 bg-gray-100 rounded-lg text-2xl flex items-center">
                  {formData.icono}
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Crear Competencia
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
