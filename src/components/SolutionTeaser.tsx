import { motion } from 'framer-motion'

type SolutionTeaserProps = {
  onContinue: () => void
}

function SolutionTeaser({ onContinue }: SolutionTeaserProps) {
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
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">
            As Técnicas Que Funcionam
          </h1>
          <p className="text-xl text-gray-300">
            Não são teoria. São <span className="font-bold text-green-400">técnicas comprovadas</span> por milhares de alunos
          </p>
        </motion.div>

        {/* O que são essas técnicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8 border-2 border-blue-500/50"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-white text-center">
            O Que Você Vai Descobrir:
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-blue-900/30 rounded-xl p-6 border-l-4 border-blue-500">
              <span className="text-3xl">📚</span>
              <div>
                <div className="font-bold text-blue-400 text-lg mb-2">5 Ebooks Específicos</div>
                <div className="text-gray-300">
                  Cada ebook foca em uma fraqueza específica que você descobriu. 
                  Não é conteúdo genérico. É <span className="font-bold">direcionado para VOCÊ</span>.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-purple-900/30 rounded-xl p-6 border-l-4 border-purple-500">
              <span className="text-3xl">🧠</span>
              <div>
                <div className="font-bold text-purple-400 text-lg mb-2">Técnicas Neurológicas Comprovadas</div>
                <div className="text-gray-300">
                  Baseadas em estudos de neurociência. Não são "dicas". São <span className="font-bold">métodos científicos</span> que 
                  fazem seu cérebro aprender mais rápido e reter melhor.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-green-900/30 rounded-xl p-6 border-l-4 border-green-500">
              <span className="text-3xl">🎲</span>
              <div>
                <div className="font-bold text-green-400 text-lg mb-2">8 Técnicas de Chute Inteligente</div>
                <div className="text-gray-300">
                  Quando você não sabe a resposta, você não precisa chutar aleatoriamente. 
                  Existem <span className="font-bold">8 técnicas específicas</span> que aumentam suas chances de acertar em até 300%.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-yellow-900/30 rounded-xl p-6 border-l-4 border-yellow-500">
              <span className="text-3xl">⚡</span>
              <div>
                <div className="font-bold text-yellow-400 text-lg mb-2">Aplicação em 2 Minutos</div>
                <div className="text-gray-300">
                  Você não precisa estudar por horas. Cada técnica leva <span className="font-bold">menos de 2 minutos</span> para aprender 
                  e aplicar. Perfeito para quem tem apenas 48 horas.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Storytelling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-xl p-8 mb-8 border border-green-500/30"
        >
          <div className="text-center">
            <p className="text-xl text-gray-200 leading-relaxed italic mb-4">
              "Eu tinha descoberto minhas fraquezas. Mas não sabia como corrigi-las. 
              Quando vi essas técnicas, pensei: <span className="font-bold text-yellow-400">'Por que ninguém me ensinou isso antes?'</span>
              <br /><br />
              Apliquei em 2 minutos. <span className="font-bold text-green-400">Ganhei 199 pontos extras</span> na prova. 
              Passei em Medicina."
            </p>
            <p className="text-sm text-gray-400">— Ana P., 20 anos, São Paulo</p>
          </div>
        </motion.div>

        {/* Não vender ainda - apenas criar curiosidade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-2xl font-bold text-white mb-4">
            Essas técnicas estão em um lugar específico.
          </p>
          <p className="text-xl text-gray-300">
            E você está a <span className="font-bold text-yellow-400">1 clique</span> de descobrir onde.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xl md:text-2xl px-8 py-6 rounded-full shadow-2xl transition-all duration-300"
        >
          💎 VER ONDE ESTÃO ESSAS TÉCNICAS
        </motion.button>
      </motion.div>
    </div>
  )
}

export default SolutionTeaser

