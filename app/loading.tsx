export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <span className="text-white font-bold text-3xl">EC</span>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">EduConnect</h1>
        <p className="text-gray-700 mb-8">Cargando plataforma educativa...</p>

        {/* Spinner de carga */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"
            ></div>
          </div>
        </div>

        {/* Texto de estado */}
        <p className="text-sm text-gray-500">Por favor espera mientras cargamos tu experiencia...</p>
      </div>
    </div>
  );
}
