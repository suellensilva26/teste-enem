# 📱 Instruções para Adicionar Imagem do App

## Onde adicionar a imagem:

1. Coloque a imagem do app em: `/public/images/app-screenshot.jpg`
2. Tamanho recomendado: 800x600px ou proporção similar
3. Formato: JPG ou PNG

## Como ativar a imagem:

No arquivo `src/components/QuizResult.tsx`, linha ~150, descomente:

```tsx
{/* Substitua o placeholder por: */}
<img 
  src="/images/app-screenshot.jpg" 
  alt="App NeuroHack ENEM 2025" 
  className="w-full h-full object-cover" 
/>
```

E comente o placeholder atual:

```tsx
{/* <div className="text-center z-10">
  <div className="text-6xl mb-3">📱</div>
  <div className="text-gold font-black text-xl mb-2">NeuroHack ENEM 2025</div>
  <div className="text-white text-sm">App Premium</div>
</div> */}
```

## Imagem recomendada:

- Screenshot do app funcionando
- Interface do NeuroHack ENEM 2025
- Mostrando funcionalidades principais
- Design moderno e profissional

