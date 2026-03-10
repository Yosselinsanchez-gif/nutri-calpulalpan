"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import "react-calendar/dist/Calendar.css";
import { User, Bell, Download, ChevronRight } from "lucide-react";

type Cita = {
  nombre: string;
  consulta: string;
  fecha: string;
  hora: string;
};

export default function Home() {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [fecha, setFecha] = useState<Value>(new Date());
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [consulta, setConsulta] = useState("");
  const [citas, setCitas] = useState<Cita[]>([]);

  const handleDownload = () => {
    window.print();
  };

  const guardarCita = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fecha || Array.isArray(fecha)) return;

    const nuevaCita: Cita = {
      nombre,
      consulta,
      fecha: fecha.toLocaleDateString(),
      hora
    };

    setCitas((prev) => [...prev, nuevaCita]);

    setMostrarFormulario(false);
    setNombre("");
    setConsulta("");
    setHora("");
  };

  return (
    <main className="min-h-screen bg-slate-100 font-sans pb-10">

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* HEADER */}
      <header className="bg-[#631936] text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <div className="bg-gray-400 p-3 rounded-full">
              <User size={32}/>
            </div>

            <h1 className="text-xl md:text-2xl font-bold">
              María Fernanda López
            </h1>
          </div>

          <button className="no-print bg-[#b38e44] px-4 py-2 rounded-lg flex gap-2 items-center">
            <Bell size={16}/> Actualizar Datos
          </button>

        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* BOTÓN */}
        <button
          onClick={() => setMostrarFormulario(true)}
          className="no-print w-full bg-[#b38e44] text-white p-5 rounded-xl font-bold text-xl flex justify-center items-center gap-3"
        >
          Solicitar Nueva Consulta <ChevronRight size={24}/>
        </button>

        {/* FORMULARIO */}
        {mostrarFormulario && (

          <section className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-xl font-bold mb-4 text-[#631936]">
              Agendar Consulta
            </h2>

            <form onSubmit={guardarCita} className="space-y-4">

              <div>
                <label className="text-sm font-semibold">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e)=>setNombre(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Tipo de Consulta</label>
                <select
                  value={consulta}
                  onChange={(e)=>setConsulta(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  required
                >
                  <option value="">Selecciona</option>
                  <option>Consulta General</option>
                  <option>Nutrición</option>
                  <option>Psicología</option>
                  <option>Seguimiento Médico</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">Fecha</label>
                <Calendar
                  onChange={(value)=>setFecha(value)}
                  value={fecha}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Hora</label>
                <input
                  type="time"
                  value={hora}
                  onChange={(e)=>setHora(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  required
                />
              </div>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={()=>setMostrarFormulario(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="bg-[#631936] text-white px-4 py-2 rounded-lg"
                >
                  Agendar
                </button>

              </div>

            </form>

          </section>
        )}

        {/* CITAS */}
        <section className="bg-white rounded-2xl shadow border">

          <div className="bg-[#631936] p-4 text-white font-semibold">
            Citas Agendadas
          </div>

          <div className="p-6 space-y-4">

            {citas.length === 0 && (
              <p className="text-gray-500">
                No hay citas registradas
              </p>
            )}

            {citas.map((cita,index)=>(
              <div key={index} className="border p-4 rounded-lg">

                <p className="font-semibold">{cita.nombre}</p>

                <p className="text-sm text-gray-600">
                  {cita.consulta}
                </p>

                <p className="text-xs text-gray-500">
                  {cita.fecha} - {cita.hora}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* DIAGNÓSTICOS */}
        <section className="bg-white rounded-2xl shadow border">

          <div className="bg-[#631936] p-4 text-white font-semibold">
            Mis Diagnósticos
          </div>

          <div className="p-6">

            <div className="flex justify-between items-center">

              <div>
                <h4 className="font-bold">
                  Evaluación Nutricional Completa
                </h4>

                <p className="text-sm text-gray-500">
                  Dra. María González
                </p>

                <p className="text-xs text-gray-400">
                  15 de Noviembre, 2026
                </p>
              </div>

              <button
                onClick={handleDownload}
                className="no-print bg-[#b38e44] text-white px-4 py-2 rounded-lg flex gap-2"
              >
                <Download size={16}/> Descargar PDF
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
