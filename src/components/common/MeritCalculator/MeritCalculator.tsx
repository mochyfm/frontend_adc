"use client";
import React, { useState, useMemo, useEffect } from "react";
import "./MeritCalculator.css";
import { FaWhatsapp } from "react-icons/fa";
import ReadOnlyBox from "./ReadOnlyBox";

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
  | "militar"
  | "condecoracion"
  | "deportista";

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
  deportista: [
    { value: 30, label: "Sí, para vacante específica (30 ptos)" },
    { value: 3, label: "Sí (3 ptos)" },
    { value: 0, label: "No" },
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

type FormState = {
  aciertos: number;
  baremoManual: number;
  notaFinal: number;
  misiones: number;
  servicio: number;
  editandoManual: boolean;
  mostrarAyuda: boolean;
  mostrarEscalaMinisterio: boolean;
};

export default function CalculadoraBaremo() {
  const [formState, setFormState] = useState<FormState>({
    aciertos: 0,
    baremoManual: 0,
    notaFinal: 0,
    misiones: 0,
    servicio: 0,
    editandoManual: false,
    mostrarAyuda: false,
    mostrarEscalaMinisterio: false,
  });

  const [radios, setRadios] = useState<RadiosState>({ ...radiosInicial });

  const sumaRadios = useMemo(
    () => secciones.reduce((acc, sec) => acc + Number(radios[sec] || 0), 0),
    [radios]
  );

  useEffect(() => {
    if (!formState.editandoManual) {
      setFormState((prev) => ({
        ...prev,
        baremoManual: Math.min(
          sumaRadios +
            Number(formState.misiones || 0) * 0.5 +
            Number(formState.servicio || 0) * 0.25,
          maxBaremo
        ),
      }));
    }
  }, [
    sumaRadios,
    formState.misiones,
    formState.servicio,
    formState.editandoManual,
  ]);

  const onChangeBaremoManual = (value: string | number) => {
    const limpio = controlarLimites(value, 0, maxBaremo);
    setFormState((prev) => ({
      ...prev,
      editandoManual: true,
      baremoManual: limpio === "" ? 0 : limpio,
    }));
    setRadios({ ...radiosInicial });
  };

  const onBlurBaremoManual = () => {
    if (formState.baremoManual === 0) {
      setFormState((prev) => ({ ...prev, editandoManual: false }));
    }
  };

  const handleRadio = (seccion: Seccion, value: number) => {
    setRadios((prev) => ({
      ...prev,
      [seccion]: value,
    }));
    setFormState((prev) => ({ ...prev, editandoManual: false }));
  };

  const baremo = useMemo(() => {
    if (formState.editandoManual && formState.baremoManual !== 0) {
      return Math.min(Number(formState.baremoManual), maxBaremo);
    }
    let suma =
      sumaRadios +
      Number(formState.misiones || 0) * 0.5 +
      Number(formState.servicio || 0) * 0.25;
    return Math.min(suma, maxBaremo);
  }, [
    formState.baremoManual,
    sumaRadios,
    formState.misiones,
    formState.servicio,
    formState.editandoManual,
  ]);

  const calcularNotaFinal = () => {
    if (isNaN(Number(formState.aciertos))) return;
    const nota =
      (Number(formState.aciertos) / maxAciertos) * maxPuntosAciertos +
      (baremo / maxBaremo) * maxPuntosBaremo;
    setFormState((prev) => ({
      ...prev,
      notaFinal: Number(nota.toFixed(2)),
      mostrarAyuda: nota <= 5.5,
    }));
  };

  const calcularAciertosDesdeNota = () => {
    if (isNaN(Number(formState.notaFinal))) return;
    const parteBaremo = (baremo / maxBaremo) * maxPuntosBaremo;
    const partePsico = Number(formState.notaFinal) - parteBaremo;
    let aciertosNecesarios = (partePsico * maxAciertos) / maxPuntosAciertos;
    aciertosNecesarios = Math.max(0, Math.min(maxAciertos, aciertosNecesarios));
    setFormState((prev) => ({
      ...prev,
      aciertos: Math.ceil(aciertosNecesarios),
    }));
  };

  return (
    <form
      className="merit-calculator"
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="visually-hidden">
        Oposiciones Fuerzas Armadas {currentYear ? currentYear : "2077"} -
        Calculadora de Baremo{" "}
      </h1>
      <h2>Calculadora de Baremo</h2>

      <div className="merit-calculator-row">
        <label>
          <strong>Aciertos 70% (máx 105):</strong>
        </label>
        <input
          onClick={() =>
            setFormState((prev) => ({
              ...prev,
              mostrarEscalaMinisterio: !prev.mostrarEscalaMinisterio,
            }))
          }
          type="number"
          value={formState.aciertos}
          min={0}
          max={maxAciertos}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              aciertos: controlarLimites(e.target.value, 0, maxAciertos) || 0,
            }))
          }
          onBlur={(e) =>
            setFormState((prev) => ({
              ...prev,
              aciertos: controlarLimites(e.target.value, 0, maxAciertos) || 0,
            }))
          }
        />
        <ReadOnlyBox
          value={
            formState.mostrarEscalaMinisterio
              ? (
                  ((formState.aciertos / maxAciertos) *
                    maxPuntosAciertos *
                    10) /
                  maxPuntosAciertos
                ).toFixed(2)
              : (
                  (formState.aciertos * maxPuntosAciertos) /
                  maxAciertos
                ).toFixed(2)
          }
          title="Click para cambiar entre escala 7/3 y escala 10"
          onClick={() =>
            setFormState((prev) => ({
              ...prev,
              mostrarEscalaMinisterio: !prev.mostrarEscalaMinisterio,
            }))
          }
        />

        <button type="button" onClick={calcularNotaFinal}>
          Calcular Nota Final
        </button>
      </div>

      <div className="merit-calculator-row">
        <label>
          <strong>Baremo 30% (máx 40):</strong>
        </label>
        <input
          type="number"
          value={formState.baremoManual}
          min={0}
          max={maxBaremo}
          step={1}
          onFocus={() =>
            setFormState((prev) => ({ ...prev, editandoManual: true }))
          }
          onBlur={onBlurBaremoManual}
          onChange={(e) => onChangeBaremoManual(e.target.value)}
        />
        <ReadOnlyBox
          value={
            formState.mostrarEscalaMinisterio
              ? (
                  ((baremo / maxBaremo) * maxPuntosBaremo * 10) /
                  maxPuntosBaremo
                ).toFixed(2)
              : ((baremo * maxPuntosBaremo) / maxBaremo).toFixed(2)
          }
          title="Click para cambiar entre escala 7/3 y escala 10"
          onClick={() =>
            setFormState((prev) => ({
              ...prev,
              mostrarEscalaMinisterio: !prev.mostrarEscalaMinisterio,
            }))
          }
        />
      </div>

      <div className="merit-calculator-row">
        <label>
          <strong>Nota Final:</strong>
        </label>
        <input
          type="number"
          value={formState.notaFinal}
          min={0}
          max={maxNotaFinal}
          step={0.1}
          placeholder="Aquí aparece la nota final. Añádela a mano o cálculala arriba"
          className="delayed-col-span-2"
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              notaFinal: controlarLimites(e.target.value, 0, maxNotaFinal) || 0,
            }))
          }
          onBlur={(e) =>
            setFormState((prev) => ({
              ...prev,
              notaFinal: controlarLimites(e.target.value, 0, maxNotaFinal) || 0,
            }))
          }
        />

        <button
          className="col-span-2"
          type="button"
          onClick={calcularAciertosDesdeNota}
        >
          Calcular Aciertos Psicotécnicos
        </button>
      </div>

      {formState.mostrarAyuda && (
        <div className="help-block" style={{ marginTop: "1em" }}>
          <div>Nosotros podemos ayudarte a mejorar esa nota.</div>
          <a href="https://api.whatsapp.com/send?phone=34628900407">
            Contáctanos <FaWhatsapp />
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
      </div>

      <div className="merit-calculator-row">
        <label className="col-span-2">
          <strong>Misiones internacionales (0.5 ptos c/u):</strong>
        </label>
        <input
          type="number"
          value={formState.misiones}
          min={0}
          step={1}
          className="input-field missions col-span-2"
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              misiones: controlarLimites(e.target.value, 0, 99) || 0,
            }))
          }
        />
      </div>

      <div className="merit-calculator-row">
        <label className="col-span-2">
          <strong>Años (o fracción) de servicio (0.25 ptos/año):</strong>
        </label>
        <input
          type="number"
          value={formState.servicio}
          min={0}
          step={0.01}
          className="input-field service col-span-2"
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              servicio: controlarLimites(e.target.value, 0, 99) || 0,
            }))
          }
        />
      </div>

      <footer className="merit-calculator-footer">
        Powered by
        <img src="/common/AdcWhiteLogo.png" />
      </footer>
    </form>
  );
}
