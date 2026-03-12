import { Message, ChatHistory } from './types';
import { User } from '@/types/auth';

const STORAGE_KEY = 'candy-chat-history';

export function saveChatHistory(characterId: string, messages: Message[]): void {
    try {
        const history = loadAllChatHistory();
        history[characterId] = messages;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error('Failed to save chat history:', error);
    }
}

export function loadChatHistory(characterId: string): Message[] {
    try {
        const history = loadAllChatHistory();
        const messages = history[characterId] || [];
        // Convert timestamp strings back to Date objects
        return messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
        }));
    } catch (error) {
        console.error('Failed to load chat history:', error);
        return [];
    }
}

export function loadAllChatHistory(): ChatHistory {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Failed to load all chat history:', error);
        return {};
    }
}

export function clearChatHistory(characterId: string): void {
    try {
        const history = loadAllChatHistory();
        delete history[characterId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error('Failed to clear chat history:', error);
    }
}

export function clearAllChatHistory(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear all chat history:', error);
    }
}

// 用户认证相关存储
const USER_STORAGE_KEY = 'candy-current-user';
const USERS_STORAGE_KEY = 'candy-users';

export function saveCurrentUser(user: User): void {
    try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Failed to save current user:', error);
    }
}

export function getCurrentUser(): User | null {
    try {
        if (typeof window === 'undefined') return null;
        const data = localStorage.getItem(USER_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to get current user:', error);
        return null;
    }
}

export function removeCurrentUser(): void {
    try {
        localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to remove current user:', error);
    }
}

export function saveUser(user: User): void {
    try {
        const users = getAllUsers();
        users[user.id] = user;
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Failed to save user:', error);
    }
}

export function getAllUsers(): Record<string, User> {
    try {
        if (typeof window === 'undefined') return {};
        const data = localStorage.getItem(USERS_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Failed to get all users:', error);
        return {};
    }
}

export function getUserByEmail(email: string): User | null {
    try {
        const users = getAllUsers();
        return Object.values(users).find(user => user.email === email) || null;
    } catch (error) {
        console.error('Failed to get user by email:', error);
        return null;
    }
}

export function getUserByUsername(username: string): User | null {
    try {
        const users = getAllUsers();
        return Object.values(users).find(user => user.username === username) || null;
    } catch (error) {
        console.error('Failed to get user by username:', error);
        return null;
    }
}
