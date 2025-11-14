// Facebook Pixel Integration - ID: 622409423936021
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

// Inicializar Facebook Pixel (já carregado no index.html)
export const initFacebookPixel = () => {
  if (typeof window === 'undefined') return;
  
  // Pixel já está carregado no index.html, apenas verifica
  if (window.fbq && typeof window.fbq === 'function') {
    console.log('✅ Facebook Pixel já carregado');
  } else {
    console.warn('⚠️ Facebook Pixel não encontrado');
  }
};

// Função principal para rastrear eventos
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq && typeof window.fbq === 'function') {
    window.fbq('track', eventName, data || {});
    console.log(`✅ Pixel Event: ${eventName}`, data || {});
  } else {
    console.warn(`⚠️ Facebook Pixel not loaded: ${eventName}`);
  }
};

// Eventos específicos do quiz
export const trackPageView = () => {
  trackEvent('PageView');
};

export const trackStartTrial = () => {
  trackEvent('StartTrial');
};

export const trackCompleteRegistration = () => {
  trackEvent('CompleteRegistration');
};

export const trackViewContent = () => {
  trackEvent('ViewContent', {
    content_name: 'NeuroHack ENEM Quiz',
    content_type: 'product',
    value: 97,
    currency: 'BRL'
  });
};

export const trackLead = () => {
  trackEvent('Lead', {
    content_name: 'Quiz Lead',
    value: 97,
    currency: 'BRL'
  });
};

export const trackAddToCart = () => {
  trackEvent('AddToCart', {
    content_name: 'NeuroHack ENEM',
    content_type: 'product',
    value: 97,
    currency: 'BRL'
  });
};

export const trackPurchase = (price: number = 97) => {
  trackEvent('Purchase', {
    value: price,
    currency: 'BRL',
    content_name: 'NeuroHack ENEM 2025',
    content_type: 'product'
  });
};

// Manter compatibilidade com código antigo
export const trackQuizStart = trackStartTrial;
export const trackQuizComplete = trackCompleteRegistration;
export const trackResultView = trackViewContent;
