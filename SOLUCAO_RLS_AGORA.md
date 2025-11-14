# 🚨 SOLUÇÃO DEFINITIVA - ERRO RLS

## 🚨 ERRO ATUAL:

**"new row violates row-level security policy for table "leads""**

**Código do erro: 42501**

---

## ✅ SOLUÇÃO - EXECUTE ISSO AGORA:

### PASSO 1: Acessar Supabase SQL Editor
1. Acesse: https://supabase.com/dashboard
2. Seu projeto → **SQL Editor**
3. Clique em **"New query"**

### PASSO 2: COLE e EXECUTE este SQL:

```sql
-- DESABILITAR RLS COMPLETAMENTE
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

### PASSO 3: Executar
1. Clique em **"Run"** (ou Ctrl+Enter)
2. Deve aparecer **"Success. No rows returned."** ✅

### PASSO 4: Testar Novamente
1. Volte para: https://teste-enem.netlify.app
2. **Pressione `Ctrl + Shift + R`** (limpar cache)
3. Preencha o formulário
4. Clique em **"ACESSAR GRUPO AGORA"**
5. **DEVE FUNCIONAR AGORA!** ✅

---

## ✅ SE AINDA NÃO FUNCIONAR:

Execute este SQL mais completo:

```sql
-- Deletar TODAS as políticas
DROP POLICY IF EXISTS "Permitir inserção pública de leads" ON leads;
DROP POLICY IF EXISTS "Permitir leitura pública de leads" ON leads;

-- Desabilitar RLS
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Verificar
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'leads';
```

---

**EXECUTE O SQL ACIMA AGORA E TESTE!** 🚀

