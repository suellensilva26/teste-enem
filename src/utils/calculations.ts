import { Answer } from '../components/QuizApp'
import { questions } from '../data/questions'

export type QuizResult = {
  failChance: number // % de chance de reprovar
  weaknesses: {
    name: string
    pointsLost: number
  }[]
  totalPointsLost: number
  strengths: string[]
}

const weaknessNames = [
  "Interpretação de Texto e Questões",
  "Física Moderna e Conceitos Fundamentais",
  "Estrutura e Técnica de Redação",
  "Atenção e Precisão em Respostas",
  "Estratégias de Chute Inteligente",
  "Métodos de Estudo Eficientes",
  "Gestão de Ansiedade e Confiança"
]

export function calculateResult(answers: Answer[]): QuizResult {
  let totalWeight = 0
  
  answers.forEach(answer => {
    const question = questions[answer.questionId]
    if (question) {
      totalWeight += question.weights[answer.answerIndex] || 0
    }
  })

  // Normalizar para 0-100 (peso máximo possível é ~70, então multiplicamos)
  const normalizedScore = Math.min(100, (totalWeight / 70) * 100)
  
  // Chance de reprovar (quanto maior o score, maior a chance)
  const failChance = Math.round(normalizedScore)

  // Identificar fraquezas baseado nas respostas mais críticas
  // FIXO: Usar valores determinísticos baseados no totalWeight para evitar alternância
  const weaknesses: { name: string; pointsLost: number }[] = []
  
  // Valores fixos baseados no índice para evitar alternância
  const fixedPoints = [57, 55, 53, 47, 52, 50, 48] // Valores fixos para cada fraqueza
  
  answers.forEach((answer, index) => {
    const question = questions[answer.questionId]
    if (question && question.weights[answer.answerIndex] >= 7) {
      const pointsLost = fixedPoints[index % fixedPoints.length] || 50
      weaknesses.push({
        name: weaknessNames[index] || `Fraqueza ${index + 1}`,
        pointsLost
      })
    }
  })

  // Garantir pelo menos 3 fraquezas com valores fixos
  const usedNames = new Set(weaknesses.map(w => w.name))
  let weaknessIndex = 0
  
  while (weaknesses.length < 3 && weaknessIndex < weaknessNames.length) {
    const weaknessName = weaknessNames[weaknessIndex]
    if (!usedNames.has(weaknessName)) {
      const pointsLost = fixedPoints[weaknessIndex % fixedPoints.length] || 50
      weaknesses.push({
        name: weaknessName,
        pointsLost
      })
      usedNames.add(weaknessName)
    }
    weaknessIndex++
  }

  // Limitar a 3 fraquezas principais
  const topWeaknesses = weaknesses
    .sort((a, b) => b.pointsLost - a.pointsLost)
    .slice(0, 3)

  const totalPointsLost = topWeaknesses.reduce((sum, w) => sum + w.pointsLost, 0)

  return {
    failChance,
    weaknesses: topWeaknesses,
    totalPointsLost,
    strengths: [] // Não vamos focar em pontos fortes aqui
  }
}

