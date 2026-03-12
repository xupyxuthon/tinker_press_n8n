export interface Character {
    id: string;
    name: string;
    avatar: string;
    tagline: string;
    personality: string;
    isOnline: boolean;
    lastMessage?: string;
    lastMessageTime?: Date;
    unreadCount?: number;
    // 角色详情页扩展字段
    audio?: string;
    image?: string;
    video?: string;
    description?: string;
    greeting?: string;
    nameKey?: string;
    region?: string;
    age?: string;
    essence?: string;
    quote?: string;
    engraving?: string;
    message?: string;
}

export interface Message {
    id: string;
    characterId: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    imageUrl?: string;
}

export interface ChatHistory {
    [characterId: string]: Message[];
}
