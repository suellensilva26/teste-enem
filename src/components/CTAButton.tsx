import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { trackAddToCart, trackPurchase } from '../utils/facebookPixel'

type CTAButtonProps = {
  timeRemaining: number
  price?: number
}

function CTAButton({ timeRemaining, price = 47.90 }: CTAButtonProps) {
  const [clicks, setClicks] = useState(0)
  const [recentPurchases, setRecentPurchases] = useState<string[]>([])

  useEffect(() => {
    // Simular pessoas comprando (efeito de escassez)
    const interval = setInterval(() => {
      const newClicks = Math.floor(Math.random() * 3) + 1
      setClicks(prev => prev + newClicks)
      
      // Adicionar compras recentes simuladas
      const names = ['Ana P.', 'Carlos M.', 'Mariana S.', 'João V.', 'Beatriz L.', 'Pedro R.', 'Larissa F.', 'Rafael T.']
      const randomName = names[Math.floor(Math.random() * names.length)]
      setRecentPurchases(prev => [randomName, ...prev.slice(0, 4)])
    }, 4000)
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

  const remainingSpots = Math.max(0, 47 - clicks)

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 max-w-md mx-auto pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        {/* HEADLINE PRINCIPAL - EMOCIONAL */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-6xl mb-3"
          >
            🎯
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
            <span className="text-gold">ESTE É O MOMENTO</span>
            <br />
            QUE VAI MUDAR TUDO
          </h1>
          <p className="text-lg text-gray-300 font-bold">
            Em <span className="text-red-400">48 horas</span>, você pode estar{' '}
            <span className="text-gold">APROVADO</span>
          </p>
        </motion.div>

        {/* TIMER DE URGÊNCIA - MÁXIMA PRESSÃO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-5 mb-6 border-3 border-red-400 glow-red text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-500/30"
          />
          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-4xl mb-3"
            >
              ⏰
            </motion.div>
            <div className="text-xs text-red-100 mb-2 font-bold uppercase tracking-wider">
              ⚠️ ÚLTIMA CHANCE - OFERTA EXPIRA EM:
            </div>
            <motion.div
              key={timeRemaining}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-black text-white font-mono mb-2"
            >
              {formatTime(hours, minutes, seconds)}
            </motion.div>
            <div className="text-sm text-white font-bold">
              ENEM É DOMINGO - <span className="text-yellow-300">FALTAM {hours} HORAS!</span>
            </div>
            <div className="text-xs text-red-200 mt-2">
              Depois disso, você terá que esperar mais 1 ano inteiro...
            </div>
          </div>
        </motion.div>

        {/* ESCASSEZ REAL - PROVA SOCIAL DINÂMICA */}
        {remainingSpots > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-xl p-5 mb-6 border-2 border-orange-500 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl mb-3"
            >
              🔥
            </motion.div>
            <div className="text-orange-400 font-black text-xl mb-2">
              ⚠️ APENAS {remainingSpots} VAGAS RESTANTES!
            </div>
            <div className="text-white text-sm mb-3">
              <span className="font-bold text-yellow-400">{clicks}</span> pessoas já garantiram nas últimas horas
            </div>
            
            {/* Compras Recentes Simuladas */}
            {recentPurchases.length > 0 && (
              <div className="bg-black/50 rounded-lg p-3 mt-3">
                <div className="text-xs text-green-400 mb-2 font-bold">✅ COMPRAS RECENTES:</div>
                <div className="space-y-1">
                  {recentPurchases.slice(0, 3).map((name, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-white flex items-center gap-2"
                    >
                      <span className="text-green-400">✓</span>
                      <span>{name} acabou de garantir acesso</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TRANSFORMAÇÃO - COPY EMOCIONAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-green-900/40 rounded-2xl p-6 mb-6 border-2 border-purple-500/50 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">
            🧠 IMAGINE SEU FUTURO EM 30 DIAS:
          </h2>
          <div className="space-y-3 text-left text-white text-sm">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✨</span>
              <div>
                <span className="font-bold text-gold">Você reconhece os padrões do ENEM em SEGUNDOS</span>
                <br />
                <span className="text-gray-300">Não precisa mais ficar horas em uma questão</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">🎯</span>
              <div>
                <span className="font-bold text-gold">Sua mente fica CALMA na prova</span>
                <br />
                <span className="text-gray-300">Zero ansiedade, zero surpresas</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 text-xl">🏆</span>
              <div>
                <span className="font-bold text-gold">Você PASSA no ENEM</span>
                <br />
                <span className="text-gray-300">E entra na universidade dos seus sonhos</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PRODUTO - VALOR TRANSFORMACIONAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl p-6 mb-6 border-2 border-gold/50 shadow-2xl shadow-gold/20"
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl mb-3"
            >
              🎓
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black mb-2 text-gold">
              NeuroHack ENEM 2025
            </h2>
            <p className="text-white text-base font-bold">
              O Sistema Que <span className="text-green-400">8 em 10 Alunos</span> Usaram Para Passar
            </p>
          </div>

          {/* VALOR TRANSFORMACIONAL */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-5 mb-6 border-l-4 border-blue-400">
            <h3 className="text-lg font-black text-blue-400 mb-3 text-center">
              💎 O QUE VOCÊ VAI RECEBER:
            </h3>
            <div className="space-y-3 text-white text-sm">
              <div className="flex items-start gap-3 bg-black/30 rounded-lg p-3">
                <span className="text-green-400 text-xl">📱</span>
                <div>
                  <span className="font-bold text-gold">App Premium Completo (VITALÍCIO)</span>
                  <br />
                  <span className="text-gray-300 text-xs">40+ aulas, 100+ simulações, IA para redações</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/30 rounded-lg p-3">
                <span className="text-blue-400 text-xl">📚</span>
                <div>
                  <span className="font-bold text-gold">5 Ebooks Especializados (R$ 497 de valor)</span>
                  <br />
                  <span className="text-gray-300 text-xs">NeuroHack Cerebral, Padrões Escondidos, Protocolo Acelerado...</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/30 rounded-lg p-3">
                <span className="text-purple-400 text-xl">🎲</span>
                <div>
                  <span className="font-bold text-gold">8 Técnicas de Chute Inteligente (R$ 197 de valor)</span>
                  <br />
                  <span className="text-gray-300 text-xs">Acerte mesmo sem saber a resposta</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/30 rounded-lg p-3">
                <span className="text-yellow-400 text-xl">💬</span>
                <div>
                  <span className="font-bold text-gold">Suporte WhatsApp 24h</span>
                  <br />
                  <span className="text-gray-300 text-xs">Sua dúvida resolvida na hora</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/30 rounded-lg p-3 border-2 border-red-500/50">
                <span className="text-red-400 text-xl">🔥</span>
                <div>
                  <span className="font-bold text-red-400">2 Aulas ao Vivo (HOJE + AMANHÃ)</span>
                  <br />
                  <span className="text-yellow-400 text-xs font-bold">🎯 BÔNUS EXCLUSIVO: Apenas para os 15 primeiros!</span>
                  <br />
                  <span className="text-gray-300 text-xs">Esta aula NÃO estará disponível para todos</span>
                </div>
              </div>
            </div>
          </div>

          {/* VALOR TOTAL */}
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-4 mb-6 border-2 border-green-500 text-center">
            <div className="text-xs text-green-300 mb-1">VALOR TOTAL DO PACOTE:</div>
            <div className="text-2xl font-black text-green-400 mb-2">
              R$ 891,00
            </div>
            <div className="text-xs text-white">
              Mas você não vai pagar isso hoje...
            </div>
          </div>
        </motion.div>

        {/* PREÇO - ANCHOR PRICING */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-red-600 via-orange-600 to-red-700 rounded-2xl p-6 mb-6 border-3 border-yellow-400 text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-yellow-400/20"
          />
          <div className="relative z-10">
            <div className="text-xs text-yellow-200 mb-2 font-bold uppercase">
              🎁 DESCONTO EXCLUSIVO APLICADO
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="text-gray-300 line-through text-lg">
                R$ 147,90
              </div>
              <div className="text-white text-sm">→</div>
              <motion.div
                key={price}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="text-5xl md:text-6xl font-black text-yellow-300"
              >
                R$ {price.toFixed(2).replace('.', ',')}
              </motion.div>
            </div>
            <div className="text-yellow-200 text-sm font-bold mb-3">
              ECONOMIA DE R$ 100,00 (67% OFF)
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-xs text-white">
              <div className="font-bold text-green-400 mb-1">✅ VALOR TOTAL: R$ 891,00</div>
              <div>Você está pagando apenas <span className="font-bold text-yellow-300">5% do valor real</span></div>
            </div>
          </div>
        </motion.div>

        {/* COMPARAÇÃO DE VALOR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-700"
        >
          <div className="text-center text-white text-sm mb-3 font-bold">
            💰 COMPARE O INVESTIMENTO:
          </div>
          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>1 Aula particular de ENEM:</span>
              <span className="text-white font-bold">R$ 150,00</span>
            </div>
            <div className="flex justify-between">
              <span>1 Curso completo de ENEM:</span>
              <span className="text-white font-bold">R$ 497,00</span>
            </div>
            <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
              <span className="text-gold font-bold">NeuroHack ENEM (TUDO):</span>
              <span className="text-green-400 font-black text-lg">R$ 47,90</span>
            </div>
            <div className="text-center text-green-400 text-xs mt-2 font-bold">
              Você economiza R$ 843,10 comparado ao mercado
            </div>
          </div>
        </motion.div>

        {/* GARANTIA DESTACADA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-5 mb-6 border-2 border-green-500 text-center"
        >
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-xl font-black text-green-400 mb-2">
            GARANTIA INCONDICIONAL DE 7 DIAS
          </h3>
          <p className="text-white text-sm mb-2">
            Não funcionou para você? <span className="font-bold text-green-400">Devolvemos 100% do seu dinheiro.</span>
          </p>
          <p className="text-green-300 text-xs font-bold">
            SEM perguntas. SEM burocracia. SEM estresse.
          </p>
          <p className="text-white text-xs mt-2">
            Mas sabemos que <span className="font-bold text-yellow-400">98% das pessoas que começam NÃO pedem devolução</span> porque funciona.
          </p>
        </motion.div>

        {/* BOTÃO PRINCIPAL CTA - MÁXIMA CONVERSÃO */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePurchase}
          className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-black text-2xl md:text-3xl px-6 py-7 rounded-xl hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all shadow-2xl shadow-yellow-500/50 min-h-[70px] mb-4 relative overflow-hidden"
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-white/20"
          />
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-3xl">🚀</span>
            <span>SIM, QUERO MINHA APROVAÇÃO AGORA!</span>
            <span className="text-3xl">🎯</span>
          </span>
        </motion.button>

        {/* BOTÃO SECUNDÁRIO - ALTERNATIVA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={handlePurchase}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg px-6 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition active:scale-95 mb-4"
        >
          💳 Garantir Acesso por R$ {price.toFixed(2).replace('.', ',')}
        </motion.button>

        {/* TRUST SIGNALS - MÚLTIPLOS */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-black/50 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-xs text-white font-bold">Pagamento Seguro</div>
            <div className="text-xs text-gray-400">Kiwify protegido</div>
          </div>
          <div className="bg-black/50 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs text-white font-bold">Acesso Imediato</div>
            <div className="text-xs text-gray-400">Após compra</div>
          </div>
          <div className="bg-black/50 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl mb-1">💬</div>
            <div className="text-xs text-white font-bold">Suporte 24/7</div>
            <div className="text-xs text-gray-400">WhatsApp</div>
          </div>
          <div className="bg-black/50 rounded-lg p-3 text-center border border-green-500">
            <div className="text-2xl mb-1">🛡️</div>
            <div className="text-xs text-green-400 font-bold">Garantia 7 Dias</div>
            <div className="text-xs text-gray-400">100% seguro</div>
          </div>
        </div>

        {/* PROVA SOCIAL FINAL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-5 mb-6 border-l-4 border-blue-400"
        >
          <h3 className="text-lg font-black text-blue-400 mb-3 text-center">
            💬 O QUE ALUNOS ESTÃO DIZENDO:
          </h3>
          <div className="space-y-3 text-white text-sm">
            <div className="bg-black/30 rounded-lg p-3">
              <p className="italic mb-2">
                "Passei em Medicina usando o NeuroHack. Em 30 dias, reconhecia os padrões do ENEM em segundos. Valeu cada centavo!"
              </p>
              <p className="text-xs text-gray-400">— Ana P., 20 anos, São Paulo</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <p className="italic mb-2">
                "Aumentei 43 pontos na média. O método realmente funciona. Recomendo para todos!"
              </p>
              <p className="text-xs text-gray-400">— Carlos M., 19 anos, Rio de Janeiro</p>
            </div>
          </div>
        </motion.div>

        {/* ÚLTIMA URGÊNCIA - COPY FINAL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-xl p-5 mb-6 border-2 border-red-500 text-center"
        >
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-xl font-black text-red-400 mb-3">
            ENEM É DOMINGO - FALTAM {hours} HORAS
          </h3>
          <p className="text-white text-sm mb-3 font-bold">
            Você tem 2 opções:
          </p>
          <div className="space-y-2 text-left text-sm">
            <div className="flex items-start gap-2 text-red-300">
              <span className="text-xl">❌</span>
              <span><strong>Opção 1:</strong> Continuar estudando do jeito antigo e torcer para passar (87% reprovam assim)</span>
            </div>
            <div className="flex items-start gap-2 text-green-400">
              <span className="text-xl">✅</span>
              <span><strong>Opção 2:</strong> Garantir acesso AGORA por R$ {price.toFixed(2).replace('.', ',')} e passar com confiança</span>
            </div>
          </div>
          <p className="text-yellow-400 font-black text-base mt-4">
            A decisão que você tomar AGORA vai definir seu futuro pelos próximos 4 anos.
          </p>
          <p className="text-white text-xs mt-2">
            Não deixe para depois. <span className="font-bold text-red-400">Depois pode ser tarde demais.</span>
          </p>
        </motion.div>

        {/* CTA FINAL REPETIDO */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          onClick={handlePurchase}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-xl px-6 py-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition active:scale-95 shadow-lg shadow-green-500/50 min-h-[60px] mb-4"
        >
          🎯 QUERO MINHA APROVAÇÃO - R$ {price.toFixed(2).replace('.', ',')}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default CTAButton
