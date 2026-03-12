
import { NextResponse } from 'next/server';
import { getChatHistory } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const characterId = searchParams.get('characterId');

        if (!userId || !characterId) {
            return NextResponse.json({ error: 'Missing userId or characterId' }, { status: 400 });
        }

        const history = getChatHistory(userId, characterId);
        return NextResponse.json({ messages: history });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}
