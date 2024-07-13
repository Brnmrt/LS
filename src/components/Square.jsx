import React from "react";

function Square({ value, onSquareClick }) {
  // Componente funcional Square, que recebe as propriedades value e onSquareClick
  return (
    <button className="square" onClick={onSquareClick}>
      {value} {/* Exibe o valor do quadrado */}
    </button>
  );
}

export default Square; // Exporta o componente Square como padrão
