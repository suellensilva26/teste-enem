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

        {/* Headline Principal */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-black mb-4 text-gold text-shadow-gold"
        >
          <motion.span
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🚨 FALTAM 48 HORAS PRO ENEM 🚨
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg mb-6 text-white font-semibold leading-relaxed"
        >
          Você <span className="text-gold font-black">REALMENTE</span> sabe em qual matéria pode{' '}
          <span className="text-danger font-black">REPROVAR</span>?
          <br />
          Descubra agora em <span className="text-gold font-black">2 minutos</span>
        </motion.p>

        {/* Validação Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gold/30"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">📊</span>
              <span className="text-gold font-black text-lg">
                {stats.studentsTested.toLocaleString('pt-BR')}
              </span>
              <span className="text-white text-sm">alunos fizeram</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-success font-black text-lg">
                {stats.weaknessesFound.toLocaleString('pt-BR')}
              </span>
              <span className="text-white text-sm">descobriram uma fraqueza crítica</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-gold font-black text-lg">
                {stats.studentsPassed.toLocaleString('pt-BR')}
              </span>
              <span className="text-white text-sm">PASSARAM depois</span>
            </div>
          </div>
        </motion.div>

        {/* Foto de Confiança - Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-6 rounded-xl overflow-hidden border-2 border-gold/30 glow-gold"
        >
          <div className="w-full h-48 bg-gradient-to-br from-gold/20 to-black flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl mb-2 block">🎓</span>
              <span className="text-gold font-bold">Estudantes Aprovados</span>
            </div>
            {/* Substitua por: <img src="/images/success-student.jpg" alt="Estudante aprovado" className="w-full h-full object-cover" /> */}
          </div>
        </motion.div>

        {/* CTA Principal */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartClick}
          className="w-full bg-black border-2 border-gold text-gold font-black text-lg md:text-xl px-6 py-4 rounded-xl glow-gold ripple btn-mobile mb-4 transition-smooth"
        >
          🎯 COMEÇAR TESTE AGORA - 2 MINUTOS
        </motion.button>

        {/* Urgência Final */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-gray-400 mb-2"
        >
          ou continue achando que está preparado...
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-sm text-danger font-bold"
        >
          87% acham... e reprovam mesmo assim
        </motion.p>
      </motion.div>
    </div>
  )
}

export default LandingPage
