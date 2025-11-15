# 🔍 DIAGNÓSTICO: ONDE OS DADOS DO QUIZ ESTÃO SENDO SALVOS?

## ❌ PROBLEMA ENCONTRADO:

**OS DADOS DO QUIZ NÃO ESTÃO SENDO SALVOS NO SUPABASE!**

---

## 📋 ANÁLISE DO CÓDIGO:

### ✅ O QUE ESTÁ SENDO SALVO:
- **LeadForm.tsx** → Salva dados do formulário na tabela `leads`:
  - name
  - phone
  - email
  - university

### ❌ O QUE NÃO ESTÁ SENDO SALVO:
- **QuizApp.tsx** → Dados do quiz ficam apenas em memória (useState):
  - Respostas do quiz (answers)
  - Resultado calculado (failChance, weaknesses)
  - Nenhum dado é enviado para Supabase

---

## 🎯 ONDE OS DADOS DO QUIZ ESTÃO:

1. **QuizApp.tsx** (linha 24):
   ```typescript
   const [answers, setAnswers] = useState<Answer[]>([])
   ```
   - Fica apenas em memória
   - NÃO é salvo em banco de dados

2. **QuizResult.tsx** (linha 12):
   ```typescript
   function QuizResult({ result }: QuizResultProps)
   ```
   - Recebe o resultado calculado
   - Apenas exibe na tela
   - NÃO salva no Supabase

---

## ✅ SOLUÇÃO NECESSÁRIA:

1. **Criar tabela no Supabase** para salvar dados do quiz
2. **Adicionar código** para salvar quando o quiz é completado
3. **Salvar**: respostas, resultado, fraquezas, etc.

---

**OS DADOS DO QUIZ NÃO ESTÃO SENDO SALVOS! PRECISA IMPLEMENTAR ISSO.**

