# 🔧 CORRIGIR ERRO 401 - SOLUÇÃO DEFINITIVA

## 🚨 ERRO ATUAL:

**401 Unauthorized** - Problema de autenticação/autorização no Supabase.

---

## ✅ SOLUÇÃO - 3 PASSOS:

### PASSO 1: Verificar Variáveis no Netlify

1. Acesse: https://app.netlify.com
2. Seu site → **Site settings**
3. **Environment variables**
4. **CONFIRME que existem:**
   - `VITE_SUPABASE_URL` = `https://tmhfqosgpmllabbizvxs.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k`
5. **Se NÃO existirem, ADICIONE AGORA!**
6. **Se existirem, DELETE e ADICIONE NOVAMENTE** (para garantir)

### PASSO 2: Configurar Política RLS no Supabase

1. Acesse: https://supabase.com/dashboard
2. Seu projeto → **SQL Editor**
3. Clique em **"New query"**
4. **COLE e EXECUTE este SQL:**

```sql
-- Desabilitar RLS temporariamente para testar
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- OU criar política que permite INSERT para todos
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Deletar política antiga se existir
DROP POLICY IF EXISTS "Permitir inserção pública de leads" ON leads;

-- Criar nova política que permite INSERT
CREATE POLICY "Permitir inserção pública de leads"
ON leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Criar política que permite SELECT para anon (opcional)
CREATE POLICY "Permitir leitura pública de leads"
ON leads
FOR SELECT
TO anon
USING (true);
```

5. Clique em **"Run"** (ou Ctrl+Enter)
6. Deve aparecer **"Success"**

### PASSO 3: Fazer Redeploy no Netlify

1. Netlify Dashboard → **Deploys**
2. Clique nos **3 pontinhos** do último deploy
3. Clique em **"Trigger deploy"** → **"Clear cache and deploy site"**
4. Aguarde 2-3 minutos

---

## 🧪 TESTE:

1. Aguarde o deploy ficar **"Published"** ✅
2. Acesse: https://teste-enem.netlify.app
3. **Pressione `Ctrl + Shift + R`** (limpar cache)
4. Abra Console (F12)
5. **DEVE aparecer**: `🔧 Supabase Client inicializado: { url: '✅ Configurada', key: '✅ Configurada' }`
6. Preencha formulário
7. **DEVE aparecer**: `📤 Enviando para Supabase`
8. **DEVE aparecer**: `✅ Lead salvo no Supabase`
9. **NÃO deve aparecer**: Erro 401

---

## 🐛 SE AINDA DER ERRO 401:

### Verificar no Console:
1. Abra Console (F12)
2. Veja a mensagem de erro completa
3. Me mostre o erro exato

### Verificar Variáveis:
1. No Console, digite:
   ```javascript
   console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
   console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'CONFIGURADA' : 'VAZIA')
   ```
2. Se aparecer "VAZIA", as variáveis não estão configuradas no Netlify

---

**FAÇA OS 3 PASSOS ACIMA AGORA!** 🚀

