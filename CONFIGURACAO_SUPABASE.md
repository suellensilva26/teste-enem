# 🚀 Como Fazer a Captura de Leads Funcionar

## ✅ Passo 1: Verificar a Tabela no Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Table Editor** (menu lateral)
4. Verifique se a tabela `leads` existe
5. Se não existir, execute o SQL do arquivo `SUPABASE_SETUP.sql` no **SQL Editor**

---

## ✅ Passo 2: Obter as Credenciais do Supabase

1. No Supabase Dashboard, vá em **Settings** (ícone de engrenagem)
2. Clique em **API**
3. Você verá:
   - **Project URL** → Copie essa URL (ex: `https://xxxxx.supabase.co`)
   - **anon public** key → Copie essa chave (é uma string longa)

**IMPORTANTE**: Use a chave **anon public**, NÃO a service_role!

---

## ✅ Passo 3: Configurar Variáveis de Ambiente no Vercel

### Opção A: Via Dashboard do Vercel (Recomendado)

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto: `teste-enem-agora`
3. Vá em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

   **Variável 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: Cole a URL do seu projeto Supabase (ex: `https://xxxxx.supabase.co`)
   - Environment: Selecione **Production**, **Preview** e **Development**
   - Clique em **Save**

   **Variável 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: Cole a chave anon public do Supabase
   - Environment: Selecione **Production**, **Preview** e **Development**
   - Clique em **Save**

5. **IMPORTANTE**: Após adicionar as variáveis, faça um novo deploy:
   - Vá em **Deployments**
   - Clique nos 3 pontos do último deploy
   - Selecione **Redeploy**
   - Ou faça um novo commit e push

### Opção B: Via Arquivo .env.local (Para Teste Local)

1. Crie um arquivo `.env.local` na raiz do projeto:
```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

2. **NUNCA** commite o arquivo `.env.local` no Git!

---

## ✅ Passo 4: Verificar Políticas de Segurança (RLS)

1. No Supabase Dashboard, vá em **Table Editor**
2. Clique na tabela `leads`
3. Vá na aba **Policies** (ou **RLS**)
4. Verifique se existe uma política que permite INSERT para `anon`
5. Se não existir, execute no **SQL Editor**:

```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserção pública de leads"
ON leads
FOR INSERT
TO anon
WITH CHECK (true);
```

---

## ✅ Passo 5: Testar o Formulário

1. Faça deploy no Vercel (se ainda não fez)
2. Acesse seu site: https://teste-enem-agora.vercel.app
3. Preencha o formulário de lead
4. Clique em "ACESSAR GRUPO AGORA"
5. Verifique:
   - Se aparecer "Lead enviado com sucesso!" → Funcionou! ✅
   - Se aparecer erro → Verifique o console do navegador (F12)

---

## ✅ Passo 6: Verificar os Leads no Supabase

1. Acesse: https://supabase.com/dashboard
2. Vá em **Table Editor**
3. Clique na tabela `leads`
4. Você verá todos os leads capturados!

---

## 🐛 Troubleshooting

### Erro: "Variáveis de ambiente do Supabase não configuradas"
- **Solução**: Configure as variáveis no Vercel e faça redeploy

### Erro: "new row violates row-level security policy"
- **Solução**: Execute o SQL das políticas (Passo 4)

### Erro: "relation 'leads' does not exist"
- **Solução**: Crie a tabela usando o SQL do arquivo `SUPABASE_SETUP.sql`

### Leads não aparecem no Supabase
- Verifique se as variáveis de ambiente estão corretas
- Verifique se fez redeploy após adicionar as variáveis
- Verifique o console do navegador (F12) para erros
- Verifique se a política RLS permite INSERT para anon

---

## 📋 Checklist Final

- [ ] Tabela `leads` criada no Supabase
- [ ] Política RLS configurada para permitir INSERT
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Redeploy feito no Vercel
- [ ] Formulário testado no site
- [ ] Leads aparecem na tabela do Supabase

---

**Pronto!** Após seguir esses passos, os leads serão capturados automaticamente no Supabase! 🎉

