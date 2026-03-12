
import fs from 'fs';
import path from 'path';

// Hardcode path to ensure it works in this environment regardless of CWD
const DATA_DIR = "/home/x/shared/ojia8/sites/Saint_Chamber_3001/data";
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CHATS_DIR = path.join(DATA_DIR, 'chats');

export interface User {
    id: string;
    username: string;
    password?: string; // Hashed or plain for this simple demo
}

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(CHATS_DIR)) fs.mkdirSync(CHATS_DIR);
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));

export const getUsers = (): User[] => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const saveUser = (user: User) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

export const getUserById = (id: string): User | undefined => {
    const users = getUsers();
    return users.find(u => u.id === id);
};

export const findUser = (username: string): User | undefined => {
    const users = getUsers();
    return users.find(u => u.username === username);
};

export const getChatHistory = (userId: string, characterId: string): any[] => {
    const user = getUserById(userId);

    // Use username if found, otherwise fallback to userId (though userId shouldn't fail if valid)
    const identifier = user ? user.username : userId;

    const filePath = path.join(CHATS_DIR, `${identifier}_${characterId}.json`);

    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Handle both legacy array format and new object format
        if (Array.isArray(data)) {
            return data;
        } else if (data && Array.isArray(data.messages)) {
            return data.messages;
        }

        return [];
    } catch (error) {
        return [];
    }
};

export const saveMessage = (userId: string, characterId: string, message: any) => {
    const user = getUserById(userId);
    const identifier = user ? user.username : userId;
    const filePath = path.join(CHATS_DIR, `${identifier}_${characterId}.json`);

    let historyData: any = { userId, characterId, messages: [] };

    if (fs.existsSync(filePath)) {
        try {
            const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            if (Array.isArray(rawData)) {
                historyData.messages = rawData;
            } else if (rawData && Array.isArray(rawData.messages)) {
                historyData = rawData;
            }
        } catch (e) {
            // file corrupted or empty, start fresh
        }
    }

    // Ensure messages array exists
    if (!historyData.messages) historyData.messages = [];

    // If message is provided
    if (message) {
        historyData.messages.push(message);
    }

    fs.writeFileSync(filePath, JSON.stringify(historyData, null, 2));
};
