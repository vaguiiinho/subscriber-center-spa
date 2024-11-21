
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const token = '44:82225522c68ce028c0652e38ccbade6ac43df33110853ec131ad1797aa1db656'
    
    const body = await req.json();
  
  const response = await fetch('https://crm.tubaron.net/webservice/v1/get_boleto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(token).toString('base64')}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch from external API' }, { status: response.status });
  }

  const blob = await response.blob();
  return new NextResponse(blob, {
    headers: { 'Content-Type': 'application/pdf' },
  });
}
