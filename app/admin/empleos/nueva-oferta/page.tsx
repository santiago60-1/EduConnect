"use client";

import AdminLayout from "@/app/components/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaOfertaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: "",
    empresa: "",
    descripcion: "",
    ubicacion: "",
    tipo: "",
    salario_min: "",
    salario_max: "",
    experiencia: "",
    habilidades: "",
    fecha_cierre: "",
    estado: "Activa",
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
    alert(`Oferta creada: ${formData.titulo}`);
    setFormData({
      titulo: "",
      empresa: "",
      descripcion: "",
      ubicacion: "",
      tipo: "",
      salario_min: "",
      salario_max: "",
      experiencia: "",
      habilidades: "",
      fecha_cierre: "",
      estado: "Activa",
    });
  };

  return (
    <AdminLayout>
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
          <h2 className="text-3xl font-bold text-gray-900">Nueva Oferta Laboral</h2>
          <p className="text-gray-600 mt-2">Registra una nueva oferta de empleo en el sistema</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Puesto *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                placeholder="Ej: Desarrollador Full Stack"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Empresa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empresa *
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
                placeholder="Ej: TechCorp"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Puesto *
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Descripción detallada del puesto..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              ></textarea>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                required
                placeholder="Ej: Madrid, España"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Tipo de Contrato */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Contrato *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              >
                <option value="">Selecciona un tipo</option>
                <option value="tiempo-completo">Tiempo Completo</option>
                <option value="tiempo-parcial">Tiempo Parcial</option>
                <option value="freelance">Freelance</option>
                <option value="practicas">Prácticas</option>
              </select>
            </div>

            {/* Salario */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salario Mínimo
                </label>
                <input
                  type="number"
                  name="salario_min"
                  value={formData.salario_min}
                  onChange={handleChange}
                  placeholder="Ej: 25000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salario Máximo
                </label>
                <input
                  type="number"
                  name="salario_max"
                  value={formData.salario_max}
                  onChange={handleChange}
                  placeholder="Ej: 40000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Experiencia Requerida */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiencia Requerida *
              </label>
              <select
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              >
                <option value="">Selecciona un nivel</option>
                <option value="junior">Junior (0-2 años)</option>
                <option value="mid">Mid (2-5 años)</option>
                <option value="senior">Senior (5+ años)</option>
              </select>
            </div>

            {/* Habilidades Requeridas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habilidades Requeridas (separadas por comas)
              </label>
              <textarea
                name="habilidades"
                value={formData.habilidades}
                onChange={handleChange}
                rows={3}
                placeholder="Ej: JavaScript, React, Node.js, MongoDB"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              ></textarea>
            </div>

            {/* Fecha de Cierre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Cierre de Solicitudes
              </label>
              <input
                type="date"
                name="fecha_cierre"
                value={formData.fecha_cierre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
              >
                <option value="Activa">Activa</option>
                <option value="Pausada">Pausada</option>
                <option value="Cerrada">Cerrada</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer"
              >
                Crear Oferta
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
    </AdminLayout>
  );
}
