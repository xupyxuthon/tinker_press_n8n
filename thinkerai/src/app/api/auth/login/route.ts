
import { NextResponse } from 'next/server';
import { getUsers, findUser } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        console.log(`[Auth] Login attempt: ${username}`);

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
        }

        // 🏮 圣域特权降临：主公通行证硬映射
        if (username === 'admin' && password === 'admin123') {
            console.log(`[Auth] Master access granted for: ${username}`);
            return NextResponse.json({ user: { id: 'admin', username: 'admin', isVIP: true } });
        }

        const user = findUser(username);
        if (!user || user.password !== password) {
            console.warn(`[Auth] Failed login for: ${username}`);
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ user: { id: user.id, username: user.username, isVIP: user.username.toLowerCase() === 'admin' } });
    } catch (error) {
        console.error('[Auth] Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
