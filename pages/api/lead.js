export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw1khziBb7wp3Y59DFZgCwSTd93w6jDXF2P4d8z1OcElZH1fgjvD3_zcysz5lTwBpqDww/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
}

