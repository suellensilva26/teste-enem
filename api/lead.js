/**
 * API Route para captura de leads usando Formspree
 * Endpoint: POST /api/lead
 * 
 * Recebe dados do formulário e envia para Formspree de forma confiável
 * Evita problemas de CORS fazendo a requisição server-side
 */

module.exports = async function handler(req, res) {
  // CORS headers para permitir requisições do frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

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

    // Enviar dados para Formspree usando fetch
    const formspreeResponse = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        university: university
      }),
    });

    // Verificar se a resposta do Formspree foi bem-sucedida
    if (!formspreeResponse.ok) {
      const errorText = await formspreeResponse.text();
      console.error('❌ Erro ao enviar para Formspree:', formspreeResponse.status, errorText);
      
      return res.status(500).json({
        success: false,
        error: `Erro ao processar formulário: ${formspreeResponse.status}`
      });
    }

    // Formspree retorna JSON com status
    const formspreeData = await formspreeResponse.json();
    console.log('✅ Lead enviado para Formspree com sucesso!', formspreeData);

    // Retornar sucesso para o frontend
    return res.status(200).json({
      success: true,
      message: 'Lead capturado com sucesso! Você será contatado em breve.'
    });

  } catch (error) {
    // Tratar erros de rede ou outros erros
    console.error('❌ Erro ao processar requisição:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Erro de conexão. Tente novamente em alguns instantes.'
    });
  }
}

