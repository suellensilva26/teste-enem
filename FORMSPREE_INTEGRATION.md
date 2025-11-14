# ✅ Integração Formspree - Captura de Leads

## 📋 Como Funciona

### 1. Fluxo de Dados:
```
Frontend (LeadForm.tsx)
    ↓ POST /api/lead
API Route (api/lead.js) - Server-side
    ↓ POST https://formspree.io/f/mvgdzwvy
Formspree
    ↓ Salva dados
Email + Dashboard Formspree
```

### 2. Endpoint da API:
- **URL**: `/api/lead`
- **Método**: `POST`
- **Content-Type**: `application/json`

### 3. Dados Enviados:
```json
{
  "name": "João Silva",
  "phone": "11999999999",
  "email": "joao@email.com",
  "university": "Medicina"
}
```

---

## 📍 Onde Ver os Leads Capturados

### Opção 1: Email (Recomendado)
- Os leads são enviados automaticamente para o email cadastrado no Formspree
- Você recebe um email a cada novo lead capturado

### Opção 2: Dashboard Formspree
1. Acesse: https://formspree.io/forms/mvgdzwvy
2. Faça login na sua conta Formspree
3. Veja todos os leads na aba "Submissions"

---

## 🧪 Como Testar

### Teste Local (Desenvolvimento):

1. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

2. **Abra o navegador:**
```
http://localhost:5173
```

3. **Preencha o formulário** e clique em "ACESSAR GRUPO AGORA"

4. **Verifique no console do navegador:**
- Deve aparecer: `📤 Enviando dados para: /api/lead`
- Deve aparecer: `✅ Lead capturado com sucesso!`

5. **Verifique no terminal:**
- Deve aparecer: `📥 Lead recebido: { name, phone, email, university }`
- Deve aparecer: `✅ Lead enviado para Formspree com sucesso!`

### Teste em Produção:

1. **Faça deploy:**
```bash
git add -A
git commit -m "Add: Formspree integration"
git push
```

2. **Aguarde 2-3 minutos** para o Vercel fazer o deploy

3. **Acesse o site:**
```
https://teste-enem-agora.vercel.app
```

4. **Preencha o formulário** e envie

5. **Verifique:**
- **Email**: Verifique sua caixa de entrada (pode levar alguns minutos)
- **Formspree Dashboard**: https://formspree.io/forms/mvgdzwvy
- **Vercel Logs**: https://vercel.com/dashboard → Functions → api/lead.js

---

## 🔧 Teste Direto da API

Você pode testar a API diretamente usando curl:

```bash
curl -X POST https://teste-enem-agora.vercel.app/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "phone": "11999999999",
    "email": "teste@teste.com",
    "university": "Medicina"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Lead capturado com sucesso! Você será contatado em breve."
}
```

---

## 🐛 Troubleshooting

### Erro 404:
- Verifique se o deploy foi concluído no Vercel
- Aguarde 2-3 minutos após o push

### Erro 500:
- Verifique os logs do Vercel: https://vercel.com/dashboard
- Verifique se a URL do Formspree está correta
- Verifique se o Formspree está ativo

### Lead não aparece no Formspree:
- Verifique se o email está correto no Formspree
- Verifique se o Formspree não está bloqueando requisições
- Verifique os logs do Vercel para ver erros

---

## ✅ Status

- [x] API route criada (`api/lead.js`)
- [x] Integração com Formspree implementada
- [x] Tratamento de erros completo
- [x] Validação de campos
- [x] CORS configurado
- [x] Logs para debug

**Pronto para produção!** 🎉

