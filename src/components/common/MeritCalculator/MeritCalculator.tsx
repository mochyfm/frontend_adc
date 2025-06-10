"use client";
import React, { useState, useMemo, useEffect } from "react";
import "./MeritCalculator.css";

const maxAciertos = 105;
const maxPuntosAciertos = 7;
const maxBaremo = 40;
const maxPuntosBaremo = 3;
const maxNotaFinal = 10;
const currentYear = new Date().getFullYear();

type Seccion =
  | "academico"
  | "idioma"
  | "carnet"
  | "deportista"
  | "militar"
  | "condecoracion";

const opciones: Record<Seccion, { value: number; label: string }[]> = {
  academico: [
    { value: 30, label: "Baremo Especial (30 ptos)" },
    { value: 16, label: "Téc. Grado Medio, Bachiller o superior (16 ptos)" },
    { value: 6, label: "Graduado en ESO (6 ptos)" },
    { value: 0, label: "Ninguno" },
  ],
  idioma: [
    { value: 8, label: "S.L.P. 3.3.3.3 o superior (8 ptos)" },
    { value: 5, label: "S.L.P. 2.2.2.2 (5 ptos)" },
    { value: 3, label: "S.L.P. 1.1.1.1 (3 ptos)" },
    { value: 0, label: "Ninguno" },
  ],
  carnet: [
    { value: 9, label: "D1, D, D+E (9 ptos)" },
    { value: 8, label: "C+E (8 ptos)" },
    { value: 7, label: "C (7 ptos)" },
    { value: 6, label: "C1+E (6 ptos)" },
    { value: 5, label: "C1 (5 ptos)" },
    { value: 4, label: "B+E (4 ptos)" },
    { value: 3, label: "B (3 ptos)" },
    { value: 0, label: "Ninguno" },
  ],
  deportista: [
    { value: 30, label: "Sí, para vacante específica (30 ptos)" },
    { value: 3, label: "Sí (3 ptos)" },
    { value: 0, label: "No" },
  ],
  militar: [
    { value: 2, label: "Cabo o superior (2 ptos)" },
    { value: 1, label: "Soldado / Marinero (1 pto)" },
    { value: 0.25, label: "Reservista Voluntario (0.25 ptos)" },
    { value: 0, label: "Ninguno" },
  ],
  condecoracion: [
    { value: 2, label: "Cruz con distintivo rojo (2 ptos)" },
    { value: 1.75, label: "Distintivo azul o amarillo (1.75 ptos)" },
    { value: 1.5, label: "Distintivo blanco (1.5 ptos)" },
    { value: 0.5, label: "Citación en la Orden General (0.5 ptos)" },
    { value: 0.25, label: "Mención Honorífica (0.25 ptos)" },
    { value: 0, label: "Ninguno" },
  ],
};

const secciones: Seccion[] = [
  "academico",
  "idioma",
  "carnet",
  "deportista",
  "militar",
  "condecoracion",
];

type RadiosState = {
  [K in Seccion]: number;
};

const radiosInicial: RadiosState = {
  academico: 0,
  idioma: 0,
  carnet: 0,
  deportista: 0,
  militar: 0,
  condecoracion: 0,
};

function controlarLimites(
  valor: string | number,
  min: number,
  max: number
): number | "" {
  if (valor === "") return "";
  const num = Number(valor);
  if (isNaN(num)) return min;
  if (num < min) return min;
  if (num > max) return max;
  return num;
}

export default function CalculadoraBaremo() {
  const [aciertos, setAciertos] = useState<number | "">(0);
  const [baremoManual, setBaremoManual] = useState<number | "">("");
  const [notaFinal, setNotaFinal] = useState<number | "">(0);
  const [misiones, setMisiones] = useState<number | "">(0);
  const [servicio, setServicio] = useState<number | "">(0);
  const [radios, setRadios] = useState<RadiosState>({ ...radiosInicial });
  const [editandoManual, setEditandoManual] = useState(false);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  // Suma de radios
  const sumaRadios = useMemo(
    () => secciones.reduce((acc, sec) => acc + Number(radios[sec] || 0), 0),
    [radios]
  );

  // Sincronizar input con radios si no está editando manualmente
  useEffect(() => {
    if (!editandoManual) {
      setBaremoManual(
        Math.min(
          sumaRadios +
            Number(misiones || 0) * 0.5 +
            Number(servicio || 0) * 0.25,
          maxBaremo
        )
      );
    }
  }, [sumaRadios, misiones, servicio, editandoManual]);

  // Input manual: desmarcar todos los radios y poner en "Ninguno"
  const onChangeBaremoManual = (value: string | number) => {
    setEditandoManual(true);
    const limpio = controlarLimites(value, 0, maxBaremo);
    setBaremoManual(limpio);
    setRadios({ ...radiosInicial });
  };

  const onBlurBaremoManual = () => {
    if (baremoManual === "") setEditandoManual(false);
  };

  // Marcar cualquier radio: si el input manual tenía valor, lo vacía y salimos de modo manual
  const handleRadio = (seccion: Seccion, value: number) => {
    setRadios((prev) => ({
      ...prev,
      [seccion]: value,
    }));
    setEditandoManual(false);
  };

  // Baremo real
  const baremo = useMemo(() => {
    if (editandoManual && baremoManual !== "" && baremoManual !== 0) {
      return Math.min(Number(baremoManual), maxBaremo);
    }
    let suma =
      sumaRadios + Number(misiones || 0) * 0.5 + Number(servicio || 0) * 0.25;
    return Math.min(suma, maxBaremo);
  }, [baremoManual, sumaRadios, misiones, servicio, editandoManual]);

  // Cálculo de nota final
  const calcularNotaFinal = () => {
    if (aciertos === "" || isNaN(Number(aciertos))) return;
    const nota =
      (Number(aciertos) / maxAciertos) * maxPuntosAciertos +
      (baremo / maxBaremo) * maxPuntosBaremo;
    setNotaFinal(Number(nota.toFixed(2)));
    setMostrarAyuda(true);
  };

  // Calcular aciertos necesarios desde la nota final
  const calcularAciertosDesdeNota = () => {
    if (notaFinal === "" || isNaN(Number(notaFinal))) return;
    const parteBaremo = (baremo / maxBaremo) * maxPuntosBaremo;
    const partePsico = Number(notaFinal) - parteBaremo;
    let aciertosNecesarios = (partePsico * maxAciertos) / maxPuntosAciertos;
    aciertosNecesarios = Math.max(0, Math.min(maxAciertos, aciertosNecesarios));
    setAciertos(Math.ceil(aciertosNecesarios));
  };

  return (
    <form
      className="merit-calculator"
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1>
        Oposiciones Fuerzas Armadas {currentYear ? currentYear : "2077"} -
        Calculadora de Baremo{" "}
      </h1>
      <div className="merit-calculator-row">
        <label>
          <strong>Aciertos 70% (máx 105):</strong>
        </label>
        <input
          type="number"
          value={aciertos}
          min={0}
          max={maxAciertos}
          className="input-field hits"
          onChange={(e) =>
            setAciertos(controlarLimites(e.target.value, 0, maxAciertos))
          }
          onBlur={(e) =>
            setAciertos(controlarLimites(e.target.value, 0, maxAciertos))
          }
        />
        <input
          type="number"
          disabled
          value={
            aciertos !== "" && !isNaN(Number(aciertos))
              ? ((Number(aciertos) * maxPuntosAciertos) / maxAciertos).toFixed(
                  2
                )
              : ""
          }
        />{" "}
        <button
          type="button"
          onClick={calcularNotaFinal}
          className="button-primary"
        >
          Calcular Nota Final
        </button>
      </div>

      <div className="merit-calculator-row">
        <label>
          <strong>Baremo 30% (máx 40):</strong>
        </label>
        <input
          type="number"
          value={baremoManual}
          min={0}
          max={maxBaremo}
          step={1}
          className="input-field manual-merit"
          onFocus={() => setEditandoManual(true)}
          onBlur={onBlurBaremoManual}
          onChange={(e) => onChangeBaremoManual(e.target.value)}
        />
        <input
          type="number"
          disabled
          value={
            aciertos !== "" && !isNaN(Number(aciertos))
              ? ((Number(baremo) * maxPuntosBaremo) / maxBaremo).toFixed(2)
              : ""
          }
        />
      </div>

      <div className="merit-calculator-row result">
        <label>
          <strong>Nota Final:</strong>
        </label>
        <input
          type="number"
          value={notaFinal}
          min={0}
          max={maxNotaFinal}
          step={0.1}
          placeholder="Aquí aparece la nota final. Añádela a mano o cálculala arriba"
          className="input-field final-grade"
          onChange={(e) =>
            setNotaFinal(controlarLimites(e.target.value, 0, maxNotaFinal))
          }
          onBlur={(e) =>
            setNotaFinal(controlarLimites(e.target.value, 0, maxNotaFinal))
          }
        />
        <button
          type="button"
          onClick={calcularAciertosDesdeNota}
          className="button-secondary"
        >
          Calcular Aciertos Psicotécnicos
        </button>
      </div>

      {mostrarAyuda && (
        <div className="help-block" style={{ marginTop: "1em" }}>
          <div>Nosotros podemos ayudarte a mejorar esa nota.</div>
          <a href="https://api.whatsapp.com/send?phone=34628900407">
            <img
              src="https://academiadecombate.com/wp-content/uploads/2025/05/WhatsApp.svg"
              alt="WhatsApp"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: 8,
                width: 24,
              }}
            />
            Contáctanos
          </a>
        </div>
      )}

      <div className="radios-container">
        {secciones.map((seccion) => (
          <fieldset key={seccion}>
            <legend>
              <strong>
                {seccion.charAt(0).toUpperCase() + seccion.slice(1)}
              </strong>
            </legend>
            {opciones[seccion].map((opt) => (
              <label key={opt.value}>
                <input
                  type="radio"
                  name={seccion}
                  value={opt.value}
                  checked={radios[seccion] === opt.value}
                  onChange={() => handleRadio(seccion, opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </fieldset>
        ))}

        <div className="merit-calculator-row">
          <label>
            <strong>Misiones internacionales (0.5 ptos c/u):</strong>
          </label>
          <input
            type="number"
            value={misiones}
            min={0}
            step={1}
            className="input-field missions"
            onChange={(e) =>
              setMisiones(controlarLimites(e.target.value, 0, 99))
            }
          />
        </div>
        <div className="merit-calculator-row">
          <label>
            <strong>Años (o fracción) de servicio (0.25 ptos/año):</strong>
          </label>
          <input
            type="number"
            value={servicio}
            min={0}
            step={0.01}
            className="input-field service"
            onChange={(e) =>
              setServicio(controlarLimites(e.target.value, 0, 99))
            }
          />
        </div>
      </div>
      <footer className="merit-calculator-footer">
        Powered by
        <img src="/common/AdcWhiteLogo.png" />
      </footer>
    </form>
  );
}
