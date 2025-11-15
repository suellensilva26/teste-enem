# 🔍 VERIFICAR LEADS AGORA - PASSO A PASSO

## 🎯 O QUE FAZER AGORA:

### PASSO 1: Verificar no Supabase Diretamente

1. Acesse: https://supabase.com/dashboard
2. Seu projeto → **Table Editor**
3. Clique na tabela **`leads`**
4. **Veja se há dados lá!**
5. Se NÃO houver dados, os leads NÃO foram salvos

### PASSO 2: Verificar no Console do Navegador

1. No Console (F12), digite:
   ```javascript
   localStorage.getItem('leadData')
   ```
2. Se aparecer dados, copie e me mostre!

### PASSO 3: Usar Script de Verificação

1. No Console (F12), digite: `allow pasting` e pressione Enter
2. Abra o arquivo: `VERIFICAR_LEADS_SUPABASE.js`
3. Copie TODO o conteúdo
4. Cole no Console
5. Pressione Enter
6. O script vai mostrar:
   - Quantos leads estão no Supabase
   - Dados do localStorage
   - Todos os itens salvos

---

## 🚨 SE NÃO HOUVER DADOS:

**Isso significa que os leads NÃO foram salvos.**

Possíveis causas:
1. Erro ao salvar no Supabase (mas não apareceu erro)
2. RLS bloqueando (mas já desabilitamos)
3. Tabela não existe ou está com nome errado

---

## ✅ PRÓXIMO PASSO:

**Execute o script de verificação e me mostre o resultado!**

