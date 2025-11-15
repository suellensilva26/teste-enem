-- ============================================
-- SQL CORRETO - NOMES EM INGLÊS (PADRÃO)
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- 1. Deletar tabela se existir (com nomes em português)
DROP TABLE IF EXISTS quiz_resultados CASCADE;
DROP TABLE IF EXISTS quiz_results CASCADE;

-- 2. Criar tabela com estrutura correta (nomes em INGLÊS)
CREATE TABLE quiz_results (
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

-- 3. Desabilitar RLS para permitir inserção pública
ALTER TABLE quiz_results DISABLE ROW LEVEL SECURITY;

-- 4. Verificar se foi criada corretamente
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'quiz_results'
ORDER BY ordinal_position;

-- ============================================
-- FIM DO SQL
-- ============================================

