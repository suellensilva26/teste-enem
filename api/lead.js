module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, phone, email, university } = req.body;

    console.log('📥 Lead recebido:', { name, phone, email, university });

    // URL do Google Apps Script que salva no Google Sheets
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbsiyUVKanp7vhnnSV9O4DTUEicbMTneKHnRddbu5Hs9KdtPgzevCHauR98nh/exec';

    // Enviar dados para Google Apps Script (que salva no Sheets)
    const scriptResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        university: university,
        timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }),
    });

    if (!scriptResponse.ok) {
      console.error('❌ Erro ao enviar para Google Script:', scriptResponse.status);
      // Mesmo com erro no script, retorna sucesso para não frustrar o usuário
      // Os dados serão logados no Vercel para você ver
    } else {
      console.log('✅ Lead salvo no Google Sheets com sucesso!');
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Lead capturado com sucesso! Você será contatado em breve.' 
    });
  } catch (error) {
    console.error('❌ Erro:', error);
    // Mesmo com erro, retorna sucesso para não frustrar o usuário
    // Os dados serão logados no Vercel para você ver
    return res.status(200).json({ 
      success: true, 
      message: 'Lead capturado com sucesso! Você será contatado em breve.' 
    });
  }
}

