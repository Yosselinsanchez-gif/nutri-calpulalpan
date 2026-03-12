"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { User, Bell, ChevronRight, ChevronLeft } from "lucide-react";

const CONSEJOS = [
  {
    titulo: "Comidas Equilibradas",
    desc: "Mantén un balance adecuado de proteínas, carbohidratos y grasas saludables.",
    img: "https://images.unsplash.com/photo-1604908177522-472ba1d0d6c8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    titulo: "Hidratación",
    desc: "Beber suficiente agua ayuda a mantener tu metabolismo activo.",
    img: "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    titulo: "Actividad Física",
    desc: "30 minutos de ejercicio al día mejoran tu salud cardiovascular.",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function Home() {

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % CONSEJOS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 pb-10">

      {/* HEADER */}
      <header className="bg-[#6b0f2b] text-white p-6 shadow-lg">

        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-3 rounded-full">
              <User size={30}/>
            </div>

            <div>
              <h1 className="font-bold text-xl">
                María Fernanda López
              </h1>

              <p className="text-sm text-emerald-400">
                ✔ Google Signed-in
              </p>
            </div>

          </div>

          <button className="bg-[#b38e44] px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
            <Bell size={16}/> Actualizar Datos
          </button>

        </div>

      </header>


      <div className="max-w-6xl mx-auto p-6">

        {/* TARJETA CONSEJOS */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="bg-[#6b0f2b] text-white p-4 flex justify-between">

            <span className="font-semibold">
              Consejos de Salud
            </span>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  setSlide(slide === 0 ? CONSEJOS.length - 1 : slide - 1)
                }
              >
                <ChevronLeft size={18}/>
              </button>

              <button
                onClick={() =>
                  setSlide((slide + 1) % CONSEJOS.length)
                }
              >
                <ChevronRight size={18}/>
              </button>

            </div>

          </div>

          {/* IMAGEN */}

          <div className="relative h-64">

            <Image
              src={CONSEJOS[slide].img}
              alt="salud"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">

              <h3 className="text-white text-xl font-bold">
                {CONSEJOS[slide].titulo}
              </h3>

              <p className="text-white text-sm">
                {CONSEJOS[slide].desc}
              </p>

            </div>

          </div>

          {/* INDICADORES */}

          <div className="flex justify-center gap-2 py-3">

            {CONSEJOS.map((_, i) => (

              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  slide === i ? "bg-yellow-500" : "bg-gray-300"
                }`}
              />

            ))}

          </div>

        </div>


        {/* BOTON CONSULTA */}

        <button className="w-full mt-6 bg-[#b38e44] hover:bg-[#9c7a38] text-white p-5 rounded-xl text-lg font-semibold flex justify-center items-center gap-2 shadow-lg">

          Solicitar Nueva Consulta

          <ChevronRight/>

        </button>

      </div>

    </main>
  );
}
