"use client";

import StudentLayout from "@/app/components/StudentLayout";
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

interface StudentSkill {
  name: string;
  level: string;
}

export default function OfertasLaboralesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentSkills, setStudentSkills] = useState<StudentSkill[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener usuario del localStorage
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const userData = JSON.parse(userStr);
          setUser(userData);

          // Cargar datos
          const response = await fetch("/users.json");
          const data = await response.json();

          // Obtener empleos activos
          const activeJobs = data.jobs.filter((j: Job) => j.status === "Activa");
          setJobs(activeJobs);

          // Obtener habilidades del estudiante
          const currentUser = data.users.find((u: any) => u.id === userData.id);
          if (currentUser && currentUser.skills) {
            setStudentSkills(currentUser.skills);
          }
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Calcular coincidencia de habilidades
  const calculateMatch = (jobSkills: string[]): number => {
    if (studentSkills.length === 0) return 0;
    const studentSkillNames = studentSkills.map((s) => s.name);
    const matchedSkills = jobSkills.filter((skill) => studentSkillNames.includes(skill));
    return Math.round((matchedSkills.length / jobSkills.length) * 100);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOffers = jobs.length;
  const highMatchJobs = jobs.filter((job) => calculateMatch(job.skills) >= 80).length;

  return (
    <StudentLayout userName={user?.name || "Estudiante"} userInitials={user?.initials || "ES"}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Ofertas Laborales</h2>
            <p className="text-gray-600 mt-2">Explora oportunidades basadas en tu perfil de habilidades</p>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-2">🎯 Coincidencia Inteligente</h3>
            <p className="text-blue-800">
              El sistema analiza tu perfil de habilidades y te muestra las ofertas más relevantes. Cuanto más completo sea tu perfil, mejores coincidencias obtendrás.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Ofertas</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{totalOffers}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Alta Coincidencia</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{highMatchJobs}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Mejor Match</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">92%</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="🔍 Buscar ofertas por título o empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900"
            />
          </div>

          {/* Jobs List */}
          {loading ? (
            <div className="text-center text-gray-500 py-8">Cargando ofertas...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No se encontraron ofertas</div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const matchPercentage = calculateMatch(job.skills);
                return (
                  <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-3xl">{job.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-4 py-2 rounded-full font-bold text-sm ${getMatchColor(matchPercentage)}`}>
                          {matchPercentage}% Match
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>📍</span> {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏰</span> {job.type}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>💰</span> {job.salary}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span> {job.candidates} candidatos
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Habilidades Requeridas:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => {
                          const hasSkill = studentSkills.some((s) => s.name === skill);
                          return (
                            <span
                              key={idx}
                              className={`px-2 py-1 text-xs rounded-full font-medium ${
                                hasSkill ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Match Bar */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getMatchBgColor(matchPercentage)}`}
                            style={{ width: `${matchPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-600">{matchPercentage}%</span>
                      </div>
                    </div>

                    <a
                      href={`/estudiante/ofertas-laborales/${job.id}`}
                      className="block w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      Ver Detalles
                    </a>
                  </div>
                );
              })}
            </div>
          )}
    </StudentLayout>
  );
}
