"use client";

import { User, Bell, Download, ChevronRight, Clock } from 'lucide-react';

export default function Home() {

  // Función para imprimir/guardar PDF
  const handleDownload = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-slate-100 font-sans pb-10">

      {/* CSS para que no se impriman los botones */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background-color: white !important; }
        }
      `}</style>

      {/* HEADER / PERFIL */}
      <header className="bg-[#631936] text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <div className="bg-gray-400 p-3 rounded-full text-white">
              <User size={32} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                María Fernanda López
              </h1>

              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Google Signed-in
              </p>
            </div>
          </div>

          <button className="no-print bg-[#b38e44] hover:bg-[#967738] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Bell size={16} /> Actualizar Datos
          </button>

        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">

        {/* BOTÓN PRINCIPAL */}
        <button className="no-print w-full bg-[#b38e44] hover:bg-[#967738] text-white p-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-[0.98]">
          Solicitar Nueva Consulta <ChevronRight size={24} />
        </button>

        {/* SECCIÓN DE DIAGNÓSTICOS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="bg-[#631936] p-4 text-white font-semibold">
            Mis Diagnósticos
          </div>

          <div className="p-6 divide-y divide-gray-100">

            <div className="flex justify-between items-center py-5">

              <div>
                <h4 className="font-bold text-gray-800">
                  Evaluación Nutricional Completa
                </h4>

                <p className="text-sm text-gray-500 italic">
                  Dra. María González
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  15 de Noviembre, 2026
                </p>
              </div>

              <button
                onClick={handleDownload}
                className="no-print bg-[#b38e44] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold"
              >
                <Download size={16} /> Descargar PDF
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
