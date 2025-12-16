"use client";

import AdminLayout from "@/app/components/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaEmpresaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    sitio_web: "",
    ubicacion: "",
    sector: "",
    tamaño: "",
    descripcion: "",
    logo_url: "",
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
    alert(`Empresa creada: ${formData.nombre}`);
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      sitio_web: "",
      ubicacion: "",
      sector: "",
      tamaño: "",
      descripcion: "",
      logo_url: "",
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
          <h2 className="text-3xl font-bold text-gray-900">Nueva Empresa</h2>
          <p className="text-gray-600 mt-2">Registra una nueva empresa en el sistema</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Empresa *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: TechCorp"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de Contacto *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Ej: contacto@techcorp.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: +34 912 345 678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Sitio Web */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sitio Web
              </label>
              <input
                type="url"
                name="sitio_web"
                value={formData.sitio_web}
                onChange={handleChange}
                placeholder="Ej: https://www.techcorp.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Sector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sector *
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              >
                <option value="">Selecciona un sector</option>
                <option value="tecnologia">Tecnología</option>
                <option value="finanzas">Finanzas</option>
                <option value="salud">Salud</option>
                <option value="educacion">Educación</option>
                <option value="retail">Retail</option>
                <option value="manufactura">Manufactura</option>
              </select>
            </div>

            {/* Tamaño */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamaño de la Empresa *
              </label>
              <select
                name="tamaño"
                value={formData.tamaño}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              >
                <option value="">Selecciona un tamaño</option>
                <option value="startup">Startup (1-50)</option>
                <option value="pequeña">Pequeña (51-200)</option>
                <option value="mediana">Mediana (201-1000)</option>
                <option value="grande">Grande (1000+)</option>
              </select>
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
                placeholder="Descripción de la empresa..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              ></textarea>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
              >
                Crear Empresa
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
