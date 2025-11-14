export default async function handler(req, res) {
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
    return res.status(500).json({ 
      success: false, 
      error: 'Erro ao processar formulário' 
    });
  }
}

