import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const url = 'https://crm.tubaron.net/webservice/v1/cliente_contrato';
    const token = '44:82225522c68ce028c0652e38ccbade6ac43df33110853ec131ad1797aa1db656'

    const body = await req.json();

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(token).toString('base64')}`,
            ixcsoft: 'listar',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch from external API' }, { status: response.status });
    }

    const data = await response.json();
    return new NextResponse(data, {
        headers: { 'Content-Type': 'application/json' },
    });
}