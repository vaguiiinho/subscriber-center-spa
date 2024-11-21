
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const token = 'token'
    const url = 'url'

    const body = await req.json();

    const response = await fetch(url, {
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
