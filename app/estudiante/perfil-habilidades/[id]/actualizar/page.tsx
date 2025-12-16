"use client";

import StudentLayout from "@/app/components/StudentLayout";
import { useState, use } from "react";
import { useRouter } from "next/navigation";

export default function ActualizarHabilidadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "JavaScript",
    nivel: "Intermedio",
    descripcion: "Tengo experiencia con JavaScript vanilla y frameworks como React",
    certificacion: "Certificado de Udemy",
    fecha_adquisicion: "2024-06-15",
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
    alert(`Habilidad actualizada: ${formData.nombre}`);
  };

  return (
    <StudentLayout userName="Estudiante" userInitials="ES">
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
          <h2 className="text-3xl font-bold text-gray-900">Actualizar Habilidad</h2>
          <p className="text-gray-600 mt-2">Modifica los detalles de tu habilidad</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Habilidad
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">No puedes cambiar el nombre de la habilidad</p>
            </div>

            {/* Nivel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de Dominio *
              </label>
              <select
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Experto">Experto</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Selecciona el nivel que mejor describe tu dominio actual
              </p>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                placeholder="Describe tu experiencia con esta habilidad..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              ></textarea>
            </div>

            {/* Certificación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificación
              </label>
              <input
                type="text"
                name="certificacion"
                value={formData.certificacion}
                onChange={handleChange}
                placeholder="Ej: Certificado de Coursera"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Fecha de Adquisición */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Adquisición
              </label>
              <input
                type="date"
                name="fecha_adquisicion"
                value={formData.fecha_adquisicion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            {/* Info Visual */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Nivel Actual: {formData.nivel}</h3>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      formData.nivel === "Principiante"
                        ? "25"
                        : formData.nivel === "Intermedio"
                        ? "50"
                        : formData.nivel === "Avanzado"
                        ? "75"
                        : "100"
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
              >
                Guardar Cambios
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
    </StudentLayout>
  );
}
