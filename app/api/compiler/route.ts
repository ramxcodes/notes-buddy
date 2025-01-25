// app/api/compiler/route.ts
import { NextResponse } from 'next/server';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

const LANGUAGE_MAP: { [key: string]: number } = {
  c: 50,
  cpp: 54,
  python: 71,
  java: 62,
  javascript: 63,
};

export async function POST(req: Request) {
  const { code, language } = await req.json();
  
  try {
    const response = await fetch(`${JUDGE0_API_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY!,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code: code,
        language_id: LANGUAGE_MAP[language],
        stdin: '',
        redirect_stderr_to_stdout: true
      })
    });

    const submission = await response.json();
    const result = await fetch(`${JUDGE0_API_URL}/submissions/${submission.token}`, {
      headers: {
        'X-RapidAPI-Key': JUDGE0_API_KEY!,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    });

    const data = await result.json();
    return NextResponse.json({
      output: data.stdout || data.stderr || data.message,
      status: data.status?.description
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to execute code' },
      { status: 500 }
    );
  }
}