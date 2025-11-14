// Vercel Serverless Function
export default async function handler(req, res) {
  // Habilitar CORS explicitamente
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Lidar com preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  try {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxjFunqElNdASD56Ys5XDXPNeIGZPLufPeVQRHQ_Sc_jgX8y0aBtsdoXeo1Zap4kv3gQ/usercontent';
    
    console.log('📤 API Route recebeu requisição:', req.body);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    });

    console.log('📥 Resposta do Google Script:', response.status);

    const data = await response.json();
    
    console.log('✅ Dados retornados:', data);
    
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Erro na API route:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || error.toString() 
    });
  }
}
