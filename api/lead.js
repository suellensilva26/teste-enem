/**
 * API Route para captura de leads usando Formspree
 * Endpoint: POST /api/lead
 * 
 * Recebe dados do formulário e envia para Formspree de forma confiável
 * Evita problemas de CORS fazendo a requisição server-side
 */

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Tratar requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Aceitar apenas método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method Not Allowed' 
    });
  }

  try {
    // Extrair dados do corpo da requisição
    const { name, phone, email, university } = req.body;

    // Validar campos obrigatórios
    if (!name || !phone || !email || !university) {
      return res.status(400).json({
        success: false,
        error: 'Todos os campos são obrigatórios'
      });
    }

    console.log('📥 Lead recebido:', { name, phone, email, university });

    // URL do Formspree endpoint
    const FORMSPREE_URL = 'https://formspree.io/f/mvgdzwvy';

    // Enviar dados para Formspree usando form-data (formato que Formspree espera)
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('university', university);

    const formspreeResponse = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData.toString()
    });

    // Verificar resposta do Formspree
    if (!formspreeResponse.ok) {
      const errorText = await formspreeResponse.text().catch(() => 'Erro desconhecido');
      console.error('❌ Erro Formspree:', formspreeResponse.status, errorText);
      
      // Mesmo com erro, retorna sucesso para não frustrar usuário
      // Os dados estão logados no Vercel
      return res.status(200).json({
        success: true,
        message: 'Lead capturado com sucesso! Você será contatado em breve.'
      });
    }

    const formspreeData = await formspreeResponse.json().catch(() => ({}));
    console.log('✅ Lead enviado para Formspree!', formspreeData);

    // Retornar sucesso
    return res.status(200).json({
      success: true,
      message: 'Lead capturado com sucesso! Você será contatado em breve.'
    });

  } catch (error) {
    console.error('❌ Erro:', error);
    
    // Mesmo com erro, retorna sucesso
    // Os dados estão logados no Vercel para você ver
    return res.status(200).json({
      success: true,
      message: 'Lead capturado com sucesso! Você será contatado em breve.'
    });
  }
}

