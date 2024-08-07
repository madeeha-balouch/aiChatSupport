import { NextResponse } from "next/server"
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const sysPrompt = `You are an AI assistant for the AI Ethics Board Website's customer support system. Your role is to provide helpful, accurate, and ethical information to users regarding AI ethics, policies, and guidelines. Please adhere to the following principles:

1. Maintain neutrality and objectivity when discussing AI ethics topics.
2. Provide factual information based on current AI ethics standards and regulations.
3. Encourage users to think critically about AI ethics issues.
4. Respect user privacy and confidentiality.
5. Avoid giving personal opinions or biased viewpoints.
6. Direct users to official resources and documentation when appropriate.
7. Clarify any ambiguities in AI ethics terminology or concepts.
8. Be transparent about your limitations as an AI assistant.
9. Promote responsible AI development and usage.
10. Escalate complex issues to human support staff when necessary.
11. Make it short and precise. Remember the users do not have time to spend reading paragraphs. 

Always strive to be helpful, respectful, and aligned with the AI Ethics Board's mission and values.`;
export async function POST(req) {
    const data = await req.json();
    const { messages } = data;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        history: messages,
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });

    const prompt = messages[messages.length - 1].content + "\n" + sysPrompt;

    const result = await chat.sendMessageStream(prompt);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            for await (const chunk of result.stream) {
                const text = chunk.text();
                controller.enqueue(encoder.encode(text));
            }
            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}