import React, { useState } from "react";

const partes = [
  { id: "cuerpo", label: "Cuerpo", default: "#F5D6B4" },
  { id: "cabeza", label: "Cabeza", default: "#F5D6B4" },
  { id: "oreja-izq", label: "Oreja Izquierda", default: "#F5D6B4" },
  { id: "oreja-der", label: "Oreja Derecha", default: "#F5D6B4" },
  { id: "hocico", label: "Hocico", default: "#F9E7D3" },
  { id: "nariz", label: "Nariz", default: "#666" },
  { id: "mono-izq", label: "Moño Izq", default: "#F7A8B8" },
  { id: "mono-der", label: "Moño Der", default: "#F7A8B8" },
  { id: "mono-centro", label: "Centro Moño", default: "#F7A8B8" },
  { id: "pata-delantera-izq", label: "Pata Delantera Izq", default: "#F5D6B4" },
  { id: "pata-delantera-der", label: "Pata Delantera Der", default: "#F5D6B4" },
  { id: "pata-trasera-izq", label: "Pata Trasera Izq", default: "#F5D6B4" },
  { id: "pata-trasera-der", label: "Pata Trasera Der", default: "#F5D6B4" },
  { id: "planta-izq", label: "Planta Izq", default: "#F9E7D3" },
  { id: "planta-der", label: "Planta Der", default: "#F9E7D3" },
  { id: "almohadilla-izq", label: "Almohadilla Izq", default: "#BCA18C" },
  { id: "almohadilla-der", label: "Almohadilla Der", default: "#BCA18C" },
  { id: "deditos-izq", label: "Deditos Izq", default: "#666" },
  { id: "deditos-der", label: "Deditos Der", default: "#666" },
];

export default function PersonalizadorOso() {
  const [colores, setColores] = useState(
    Object.fromEntries(partes.map((p) => [p.id, p.default]))
  );

  const handleColor = (id, color) => {
    setColores((prev) => ({ ...prev, [id]: color }));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <svg viewBox="0 0 400 500" width={300} height={375} xmlns="http://www.w3.org/2000/svg">
        {/* Cuerpo principal del osito */}
        <ellipse id="cuerpo" cx="200" cy="280" rx="80" ry="100" fill={colores.cuerpo} stroke="#666" strokeWidth="3" />
        {/* Cabeza */}
        <circle id="cabeza" cx="200" cy="160" r="60" fill={colores.cabeza} stroke="#666" strokeWidth="3" />
        {/* Orejas */}
        <circle id="oreja-izq" cx="160" cy="120" r="25" fill={colores["oreja-izq"]} stroke="#666" strokeWidth="3" />
        <circle id="oreja-der" cx="240" cy="120" r="25" fill={colores["oreja-der"]} stroke="#666" strokeWidth="3" />
        {/* Hocico */}
        <ellipse id="hocico" cx="200" cy="175" rx="20" ry="15" fill={colores.hocico} stroke="#666" strokeWidth="2" />
        {/* Nariz */}
        <ellipse id="nariz" cx="200" cy="168" rx="4" ry="3" fill={colores.nariz} />
        {/* Boca */}
        <path d="M 200 172 Q 195 178 190 175" fill="none" stroke="#666" strokeWidth="2" />
        <path d="M 200 172 Q 205 178 210 175" fill="none" stroke="#666" strokeWidth="2" />
        {/* Ojos */}
        <ellipse cx="185" cy="145" rx="3" ry="4" fill="#666" />
        <ellipse cx="215" cy="145" rx="3" ry="4" fill="#666" />
        {/* Moño del boceto */}
        <ellipse id="mono-izq" cx="180" cy="220" rx="15" ry="8" fill={colores["mono-izq"]} stroke="#666" strokeWidth="2" />
        <ellipse id="mono-der" cx="220" cy="220" rx="15" ry="8" fill={colores["mono-der"]} stroke="#666" strokeWidth="2" />
        <circle id="mono-centro" cx="200" cy="220" r="6" fill={colores["mono-centro"]} stroke="#666" strokeWidth="2" />
        <line x1="185" y1="220" x2="215" y2="220" stroke="#666" strokeWidth="2" />
        {/* Patas delanteras */}
        <ellipse id="pata-delantera-izq" cx="150" cy="320" rx="25" ry="45" fill={colores["pata-delantera-izq"]} stroke="#666" strokeWidth="3" />
        <ellipse id="pata-delantera-der" cx="250" cy="320" rx="25" ry="45" fill={colores["pata-delantera-der"]} stroke="#666" strokeWidth="3" />
        {/* Patas traseras */}
        <ellipse id="pata-trasera-izq" cx="160" cy="400" rx="35" ry="45" fill={colores["pata-trasera-izq"]} stroke="#666" strokeWidth="3" />
        <ellipse id="pata-trasera-der" cx="240" cy="400" rx="35" ry="45" fill={colores["pata-trasera-der"]} stroke="#666" strokeWidth="3" />
        {/* Plantas de las patas traseras */}
        <ellipse id="planta-izq" cx="160" cy="420" rx="20" ry="25" fill={colores["planta-izq"]} stroke="#666" strokeWidth="2" />
        <ellipse id="planta-der" cx="240" cy="420" rx="20" ry="25" fill={colores["planta-der"]} stroke="#666" strokeWidth="2" />
        {/* Deditos de las patas traseras (izq) */}
        <circle id="deditos-izq" cx="145" cy="405" r="3" fill={colores["deditos-izq"]} />
        <circle id="deditos-izq" cx="155" cy="400" r="3" fill={colores["deditos-izq"]} />
        <circle id="deditos-izq" cx="165" cy="400" r="3" fill={colores["deditos-izq"]} />
        <circle id="deditos-izq" cx="175" cy="405" r="3" fill={colores["deditos-izq"]} />
        {/* Deditos de las patas traseras (der) */}
        <circle id="deditos-der" cx="225" cy="405" r="3" fill={colores["deditos-der"]} />
        <circle id="deditos-der" cx="235" cy="400" r="3" fill={colores["deditos-der"]} />
        <circle id="deditos-der" cx="245" cy="400" r="3" fill={colores["deditos-der"]} />
        <circle id="deditos-der" cx="255" cy="405" r="3" fill={colores["deditos-der"]} />
        {/* Almohadillas de las plantas */}
        <ellipse id="almohadilla-izq" cx="160" cy="435" rx="8" ry="12" fill={colores["almohadilla-izq"]} />
        <ellipse id="almohadilla-der" cx="240" cy="435" rx="8" ry="12" fill={colores["almohadilla-der"]} />
      </svg>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-xl">
        {partes.map((parte) => (
          <label key={parte.id} className="flex items-center gap-2 text-sm">
            <input
              type="color"
              value={colores[parte.id]}
              onChange={e => handleColor(parte.id, e.target.value)}
              className="w-6 h-6 rounded-full border"
            />
            {parte.label}
          </label>
        ))}
      </div>
    </div>
  );
} 