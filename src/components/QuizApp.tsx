import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from './LandingPage'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import SolutionTeaser from './SolutionTeaser'
import PriceComparison from './PriceComparison'
import UrgencyBanner from './UrgencyBanner'
import CTAButton from './CTAButton'
import { questions } from '../data/questions'
import { calculateResult } from '../utils/calculations'
import { trackCompleteRegistration } from '../utils/facebookPixel'

export type Answer = {
  questionId: number
  answerIndex: number
}

type Screen = 'landing' | 'quiz' | 'result' | 'solution' | 'pricing' | 'cta'

function QuizApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [price, setPrice] = useState(197) // Preço inicial
  const showUrgency = true
  const [timeRemaining, setTimeRemaining] = useState(48 * 60 * 60) // 48 horas em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleStartQuiz = () => {
    setCurrentScreen('quiz')
    setCurrentQuestion(0)
    setAnswers([])
  }

  const handleAnswer = (answerIndex: number) => {
    // VALIDAÇÃO: Garantir que o índice é válido
    const question = questions[currentQuestion]
    if (!question) {
      console.error('❌ ERRO: Pergunta não encontrada:', currentQuestion);
      return;
    }
    
    const weight = question.weights?.[answerIndex] || 0
    
    const newAnswer: Answer = {
      questionId: currentQuestion,
      answerIndex
    }
    
    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)
    
    // LOG DE DEBUG
    console.log('=== RESPOSTA REGISTRADA ===');
    console.log('Pergunta ID:', currentQuestion);
    console.log('Resposta índice:', answerIndex);
    console.log('Peso da resposta:', weight);
    console.log('Total de respostas:', updatedAnswers.length);
    console.log('Todas as respostas:', updatedAnswers);

    // Próxima pergunta ou resultado
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
      }, 500)
    } else {
      trackCompleteRegistration() // Facebook Pixel - CompleteRegistration
      console.log('✅ QUIZ COMPLETO! Total de respostas:', updatedAnswers.length);
      setTimeout(() => {
        setCurrentScreen('result')
      }, 800)
    }
  }

  const handleContinue = (newPrice?: number) => {
    if (newPrice !== undefined) {
      setPrice(newPrice)
    }
    
    if (currentScreen === 'result') {
      setCurrentScreen('solution')
    } else if (currentScreen === 'solution') {
      setCurrentScreen('pricing')
    } else if (currentScreen === 'pricing') {
      setCurrentScreen('cta')
    }
  }

  const result = answers.length === questions.length ? calculateResult(answers) : null

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showUrgency && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <UrgencyBanner timeRemaining={timeRemaining} />
          </motion.div>
        )}

        {currentScreen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage onStart={handleStartQuiz} />
          </motion.div>
        )}

        {currentScreen === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="pt-20"
          >
            <QuizQuestion
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}

        {currentScreen === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResult result={result} onContinue={(price?: number) => handleContinue(price)} />
          </motion.div>
        )}

        {currentScreen === 'solution' && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <SolutionTeaser onContinue={handleContinue} />
          </motion.div>
        )}

        {currentScreen === 'pricing' && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <PriceComparison onContinue={handleContinue} />
          </motion.div>
        )}

        {currentScreen === 'cta' && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <CTAButton timeRemaining={timeRemaining} price={price} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuizApp

