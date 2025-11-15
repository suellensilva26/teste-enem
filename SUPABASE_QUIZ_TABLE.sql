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

-- OU criar política que permite INSERT para todos
-- ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Permitir inserção pública de quiz_results"
-- ON quiz_results
-- FOR INSERT
-- TO anon
-- WITH CHECK (true);

