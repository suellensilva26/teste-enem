# 🚀 FINALIZAR CONFIGURAÇÃO - Passo a Passo Final

## ✅ Você já tem:
- ✅ Chave publicável: `sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k`
- ✅ URL do projeto: `https://tmhfqosgpmllabbizvxs.supabase.co`

## 🎯 AGORA FAÇA ISSO:

---

## PASSO 1: Configurar no Vercel

### 1.1 Abra o Vercel
- Abra uma **NOVA ABA** no navegador
- Acesse: **https://vercel.com/dashboard**
- Faça login se necessário

### 1.2 Selecione o Projeto
- Clique no projeto: **"teste-enem-agora"**
- (Ou procure pelo nome do seu projeto)

### 1.3 Vá em Settings
- No menu superior, clique em **"Settings"**
- No menu lateral esquerdo, clique em **"Environment Variables"**

### 1.4 Adicione a Primeira Variável
1. Clique no botão **"Add New"** ou **"Add"**
2. Preencha:
   - **Name**: Digite exatamente: `VITE_SUPABASE_URL`
   - **Value**: Cole: `https://tmhfqosgpmllabbizvxs.supabase.co`
   - **Environment**: Marque TODAS as opções:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
3. Clique em **"Save"**

### 1.5 Adicione a Segunda Variável
1. Clique em **"Add New"** novamente
2. Preencha:
   - **Name**: Digite exatamente: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Cole: `sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k`
   - **Environment**: Marque TODAS as opções:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
3. Clique em **"Save"**

---

## PASSO 2: Fazer Redeploy

### 2.1 Vá em Deployments
- No menu superior, clique em **"Deployments"**
- Você verá uma lista de deploys

### 2.2 Faça Redeploy
1. No **último deploy** (o mais recente), clique nos **3 pontinhos** (⋯) à direita
2. Clique em **"Redeploy"**
3. Confirme clicando em **"Redeploy"** novamente
4. **Aguarde 2-3 minutos** até aparecer "Ready" ✅

**OU** faça um novo commit:
```bash
git add -A
git commit -m "Configure Supabase"
git push
```

---

## PASSO 3: Verificar Tabela no Supabase

### 3.1 Volte para o Supabase
- Acesse: https://supabase.com/dashboard
- Vá em **"Editor de tabelas"** (Table Editor)
- Clique na tabela **`leads`**

### 3.2 Verificar Política RLS
Se a tabela `leads` não permitir inserção, execute no **SQL Editor**:

```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserção pública de leads"
ON leads
FOR INSERT
TO anon
WITH CHECK (true);
```

---

## PASSO 4: Testar no Site

### 4.1 Acesse o Site
- Abra uma nova aba
- Acesse: **https://teste-enem-agora.vercel.app**

### 4.2 Preencha o Formulário
1. Preencha todos os campos:
   - Nome
   - Telefone
   - Email
   - Universidade
2. Clique em **"ACESSAR GRUPO AGORA"**

### 4.3 Verifique
- Deve aparecer: **"Lead enviado com sucesso!"** ✅
- Se aparecer erro, abra o console (F12) e veja o erro

---

## PASSO 5: Verificar se Funcionou

### 5.1 Volte para o Supabase
- Acesse: https://supabase.com/dashboard
- Vá em **"Editor de tabelas"** (Table Editor)
- Clique na tabela **`leads`**

### 5.2 Veja os Dados
- Você deve ver o lead que acabou de enviar!
- Se aparecer, **FUNCIONOU!** 🎉

---

## 🐛 Se Não Funcionar

### Verifique:
1. **Console do navegador** (F12 → Console):
   - Se aparecer erro sobre variáveis → Variáveis não configuradas
   - Se aparecer erro RLS → Execute o SQL das políticas

2. **Vercel Logs**:
   - Vercel Dashboard → Deployments → Último deploy → Logs
   - Veja se há erros

3. **Variáveis de Ambiente**:
   - Verifique se as 2 variáveis estão salvas no Vercel
   - Verifique se fez redeploy após adicionar

---

## 📋 CHECKLIST FINAL

- [ ] Variável `VITE_SUPABASE_URL` adicionada no Vercel
- [ ] Variável `VITE_SUPABASE_ANON_KEY` adicionada no Vercel
- [ ] Redeploy feito no Vercel
- [ ] Tabela `leads` existe no Supabase
- [ ] Política RLS configurada
- [ ] Formulário testado no site
- [ ] Lead aparece na tabela do Supabase

---

**Pronto!** Após seguir esses passos, tudo deve funcionar! 🚀

