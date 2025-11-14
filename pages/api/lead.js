export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  try {
    const { name, phone, email, university } = req.body;

    const response = await fetch('https://formspree.io/f/mvgdzwvy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        university: university,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json({ success: true, message: 'Lead capturado com sucesso!' });
  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

