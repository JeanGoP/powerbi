import React, { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import "./botonFlotante.css";

const BotonFlotante = () => {
  const [hover, setHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`boton-flotante ${hover ? "hover" : ""} ${isVisible ? "show" : "hide"}`}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`icono ${hover ? "hover" : ""}`}>
        <FaAngleDoubleUp size={28} />
      </div>
    </div>
  );
};

export default BotonFlotante;
