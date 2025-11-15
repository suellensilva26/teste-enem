# 🔧 CORRIGIR ESTRUTURA DA TABELA quiz_results

## 🚨 PROBLEMA IDENTIFICADO:

A tabela foi criada, mas a estrutura pode estar errada!

Vejo que a tabela tem:
- `answer` (text) ❌ **ERRADO!**

Mas o código espera:
- `answers` (JSONB) ✅ **CORRETO!**
- `fail_chance` (INTEGER)
- `weaknesses` (JSONB)
- `total_points_lost` (INTEGER)

---

## ✅ SOLUÇÃO: Recriar Tabela com Estrutura Correta

### PASSO 1: Deletar Tabela Atual (se necessário)

1. No Supabase → Table Editor
2. Clique na tabela `quiz_results`
3. Clique em "..." (três pontos)
4. Selecione "Delete table"
5. Confirme

### PASSO 2: Criar Tabela Correta

1. No Supabase → **SQL Editor**
2. Cole este SQL:

```sql
-- Criar tabela para salvar dados do quiz
CREATE TABLE IF NOT EXISTS quiz_results (
  id BIGSERIAL PRIMARY KEY,
  email TEXT,
  name TEXT,
  phone TEXT,
  answers JSONB NOT NULL,
  fail_chance INTEGER NOT NULL,
  weaknesses JSONB NOT NULL,
  total_points_lost INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desabilitar RLS para permitir inserção
ALTER TABLE quiz_results DISABLE ROW LEVEL SECURITY;
```

3. Clique em **"Run"**
4. Aguarde confirmação

### PASSO 3: Verificar Estrutura

1. Volte para **Table Editor**
2. Clique na tabela `quiz_results`
3. Clique na aba **"Definition"**
4. Verifique se tem:
   - ✅ `answers` (jsonb)
   - ✅ `fail_chance` (int4)
   - ✅ `weaknesses` (jsonb)
   - ✅ `total_points_lost` (int4)

### PASSO 4: Testar

1. Faça um novo teste completo:
   - Preencha o formulário
   - Complete o quiz
2. Abra Console (F12)
3. Veja os logs:
   - `✅ Dados do quiz salvos no Supabase:`
   - `✅ CONFIRMADO: Quiz realmente salvo! ID: X`
4. Volte para Supabase → Table Editor → `quiz_results`
5. Deve aparecer o registro!

---

## 📋 ESTRUTURA CORRETA:

```
quiz_results:
- id (bigserial, PRIMARY KEY)
- email (text)
- name (text)
- phone (text)
- answers (jsonb) ← IMPORTANTE: JSONB, não TEXT!
- fail_chance (integer)
- weaknesses (jsonb) ← IMPORTANTE: JSONB!
- total_points_lost (integer)
- created_at (timestamptz)
```

---

**EXECUTE O SQL AGORA E TESTE!** 🚀

