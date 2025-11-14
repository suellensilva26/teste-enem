# 🔍 Como Verificar se Está Enviando para Supabase

## ✅ O Código Está Correto

O código já está usando Supabase! Mas o site em produção ainda tem código antigo.

## 🎯 O Que Fazer:

### 1. Fazer Commit e Push (Atualizar o Deploy)

```bash
git add -A
git commit -m "Fix: Add Supabase logs and ensure correct integration"
git push
```

### 2. Aguardar Deploy (2-3 minutos)

### 3. Testar e Verificar Console

1. Acesse: https://teste-enem-agora.vercel.app
2. Abra o Console (F12 → Console)
3. Preencha o formulário
4. **No console você deve ver:**
   - ✅ `📤 Enviando para Supabase: {name, phone, email, university}`
   - ✅ `✅ Lead salvo no Supabase: [...]`
   - ❌ **NÃO deve aparecer**: "Enviando dados para: /api/lead"

### 4. Verificar no Supabase

1. Acesse: https://supabase.com/dashboard
2. Vá em **Editor de tabelas** → tabela `leads`
3. Você deve ver o lead que acabou de enviar!

---

## 🐛 Se Ainda Aparecer "/api/lead" no Console:

Isso significa que o código antigo ainda está rodando. Faça:

1. **Limpar cache do navegador:**
   - Pressione `Ctrl + Shift + R` (Windows/Linux)
   - Ou `Cmd + Shift + R` (Mac)
   - Ou abra em **modo anônimo**

2. **Verificar se o deploy foi concluído:**
   - Vercel Dashboard → Deployments
   - Veja se o último deploy está "Ready" ✅

3. **Verificar variáveis de ambiente:**
   - Vercel Dashboard → Settings → Environment Variables
   - Confirme que as 2 variáveis estão lá

---

## ✅ Sinais de que Está Funcionando:

- Console mostra: `📤 Enviando para Supabase`
- Console mostra: `✅ Lead salvo no Supabase`
- Mensagem: "Lead enviado com sucesso!"
- Lead aparece na tabela `leads` do Supabase

---

## ❌ Sinais de que NÃO está funcionando:

- Console mostra: "Enviando dados para: /api/lead" (código antigo)
- Erro: "Variáveis de ambiente do Supabase não configuradas"
- Erro: "relation 'leads' does not exist"
- Erro RLS: "new row violates row-level security policy"

---

**Faça commit e push agora para atualizar o site!** 🚀

