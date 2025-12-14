"use client";

import StudentLayout from "@/app/components/StudentLayout";
import { useState, use } from "react";

export default function DetallesCursoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("resumen");

  // Datos de cursos según el ID
  const cursosData: Record<string, any> = {
    "1": {
      titulo: "Programación Web Avanzada",
      codigo: "PWA-2025-A1",
      profesor: "Dr. María González",
      descripcion: "Curso avanzado de desarrollo web con React y Node.js",
      fecha_inicio: "14 de enero de 2025",
      duracion: "12 semanas",
      estudiantes: 45,
      progreso: 75,
      competencias: ["JavaScript", "React", "Node.js", "SQL", "Git"],
      contenido: [
        { semana: 1, tema: "Introducción a React", completado: true },
        { semana: 2, tema: "Componentes y Props", completado: true },
        { semana: 3, tema: "Estado y Ciclo de Vida", completado: true },
        { semana: 4, tema: "Hooks", completado: false },
        { semana: 5, tema: "Routing", completado: false },
      ],
    },
    "2": {
      titulo: "Bases de Datos",
      codigo: "BD-2025-B2",
      profesor: "Prof. Carlos Ruiz",
      descripcion: "Fundamentos y diseño de bases de datos relacionales",
      fecha_inicio: "19 de enero de 2025",
      duracion: "10 semanas",
      estudiantes: 38,
      progreso: 60,
      competencias: ["SQL", "MongoDB", "Modelado de BD", "Normalización"],
      contenido: [
        { semana: 1, tema: "Introducción a BD", completado: true },
        { semana: 2, tema: "Modelo Relacional", completado: true },
        { semana: 3, tema: "SQL Básico", completado: true },
        { semana: 4, tema: "Joins y Subconsultas", completado: true },
        { semana: 5, tema: "Normalización", completado: false },
      ],
    },
    "3": {
      titulo: "Desarrollo Móvil",
      codigo: "DM-2025-C3",
      profesor: "Ing. Ana López",
      descripcion: "Desarrollo de aplicaciones móviles con React Native",
      fecha_inicio: "31 de enero de 2025",
      duracion: "14 semanas",
      estudiantes: 32,
      progreso: 45,
      competencias: ["React Native", "JavaScript", "Mobile UI", "APIs REST"],
      contenido: [
        { semana: 1, tema: "Configuración del Entorno", completado: true },
        { semana: 2, tema: "Componentes Básicos", completado: true },
        { semana: 3, tema: "Navigation", completado: false },
        { semana: 4, tema: "State Management", completado: false },
        { semana: 5, tema: "APIs y Networking", completado: false },
      ],
    },
  };

  const curso = {
    id: id,
    ...cursosData[id] || cursosData["1"],
  };

  return (
    <StudentLayout userName="Estudiante" userInitials="ES">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{curso.titulo}</h1>
              <p className="text-blue-100 mb-4">{curso.descripcion}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-blue-200">Código</p>
                  <p className="font-semibold">{curso.codigo}</p>
                </div>
                <div>
                  <p className="text-blue-200">Profesor</p>
                  <p className="font-semibold">{curso.profesor}</p>
                </div>
                <div>
                  <p className="text-blue-200">Estudiantes</p>
                  <p className="font-semibold">{curso.estudiantes}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Progreso</p>
              <p className="text-4xl font-bold">{curso.progreso}%</p>
            </div>
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Progreso General</h3>
            <span className="text-sm text-gray-600">{curso.progreso}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${curso.progreso}%` }}
            ></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="flex border-b border-gray-200">
            {["resumen", "contenido", "recursos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "resumen" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Información del Curso</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Fecha de Inicio</p>
                      <p className="font-semibold text-gray-900">{curso.fecha_inicio}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Duración</p>
                      <p className="font-semibold text-gray-900">{curso.duracion}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Competencias</h3>
                  <div className="flex flex-wrap gap-2">
                    {curso.competencias.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contenido" && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenido del Curso</h3>
                {curso.contenido.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {item.completado ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Semana {item.semana}: {item.tema}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 bg-white px-3 py-1 rounded-full">
                      {item.completado ? "Completado" : "Pendiente"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "recursos" && (
              <div className="text-center py-8">
                <p className="text-gray-600">Los recursos estarán disponibles pronto</p>
              </div>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-4">
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Continuar Aprendiendo
          </button>
          <button className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium">
            Descargar Certificado
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
