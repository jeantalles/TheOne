function richText(content) {
  return content ? [{ text: { content: String(content) } }] : [];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nome, email, whatsapp, telefone, empresa, papel, contexto, desafio, faturamento, meta, source } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'Missing required field: nome' });
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const phone = whatsapp || telefone || null;

  const properties = {
    Nome: { title: richText(nome) },
    ...(email && { Email: { email } }),
    ...(phone && { Telefone: { phone_number: phone } }),
    ...(empresa && { Empresa: { rich_text: richText(empresa) } }),
    ...(papel && { Papel: { rich_text: richText(papel) } }),
    ...(contexto && { Contexto: { rich_text: richText(contexto) } }),
    ...(desafio && { Desafio: { rich_text: richText(desafio) } }),
    ...(faturamento && { Faturamento: { rich_text: richText(faturamento) } }),
    ...(meta && { Meta: { rich_text: richText(meta) } }),
    ...(source && { Source: { rich_text: richText(source) } }),
  };

  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({ parent: { database_id: NOTION_DATABASE_ID }, properties }),
    });

    if (!notionRes.ok) {
      const errorData = await notionRes.json();
      console.error('Notion API error:', errorData);
      return res.status(500).json({ error: 'Failed to save to Notion', details: errorData });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting lead to Notion:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
