export default function calcularVencedorMiniTabs(quadrados) {
  // Função para calcular o vencedor do jogo mini tabuleiro
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

  // Percorre todas as linhas
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Verifica se há um vencedor na linha atual
    if (
      quadrados[a] && // Verifica se o quadrado a está preenchido
      quadrados[a] === quadrados[b] && // Verifica se o valor nos quadrados a, b e c são iguais
      quadrados[a] === quadrados[c]
    ) {
      return quadrados[a]; // Retorna o valor do vencedor (X ou O)
    }
  }
  if(!quadrados.includes(null)){ // Se ninguém ganhar e o mini-tabuleiro estiver preenchido, devolve Empate
    return 'E'; 
  }
}
