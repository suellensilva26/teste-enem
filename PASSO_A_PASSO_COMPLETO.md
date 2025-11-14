# 🎯 PASSO A PASSO COMPLETO - Onde Ir e O Que Fazer

## ✅ PASSO 1: Verificar/Criar Tabela "leads" no Supabase

### Onde você está agora:
- Você está no Supabase Dashboard → Table Editor
- Vejo que você tem a tabela "pistas" aberta

### O que fazer:
1. **No menu lateral esquerdo**, procure pela tabela **`leads`**
   - Se NÃO existir, você precisa criar
   - Se existir, clique nela

2. **Se a tabela `leads` NÃO existe**, crie assim:
   - Clique em **"Editor SQL"** no menu lateral
   - Clique em **"New query"**
   - Cole este SQL:
   ```sql
   CREATE TABLE IF NOT EXISTS leads (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     phone TEXT NOT NULL,
     email TEXT NOT NULL,
     university TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Permitir inserção pública de leads"
   ON leads
   FOR INSERT
   TO anon
   WITH CHECK (true);
   ```
   - Clique em **"Run"** (ou Ctrl+Enter)
   - Deve aparecer "Success"

---

## ✅ PASSO 2: Pegar as Credenciais do Supabase

### Onde ir:
1. No Supabase Dashboard, clique em **"Configurações do projeto"** (ícone de engrenagem ⚙️ no menu lateral)
2. Clique em **"API"** no menu que aparece

### O que copiar:
Você verá duas coisas importantes:

1. **Project URL**
   - Exemplo: `https://tmhfqosgpmllabbizvxs.supabase.co`
   - **COPIE ISSO** - você vai precisar!

2. **anon public** (chave pública)
   - É uma string muito longa tipo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **COPIE ISSO TAMBÉM** - você vai precisar!

---

## ✅ PASSO 3: Configurar no Vercel

### Onde ir:
1. Abra uma **NOVA ABA** no navegador
2. Acesse: **https://vercel.com/dashboard**
3. Faça login se necessário
4. Clique no projeto: **"teste-enem-agora"**

### O que fazer:
1. No menu do projeto, clique em **"Settings"**
2. No menu lateral, clique em **"Environment Variables"**
3. Você verá uma lista de variáveis (pode estar vazia)

4. **Adicione a primeira variável:**
   - Clique no botão **"Add New"** ou **"Add"**
   - **Name**: Digite exatamente: `VITE_SUPABASE_URL`
   - **Value**: Cole a URL que você copiou (ex: `https://tmhfqosgpmllabbizvxs.supabase.co`)
   - **Environment**: Marque TODAS as opções:
     - ☑️ Production
     - ☑️ Preview  
     - ☑️ Development
   - Clique em **"Save"**

5. **Adicione a segunda variável:**
   - Clique em **"Add New"** novamente
   - **Name**: Digite exatamente: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Cole a chave anon public que você copiou
   - **Environment**: Marque TODAS as opções:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
   - Clique em **"Save"**

---

## ✅ PASSO 4: Fazer Redeploy no Vercel

### Onde ir:
1. Ainda no Vercel Dashboard
2. No menu do projeto, clique em **"Deployments"**

### O que fazer:
1. Você verá uma lista de deploys
2. No último deploy (o mais recente), clique nos **3 pontinhos** (⋯) à direita
3. Clique em **"Redeploy"**
4. Confirme clicando em **"Redeploy"** novamente
5. Aguarde 2-3 minutos até o deploy terminar

**OU** faça um novo commit:
```bash
git add -A
git commit -m "Add: Supabase environment variables"
git push
```

---

## ✅ PASSO 5: Testar no Site

### Onde ir:
1. Abra uma nova aba
2. Acesse: **https://teste-enem-agora.vercel.app**

### O que fazer:
1. Preencha o formulário de lead:
   - Nome
   - Telefone
   - Email
   - Universidade
2. Clique em **"ACESSAR GRUPO AGORA"**
3. Deve aparecer: **"Lead enviado com sucesso!"** ✅

---

## ✅ PASSO 6: Verificar se Funcionou

### Onde ir:
1. Volte para o **Supabase Dashboard**
2. Clique em **"Editor de tabelas"** no menu lateral
3. Clique na tabela **`leads`**

### O que verificar:
- Você deve ver os dados do lead que você acabou de enviar!
- Se aparecer, **FUNCIONOU!** 🎉

---

## 🐛 Se Não Funcionar

### Verifique:
1. **Console do navegador** (F12 → Console):
   - Se aparecer erro sobre variáveis de ambiente → Variáveis não configuradas no Vercel
   - Se aparecer erro RLS → Execute o SQL das políticas novamente

2. **Vercel Logs**:
   - Vercel Dashboard → Deployments → Clique no último deploy → Logs
   - Veja se há erros

3. **Supabase Logs**:
   - Supabase Dashboard → Logs
   - Veja se há tentativas de inserção

---

## 📋 RESUMO RÁPIDO

1. ✅ Supabase → Settings → API → Copiar URL e chave
2. ✅ Vercel → Settings → Environment Variables → Adicionar 2 variáveis
3. ✅ Vercel → Deployments → Redeploy
4. ✅ Testar no site
5. ✅ Verificar no Supabase → Table Editor → leads

**Pronto!** 🚀

