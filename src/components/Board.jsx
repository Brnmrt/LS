import React from "react";
import Quadrado from "./Quadrado";
import "./Board.css";

function Board({ xIsNext, calcularVencedorMiniTabs, quadrados, onPlay }) {
  // Função chamada quando um quadrado é clicado
  function handleClick(i) {
    // Verifica se há um vencedor ou se o quadrado já está preenchido
    if (calcularVencedorMiniTabs(quadrados) || quadrados[i]) {
      return;
    }

    // Copia o array de quadrados atual para fazer alterações
    const boardState = quadrados.slice();
    // Insere o símbolo "X" ou "O" no quadrado clicado, dependendo de quem é o próximo jogador
    if (xIsNext) {
      boardState[i] = "X";
    } else {
      boardState[i] = "O";
    }

    // Chama a função de callback para informar que houve uma jogada
    onPlay(boardState);
  }

  // Verifica se há um vencedor
  const winner = calcularVencedorMiniTabs(quadrados);

  // Renderiza o componente do tabuleiro
  return (
    <div className="board">
      <div className="board-row">
        {/* Renderiza os quadrados */}
        {quadrados.map((value, i) => (
          <Quadrado key={i} value={value} onQuadradoClick={() => handleClick(i)} />
        ))}
      </div>
      {/* Renderiza a sobreposição do vencedor, se houver */}
      {winner && (
        <div className={`winner-overlay ${winner}`}>
          {" "}
          {/* Adiciona a classe do vencedor para estilização */}
          {winner}
        </div>
      )}
    </div>
  );
}

export default Board;
