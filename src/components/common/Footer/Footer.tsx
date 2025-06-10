import React from "react";
import "./Footer.css";
import {
  FaArrowUp,
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { SOCIAL_MEDIA } from "@/constants";

function Footer({ year }: { year: number }) {
  return (
    <div className="footer">
      <div className="footer-body">
        <div className="col col-1">
          <img
            src="/common/AdcWhiteLogo.png"
            alt="Logo Academia de Combate"
            width={105}
            height={125}
          />
          <div className="footer-body-description">
            Formando a los futuros militares, enseñándoles de manera realista y
            adecuada cómo ser verdaderos compañeros de armas españoles.{" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
              alt="Bandera de España"
              style={{
                width: "2em",
                height: "1.3em",
                verticalAlign: "middle",
                borderRadius: "2px",
                marginTop: "1em",
              }}
            />
          </div>
          <div className="footer-rrss">
            <a href={SOCIAL_MEDIA.instagram} target="_blank">
              <FaInstagram />
            </a>
            <a href={SOCIAL_MEDIA.tiktok} target="_blank">
              <FaTiktok />
            </a>
            <a href={SOCIAL_MEDIA.whatsapp} target="_blank">
              <FaWhatsapp />
            </a>
            <a href={SOCIAL_MEDIA.youtube} target="_blank">
              <FaYoutube />
            </a>
            <a href={SOCIAL_MEDIA.spotify} target="_blank">
              <FaSpotify />
            </a>
          </div>
          <a href="/#inicio" className="footer-button">
            Volver al inicio
            <FaArrowUp />
          </a>
        </div>
        <div className="col col-2">
          <h5>Indice del sitio</h5>
          <a href="#caracteristicas-adc">Caracteristicas de la Academia</a>
          <a href="#calcula-baremo">Calcula tu baremo</a>
          <a href="#empleos">Empleos de los ejércitos</a>
          <a href="#ventajas-adc">Ventajas de la Academia</a>
          <a href="#nosotros">Sobre Nosotros</a>
          <a href="#planes">Planes disponibles</a>
        </div>
        <div className="col col-3">
          <h5>Legal</h5>
          <a href="/politica-de-privacidad">Política de Privacidad</a>
          <a href="/terminos-y-condiciones">Términos y condiciones</a>
        </div>
      </div>
      <div className="footer-body-water-mark">
        <p>&copy; Academia de combate {year}</p>
        <p>Todos los derechos reservados.</p>
        <p>
          Hecho con cariño desde <span about="Canarias">⬜️🟦🟨</span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
