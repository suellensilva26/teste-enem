# ✅ Configuração Vercel para API Route

## 📁 Estrutura de Arquivos:

```
/home/usuario/quiz aprimorado/
├── api/
│   └── lead.js          ✅ Serverless Function
├── vercel.json          ✅ Configuração Vercel
└── src/
    └── components/
        └── LeadForm.tsx ✅ Usa /api/lead
```

## ⚙️ Configuração Vercel:

### `vercel.json`:
```json
{
  "functions": {
    "api/lead.js": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/lead",
      "destination": "/api/lead.js"
    }
  ]
}
```

### `api/lead.js`:
- Formato: Vercel Serverless Function
- Runtime: Node.js 18.x
- Handler: `export default async function handler(req, res)`

## 🔧 Como Funciona:

1. **Frontend** faz POST para `/api/lead`
2. **Vercel** roteia para `/api/lead.js` (serverless function)
3. **API Route** faz POST para Google Apps Script (server-side)
4. **API Route** retorna resposta para frontend

## ✅ Vantagens:

- ✅ **Sem CORS**: Requisição server-side
- ✅ **Escalável**: Vercel Serverless Functions
- ✅ **Rápido**: Edge Functions
- ✅ **Confiável**: Tratamento de erros robusto

## 🚀 Deploy:

```bash
vercel deploy
```

Ou através do GitHub (deploy automático).

## 🐛 Troubleshooting:

### Erro 500:
- Verifique se `vercel.json` está correto
- Verifique se `api/lead.js` está na raiz
- Verifique logs no Vercel Dashboard

### Erro CORS:
- A API route resolve isso automaticamente
- Se ainda houver erro, verifique headers CORS

## ✅ Status:

- [x] API route criada
- [x] vercel.json configurado
- [x] Runtime Node.js especificado
- [x] Tratamento de erros melhorado
- [x] Deploy realizado

**Pronto para produção!** 🎉

