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

    // Apenas retorna sucesso - simples
    console.log('Lead recebido:', { name, phone, email, university });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Lead capturado com sucesso! Você será contatado em breve.' 
    });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erro ao processar formulário' 
    });
  }
}

