"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { User, Bell, Download, ChevronRight, Clock, ChevronLeft } from "lucide-react";

const CONSEJOS = [
  {
    titulo: "Hidratación Constante",
    desc: "Bebe al menos 2 litros para mantener tu cuerpo hidratado.",
    img: "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    titulo: "Nutrición Equilibrada",
    desc: "Incluye frutas y verduras en todas tus comidas.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    titulo: "Actividad Física",
    desc: "Al menos 30 minutos de ejercicio diario fortalecen tu corazón.",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CONSEJOS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (

    <main className="min-h-screen bg-slate-100 font-sans pb-10">

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background-color: white !important; }
        }
      `}</style>

      {/* HEADER */}

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

        {/* CARRUSEL */}

        <section className="no-print bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="bg-[#631936] p-4 text-white font-semibold flex justify-between items-center">

            <span>Consejos de Salud</span>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? CONSEJOS.length - 1 : prev - 1
                  )
                }
                className="p-1 bg-white/10 rounded-full"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    (prev + 1) % CONSEJOS.length
                  )
                }
                className="p-1 bg-white/10 rounded-full"
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

          <div className="p-6">

            <div className="relative overflow-hidden">

              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >

                {CONSEJOS.map((consejo) => (

                  <div
                    key={consejo.titulo}
                    className="min-w-full relative h-48 rounded-xl overflow-hidden"
                  >

                    <Image
                      src={consejo.img}
                      alt={consejo.titulo}
                      fill
                      sizes="100vw"
                      priority
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 p-4 flex flex-col justify-end">

                      <h3 className="text-white font-bold text-lg">
                        {consejo.titulo}
                      </h3>

                      <p className="text-white/80 text-xs">
                        {consejo.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* INDICADORES */}

            <div className="flex justify-between items-center mt-6">

              <button className="flex items-center gap-2 text-[#631936] font-semibold text-sm">
                <Clock size={18} /> Solicitar Cambio
              </button>

              <div className="flex gap-2">

                {CONSEJOS.map((_, i) => (

                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === i
                        ? "w-6 bg-[#631936]"
                        : "w-2 bg-gray-300"
                    }`}
                  />

                ))}

              </div>

              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold">
                APROBACIÓN PENDIENTE
              </span>

            </div>

          </div>

        </section>


        {/* BOTÓN */}

        <button className="no-print w-full bg-[#b38e44] hover:bg-[#967738] text-white p-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg">
          Solicitar Nueva Consulta <ChevronRight size={24} />
        </button>


        {/* DIAGNÓSTICOS */}

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="bg-[#631936] p-4 text-white font-semibold">
            Mis Diagnósticos
          </div>

          <div className="p-6">

            <div className="flex justify-between items-center">

              <div>

                <h4 className="font-bold text-gray-800">
                  Evaluación Nutricional Completa
                </h4>

                <p className="text-sm text-gray-500 italic">
                  Dra. María González
                </p>

                <p className="text-xs text-gray-400">
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
