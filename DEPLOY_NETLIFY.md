# 🚀 DEPLOY NO NETLIFY - PASSO A PASSO

## ✅ ARQUIVO CRIADO:

Criei o arquivo `netlify.toml` com a configuração correta.

---

## 🎯 FAÇA ISSO AGORA:

### PASSO 1: Fazer Commit e Push
```bash
git add netlify.toml
git commit -m "Add: Netlify configuration"
git push
```

### PASSO 2: Acessar Netlify
1. Acesse: https://app.netlify.com
2. Faça login (pode usar GitHub)
3. Clique em **"Add new site"** → **"Import an existing project"**
4. Selecione **"GitHub"**
5. Autorize o Netlify a acessar seu GitHub
6. Selecione o repositório: **"teste-enem"**

### PASSO 3: Configurar Build
1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. Clique em **"Deploy site"**

### PASSO 4: Configurar Variáveis de Ambiente
1. Após o deploy iniciar, vá em **Site settings**
2. Vá em **Environment variables**
3. Clique em **"Add variable"**
4. Adicione:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: `https://tmhfqosgpmllabbizvxs.supabase.co`
   - Clique em **"Save"**
5. Adicione outra:
   - **Key**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: `sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k`
   - Clique em **"Save"**

### PASSO 5: Fazer Redeploy
1. Vá em **Deploys**
2. Clique nos **3 pontinhos** do último deploy
3. Clique em **"Trigger deploy"** → **"Clear cache and deploy site"**
4. Aguarde 2-3 minutos

---

## 🧪 TESTE:

1. Aguarde o deploy ficar **"Published"** ✅
2. Acesse a URL do Netlify (ex: `seu-site.netlify.app`)
3. **Pressione `Ctrl + Shift + R`** (limpar cache)
4. Abra Console (F12)
5. **DEVE aparecer**: `🔧 Supabase Client inicializado`
6. Preencha formulário
7. **DEVE aparecer**: `📤 Enviando para Supabase`

---

## ✅ VANTAGENS DO NETLIFY:

- ✅ Deploy mais rápido
- ✅ Interface mais simples
- ✅ Menos problemas de cache
- ✅ Funciona melhor com Vite

**FAÇA OS PASSOS ACIMA AGORA!** 🚀

