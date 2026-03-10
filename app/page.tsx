"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { User, Bell, Download, ChevronRight } from "lucide-react";

export default function Home() {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [fecha, setFecha] = useState<Date | null>(new Date());
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [consulta, setConsulta] = useState("");
  const [citas, setCitas] = useState<any[]>([]);

  const handleDownload = () => {
    window.print();
  };

  const guardarCita = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevaCita = {
      nombre,
      consulta,
      fecha: fecha?.toLocaleDateString(),
      hora
    };

    setCitas([...citas, nuevaCita]);

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

            <h1 className="text-xl md:text-2xl font-bold">
              María Fernanda López
            </h1>
          </div>

          <button className="no-print bg-[#b38e44] hover:bg-[#967738] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Bell size={16} /> Actualizar Datos
          </button>

        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">

        {/* BOTÓN NUEVA CONSULTA */}
        <button
          onClick={() => setMostrarFormulario(true)}
          className="no-print w-full bg-[#b38e44] hover:bg-[#967738] text-white p-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg"
        >
          Solicitar Nueva Consulta <ChevronRight size={24} />
        </button>

        {/* FORMULARIO */}
        {mostrarFormulario && (
          <section className="bg-white p-6 rounded-2xl shadow border border-gray-200">

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
                  required
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Tipo de Consulta</label>
                <select
                  value={consulta}
                  onChange={(e)=>setConsulta(e.target.value)}
                  required
                  className="w-full border p-2 rounded-lg"
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
                  onChange={(value)=>setFecha(value as Date)}
                  value={fecha}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Hora</label>
                <input
                  type="time"
                  value={hora}
                  onChange={(e)=>setHora(e.target.value)}
                  required
                  className="w-full border p-2 rounded-lg"
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
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="bg-[#631936] p-4 text-white font-semibold">
            Citas Agendadas
          </div>

          <div className="p-6 space-y-4">

            {citas.length === 0 && (
              <p className="text-gray-500">
                No hay citas registradas
              </p>
            )}

            {citas.map((cita, index) => (

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
