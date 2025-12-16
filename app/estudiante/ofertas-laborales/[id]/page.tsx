"use client";

import StudentLayout from "@/app/components/StudentLayout";
import { useState, use } from "react";
import { useRouter } from "next/navigation";

interface Oferta {
  titulo: string;
  empresa: string;
  ubicacion: string;
  tipo: string;
  salario: string;
  descripcion: string;
  responsabilidades: string[];
  requisitos: string[];
  habilidades_requeridas: string[];
  habilidades_estudiante: string[];
  coincidencia: number;
  candidatos: number;
  fecha_cierre: string;
  beneficios: string[];
}

export default function DetallesOfertaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [aplicado, setAplicado] = useState(false);

  // Datos de ofertas según el ID
  const ofertasData: Record<string, Oferta> = {
    "1": {
      titulo: "Desarrollador Full Stack Junior",
      empresa: "TechCorp",
      ubicacion: "Madrid, España",
      tipo: "Tiempo Completo",
      salario: "$35,000 - $45,000",
      descripcion:
        "Buscamos un desarrollador full stack junior con experiencia en React y Node.js. Serás parte de un equipo dinámico trabajando en proyectos innovadores.",
      responsabilidades: [
        "Desarrollar interfaces web con React",
        "Crear APIs con Node.js y Express",
        "Trabajar con bases de datos SQL y NoSQL",
        "Colaborar con el equipo de diseño",
        "Participar en code reviews",
      ],
      requisitos: [
        "Conocimiento de JavaScript y React",
        "Experiencia con Node.js",
        "Familiaridad con Git",
        "Capacidad de trabajar en equipo",
        "Inglés intermedio",
      ],
      habilidades_requeridas: ["JavaScript", "React", "Node.js", "SQL", "Git"],
      habilidades_estudiante: ["JavaScript", "React", "SQL"],
      coincidencia: 75,
      candidatos: 23,
      fecha_cierre: "31 de diciembre de 2025",
      beneficios: [
        "Salario competitivo",
        "Trabajo remoto flexible",
        "Seguro de salud",
        "Bonificación anual",
        "Desarrollo profesional",
      ],
    },
    "2": {
      titulo: "DevOps Engineer",
      empresa: "CloudNet",
      ubicacion: "Barcelona, España",
      tipo: "Tiempo Completo",
      salario: "$45,000 - $60,000",
      descripcion:
        "Buscamos un DevOps Engineer con experiencia en infraestructura en la nube. Trabajarás en la automatización y optimización de nuestros sistemas.",
      responsabilidades: [
        "Gestionar infraestructura en AWS/Azure",
        "Implementar CI/CD pipelines",
        "Monitorear y optimizar sistemas",
        "Automatizar procesos de deployment",
        "Documentar procedimientos",
      ],
      requisitos: [
        "Experiencia con Docker y Kubernetes",
        "Conocimiento de CI/CD",
        "Scripting (Bash, Python)",
        "Experiencia con AWS o Azure",
        "Inglés fluido",
      ],
      habilidades_requeridas: ["Docker", "Kubernetes", "AWS", "Python", "Git"],
      habilidades_estudiante: ["Git", "Python"],
      coincidencia: 40,
      candidatos: 15,
      fecha_cierre: "15 de enero de 2026",
      beneficios: [
        "Salario muy competitivo",
        "Trabajo 100% remoto",
        "Formación continua",
        "Bonus por performance",
        "Horario flexible",
      ],
    },
    "3": {
      titulo: "Data Scientist",
      empresa: "DataInsight",
      ubicacion: "Valencia, España",
      tipo: "Tiempo Completo",
      salario: "$40,000 - $55,000",
      descripcion:
        "Únete a nuestro equipo de Data Science para analizar y extraer insights de grandes volúmenes de datos.",
      responsabilidades: [
        "Analizar datos complejos",
        "Crear modelos de machine learning",
        "Visualizar datos",
        "Presentar insights a stakeholders",
        "Optimizar algoritmos",
      ],
      requisitos: [
        "Experiencia con Python y R",
        "Conocimiento de Machine Learning",
        "SQL avanzado",
        "Estadística",
        "Inglés intermedio",
      ],
      habilidades_requeridas: ["Python", "SQL", "Machine Learning", "R", "Estadística"],
      habilidades_estudiante: ["Python", "SQL"],
      coincidencia: 50,
      candidatos: 18,
      fecha_cierre: "20 de enero de 2026",
      beneficios: [
        "Salario competitivo",
        "Flexible working",
        "Equipamiento de última generación",
        "Formación en IA",
        "Ambiente colaborativo",
      ],
    },
  };

  const oferta: Oferta = ofertasData[id] || ofertasData["1"];

  const habilidades_faltantes = oferta.habilidades_requeridas.filter(
    (h) => !oferta.habilidades_estudiante.includes(h)
  );

  return (
    <StudentLayout userName="Estudiante" userInitials="ES">
      <div className="max-w-4xl mx-auto">
        {/* Botón Volver Atrás */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
        >
          <span className="text-xl">←</span>
          Volver atrás
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{oferta.titulo}</h1>
              <p className="text-blue-100 mb-4">{oferta.empresa}</p>
              <div className="flex gap-6 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{oferta.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <span>{oferta.tipo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💰</span>
                  <span>{oferta.salario}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-2">Coincidencia</p>
              <p className="text-4xl font-bold">{oferta.coincidencia}%</p>
            </div>
          </div>
        </div>

        {/* Barra de Coincidencia */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Tu Coincidencia con la Oferta</h3>
            <span className="text-sm text-gray-600">{oferta.coincidencia}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${oferta.coincidencia}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            Tienes {oferta.habilidades_estudiante.length} de {oferta.habilidades_requeridas.length} habilidades requeridas
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Columna Principal */}
          <div className="col-span-2 space-y-6">
            {/* Descripción */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Puesto</h2>
              <p className="text-gray-700 leading-relaxed">{oferta.descripcion}</p>
            </div>

            {/* Responsabilidades */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsabilidades</h2>
              <ul className="space-y-3">
                {oferta.responsabilidades.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requisitos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requisitos</h2>
              <ul className="space-y-3">
                {oferta.requisitos.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beneficios */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Beneficios</h2>
              <div className="grid grid-cols-2 gap-4">
                {oferta.beneficios.map((ben, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Habilidades */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-4">Habilidades Requeridas</h3>
              <div className="space-y-2">
                {oferta.habilidades_requeridas.map((hab, idx) => {
                  const tienes = oferta.habilidades_estudiante.includes(hab);
                  return (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        tienes
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tienes ? "✓" : "○"} {hab}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Habilidades Faltantes */}
            {habilidades_faltantes.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-bold text-yellow-900 mb-3">Habilidades Faltantes</h3>
                <p className="text-sm text-yellow-800 mb-3">
                  Te faltan {habilidades_faltantes.length} habilidades:
                </p>
                <div className="space-y-2">
                  {habilidades_faltantes.map((hab, idx) => (
                    <div key={idx} className="text-sm text-yellow-800">
                      • {hab}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Adicional */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600">Candidatos</p>
                <p className="text-2xl font-bold text-gray-900">{oferta.candidatos}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Cierre</p>
                <p className="font-semibold text-gray-900">{oferta.fecha_cierre}</p>
              </div>
            </div>

            {/* Botón de Aplicar */}
            <button
              onClick={() => setAplicado(!aplicado)}
              className={`w-full py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                aplicado
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {aplicado ? "✓ Aplicación Enviada" : "Aplicar Ahora"}
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
