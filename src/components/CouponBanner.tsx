import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

type CouponBannerProps = {
  onApply: () => void
  visible: boolean
}

function CouponBanner({ onApply, visible }: CouponBannerProps) {
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutos em segundos
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    if (visible && !applied) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [visible, applied])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs.toString().padStart(2, '0')}s`
  }

  const handleApply = () => {
    setApplied(true)
    onApply()
    
    // Vibração no mobile (se suportado)
    if ('vibrate' in navigator) {
      navigator.vibrate(200)
    }
  }

  if (!visible) return null

  return (
    <AnimatePresence>
      {!applied && timeLeft > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
        >
          {/* CUPOM COM FUNDO VERDE VISÍVEL */}
          <div className="bg-green-500 border-2 border-green-300 rounded-lg p-6 shadow-2xl animate-pulse">
            <p className="text-black font-black text-center text-lg mb-3">
              🎟️ CUPOM AUTOMÁTICO GERADO!
            </p>
            <div className="bg-black text-yellow-400 text-center py-4 rounded-lg mb-4 font-black text-xl">
              -R$ 100 DE DESCONTO
            </div>
            <p className="text-center text-black font-bold mb-4 text-lg">
              Válido por: <span className="text-2xl">{formatTime(timeLeft)}</span>
            </p>
            <button
              onClick={handleApply}
              className="w-full bg-black text-green-400 py-4 rounded-lg font-black text-lg hover:bg-gray-800 transition active:scale-95 min-h-[56px]"
            >
              ✅ APLICAR CUPOM AGORA
            </button>
          </div>
        </motion.div>
      )}
      
      {applied && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div className="bg-green-600 border-2 border-green-400 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3 text-white font-black text-lg justify-center">
              <span className="text-2xl">✅</span>
              <span>Cupom aplicado com sucesso!</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CouponBanner
