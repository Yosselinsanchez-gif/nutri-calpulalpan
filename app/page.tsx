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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cita, setCita] = useState({
    fecha: "",
    hora: "",
    motivo: ""
  });

  // carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CONSEJOS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const agendarCita = (e:any) => {
    e.preventDefault();
    alert("Cita registrada correctamente ✅");
    setMostrarFormulario(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 pb-10">

      {/* HEADER */}
      <header className="bg-[#631936] text-white p-6 shadow-lg">

        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="bg-gray-400 p-3 rounded-full">
              <User size={32}/>
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                María Fernanda López
              </h1>

              <p className="text-xs text-emerald-400">
                ● Google Signed-in
              </p>
            </div>

          </div>

          <button className="bg-[#b38e44] px-4 py-2 rounded-lg flex gap-2">
            <Bell size={16}/> Actualizar Datos
          </button>

        </div>

      </header>


      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* CARRUSEL */}
        <section className="bg-white rounded-2xl shadow border overflow-hidden">

          <div className="bg-[#631936] text-white p-4 flex justify-between">

            <span>Consejos de Salud</span>

            <div className="flex gap-2">

              <button
                onClick={()=>setCurrentSlide(prev=>prev===0?CONSEJOS.length-1:prev-1)}
              >
                <ChevronLeft/>
              </button>

              <button
                onClick={()=>setCurrentSlide(prev=>(prev+1)%CONSEJOS.length)}
              >
                <ChevronRight/>
              </button>

            </div>

          </div>

          <div className="p-6">

            <div className="overflow-hidden">

              <div
                className="flex transition-transform duration-700"
                style={{transform:`translateX(-${currentSlide*100}%)`}}
              >

                {CONSEJOS.map((c)=>(

                  <div
                    key={c.titulo}
                    className="min-w-full h-48 relative rounded-xl overflow-hidden"
                  >

                    <Image
                      src={c.img}
                      alt={c.titulo}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4">

                      <h3 className="text-white font-bold">
                        {c.titulo}
                      </h3>

                      <p className="text-white text-sm">
                        {c.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>


        {/* BOTON CONSULTA */}

        <button
          onClick={()=>setMostrarFormulario(true)}
          className="w-full bg-[#b38e44] text-white p-5 rounded-xl text-xl flex justify-center gap-3"
        >
          Solicitar Nueva Consulta <ChevronRight/>
        </button>


        {/* FORMULARIO CITA */}

        {mostrarFormulario && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">
              Agendar Consulta
            </h2>

            <form onSubmit={agendarCita} className="space-y-4">

              <input
                type="date"
                required
                className="w-full border p-3 rounded"
                onChange={(e)=>setCita({...cita,fecha:e.target.value})}
              />

              <input
                type="time"
                required
                className="w-full border p-3 rounded"
                onChange={(e)=>setCita({...cita,hora:e.target.value})}
              />

              <textarea
                placeholder="Motivo de la consulta"
                className="w-full border p-3 rounded"
                onChange={(e)=>setCita({...cita,motivo:e.target.value})}
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-3 rounded"
              >
                Guardar Cita
              </button>

            </form>

          </div>

        )}


        {/* DIAGNOSTICO */}

        <section className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <h4 className="font-bold">
                Evaluación Nutricional Completa
              </h4>

              <p className="text-sm text-gray-500">
                Dra. María González
              </p>

            </div>

            <button
              onClick={handleDownload}
              className="bg-[#b38e44] text-white px-4 py-2 rounded flex gap-2"
            >
              <Download size={16}/> Descargar PDF
            </button>

          </div>

        </section>

      </div>

    </main>
  );
}
