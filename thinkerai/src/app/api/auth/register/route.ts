
import { NextResponse } from 'next/server';
import { getUsers, saveUser, User } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
        }

        const users = getUsers();
        if (users.some(u => u.username === username)) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const newUser: User = {
            id: Date.now().toString(),
            username,
            password, // In a real app, hash this!
        };

        saveUser(newUser);

        return NextResponse.json({ user: { id: newUser.id, username: newUser.username } });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
