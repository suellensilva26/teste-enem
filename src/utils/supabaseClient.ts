import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERRO: Variáveis de ambiente do Supabase não configuradas!')
  console.error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no Vercel')
  console.error('URL atual:', supabaseUrl || 'VAZIO')
  console.error('Key atual:', supabaseAnonKey ? 'CONFIGURADA' : 'VAZIA')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Log para debug
console.log('🔧 Supabase Client inicializado:', {
  url: supabaseUrl ? '✅ Configurada' : '❌ VAZIA',
  key: supabaseAnonKey ? '✅ Configurada' : '❌ VAZIA'
})

