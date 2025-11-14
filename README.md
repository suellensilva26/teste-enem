# NeuroHack ENEM 2025 - Quiz de Alta Conversão Mobile-First

Quiz mobile-first com validações rigorosas, desenvolvido com técnicas de copywriting e psicologia comportamental.

## ✅ BUGS CORRIGIDOS (Nova Versão)

1. ✅ Primeira opção agora mostra texto corretamente
2. ✅ Opções alinhadas verticalmente
3. ✅ Texto NÃO sai da caixa (word-wrap garantido)
4. ✅ Responsividade perfeita em mobile (320px - 428px)
5. ✅ Espaçamento regular entre elementos
6. ✅ Botões com altura mínima de 60px (52px+ em mobile)
7. ✅ Feedback visual ao clicar (escala + cor + vibração)
8. ✅ Perguntas legíveis e bem estruturadas

## 🎯 Objetivo

Gerar conversões de 25-40% através de:
- **MEDO** realista (87% reprovam)
- **ESPERANÇA** imediata (solução em 2 minutos)
- **DESEJO** de compra (preço insignificante)
- **URGÊNCIA** máxima (48 horas para ENEM)
- **EMOÇÃO** em cada frase

## 🚀 Tecnologias

- React 18 + TypeScript
- Tailwind CSS (estilização)
- Framer Motion (animações)
- Vite (build tool)

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
npm run dev
```

Depois abra: http://localhost:5173

## 🧪 Testar com Validações

1. Abra o console do navegador (F12)
2. Inicie o quiz
3. Você verá logs detalhados de:
   - Validação de cada opção
   - Registro de cada resposta
   - Cálculo de pontos
   - Sistema de cupom

## 🏗️ Build

```bash
npm run build
```

Build já testado e funcionando ✅

## 📁 Estrutura

```
src/
├── components/
│   ├── QuizApp.tsx          # Componente principal com lógica de navegação
│   ├── LandingPage.tsx      # Página inicial com hook e social proof
│   ├── QuizQuestion.tsx     # Componente de perguntas
│   ├── QuizResult.tsx       # Resultado com análise neurológica
│   ├── SolutionTeaser.tsx   # Apresentação da solução
│   ├── PriceComparison.tsx  # Comparação de preços
│   ├── CTAButton.tsx        # Botão de compra final
│   └── UrgencyBanner.tsx    # Banner de urgência
├── data/
│   └── questions.ts         # Perguntas do quiz
├── utils/
│   └── calculations.ts     # Lógica de cálculo de resultados
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Funcionalidades

### 1. Landing Page
- Headline com medo + urgência
- Validação social (números de alunos)
- Proof points (estatísticas)
- Storytelling (histórias reais)
- CTA irresistível

### 2. Quiz (7 perguntas)
- Perguntas emocionais (não técnicas)
- Revelação progressiva de fraquezas
- Barra de progresso
- Animações suaves

### 3. Resultado
- Análise neurológica fake mas convincente
- % de chance de reprovar
- 3 fraquezas específicas identificadas
- Pontos perdidos calculados
- Pânico + esperança simultâneos

### 4. Solução
- Apresentação sem vender diretamente
- Criação de curiosidade
- Benefícios específicos

### 5. Comparação de Preços
- O que recebe
- Comparação com alternativas
- Preço com desconto
- Objection handling

### 6. CTA Final
- Timer de urgência
- Escassez (últimas vagas)
- Garantia
- Botão de compra destacado

## 🔧 Configuração

### 📝 Captura de Leads - Formspree (HTML PURO)

**IMPORTANTE**: O formulário de captura de leads usa HTML nativo direto para Formspree.

**NÃO USE**:
- ❌ APIs internas (`/api/lead`)
- ❌ fetch() ou axios para enviar dados
- ❌ Handlers customizados de submit
- ❌ Manipulação de estado para envio

**O formulário funciona apenas com**:
- ✅ `action="https://formspree.io/f/mvgdzwvy"`
- ✅ `method="POST"`
- ✅ Campos com atributo `name` correto

**Onde ver os leads**:
- Dashboard Formspree: https://formspree.io/forms/mvgdzwvy → aba "Submissões"
- Email: Configure o destinatário no painel do Formspree

**Arquivos removidos** (não são mais necessários):
- ❌ `api/lead.js` (DELETADO)
- ❌ `api/package.json` (DELETADO)
- ❌ Qualquer código relacionado a `/api/lead`

**Arquivo do formulário**: `src/components/LeadForm.tsx`
- Usa HTML puro com `action` e `method` direto para Formspree
- Mantém apenas estilos Tailwind CSS
- Facebook Pixel tracking (não interfere no envio)

### Integração com Gateway de Pagamento

Edite `src/components/CTAButton.tsx` e substitua a URL no método `handlePurchase`:

```typescript
const handlePurchase = () => {
  window.open('https://pay.hotmart.com/SEU_LINK_AQUI', '_blank')
}
```

### Personalização

- **Perguntas**: Edite `src/data/questions.ts`
- **Cálculos**: Ajuste `src/utils/calculations.ts`
- **Cores**: Modifique `tailwind.config.js`
- **Copywriting**: Edite os textos nos componentes
- **Formspree URL**: Edite `action` em `src/components/LeadForm.tsx` (se necessário)

## 📊 Métricas Esperadas

- Taxa de conversão: 15-25%
- Tempo médio no quiz: 3-5 minutos
- Taxa de conclusão do quiz: 60-80%

## 🎯 Técnicas de Copywriting Utilizadas

1. **Pattern Interrupt**: Quebra de expectativa
2. **Storytelling**: Histórias reais
3. **Numbers**: Números específicos
4. **Emotion Words**: Palavras emocionais
5. **Social Proof**: Validação constante
6. **Scarcity**: Urgência e escassez
7. **Objection Handling**: Resposta a objeções

## 🔍 Validações Implementadas

Ver `VALIDATIONS_CHECKLIST.md` para lista completa de validações.

### Principais Validações:
- ✅ Verificação se pergunta existe antes de renderizar
- ✅ Validação de cada opção (texto não vazio)
- ✅ Log detalhado de pontuação no console
- ✅ Validação de resultado antes de mostrar
- ✅ Word-wrap garantido em todos os textos
- ✅ Altura mínima de botões (60px desktop, 52px+ mobile)
- ✅ Scroll suave e sem overflow horizontal

## 📱 Responsividade Testada

- ✅ iPhone SE (375px)
- ✅ iPhone 12 Pro (390px)
- ✅ iPhone 14 Pro Max (428px)
- ✅ Samsung Galaxy S20 (412px)
- ✅ Tablets (768px)
- ✅ Desktop (1025px+)

## 🐛 Debug e Logs

Todos os componentes têm logs detalhados no console:
- `QuizQuestion`: Valida cada opção antes de renderizar
- `QuizApp`: Registra cada resposta com peso
- `QuizResult`: Mostra cálculo completo do resultado
- `CouponBanner`: Rastreia timer de 15 minutos

## 📝 Licença

Este projeto é privado e proprietário.

