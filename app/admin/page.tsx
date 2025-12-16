"use client";

import AdminLayout from "@/app/components/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Analítica del Sistema</h2>
      <p className="text-gray-600 mb-8">Visualiza métricas clave y KPIs de la plataforma</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Estudiantes</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">1,284</p>
          <p className="text-green-600 text-sm mt-2">↑ +12.5% este mes</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Cursos Activos</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">47</p>
          <p className="text-green-600 text-sm mt-2">↑ +8.3% este mes</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Competencias</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">156</p>
          <p className="text-gray-600 text-sm mt-2">En 12 categorías</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Ofertas Laborales</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">38</p>
          <p className="text-green-600 text-sm mt-2">↑ +15 esta semana</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Chart 1: Estudiantes por Curso */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Estudiantes por Curso</h3>
          <div className="flex items-end justify-around h-80">
            {[
              { name: "Programación Web", value: 45 },
              { name: "Base de Datos", value: 38 },
              { name: "Redes", value: 32 },
              { name: "IA", value: 28 },
              { name: "Móvil", value: 25 },
            ].map((course, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <span className="text-lg font-bold text-gray-900">{course.value}</span>
                <div
                  className="w-14 bg-blue-600 rounded-t transition-all hover:bg-blue-700"
                  style={{ height: `${(course.value / 45) * 220}px` }}
                ></div>
                <p className="text-xs text-gray-600 text-center max-w-16 font-medium">{course.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Habilidades Más Frecuentes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Habilidades Más Frecuentes</h3>
          <div className="space-y-3">
            {[
              { name: "JavaScript", count: 245, color: "bg-blue-600" },
              { name: "Python", count: 198, color: "bg-yellow-500" },
              { name: "React", count: 187, color: "bg-red-500" },
              { name: "SQL", count: 165, color: "bg-purple-500" },
              { name: "Git", count: 142, color: "bg-green-500" },
              { name: "TypeScript", count: 128, color: "bg-blue-400" },
              { name: "Node.js", count: 115, color: "bg-green-600" },
              { name: "MongoDB", count: 98, color: "bg-green-700" },
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-24 text-sm font-medium text-gray-700">{skill.name}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`${skill.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(skill.count / 245) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{skill.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cursos Creados por Período */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Cursos Creados por Período</h3>
        <div className="flex items-end justify-around h-80">
          {[
            { period: "Ene-Mar", value: 12 },
            { period: "Abr-Jun", value: 15 },
            { period: "Jul-Sep", value: 18 },
            { period: "Oct-Dic", value: 13 },
          ].map((period, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <span className="text-lg font-bold text-gray-900">{period.value}</span>
              <div
                className="w-16 bg-green-500 rounded-t transition-all hover:bg-green-600"
                style={{ height: `${(period.value / 18) * 200}px` }}
              ></div>
              <p className="text-sm font-medium text-gray-600">{period.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coincidencia Habilidades-Ofertas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Coincidencia Habilidades-Ofertas</h3>
        <div className="space-y-4">
          {[
            { skill: "90-100%", percentage: 95 },
            { skill: "70-89%", percentage: 85 },
            { skill: "50-69%", percentage: 65 },
            { skill: "30-49%", percentage: 45 },
            { skill: "0-29%", percentage: 25 },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-20 text-sm font-medium text-gray-700">{item.skill}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{item.percentage}%</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-6">
          El 47% de los estudiantes tienen más de 70% de coincidencia con al menos una oferta laboral.
        </p>
      </div>

      {/* Profesores Activos y Estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Profesores Activos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Profesores Activos</h3>
          <div className="space-y-4">
            {[
              { name: "Dr. María González", courses: 5, students: 142 },
              { name: "Prof. Carlos Ruiz", courses: 4, students: 118 },
              { name: "Ing. Ana López", courses: 3, students: 95 },
              { name: "Dr. Juan Martínez", courses: 4, students: 127 },
              { name: "Prof. Elena Sánchez", courses: 3, students: 89 },
            ].map((teacher, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{teacher.name}</p>
                  <p className="text-xs text-gray-600">{teacher.courses} cursos • {teacher.students} estudiantes</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">{teacher.courses}</p>
                  <p className="text-xs text-gray-600">cursos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas de Inscripción */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Estadísticas de Inscripción</h3>
          <div className="space-y-4">
            {[
              { label: "Inscritos Este Mes", value: 342, color: "text-green-600", bg: "bg-green-50" },
              { label: "Completaron Curso", value: 287, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "En Progreso", value: 456, color: "text-yellow-600", bg: "bg-yellow-50" },
              { label: "Tasa de Finalización", value: "78%", color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Satisfacción Promedio", value: "4.7/5", color: "text-orange-600", bg: "bg-orange-50" },
            ].map((stat, index) => (
              <div key={index} className={`p-4 rounded-lg ${stat.bg}`}>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
