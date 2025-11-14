import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { QuizResult as QuizResultType } from '../utils/calculations'
import CouponBanner from './CouponBanner'
import { trackResultView } from '../utils/facebookPixel'

type QuizResultProps = {
  result: QuizResultType
  onContinue: (price?: number) => void
}

function QuizResult({ result }: QuizResultProps) {
  const [couponVisible, setCouponVisible] = useState(false)
  const [couponApplied, setCouponApplied] = useState(false)
  const [price, setPrice] = useState(197)

  // FIXO: Memoizar fraquezas para evitar recálculo e alternância
  const fixedWeaknesses = useMemo(() => {
    return result.weaknesses.map((w, index) => ({
      ...w,
      // Garantir valores fixos
      pointsLost: w.pointsLost || [57, 55, 53][index] || 50
    }))
  }, [result.weaknesses])

  // FIXO: Total fixo baseado nas fraquezas memoizadas
  const fixedTotalPoints = useMemo(() => {
    return fixedWeaknesses.reduce((sum, w) => sum + w.pointsLost, 0)
  }, [fixedWeaknesses])

  useEffect(() => {
    trackResultView()
    
    // Cupom aparece após 7 segundos
    const timer = setTimeout(() => {
      setCouponVisible(true)
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  const handleApplyCoupon = () => {
    setCouponApplied(true)
    setPrice(97)
    
    // Efeito visual de flash dourado
    document.body.style.transition = 'background-color 0.3s'
    document.body.style.backgroundColor = 'rgba(255, 215, 0, 0.1)'
    setTimeout(() => {
      document.body.style.backgroundColor = ''
    }, 300)
  }

  // VALIDAÇÃO: Verificar se o resultado é válido
  if (!result || !result.weaknesses || result.weaknesses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-danger">
          <p className="text-2xl mb-2">⚠️</p>
          <p className="font-bold">Erro ao calcular resultado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 max-w-md mx-auto pb-32"
      style={{ overflowX: 'hidden' }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl md:text-3xl font-black mb-2 text-danger">
          ANÁLISE REVELOU
        </h1>
        <p className="text-white text-sm">Baseado em sua análise neurológica:</p>
      </div>

      {/* Situação Crítica - SEM ANIMAÇÃO DE ESCALA */}
      <div className="bg-gradient-to-br from-danger/20 to-black rounded-2xl p-6 mb-6 border-2 border-danger">
        <div className="text-center">
          <div className="text-3xl mb-2">🔴</div>
          <div className="text-danger font-black text-4xl md:text-5xl mb-2">
            {result.failChance}%
          </div>
          <div className="text-white font-bold text-lg mb-1">
            DE CHANCE DE REPROVAR
          </div>
          <div className="text-gray-300 text-sm">
            Baseado nas suas respostas, você tem{' '}
            <span className="font-bold text-danger">{result.failChance}%</span> de chance de não atingir a nota necessária
          </div>
        </div>
      </div>

      {/* Fraquezas - VALORES FIXOS */}
      <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-gold/30">
        <h2 className="text-xl font-black mb-4 text-white text-center">
          ❌ SUAS FRAQUEZAS CRÍTICAS:
        </h2>

        <div className="space-y-4 mb-6">
          {fixedWeaknesses.map((weakness, index) => {
            if (!weakness || !weakness.name || weakness.pointsLost === undefined) {
              return null;
            }
            
            return (
              <div
                key={`weakness-${index}-${weakness.name}`}
                className="bg-danger/20 rounded-xl p-4 border-l-4 border-danger"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div className="flex-1">
                    <div className="font-bold text-danger text-base mb-1">
                      Fraqueza {index + 1}: {weakness.name}
                    </div>
                    <p className="text-gray-300 text-sm">
                      Você perde aproximadamente{' '}
                      <span className="font-bold text-gold">{weakness.pointsLost} pontos</span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Total Perdido - VALOR FIXO */}
        <div className="bg-gradient-to-r from-danger to-danger/80 rounded-xl p-4 text-center border-2 border-danger">
          <div className="text-white font-black text-xl mb-1">
            Total de pontos em risco: {fixedTotalPoints} pontos
          </div>
          <div className="text-danger-100 text-sm">
            E você <span className="font-bold">PRECISA</span> desses pontos!
          </div>
        </div>
      </div>

      {/* IMAGEM DO APP */}
      <div className="mb-6 rounded-xl overflow-hidden border-2 border-gold/30">
        <div className="w-full h-64 bg-gradient-to-br from-gold/20 to-black flex items-center justify-center relative">
          <div className="text-center z-10">
            <div className="text-6xl mb-3">📱</div>
            <div className="text-gold font-black text-xl mb-2">NeuroHack ENEM 2025</div>
            <div className="text-white text-sm">App Premium</div>
          </div>
          {/* Placeholder - Substitua por imagem real */}
          {/* <img src="/images/app-screenshot.jpg" alt="App NeuroHack" className="w-full h-full object-cover" /> */}
        </div>
      </div>

      {/* COPY PROFUNDA - O QUE ESTÁ COMPRANDO */}
      <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-black text-gold mb-4 text-center">
          💰 O QUE VOCÊ ESTÁ COMPRANDO:
        </h2>
        
        {/* PRODUTO PRINCIPAL */}
        <div className="bg-black/50 rounded-lg p-4 mb-4 border-l-4 border-gold">
          <div className="flex items-start gap-3 mb-2">
            <span className="text-2xl">📱</span>
            <div className="flex-1">
              <div className="font-black text-gold text-lg mb-1">
                APP NEUROHACK PREMIUM (VITALÍCIO)
              </div>
              <div className="text-white text-sm mb-2">
                Este é o produto principal. Acesso completo e vitalício ao app com todas as funcionalidades.
              </div>
              <div className="text-gold font-bold text-base">
                Valor: R$ 197
              </div>
            </div>
          </div>
        </div>

        {/* BÔNUS VÁLIDOS HOJE - VERSÃO APRIMORADA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-xl p-6 border-2 border-green-500 shadow-lg shadow-green-500/20"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-6"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-4xl mb-2"
            >
              🎁
            </motion.div>
            <div className="font-black text-green-400 text-xl mb-2">
              BÔNUS EXCLUSIVOS (Válidos APENAS HOJE)
            </div>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg p-3 mb-4"
            >
              <motion.div 
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-yellow-400 font-black text-lg"
              >
                VALOR TOTAL: R$ 694 de bônus
              </motion.div>
              <div className="text-white text-sm font-bold">
                SÓ QUEM COMPRAR HOJE RECEBE TUDO DE GRAÇA
              </div>
            </motion.div>
          </motion.div>

          {/* 5 EBOOKS ESPECIALIZADOS */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/50 rounded-lg p-4 mb-4 border-l-4 border-blue-500 hover:border-blue-400 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-400 text-2xl">📚</span>
              <div>
                <span className="font-black text-blue-400 text-lg">5 EBOOKS ESPECIALIZADOS</span>
                <span className="text-green-400 text-sm block font-bold">(R$ 497 de valor)</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-white ml-8">
              <div className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><span className="font-bold">NeuroHack Cerebral:</span> Sua mente em máquina de aprovação</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><span className="font-bold">Padrões Escondidos:</span> O que REALMENTE cai no ENEM</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><span className="font-bold">Protocolo Acelerado:</span> Estude 48h e recupere o ano</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><span className="font-bold">Método Feynman Turbo:</span> Memorize qualquer coisa em 20 min</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><span className="font-bold">Estratégias Secretas:</span> Acerte sem estudar (seu seguro)</span>
              </div>
            </div>
          </motion.div>

          {/* 8 TÉCNICAS DE CHUTE INTELIGENTE */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/50 rounded-lg p-4 mb-4 border-l-4 border-purple-500 hover:border-purple-400 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-purple-400 text-2xl">🎲</span>
              <div>
                <span className="font-black text-purple-400 text-lg">8 TÉCNICAS DE CHUTE INTELIGENTE</span>
                <span className="text-green-400 text-sm block font-bold">(R$ 197 de valor)</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white ml-8">
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Análise de padrão visual</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Eliminação científica de absurdos</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Palavra-chave mágica</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Intervalo de respostas</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Lógica matemática de prova</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Psicologia do cansaço</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Exclusão dupla estratégica</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Timing: deixa branco e volta</span>
              </div>
            </div>
          </motion.div>

          {/* OUTROS BÔNUS */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 text-sm text-white mb-4"
          >
            <div className="flex items-start gap-2 bg-black/30 rounded-lg p-3">
              <span className="text-green-400 text-xl">✅</span>
              <div>
                <span className="font-bold">Suporte WhatsApp 24h</span>
                <span className="text-gray-400 text-xs block ml-0">(Bônus - válido apenas hoje)</span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-black/30 rounded-lg p-3">
              <span className="text-green-400 text-xl">✅</span>
              <div>
                <span className="font-bold">2 Aulas ao Vivo (HOJE + AMANHÃ)</span>
                <span className="text-red-400 text-xs block ml-0 font-bold">🎯 BÔNUS EXCLUSIVO: Apenas para os 15 primeiros que comprarem acesso ao App Premium</span>
                <span className="text-gray-400 text-xs block ml-0">(Esta aula ao vivo NÃO estará disponível para todos - apenas para os 15 primeiros)</span>
              </div>
            </div>
          </motion.div>

          {/* MENSAGEM DE URGÊNCIA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-lg p-4 border-2 border-red-500"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚡</span>
              <span className="text-white font-black text-base">Acesso imediato. Começa a ativar agora.</span>
            </div>
            <p className="text-red-300 text-xs font-bold">
              ⚠️ IMPORTANTE: Estes bônus são válidos APENAS HOJE. Após 24h, você recebe apenas o APP.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Solução */}
      <div className="bg-gradient-to-r from-success/20 to-black rounded-xl p-6 mb-6 border-2 border-success/50">
        <div className="text-center">
          <div className="text-3xl mb-2">✅</div>
          <h2 className="text-xl font-black text-white mb-3">
            MAS EXISTE SOLUÇÃO (E É RÁPIDA):
          </h2>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Técnicas neurológicas que corrigem suas deficiências em{' '}
            <span className="font-bold text-gold">48 HORAS</span>
          </p>
        </div>
      </div>


      {/* Oferta Especial - COPY CLARA */}
      <div className="bg-gradient-to-r from-gold/20 to-gold-light/20 rounded-2xl p-6 mb-6 border-2 border-gold">
        <div className="bg-black rounded-xl p-4">
          <div className="text-center mb-4">
            <div className="text-gold font-black text-lg mb-2">
              💰 OFERTA ESPECIAL
            </div>
            <div className="text-white text-sm mb-4">
              {couponApplied ? '🎟️ CUPOM APLICADO AUTOMATICAMENTE ✓' : 'Válida por tempo limitado'}
            </div>
          </div>

          {/* Preço */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Valor do APP:</span>
              <span className="text-white font-bold">R$ 197</span>
            </div>
            {couponApplied && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Desconto cupom:</span>
                <span className="text-green-400 font-bold">-R$ 100</span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-gray-700 pt-3">
              <span className="text-gray-400 text-sm font-bold">TOTAL:</span>
              <span className="text-gold font-black text-3xl">
                R$ {price}
              </span>
            </div>
          </div>

          {/* Resumo do que recebe */}
          <div className="bg-gray-900 rounded-lg p-3 mt-4">
            <p className="text-xs text-gray-400 text-center mb-2">
              Você recebe:
            </p>
            <div className="space-y-1 text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                <span>APP Premium (vitalício) - R$ 197</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">+</span>
                <span>Bônus exclusivos (HOJE) - GRÁTIS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button - DOURADO GRANDE VISÍVEL */}
      <button
        onClick={() => {
          // Facebook Pixel - AddToCart e Purchase
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'AddToCart', {
              content_name: 'NeuroHack ENEM',
              content_type: 'product',
              value: price,
              currency: 'BRL'
            });
            (window as any).fbq('track', 'Purchase', {
              value: price,
              currency: 'BRL',
              content_name: 'NeuroHack ENEM 2025',
              content_type: 'product'
            });
            console.log('✅ Pixel Events: AddToCart + Purchase');
          }
          // Redirecionar para Kiwify
          window.location.href = 'https://pay.kiwify.com.br/za05nt2';
        }}
        className="w-full bg-yellow-400 text-black font-black text-xl px-6 py-6 rounded-lg hover:bg-yellow-300 transition active:scale-95 shadow-lg shadow-yellow-400/50 min-h-[60px] mb-4"
      >
        💳 GARANTIR MEU ACESSO AGORA POR R$ {price}
      </button>

      <p className="text-center text-xs text-gray-400 mb-4">
        Ou continue reprovando... A escolha é sua
      </p>

      {/* Garantia */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <p>🔒 Pagamento 100% seguro</p>
        <p>⏰ Oferta expira em 24h</p>
        <p>💰 Reembolso em 7 dias se não estiver satisfeito</p>
      </div>

      {/* Cupom Banner */}
      <CouponBanner visible={couponVisible} onApply={handleApplyCoupon} />
    </div>
  )
}

export default QuizResult
