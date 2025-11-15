import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

interface LeadFormProps {
  onSuccess?: () => void
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    university: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Função para validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length >= 5 && email.includes('.')
  }

  // Função para validar telefone brasileiro
  const validatePhone = (phone: string): boolean => {
    // Remove tudo que não é número
    const numbersOnly = phone.replace(/\D/g, '')
    // Telefone brasileiro deve ter 10 ou 11 dígitos (com DDD)
    return numbersOnly.length >= 10 && numbersOnly.length <= 11
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar mensagens ao digitar
    setMessage('')
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      // VALIDAÇÕES ANTES DE ENVIAR
      
      // Validar nome (mínimo 3 caracteres, apenas letras e espaços)
      const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/
      if (!nameRegex.test(formData.name.trim())) {
        throw new Error('Nome inválido! Use apenas letras e mínimo de 3 caracteres.')
      }

      // Validar telefone
      if (!validatePhone(formData.phone)) {
        throw new Error('Telefone inválido! Digite um número válido com DDD (ex: 11987654321 ou (11) 98765-4321)')
      }

      // Validar email
      if (!validateEmail(formData.email)) {
        throw new Error('Email inválido! Digite um email válido (ex: seu@email.com)')
      }

      // Validar universidade (não pode ser vazio)
      if (!formData.university || formData.university.trim() === '') {
        throw new Error('Selecione uma universidade!')
      }

      console.log('📤 Enviando para Supabase:', formData)
      
      // Verificar se Supabase está configurado
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Variáveis de ambiente do Supabase não configuradas! Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no Netlify.')
      }
      
      // Inserir lead na tabela 'leads' do Supabase
      const { data, error: supabaseError } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            university: formData.university
          }
        ])
        .select()

      if (supabaseError) {
        console.error('❌ Erro Supabase completo:', supabaseError)
        console.error('❌ Código do erro:', supabaseError.code)
        console.error('❌ Mensagem:', supabaseError.message)
        console.error('❌ Detalhes:', supabaseError.details)
        console.error('❌ Hint:', supabaseError.hint)
        
        // Mensagem de erro mais específica
        let errorMessage = 'Erro ao enviar lead, tente novamente.'
        if (supabaseError.code === 'PGRST301' || supabaseError.message?.includes('permission denied')) {
          errorMessage = 'Erro: Permissão negada. Verifique a política RLS no Supabase.'
        } else if (supabaseError.code === '23505') {
          errorMessage = 'Este email já foi cadastrado.'
        } else if (supabaseError.message) {
          errorMessage = `Erro: ${supabaseError.message}`
        }
        
        throw new Error(errorMessage)
      }

      // DEBUG DETALHADO: Mostrar EXATAMENTE o que foi retornado
      console.log('✅ Lead salvo no Supabase:', data)
      console.log('📊 Tipo de data:', typeof data)
      console.log('📊 É array?', Array.isArray(data))
      console.log('📊 Tamanho:', data?.length)
      console.log('📊 Data completo (JSON):', JSON.stringify(data, null, 2))
      
      // Verificar se realmente foi salvo
      if (!data || (Array.isArray(data) && data.length === 0)) {
        console.error('⚠️ ATENÇÃO: Supabase retornou vazio ou null!')
        console.error('⚠️ Isso significa que o lead NÃO foi salvo!')
        console.error('⚠️ Verifique RLS e estrutura da tabela no Supabase!')
      } else {
        console.log('✅ CONFIRMADO: Lead realmente salvo! ID:', data[0]?.id || 'sem ID')
      }

      // Salvar dados do lead no localStorage para usar depois no quiz
      const leadDataToStore = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        university: formData.university,
        savedAt: new Date().toISOString()
      }
      localStorage.setItem('leadData', JSON.stringify(leadDataToStore))
      
      // TAMBÉM salvar em uma lista de leads enviados (para recuperação)
      const allLeads = JSON.parse(localStorage.getItem('allLeads') || '[]')
      allLeads.push(leadDataToStore)
      localStorage.setItem('allLeads', JSON.stringify(allLeads))
      
      console.log('💾 Lead salvo no localStorage:', leadDataToStore)
      console.log('📋 Total de leads no localStorage:', allLeads.length)

      // Sucesso
      setMessage('Lead enviado com sucesso!')
      
      // Facebook Pixel - Lead
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Quiz Lead',
          value: 97,
          currency: 'BRL'
        })
      }

      // Limpar formulário
      setFormData({
        name: '',
        phone: '',
        email: '',
        university: ''
      })

      // Chamar onSuccess se fornecido
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 1000)
      }
    } catch (err: any) {
      console.error('Erro ao enviar lead:', err)
      setError(err.message || 'Erro ao enviar lead, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-900 p-6 rounded-lg border-2 border-yellow-400"
    >
      <div>
        <label className="block text-white font-bold mb-2 text-sm">
          📝 Seu Nome *
        </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="João Silva"
                  minLength={3}
                  pattern="[a-zA-ZÀ-ÿ\s]{3,}"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Mínimo 3 caracteres, apenas letras
                </p>
      </div>

      <div>
        <label className="block text-white font-bold mb-2 text-sm">
          📱 Seu Telefone (WhatsApp) *
        </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(11) 99999-9999 ou 11987654321"
                  pattern="[0-9\s\(\)\-]+"
                  minLength={10}
                  maxLength={15}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Digite apenas números com DDD (ex: 11987654321)
                </p>
      </div>

      <div>
        <label className="block text-white font-bold mb-2 text-sm">
          📧 Seu Email *
        </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Digite um email válido (ex: seu@email.com)
                </p>
      </div>

      <div>
        <label className="block text-white font-bold mb-2 text-sm">
          🎓 Qual universidade quer cursar? *
        </label>
        <select
          name="university"
          value={formData.university}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white focus:border-yellow-400 focus:outline-none"
        >
          <option value="">-- Selecione uma opção --</option>
          <option value="Medicina">🏥 Medicina</option>
          <option value="Direito">⚖️ Direito</option>
          <option value="Engenharia">🏗️ Engenharia</option>
          <option value="Administração">💼 Administração</option>
          <option value="Psicologia">🧠 Psicologia</option>
          <option value="Não sei ainda">❓ Não sei ainda</option>
          <option value="Outro">📋 Outro</option>
        </select>
      </div>

      {message && (
        <div className="bg-green-600 text-white p-3 rounded-lg text-sm">
          ✅ {message}
        </div>
      )}

      {error && (
        <div className="bg-red-600 text-white p-3 rounded-lg text-sm">
          ❌ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 text-black py-4 rounded-lg font-black text-lg hover:bg-yellow-300 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
      >
        {loading ? '⏳ Enviando...' : '✅ ACESSAR GRUPO AGORA'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Seus dados estão seguros. Nunca compartilhamos com terceiros.
      </p>
    </form>
  )
}

