"use client";

import React, { useState } from "react";
import "./Navbar.css";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { SOCIAL_MEDIA } from "@/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="imgSection">
        <img
          src="/common/AdcWhiteLogo.png"
          alt="Logo Academia de Combate"
          width={85}
          height={105}
        />
      </div>

      <button
        className="menuToggleBtn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      <div className={`buttonSection ${menuOpen ? "open" : ""}`}>
        <a className="btnTeam" href="/team" onClick={() => setMenuOpen(false)}>
          Equipo
        </a>
        <a
          className="btnLogin"
          href="/login"
          onClick={() => setMenuOpen(false)}
        >
          Inicia Sesión
        </a>
        <a
          className="btnStartNow"
          href={SOCIAL_MEDIA.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Empieza ahora <FiArrowRight />
        </a>
      </div>
    </nav>
  );
}
