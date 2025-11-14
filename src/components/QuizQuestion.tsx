import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Question } from '../data/questions'

type QuizQuestionProps = {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswer: (answerIndex: number) => void
}

function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer }: QuizQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  
  // VALIDAÇÃO CRÍTICA: Verificar se question existe
  useEffect(() => {
    console.log('=== DEBUG QUIZ ===');
    console.log('Question:', question);
    console.log('Options:', question?.options);
    console.log('Question Number:', questionNumber);
    
    if (!question) {
      console.error('❌ ERRO: Question é undefined!');
      return;
    }
    
    if (!question.options || !Array.isArray(question.options)) {
      console.error('❌ ERRO: Options não é um array válido!');
      return;
    }
    
    if (question.options.length === 0) {
      console.error('❌ ERRO: Options está vazio!');
      return;
    }
    
    // Verificar cada opção
    question.options.forEach((option, index) => {
      if (!option || typeof option !== 'string' || option.trim().length === 0) {
        console.error(`❌ ERRO: Opção ${index} está vazia ou inválida:`, option);
      } else {
        console.log(`✅ Opção ${index}: "${option.substring(0, 30)}..."`);
      }
    });
  }, [question, questionNumber]);
  
  // VALIDAÇÃO: Garantir que question e options existem
  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-danger">
          <p className="text-2xl mb-2">⚠️</p>
          <p className="font-bold">Erro: Pergunta não encontrada</p>
        </div>
      </div>
    );
  }
  
  if (!question.options || !Array.isArray(question.options) || question.options.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-danger">
          <p className="text-2xl mb-2">⚠️</p>
          <p className="font-bold">Erro: Opções de resposta inválidas</p>
        </div>
      </div>
    );
  }
  
  const progress = (questionNumber / totalQuestions) * 100

  const handleSelect = (index: number, optionText: string) => {
    // VALIDAÇÃO: Garantir que o índice é válido
    if (index < 0 || index >= question.options.length) {
      console.error('❌ ERRO: Índice de resposta inválido:', index);
      return;
    }
    
    console.log('=== RESPOSTA SELECIONADA ===');
    console.log('Índice:', index);
    console.log('Texto:', optionText);
    console.log('Peso:', question.weights?.[index] || 0);
    
    setSelectedIndex(index)
    
    // Vibração no mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
    
    // Auto-avançar após 1.2s (reduzido para melhor UX)
    setTimeout(() => {
      console.log('⏩ Avançando para próxima pergunta...');
      onAnswer(index)
      setSelectedIndex(null) // Resetar para próxima pergunta
    }, 1200)
  }

  const categoryIcons = ['📚', '🧠', '🎯', '📊', '⚡', '💡', '🚨']

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 pb-8 max-w-md mx-auto">
      {/* Header com Progresso */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gold text-xs font-bold">
            ⏳ Pergunta {questionNumber} de {totalQuestions}
          </span>
          <span className="text-gray-400 text-xs">
            {Math.round(progress)}% completo
          </span>
        </div>
        
        {/* Barra de Progresso */}
        <div className="w-full bg-gray-900 border border-gold/20 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-gold via-gold-light to-gold"
            style={{ boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}
          />
        </div>
      </div>

      {/* Ícone da Categoria */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-5xl text-center mb-5"
      >
        {categoryIcons[questionNumber - 1] || '📚'}
      </motion.div>

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col"
      >
        {/* Pergunta */}
        <div className="bg-gray-900 border-2 border-gold/40 rounded-xl p-5 mb-6 shadow-lg">
          <h2 className="text-base md:text-lg font-bold text-white leading-relaxed break-words">
            {question.text}
          </h2>
        </div>

        {/* Answer Options - VALIDAÇÃO RIGOROSA */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            // VALIDAÇÃO CRÍTICA: Verificar que a opção é válida
            if (!option || typeof option !== 'string' || option.trim().length === 0) {
              console.error(`❌ Opção ${index} inválida:`, option);
              return null; // Não renderizar opções vazias
            }
            
            const isSelected = selectedIndex === index
            const optionText = option.trim() // Remover espaços extras
            
            return (
              <button
                key={`option-${questionNumber}-${index}`}
                onClick={() => handleSelect(index, optionText)}
                disabled={selectedIndex !== null}
                className={`
                  w-full text-left rounded-lg p-4 
                  transition-all duration-300 
                  min-h-[60px] flex items-center gap-3
                  border-2
                  ${isSelected
                    ? 'border-yellow-400 bg-yellow-400 bg-opacity-20 text-yellow-300'
                    : 'border-gray-600 bg-gray-900 text-white hover:border-yellow-400'
                  }
                  ${selectedIndex === null ? 'active:scale-95 cursor-pointer' : 'cursor-not-allowed opacity-50'}
                `}
              >
                <div className="flex items-center gap-3 w-full">
                  {/* Letra da opção */}
                  <div
                    className={`
                      flex-shrink-0 w-9 h-9 rounded-full 
                      flex items-center justify-center 
                      font-black text-sm
                      border-2 transition-all duration-300
                      ${isSelected
                        ? 'bg-black text-gold border-black'
                        : 'bg-gold/10 text-gold border-gold/50'
                      }
                    `}
                  >
                    {isSelected ? '✓' : String.fromCharCode(65 + index)}
                  </div>
                  
                  {/* Texto da opção - WORD WRAP GARANTIDO */}
                  <span 
                    className={`
                      flex-1 text-sm md:text-base font-medium leading-snug
                      break-words overflow-wrap-anywhere
                      ${isSelected ? 'text-black font-bold' : 'text-white'}
                    `}
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto'
                    }}
                  >
                    {optionText}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Status de Seleção */}
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-3 bg-gold/10 rounded-lg border border-gold/30"
          >
            <p className="text-gold text-sm font-bold">
              ✓ Resposta registrada! Avançando...
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs">
            Respondendo: {questionNumber}/{totalQuestions} perguntas
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default QuizQuestion
