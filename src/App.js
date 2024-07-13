import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import calcularVencedorMiniTabs from "./components/calcularVencedorMiniTabs";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Game() {
  // O estado "miniTabs" representa o estado atual de todos os tabuleiros do jogo que é uma matriz 2D com 9 elementos, onde cada um representa um tabuleiro individual.
  const [miniTabs, setMiniTabs] = useState(Array(9).fill(Array(9).fill(null)));

  // Os estados "jogador1" e "jogador2" representam os nomes dos jogadores.
  const [jogador1, setJogador1] = useState("");
  const [jogador2, setJogador2] = useState("");

  // O estado "jogadorX" representa o jogador que está a usar o símbolo "X".
  const [jogadorX, setJogadorX] = useState(null);

  // O estado "gameStarted" indica se o jogo começou ou não.
  const [gameStarted, setGameStarted] = useState(false);

  // O estado "jogadorComeca" representa o jogador que fará a primeira jogada.
  const [jogadorComeca, setJogadorComeca] = useState(null);

  // O estado "miniTabVencedor" guarda o vencedor de cada tabuleiro individual.
  const [miniTabVencedor, setminiTabVencedor] = useState(Array(9).fill(null));

  // O estado "vencedorFinal" guarda o vencedor final do jogo.
  const [vencedorFinal, setVencedorFinal] = useState(null);

  // Os estados "jogador1Vence" e "jogador2Vence" guardam o número de vitórias de cada jogador.
  const [jogador1Vence, setJogador1Vence] = useState(0);
  const [jogador2Vence, setJogador2Vence] = useState(0);

  // Os estados "jogador1Tempo" e "jogador2Tempo" representam o tempo restante de cada jogador.
  const [jogador1Tempo, setJogador1Tempo] = useState(90);
  const [jogador2Tempo, setJogador2Tempo] = useState(90);

  // Calcula o número total de jogadas feitas em todos os tabuleiros (contar quantos quadrados estao vazios)
  const jogadasTotais = miniTabs
    .flat()
    .filter((quadrado) => quadrado !== null).length;

  // Verifica se é a vez do jogador X
  const xIsNext =
    jogadorComeca === jogadorX
      ? jogadasTotais % 2 === 0
      : jogadasTotais % 2 !== 0;

  // Atualiza os timers dos jogadores
  useEffect(() => {
    let intervaloTempo = null;

    if (!vencedorFinal && gameStarted) {
      // Se o jogo não tiver acabado e tiver começado
      intervaloTempo = setInterval(() => {
        // Atualiza o timer a cada segundo
        if (xIsNext) {
          // Se for a vez do jogador X
          setJogador1Tempo((time) => {
            // Atualiza o timer do jogador X
            if (time > 0) return time - 1;
            // Se o tempo não tiver acabado, decrementa o timer
            else {
              // Se o tempo tiver acabado, determina o vencedor final
              clearInterval(intervaloTempo); // e para o timer
              setVencedorFinal(jogador2); //  e para o timer
              return 0;
            }
          });
        } else {
          // Se for a vez do jogador O
          setJogador2Tempo((time) => {
            // Atualiza o timer do jogador O
            if (time > 0) return time - 1;
            // Se o tempo não tiver acabado, decrementa o timer
            else {
              // Se o tempo tiver acabado, determina o vencedor final
              clearInterval(intervaloTempo);
              setVencedorFinal(jogador1);
              return 0;
            }
          });
        }
      }, 1000); // Atualiza o timer a cada segundo
    } else {
      clearInterval(intervaloTempo);
    }

    return () => clearInterval(intervaloTempo); // Retorna a função de limpeza
  }, [vencedorFinal, xIsNext, gameStarted, jogador1, jogador2]); // Executa o efeito apenas quando esses estados mudarem

  // Função chamada quando um jogador faz uma jogada
  function Jogadas(indiceTabs, boardState) {
    // Recebe o índice do tabuleiro e o estado atual do tabuleiro
    if (vencedorFinal) {
      return;
    } // Se o jogo já tiver um vencedor , não faz nada

    // Atualiza o estado dos mini-tabuleiros após uma jogada
    const nextBoards = miniTabs.map((board, index) => {
      if (index === indiceTabs) {
        // Se o índice do tabuleiro for igual ao índice do tabuleiro atual
        return boardState; // Atualiza o estado do tabuleiro atual
      } else {
        return board; // Mantém o estado do tabuleiro
      }
    });
    setMiniTabs(nextBoards);

    // Verifica se há um vencedor no mini-tabuleiro atual
    const vencedor = calcularVencedorMiniTabs(boardState);
    if (vencedor) {
      // Atualiza o estado dos vencedores dos tabuleiros individuais
      const nextMiniTabsVencedor = miniTabVencedor.map((value, index) => {
        if (index === indiceTabs) {
          return vencedor;
        } else {
          return value;
        }
      });

      setminiTabVencedor(nextMiniTabsVencedor);

      function checkVencedorFinal(miniTabVencedor) {
        const lines = [
          [0, 1, 2], // Linhas horizontais
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6], // Linhas verticais
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8], // Linhas diagonais
          [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (
            miniTabVencedor[a] && // Verifica se o minitabuleiro está preenchido
            miniTabVencedor[a] === miniTabVencedor[b] && // Verifica se o valor nos minitabuleiros a, b e c são iguais
            miniTabVencedor[a] === miniTabVencedor[c]
          ) {
            if (miniTabVencedor[a] === "X") {
              if (jogadorX === jogador1) {
                return jogador1;
              } else {
                return jogador2;
              }
            } else {
              if (jogadorX === jogador1) {
                return jogador2;
              } else {
                return jogador1;
              }
            }
          }
        }

        // Verifica o número de minitabuleiros vencidos por cada jogador
        let Xvitorias = 0;
        let Ovitorias = 0;

        miniTabVencedor.forEach((miniTabuleiro) => {
          if (miniTabuleiro === "X") Xvitorias++;
          else if (miniTabuleiro === "O") Ovitorias++;
        });

        // Verifica se todos os mini-tabuleiros estão preenchidos
        const fullTabs = miniTabVencedor.every((value) => value !== null);

        // Se todos os minitabuleiros estiverem preenchidos e houver um empate no número de vitórias, retorna 'Empate'
        if (fullTabs && Xvitorias === Ovitorias) return "Empate";

        // Se todos os minitabuleiros estiverem preenchidos e houver um empate, retorna o nome do jogador com mais vitórias
        if (fullTabs) {
          if (Xvitorias > Ovitorias) {
            if (jogadorX === jogador1) {
              return jogador1;
            } else {
              return jogador2;
            }
          } else {
            if (jogadorX === jogador1) {
              return jogador2;
            } else {
              return jogador1;
            }
          }
        }
        return null; // Retorna null caso não haja um vencedor
      }

      // Determina o jogador vencedor da partida
      let jogadorVencedor; // Determina o jogador vencedor da partida
      if (vencedor === "X") {
        jogadorVencedor = jogadorX;
      } else if (jogadorX === jogador1) {
        jogadorVencedor = jogador2;
      } else {
        jogadorVencedor = jogador1;
      }

      if (jogadorVencedor === jogador1) {
        setJogador1Vence(jogador1Vence + 1);
      } else {
        setJogador2Vence(jogador2Vence + 1);
      }

      // Verifica o vencedor final do jogo
      const vencedorFinal = checkVencedorFinal(nextMiniTabsVencedor);
      setVencedorFinal(vencedorFinal); //
    }
  }

  // Função chamada ao reiniciar o jogo
  function handleReset() {
    // Reinicia todos os estados para os valores iniciais
    setMiniTabs(Array(9).fill(Array(9).fill(null)));

    setGameStarted(false);
    setminiTabVencedor(Array(9).fill(null));
    setVencedorFinal(null);
    setJogador1Vence(0);
    setJogador2Vence(0);
    setJogador1Tempo(90);
    setJogador2Tempo(90);
    setJogador1("");
    setJogador2("");
  }

  // Função chamada para iniciar o jogo
  const iniciarJogo = () => {
    // Verifica se os nomes foram inseridos corretamente
    if (jogador1 !== "" && jogador2 !== "" && jogador1 !== jogador2) {
      // Define aleatoriamente o jogador que fará a primeira jogada
      const randomIndex = Math.floor(Math.random() * 2);
      let quemComeca;
      if (randomIndex === 0) {
        quemComeca = jogador1;
      } else {
        quemComeca = jogador2;
      }

      // Define aleatoriamente o jogador que usará o símbolo "X"
      const randomXIndex = Math.floor(Math.random() * 2);
      let jogadorX;
      if (randomXIndex === 0) {
        jogadorX = jogador1;
      } else {
        jogadorX = jogador2;
      }

      // Atualiza os estados do jogador que faz a primeira jogada e do jogador que usa "X"
      setJogadorX(jogadorX);
      setJogadorComeca(quemComeca);
      setGameStarted(true);
    } else {
      alert("Os nomes têm que ser diferentes e não podem estar vazios!");
    }
  };

  return (
    <div className="game">
      <div className="header">
        <Header />
      </div>
      {!gameStarted ? ( // Se o jogo não tiver começado, mostra os inputs para inserir os nomes dos jogadores
        <div>
          <div className="nomeJogadores">
            {/* Inputs para inserir os nomes dos jogadores */}
            <input
              className="inputs"
              type="text"
              placeholder="Nome do Jogador 1"
              onChange={(e) => setJogador1(e.target.value)}
            />
            <input
              className="inputs"
              type="text"
              placeholder="Nome do Jogador 2"
              onChange={(e) => setJogador2(e.target.value)}
            />

            {/* Botão para iniciar o jogo */}
            <button className="botao" onClick={iniciarJogo}>
              Começar Jogo
            </button>
          </div>
        </div>
      ) : (
        // Se o jogo tiver começado, mostra o tabuleiro
        <>
          <div className="global">
            <div className="esquerda">
              <div className="temporizador">
                <div>
                  <div>
                    {/* Mostra o nome do jogador que faz a primeira jogada */}
                    Tempo {jogador1}: {jogador1Tempo} segundos Tempo {jogador2}:{" "}
                    {jogador2Tempo} segundos
                  </div>
                  {/* Botão de reset */}
                  <button className="botao2" onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
            <div className="ultimatetictactoe">
              <div className="container1">
                <div className="game-board1">
                  <Board // Passa os valores dos estados para o componente Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs} // Determina qual jogador deve jogar
                    quadrados={miniTabs[0]} // Determina o estado dos quadrados
                    onPlay={(boardState) => Jogadas(0, boardState)} // Função chamada ao jogar
                  />
                </div>
                <div className="game-board2">
                  <Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs}
                    quadrados={miniTabs[1]}
                    onPlay={(boardState) => Jogadas(1, boardState)}
                  />
                </div>
                <div className="game-board3">
                  <Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs}
                    quadrados={miniTabs[2]}
                    onPlay={(boardState) => Jogadas(2, boardState)}
                  />
                </div>
              </div>
              <div className="container2">
                <div className="game-board4">
                  <Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs}
                    quadrados={miniTabs[3]}
                    onPlay={(boardState) => Jogadas(3, boardState)}
                  />
                </div>
                <div className="game-board5">
                  <Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs}
                    quadrados={miniTabs[4]}
                    onPlay={(boardState) => Jogadas(4, boardState)}
                  />
                </div>
                <div className="game-board6">
                  <Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs}
                    quadrados={miniTabs[5]}
                    onPlay={(boardState) => Jogadas(5, boardState)}
                  />
                </div>
              </div>
              <div className="container3">
                <div className="game-board7">
                  <Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs}
                    quadrados={miniTabs[6]}
                    onPlay={(boardState) => Jogadas(6, boardState)}
                  />
                </div>
                <div className="game-board8">
                  <Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs}
                    quadrados={miniTabs[7]}
                    onPlay={(boardState) => Jogadas(7, boardState)}
                  />
                </div>
                <div className="game-board9">
                  <Board
                    xIsNext={xIsNext}
                    calcularVencedorMiniTabs={calcularVencedorMiniTabs}
                    quadrados={miniTabs[8]}
                    onPlay={(boardState) => Jogadas(8, boardState)}
                  />
                </div>
              </div>
            </div>
            <div className="direita">
              <p>
                {/* Mostra o vencedor final */}
                <div className="status">
                  {vencedorFinal && <div>Vencedor Final: {vencedorFinal}</div>}
                  {/* Renderização dos jogadores */}
                  <div className="players">
                    <div>
                      Jogador 1 ({jogador1}):{" "}
                      {jogadorX === jogador1 ? "X" : "O"}
                    </div>
                    <div>
                      Jogador 2 ({jogador2}):{" "}
                      {jogadorX === jogador1 ? "O" : "X"}
                    </div>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </>
      )}
      <div className="subFooter">
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
