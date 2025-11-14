-- Script SQL para criar a tabela 'leads' no Supabase
-- Execute este script no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  university TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) se necessário
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (para o formulário funcionar)
CREATE POLICY "Permitir inserção pública de leads"
ON leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Política para permitir leitura apenas para usuários autenticados (opcional)
-- Descomente se quiser que apenas usuários autenticados vejam os leads
-- CREATE POLICY "Permitir leitura para usuários autenticados"
-- ON leads
-- FOR SELECT
-- TO authenticated
-- USING (true);

