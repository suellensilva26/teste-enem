import { useEffect } from 'react'

interface LeadFormProps {
  onSuccess: () => void
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  // Rastrear quando o formulário é enviado com sucesso
  useEffect(() => {
    // Verificar se há parâmetro de sucesso na URL (Formspree redireciona)
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('success') === 'true') {
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
    }
  }, [onSuccess])

  return (
    <form 
      action="https://formspree.io/f/mvgdzwvy" 
      method="POST"
      className="space-y-4 bg-gray-900 p-6 rounded-lg border-2 border-yellow-400"
      onSubmit={() => {
        // Facebook Pixel - Lead (também dispara no submit)
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Quiz Lead',
            value: 97,
            currency: 'BRL'
          });
        }
      }}
    >
      <div>
        <label className="block text-white font-bold mb-2 text-sm">
          📝 Seu Nome *
        </label>
        <input
          type="text"
          name="name"
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

      <button
        type="submit"
        className="w-full bg-yellow-400 text-black py-4 rounded-lg font-black text-lg hover:bg-yellow-300 transition active:scale-95 min-h-[56px]"
      >
        ✅ ACESSAR GRUPO AGORA
      </button>

      <p className="text-xs text-gray-400 text-center">
        Seus dados estão seguros. Nunca compartilhamos com terceiros.
      </p>
    </form>
  )
}

