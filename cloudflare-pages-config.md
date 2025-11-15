# ⚡ CONFIGURAÇÃO CLOUDFLARE PAGES

## 🚀 PASSO A PASSO COMPLETO:

### 1. Criar Conta Cloudflare (se não tiver)
- Acesse: https://dash.cloudflare.com/sign-up
- Crie conta gratuita (não precisa de cartão)

### 2. Conectar GitHub
- No Cloudflare Pages, clique em **"Create a project"**
- Selecione **"Connect to Git"**
- Autorize acesso ao GitHub
- Selecione: `suellensilva26/teste-enem`

### 3. Configurar Build
- **Project name:** `teste-enem` (ou qualquer nome)
- **Production branch:** `main`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (deixe vazio ou `/`)

### 4. Variáveis de Ambiente
- Clique em **"Environment variables"**
- Adicione:
  - `VITE_SUPABASE_URL` = `https://tmhfqosgpmllabbizvxs.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = `sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k`

### 5. Deploy
- Clique em **"Save and Deploy"**
- Aguarde 2-3 minutos
- Seu site estará em: `https://teste-enem.pages.dev`

### 6. Domínio Customizado (Opcional)
- Vá em **Custom domains**
- Adicione: `teste-enem.netlify.app` (se quiser manter o mesmo domínio)
- Ou use o domínio do Cloudflare: `teste-enem.pages.dev`

---

## ✅ VANTAGENS:

- ✅ **SEM limite de deploys**
- ✅ **Deploy automático** (cada push no GitHub)
- ✅ **CDN global** (mais rápido)
- ✅ **SSL automático**
- ✅ **100% gratuito**

---

**CONFIGURE AGORA E NUNCA MAIS SE PREOCUPE COM LIMITES!** 🚀

