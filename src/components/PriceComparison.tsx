import { motion } from 'framer-motion'

type PriceComparisonProps = {
  onContinue: () => void
}

function PriceComparison({ onContinue }: PriceComparisonProps) {
  const originalPrice = 147.90
  const currentPrice = 47.90

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Quanto Custa NÃO Fazer Isso?
          </h1>
          <p className="text-xl text-gray-300">
            Vamos fazer uma comparação <span className="font-bold text-yellow-400">honesta</span>
          </p>
        </motion.div>

        {/* O que você vai receber */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8 border-2 border-green-500/50"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-white text-center">
            ✅ O Que Você Vai Receber:
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 bg-green-900/30 rounded-lg p-4">
              <span className="text-2xl">📚</span>
              <span className="text-lg text-gray-200">5 Ebooks específicos para suas fraquezas</span>
            </div>
            <div className="flex items-center gap-4 bg-green-900/30 rounded-lg p-4">
              <span className="text-2xl">🧠</span>
              <span className="text-lg text-gray-200">Técnicas neurológicas comprovadas</span>
            </div>
            <div className="flex items-center gap-4 bg-green-900/30 rounded-lg p-4">
              <span className="text-2xl">🎲</span>
              <span className="text-lg text-gray-200">8 técnicas de chute inteligente</span>
            </div>
            <div className="flex items-center gap-4 bg-green-900/30 rounded-lg p-4">
              <span className="text-2xl">♾️</span>
              <span className="text-lg text-gray-200">Acesso vitalício (para sempre)</span>
            </div>
            <div className="flex items-center gap-4 bg-green-900/30 rounded-lg p-4">
              <span className="text-2xl">💬</span>
              <span className="text-lg text-gray-200">Suporte via WhatsApp</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-center border-2 border-green-400">
            <div className="text-3xl font-black text-white mb-2">
              Potencial de Ganho: +199 PONTOS
            </div>
            <div className="text-lg text-green-100">
              Baseado nas suas fraquezas descobertas
            </div>
          </div>
        </motion.div>

        {/* Comparação de Preços */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 mb-8 border-2 border-yellow-500/50"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-white text-center">
            💸 R$ {currentPrice} é Menos Que:
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-red-900/30 rounded-lg p-5 border-l-4 border-red-500">
              <div>
                <div className="font-bold text-red-400 text-lg">1 dia de cursinho</div>
                <div className="text-sm text-gray-400">Aulas presenciais ou online</div>
              </div>
              <div className="text-2xl font-black text-white">R$ 150</div>
            </div>

            <div className="flex items-center justify-between bg-yellow-900/30 rounded-lg p-5 border-l-4 border-yellow-500">
              <div>
                <div className="font-bold text-yellow-400 text-lg">3 meses de Netflix</div>
                <div className="text-sm text-gray-400">Entretenimento vs. Seu futuro</div>
              </div>
              <div className="text-2xl font-black text-white">R$ 87</div>
            </div>

            <div className="flex items-center justify-between bg-purple-900/30 rounded-lg p-5 border-l-4 border-purple-500">
              <div>
                <div className="font-bold text-purple-400 text-lg">1 jantar em restaurante</div>
                <div className="text-sm text-gray-400">Uma refeição vs. Sua aprovação</div>
              </div>
              <div className="text-2xl font-black text-white">R$ 120</div>
            </div>

            <div className="flex items-center justify-between bg-red-900/50 rounded-lg p-5 border-l-4 border-red-600">
              <div>
                <div className="font-bold text-red-400 text-lg">1 ANO da sua vida</div>
                <div className="text-sm text-gray-400">O que você vai perder reprovando</div>
              </div>
              <div className="text-2xl font-black text-red-300">INESTIMÁVEL</div>
            </div>
          </div>
        </motion.div>

        {/* Preço com Desconto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-red-900/80 to-yellow-900/80 rounded-2xl p-8 mb-8 border-4 border-red-500 glow-red"
        >
          <div className="text-center">
            <div className="text-sm text-yellow-400 font-bold mb-2">OFERTA ESPECIAL - 50% OFF</div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-3xl text-gray-400 line-through">R$ {originalPrice}</span>
              <span className="text-5xl md:text-6xl font-black text-white">R$ {currentPrice}</span>
            </div>
            <div className="text-lg text-gray-300">
              Economia de <span className="font-bold text-green-400">R$ {originalPrice - currentPrice}</span> hoje
            </div>
            <div className="mt-4 text-sm text-red-300 font-bold">
              ⚠️ Esta oferta expira em 24 horas
            </div>
          </div>
        </motion.div>

        {/* Objection Handling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-blue-900/30 rounded-xl p-6 mb-8 border-l-4 border-blue-500"
        >
          <p className="text-gray-200 leading-relaxed">
            <span className="font-bold text-blue-400">Você pode pensar:</span> "Não vai funcionar comigo."
            <br />
            <span className="font-bold text-green-400">Mas essas técnicas funcionaram com 9.203 pessoas.</span>
            <br />
            Por que você seria diferente? <span className="font-bold text-white">(Spoiler: você não é)</span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black text-xl md:text-2xl px-8 py-6 rounded-full shadow-2xl glow-green transition-all duration-300"
        >
          🛒 GARANTIR AGORA POR R$ {currentPrice}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default PriceComparison

