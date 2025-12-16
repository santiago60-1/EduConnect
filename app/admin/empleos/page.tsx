"use client";

import AdminLayout from "@/app/components/AdminLayout";
import { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  candidates: number;
  status: string;
  icon: string;
}

export default function EmpleosPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todas");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error cargando empleos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (id: number) => {
    alert(`Editar empleo ${id}`);
  };

  const handleDelete = (id: number) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  // Filtrar empleos
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "Todas" || job.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const activeJobs = jobs.filter((j) => j.status === "Activa").length;
  const totalCandidates = jobs.reduce((sum, job) => sum + job.candidates, 0);

  return (
    <AdminLayout>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Gestión de Empleo</h2>
              <p className="text-gray-600 mt-2">Administra empresas y ofertas laborales</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/admin/empleos/nueva-empresa"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                + Nueva Empresa
              </a>
              <a
                href="/admin/empleos/nueva-oferta"
                className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                + Nueva Oferta
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Ofertas</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{jobs.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Activas</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{activeJobs}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Candidatos</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{totalCandidates}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Empresas</p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{new Set(jobs.map((j) => j.company)).size}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="🔍 Buscar empleos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900"
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="Todas">Todas las ofertas</option>
                <option value="Activa">Activas</option>
                <option value="Cerrada">Cerradas</option>
              </select>
            </div>

            {/* Jobs Grid */}
            {loading ? (
              <div className="text-center text-gray-500 py-8">Cargando empleos...</div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No se encontraron empleos</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{job.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === "Activa"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📍</span> {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>⏰</span> {job.type}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <span>💰</span> {job.salary}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Habilidades Requeridas:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-center flex-1">
                        <p className="text-xs text-gray-600">Candidatos</p>
                        <p className="text-lg font-bold text-gray-900">{job.candidates}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(job.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
    </AdminLayout>
  );
}
