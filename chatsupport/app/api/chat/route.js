import { NextResponse } from "next/server"
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
export async function POST(req){
    const data = await req.json()
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = "What are you made of?"

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({message: text})
}