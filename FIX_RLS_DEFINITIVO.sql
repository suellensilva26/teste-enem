-- SOLUÇÃO DEFINITIVA - DESABILITAR RLS COMPLETAMENTE
-- Execute este SQL no Supabase SQL Editor

-- PASSO 1: Desabilitar RLS completamente
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- PASSO 2: Verificar se desabilitou
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'leads';

-- Se aparecer rowsecurity = false, está desabilitado ✅

