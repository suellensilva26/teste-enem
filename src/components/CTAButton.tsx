import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { trackAddToCart, trackPurchase } from '../utils/facebookPixel'

type CTAButtonProps = {
  timeRemaining: number
  price?: number
}

function CTAButton({ timeRemaining, price = 97 }: CTAButtonProps) {
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    // Simular pessoas comprando (efeito de escassez)
    const interval = setInterval(() => {
      setClicks(prev => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)
  const seconds = timeRemaining % 60

  const formatTime = (h: number, m: number, s: number) => {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const handlePurchase = () => {
    // Facebook Pixel - AddToCart e Purchase
    trackAddToCart()
    trackPurchase(price)
    
    // Vibração no mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100])
    }
    
    // Redirecionar para Kiwify (não abrir em nova aba)
    window.location.href = 'https://pay.kiwify.com.br/za05nt2';
  }

  const remainingSpots = Math.max(0, 100 - clicks)

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 max-w-md mx-auto pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6"
        >
          <div className="text-5xl mb-2">✨</div>
          <h1 className="text-2xl md:text-3xl font-black mb-2 text-gold text-shadow-gold">
            SUA APROVAÇÃO COMEÇA AGORA
          </h1>
        </motion.div>

        {/* Timer de Urgência */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-danger to-danger/80 rounded-xl p-4 mb-6 border-2 border-danger glow-red text-center"
        >
          <div className="text-3xl mb-2">⏰</div>
          <div className="text-xs text-white mb-2">OFERTA EXPIRA EM:</div>
          <motion.div
            key={timeRemaining}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-3xl md:text-4xl font-black text-white font-mono"
          >
            {formatTime(hours, minutes, seconds)}
          </motion.div>
          <div className="text-xs text-white mt-2">
            Faltam apenas {hours} horas para o ENEM!
          </div>
        </motion.div>

        {/* Escassez */}
        {remainingSpots > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gold/20 rounded-xl p-4 mb-6 border-2 border-gold text-center"
          >
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-gold font-black text-lg mb-1">
              ÚLTIMAS {remainingSpots} VAGAS DISPONÍVEIS
            </div>
            <div className="text-white text-sm">
              {clicks} pessoas já garantiram nas últimas horas
            </div>
          </motion.div>
        )}

        {/* Header Melhorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-6 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            🚀 Desbloqueie Seu Acesso Agora
          </h2>
          <p className="text-lg mb-4">
            Você receberá:
          </p>
        </motion.div>

        {/* Produto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-gold/30"
        >
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎓</div>
            <h2 className="text-xl font-black mb-2 text-white">
              NeuroHack ENEM 2025
            </h2>
            <p className="text-gray-300 text-sm">
              Sua última chance antes do ENEM
            </p>
          </div>

          {/* Lista de Benefícios Detalhada */}
          <div className="bg-gray-900 rounded-xl p-4 mb-6">
            <ul className="space-y-3 text-white text-sm text-left">
              <li className="flex items-start gap-2">
                <span className="text-green-400 text-xl">✅</span>
                <span>Acesso ao app completo (40+ aulas)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 text-xl">✅</span>
                <span>100+ simulações com padrões do ENEM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 text-xl">✅</span>
                <span>IA para corrigir suas redações</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 text-xl">✅</span>
                <span>Método Feynman + Active Recall</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 text-xl">✅</span>
                <span>Protocolo 30 dias para vitória</span>
              </li>
            </ul>
          </div>

          {/* Preço */}
          <div className="bg-gradient-to-r from-gold to-gold-light rounded-xl p-4 mb-6 text-center border-2 border-gold-light">
            <div className="text-xs text-black mb-1">DE R$ 197 POR APENAS:</div>
            <motion.div
              key={price}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-black text-black mb-1"
            >
              R$ {price}
            </motion.div>
            <div className="text-xs text-black/80">Economia de R$ {197 - price}</div>
          </div>

          {/* Lista de Benefícios */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-success text-xl">✅</span>
              <span>App Premium NeuroHack (vitalício)</span>
            </div>
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-success text-xl">✅</span>
              <span>5 Ebooks exclusivos (HOJE)</span>
            </div>
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-success text-xl">✅</span>
              <span>8 Técnicas de chute (HOJE)</span>
            </div>
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-success text-xl">✅</span>
              <span>Suporte WhatsApp (HOJE)</span>
            </div>
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-success text-xl">✅</span>
              <div>
                <span>2 Aulas ao vivo (HOJE + AMANHÃ)</span>
                <span className="text-red-400 text-xs block font-bold">🎯 BÔNUS EXCLUSIVO: Apenas para os 15 primeiros que comprarem</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preço Destacado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 mb-6 text-center text-white"
        >
          <p className="text-3xl md:text-4xl font-black mb-4">
            R$ {price},00
          </p>
          <p className="text-sm opacity-90 mb-4">
            Garantia de 7 dias. Sem risco de perda.
          </p>
        </motion.div>

        {/* Botão Principal CTA - CORES QUENTES */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePurchase}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-black text-xl md:text-2xl px-6 py-6 rounded-lg hover:from-red-600 hover:to-orange-600 transition active:scale-95 shadow-lg shadow-red-500/50 min-h-[60px] mb-4"
        >
          💳 Adquirir Acesso Agora
        </motion.button>

        {/* Trust Signals */}
        <div className="space-y-2 text-center text-xs text-gray-400 mb-6">
          <div>🔒 Pagamento 100% seguro</div>
          <div>⚡ Acesso imediato após compra</div>
          <div>💬 Suporte disponível 24/7</div>
          <div className="text-success">🛡️ Reembolso em 7 dias</div>
        </div>

        {/* Última Urgência */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-danger font-bold text-sm mb-2">
            ⚠️ ENEM é DOMINGO. Você não tem mais tempo para pensar.
          </p>
          <p className="text-gray-300 text-xs">
            A decisão que você tomar AGORA vai definir seu futuro.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CTAButton
