// Vercel Serverless Function
export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Lidar com preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxjFunqElNdASD56Ys5XDXPNeIGZPLufPeVQRHQ_Sc_jgX8y0aBtsdoXeo1Zap4kv3gQ/usercontent';
    
    console.log('📤 API Route: Enviando para Google Script:', GOOGLE_SCRIPT_URL);
    console.log('📦 Dados recebidos:', req.body);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    });

    console.log('📥 Google Script resposta:', response.status, response.statusText);

    // Google Apps Script pode retornar HTML mesmo com sucesso
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('✅ Dados JSON recebidos:', data);
      return res.status(200).json(data);
    } else {
      // Se não for JSON, assumir sucesso (comum com Google Apps Script)
      const text = await response.text();
      console.log('📄 Resposta texto:', text.substring(0, 100));
      
      // Retornar sucesso mesmo se não for JSON
      return res.status(200).json({ 
        success: true,
        message: 'Dados enviados com sucesso'
      });
    }
  } catch (error) {
    console.error('❌ Erro na API route:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || error.toString() 
    });
  }
}
