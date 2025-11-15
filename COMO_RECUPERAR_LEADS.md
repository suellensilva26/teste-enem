# 🔍 COMO RECUPERAR LEADS PERDIDOS

## 🎯 ONDE OS DADOS PODEM ESTAR:

### 1. **localStorage do Navegador** (MAIS PROVÁVEL)
Os dados são salvos automaticamente quando o formulário é enviado:
- Chave: `leadData`
- Contém: name, phone, email, university

### 2. **Console Logs**
Quando o lead é enviado, aparece no console:
- `📤 Enviando para Supabase: {...}`
- `✅ Lead salvo no Supabase: [...]`

### 3. **Network Tab (DevTools)**
As requisições para o Supabase ficam no histórico.

---

## ✅ COMO RECUPERAR AGORA:

### PASSO 1: Verificar localStorage

1. Abra o site: https://teste-enem.netlify.app
2. Abra Console (F12)
3. Digite e pressione Enter:
   ```javascript
   localStorage.getItem('leadData')
   ```
4. Se aparecer dados, copie e me mostre!

### PASSO 2: Extrair TODOS os dados

No Console, digite:
```javascript
// Ver todos os dados do localStorage
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key + ':', localStorage.getItem(key));
}
```

### PASSO 3: Salvar no Supabase manualmente

Se encontrar dados no localStorage, use este código no Console:

```javascript
// Substitua pelos dados que você encontrou
const leadData = {
  name: "NOME_AQUI",
  phone: "TELEFONE_AQUI",
  email: "EMAIL_AQUI",
  university: "UNIVERSIDADE_AQUI"
};

// Salvar no Supabase
fetch('https://tmhfqosgpmllabbizvxs.supabase.co/rest/v1/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k',
    'Authorization': 'Bearer sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k'
  },
  body: JSON.stringify(leadData)
})
.then(r => r.json())
.then(data => console.log('✅ Lead salvo:', data))
.catch(err => console.error('❌ Erro:', err));
```

---

## 🚨 SE OS DADOS ESTIVEREM NO CONSOLE:

1. Abra Console (F12)
2. Procure por mensagens que começam com:
   - `📤 Enviando para Supabase:`
   - `✅ Lead salvo no Supabase:`
3. Copie os dados que aparecem depois dos dois pontos
4. Use o código acima para salvar

---

**FAÇA O PASSO 1 AGORA E ME MOSTRE O RESULTADO!** 🔍

