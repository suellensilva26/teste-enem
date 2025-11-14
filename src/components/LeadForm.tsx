import { useState } from 'react'

interface LeadFormProps {
  onSuccess: () => void
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    university: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Enviar diretamente para Formspree usando form-data
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('university', formData.university)

      console.log('📤 Enviando dados para Formspree:', formData)

      const response = await fetch('https://formspree.io/f/mvgdzwvy', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })

      console.log('📥 Resposta recebida:', response.status, response.statusText)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }))
        console.error('❌ Erro na resposta:', errorData)
        setError(errorData.error || `Erro ${response.status}: ${response.statusText}`)
        return
      }

      const result = await response.json()
      console.log('✅ Resultado:', result)

      // Formspree retorna sucesso mesmo sem campo success explícito
      if (response.ok) {
        console.log('✅ Lead capturado com sucesso!')
        // Facebook Pixel - Lead
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Quiz Lead',
            value: 97,
            currency: 'BRL'
          });
          console.log('✅ Pixel Event: Lead');
        }
        onSuccess()
        setFormData({ name: '', phone: '', email: '', university: '' })
      } else {
        setError('Erro ao enviar. Tente novamente.')
      }
    } catch (err: any) {
      console.error('❌ Erro no fetch:', err)
      setError(err.message || 'Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-lg border-2 border-yellow-400">
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
          type="tel"
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

      {error && (
        <div className="bg-red-600 text-white p-3 rounded-lg text-sm">
          ❌ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 text-black py-4 rounded-lg font-black text-lg hover:bg-yellow-300 transition active:scale-95 disabled:opacity-50 min-h-[56px]"
      >
        {loading ? '⏳ Enviando...' : '✅ ACESSAR GRUPO AGORA'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Seus dados estão seguros. Nunca compartilhamos com terceiros.
      </p>
    </form>
  )
}

