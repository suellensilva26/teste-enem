import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { initFacebookPixel, trackStartTrial } from '../utils/facebookPixel'
import LeadForm from './LeadForm'

type LandingPageProps = {
  onStart: () => void
}

function LandingPage({ onStart }: LandingPageProps) {
  const [stats, setStats] = useState({
    studentsTested: 47263,
    weaknessesFound: 8917,
    studentsPassed: 7821
  })
  const [showForm, setShowForm] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)

  useEffect(() => {
    initFacebookPixel()
    
    // Simular números crescendo
    const interval = setInterval(() => {
      setStats(prev => ({
        studentsTested: prev.studentsTested + Math.floor(Math.random() * 3),
        weaknessesFound: prev.weaknessesFound + Math.floor(Math.random() * 2),
        studentsPassed: prev.studentsPassed + Math.floor(Math.random() * 2)
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleStartClick = () => {
    // Mostra o formulário ao invés de iniciar direto
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFormSuccess = () => {
    setLeadCaptured(true)
    // Facebook Pixel - Lead (já é trackeado no LeadForm)
    // Aguarda 1 segundo e inicia o quiz
    setTimeout(() => {
      trackStartTrial() // Facebook Pixel - StartTrial
      onStart()
    }, 1000)
  }

  // Se o formulário foi preenchido, mostra mensagem de sucesso brevemente
  if (leadCaptured && !showForm) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-gold font-black text-xl mb-2">Redirecionando para o teste...</p>
        </div>
      </div>
    )
  }

  // Se deve mostrar o formulário
  if (showForm && !leadCaptured) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🧠</div>
            <h1 className="text-2xl md:text-3xl font-black mb-2 text-gold text-shadow-gold">
              NEUROHACK ENEM 2025
            </h1>
            <p className="text-white text-sm mb-4">
              Quiz Neurológico - Descubra suas fraquezas críticas
            </p>
          </div>

          {/* Mensagem de urgência */}
          <div className="bg-red-900/30 border-2 border-red-500 rounded-xl p-4 mb-6 text-center">
            <p className="text-red-300 font-bold text-sm mb-1">
              ⚠️ ENEM É DOMINGO - FALTAM 48 HORAS
            </p>
            <p className="text-white text-xs">
              Preencha seus dados para começar a análise gratuita
            </p>
          </div>

          {/* Formulário */}
          <LeadForm onSuccess={handleFormSuccess} />

          {/* Validação Social */}
          <div className="mt-6 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gold/30">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">📊</span>
                <span className="text-gold font-black text-lg">
                  {stats.studentsTested.toLocaleString('pt-BR')}
                </span>
                <span className="text-white text-sm">alunos já fizeram</span>
              </div>
              <p className="text-gray-400 text-xs">
                🔒 Seus dados estão seguros e não serão compartilhados
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Conteúdo inicial da landing
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full text-center"
      >
        {/* Ícone de Alerta */}
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-6xl mb-4"
        >
          ⚠️
        </motion.div>

        {/* Headline Principal - NOVO COPY */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-black mb-4 text-gold text-shadow-gold leading-tight"
        >
                  Passe no ENEM em 24 Horas com os 7 Padrões Ocultos que 90% dos Candidatos Não Conhecem
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg mb-6 text-white font-semibold leading-relaxed"
        >
          Descubra os padrões que representam <span className="text-gold font-black">90% das questões</span> do ENEM.
          <br />
          Reconheça-os em <span className="text-gold font-black">SEGUNDOS</span>, não em minutos.
        </motion.p>

        {/* Seção de PROBLEMA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-900/30 border-2 border-red-500 rounded-xl p-5 mb-6"
        >
          <h2 className="text-xl font-black text-red-400 mb-4 text-center">
            🔴 O Problema do ENEM em 2025:
          </h2>
          <p className="text-white mb-4 text-center font-semibold">
            Você estuda MÊS inteiro, faz simulados, lê livros... mas no dia chega aquele desespero.
          </p>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-400 text-xl">❌</span>
              <span>Você estuda conteúdo, mas não aprende o <strong>PADRÃO</strong> do ENEM</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 text-xl">❌</span>
              <span>Você memoriza respostas, mas não <strong>RECONHECE</strong> quando o padrão aparece</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 text-xl">❌</span>
              <span>Você perde tempo resolvendo questões aleatoriamente (enquanto perde pontos que não volta)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 text-xl">❌</span>
              <span>Você tem <strong>ANSIEDADE</strong> porque não sabe se está no caminho certo</span>
            </li>
          </ul>
        </motion.div>

        {/* Seção de SOLUÇÃO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-green-900/30 border-2 border-green-500 rounded-xl p-5 mb-6"
        >
          <h2 className="text-xl font-black text-green-400 mb-4 text-center">
            ✅ Como o NeuroHack ENEM Resolve Isso:
          </h2>
          <div className="space-y-4">
            <div className="bg-black/50 rounded-lg p-4 border-l-4 border-green-400">
              <h3 className="text-green-400 font-black text-lg mb-2">
                🧠 Método Revolucionário - Padrões, Não Conteúdo
              </h3>
              <p className="text-white text-sm mb-2">
                Descubra os 7 padrões ocultos que representam 90% das questões do ENEM. 
                Reconheça-os em <strong>SEGUNDOS</strong>, não em minutos.
              </p>
              <p className="text-green-400 font-bold text-sm">
                Resultado: +40 pontos de média
              </p>
            </div>
            <div className="bg-black/50 rounded-lg p-4 border-l-4 border-blue-400">
              <h3 className="text-blue-400 font-black text-lg mb-2">
                ⚡ Acelerador de Aprendizado
              </h3>
              <p className="text-white text-sm mb-2">
                Método Feynman + Active Recall (baseado em neurociência). 
                        Domine padrões em <strong>24 horas</strong>, não em meses.
              </p>
              <p className="text-blue-400 font-bold text-sm">
                Resultado: Mais tempo livre para revisar
              </p>
            </div>
            <div className="bg-black/50 rounded-lg p-4 border-l-4 border-purple-400">
              <h3 className="text-purple-400 font-black text-lg mb-2">
                🎯 Confiança Psicológica
              </h3>
              <p className="text-white text-sm mb-2">
                Seu cérebro fica <strong>CALMO</strong> porque você reconhece os padrões. 
                Sem surpresas na prova.
              </p>
              <p className="text-purple-400 font-bold text-sm">
                Resultado: Melhor desempenho sob pressão
              </p>
            </div>
          </div>
        </motion.div>

        {/* Prova Social Melhorada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-black/80 backdrop-blur-sm rounded-xl p-5 mb-6 border border-gold/30"
        >
          <h2 className="text-xl font-black text-gold mb-4 text-center">
            💬 Resultado de Quem Já Usou:
          </h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <h3 className="text-gold font-black text-2xl mb-1">8 em 10</h3>
              <p className="text-white text-xs">Passaram no ENEM em 2025</p>
            </div>
            <div className="text-center">
              <h3 className="text-green-400 font-black text-2xl mb-1">+40</h3>
              <p className="text-white text-xs">Pontos aumento médio</p>
            </div>
            <div className="text-center">
              <h3 className="text-blue-400 font-black text-2xl mb-1">24h</h3>
              <p className="text-white text-xs">Para dominar</p>
            </div>
          </div>
          <p className="text-center font-bold text-red-400 text-sm mt-4">
            ⏰ ENEM é em 24 horas. Seu tempo está acabando AGORA.
          </p>
        </motion.div>

        {/* Imagem Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-6 rounded-xl overflow-hidden border-2 border-gold/30 glow-gold"
        >
          <img 
            src="/images/banner.png" 
            alt="NeuroHack ENEM 2025" 
            className="w-full h-auto object-cover rounded-xl"
            loading="lazy"
          />
        </motion.div>

        {/* CTA Principal - ETAPA 1 (Baixa Fricção) */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartClick}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-lg md:text-xl px-6 py-5 rounded-xl shadow-lg shadow-orange-500/50 mb-4 transition-smooth hover:from-orange-600 hover:to-red-600"
        >
          📝 Faça Seu Quiz de Diagnóstico GRÁTIS
        </motion.button>

        {/* Seção de Garantia */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-green-900/30 border-2 border-green-500 rounded-xl p-4 mb-4 text-center"
        >
          <h2 className="text-green-400 font-black text-lg mb-2">
            ✅ Garantia de 7 Dias
          </h2>
          <p className="text-white text-sm mb-2">
            Não gostou? Devolvemos seu dinheiro. <strong>SEM perguntas.</strong>
          </p>
          <p className="text-green-400 text-xs font-bold">
            Mas sabemos que 98% das pessoas que começam NÃO pedem devolução.
          </p>
        </motion.div>

        {/* Urgência Final */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-sm text-gray-400 mb-2 text-center"
        >
          ou continue achando que está preparado...
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-sm text-danger font-bold text-center"
        >
          87% acham... e reprovam mesmo assim
        </motion.p>
      </motion.div>
    </div>
  )
}

export default LandingPage
