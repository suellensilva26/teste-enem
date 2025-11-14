# 🗑️ COMO APAGAR VARIÁVEIS NO NETLIFY

## 🎯 PARA DELETAR UMA VARIÁVEL:

### Método 1: Pelo botão Options
1. Na variável que você quer deletar (ex: `VITE_SUPABASE_URL`)
2. Clique no botão **"Options"** (ao lado direito)
3. Clique em **"Delete variable"** ou **"Delete"**
4. Confirme a exclusão

### Método 2: Pelo ícone de lixeira
1. Na variável que você quer deletar
2. Procure pelo ícone de **lixeira** (🗑️) ou **"Delete"**
3. Clique e confirme

---

## ✅ RECOMENDAÇÃO:

**NÃO PRECISA DELETAR!** 

As variáveis já estão configuradas corretamente:
- ✅ `VITE_SUPABASE_URL` - Configurada
- ✅ `VITE_SUPABASE_ANON_KEY` - Configurada

**Só precisa fazer o PASSO 2 (configurar RLS no Supabase) e PASSO 3 (redeploy)!**

---

## 🔧 SE QUISER RECONFIGURAR:

1. Clique no botão **"Options"** da variável
2. Clique em **"Edit"** ou **"Update"**
3. Cole o valor correto:
   - `VITE_SUPABASE_URL` = `https://tmhfqosgpmllabbizvxs.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k`
4. Clique em **"Save"**

---

## 🚀 PRÓXIMO PASSO:

**NÃO DELETE!** As variáveis estão corretas.

**FAÇA AGORA:**
1. ✅ Configure RLS no Supabase (PASSO 2 do guia anterior)
2. ✅ Faça redeploy no Netlify (PASSO 3)

**As variáveis já estão OK!** 🎯

