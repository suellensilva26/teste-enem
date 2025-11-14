export type Question = {
  id: number
  text: string
  options: string[]
  weights: number[] // Peso de cada resposta (quanto maior, mais crítico)
}

export const questions: Question[] = [
  {
    id: 0,
    text: "Você estuda Física há meses, mas ainda erra questões básicas de movimento? Ou você REALMENTE não entende os conceitos fundamentais?",
    options: [
      "Sim, erro questões básicas mesmo estudando muito",
      "Às vezes erro, mas acho que entendo",
      "Não, geralmente acerto questões básicas",
      "Física é minha matéria forte"
    ],
    weights: [10, 6, 3, 1]
  },
  {
    id: 1,
    text: "Quando você lê uma questão de Matemática, quantas vezes precisa reler para entender o que está sendo pedido?",
    options: [
      "3 ou mais vezes - sempre fico confuso",
      "2 vezes - preciso reler para ter certeza",
      "1 vez - entendo na primeira leitura",
      "Entendo imediatamente, sem reler"
    ],
    weights: [10, 7, 4, 1]
  },
  {
    id: 2,
    text: "Na redação, você sabe EXATAMENTE como estruturar cada parágrafo para garantir nota máxima? Ou você 'chuta' a estrutura?",
    options: [
      "Não sei bem, vou improvisando",
      "Tenho uma ideia geral, mas não é certeza",
      "Sei a estrutura, mas não sei se está perfeita",
      "Tenho a estrutura perfeita decorada"
    ],
    weights: [10, 8, 5, 2]
  },
  {
    id: 3,
    text: "Você já perdeu pontos em questões que SABIA a resposta, mas errou por falta de atenção ou interpretação errada?",
    options: [
      "Sim, acontece MUITO - perco vários pontos assim",
      "Às vezes acontece, é frustrante",
      "Raramente acontece",
      "Quase nunca, sou bem cuidadoso"
    ],
    weights: [9, 6, 3, 1]
  },
  {
    id: 4,
    text: "Quando você não sabe a resposta de uma questão, você chuta aleatoriamente ou tem uma estratégia para aumentar suas chances?",
    options: [
      "Chuto aleatoriamente, sem estratégia",
      "Tento eliminar algumas alternativas, mas sem método",
      "Tenho uma estratégia básica de chute",
      "Tenho técnicas avançadas de chute inteligente"
    ],
    weights: [8, 6, 4, 1]
  },
  {
    id: 5,
    text: "Você sente que passa MUITO tempo estudando, mas seus resultados não melhoram na mesma proporção?",
    options: [
      "Sim, estudo muito e não vejo resultado",
      "Às vezes sinto isso",
      "Meus resultados melhoram conforme estudo",
      "Estudo pouco e tenho bons resultados"
    ],
    weights: [9, 6, 3, 2]
  },
  {
    id: 6,
    text: "Faltam 48 horas para o ENEM. Você está se sentindo preparado ou está em PÂNICO?",
    options: [
      "Pânico total - não estou pronto",
      "Ansioso, mas ainda tenho esperança",
      "Nervoso, mas confiante",
      "Totalmente preparado e confiante"
    ],
    weights: [10, 7, 4, 1]
  }
]

