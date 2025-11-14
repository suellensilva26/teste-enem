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
      console.log('📤 Enviando para Supabase:', formData)
      
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
        console.error('❌ Erro Supabase:', supabaseError)
        throw supabaseError
      }

      console.log('✅ Lead salvo no Supabase:', data)

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
      setError('Erro ao enviar lead, tente novamente.')
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
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white font-bold mb-2 text-sm">
          📱 Seu Telefone (WhatsApp) *
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="(11) 99999-9999"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
        />
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
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
        />
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

