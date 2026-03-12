
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Initialize Groq provider
const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY || '',
});

// Initialize LM Studio provider
const lmStudio = createOpenAI({
    baseURL: process.env.LM_STUDIO_API_URL || 'http://localhost:1234/v1',
    apiKey: 'lm-studio',
});


export async function POST(req: Request) {
    try {
        const { messages, system, userId, characterId } = await req.json();
        const provider = process.env.NEXT_PUBLIC_AI_PROVIDER || 'lmstudio';

        // Save USER message if userId exists
        if (userId && characterId && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'user') {
                const { saveMessage } = await import('@/lib/db');
                saveMessage(userId, characterId, {
                    id: Date.now().toString(), // Ensure ID exists
                    role: 'user',
                    content: lastMessage.content
                });
            }
        }

        let model;

        if (provider === 'groq') {
            // Use Groq model
            const modelId = process.env.GROQ_MODEL || 'llama3-70b-8192';
            model = groq(modelId);
        } else {
            // Use LM Studio local model
            const modelId = process.env.LM_STUDIO_MODEL || 'local-model';
            model = lmStudio(modelId);
        }


        // Sanitize messages to ensure only supported fields are sent to the provider
        const coreMessages = messages.map((m: any) => ({
            role: m.role,
            content: m.content,
        }));

        // Stream the response using the Vercel AI SDK
        const result = streamText({
            model,
            messages: coreMessages,
            system, // Pass the system prompt (character context)
            onFinish: async (completion) => {
                // Save AI message if userId exists
                if (userId && characterId) {
                    const { saveMessage } = await import('@/lib/db');
                    saveMessage(userId, characterId, {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: completion.text
                    });
                }
            },
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
