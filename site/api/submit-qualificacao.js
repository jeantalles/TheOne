export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nome, whatsapp, email, empresa, papel, contexto, desafio, faturamento, meta } = req.body;

  if (!nome || !empresa) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_QUALIFICACAO_DATABASE_ID = process.env.NOTION_QUALIFICACAO_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_QUALIFICACAO_DATABASE_ID) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const properties = {
      Nome: {
        title: [{ text: { content: nome || '' } }],
      },
      Empresa: {
        rich_text: [{ text: { content: empresa || '' } }],
      },
    };

    if (whatsapp) {
      properties['WhatsApp'] = { phone_number: whatsapp };
    }
    if (email) {
      properties['E-mail'] = { email: email };
    }
    if (papel) {
      properties['Papel'] = { rich_text: [{ text: { content: papel } }] };
    }
    if (contexto) {
      properties['Contexto'] = { rich_text: [{ text: { content: contexto } }] };
    }
    if (desafio) {
      properties['Desafio'] = { rich_text: [{ text: { content: desafio } }] };
    }
    if (faturamento) {
      properties['Faturamento'] = { rich_text: [{ text: { content: faturamento } }] };
    }
    if (meta) {
      properties['Meta'] = { rich_text: [{ text: { content: meta } }] };
    }

    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_QUALIFICACAO_DATABASE_ID },
        properties: properties,
      }),
    });

    if (!notionRes.ok) {
      const errorData = await notionRes.json();
      console.error('Notion API error:', errorData);
      return res.status(500).json({ error: 'Failed to save to Notion', details: errorData });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting form to Notion:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
