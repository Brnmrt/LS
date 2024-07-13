import React from "react";

function Quadrado({ value, onQuadradoClick }) {
  // Componente funcional Quadrado, que recebe as propriedades value e onQuadradoClick
  return (
    <button className="quadrado" onClick={onQuadradoClick}>
      {value} {/* Exibe o valor do quadrado */}
    </button>
  );
}

export default Quadrado;
