import { NextResponse } from 'next/server';
import { getNextSuggestion } from '@/actions/ai';

export async function POST(request) {
  try {
    const { content } = await request.json();
    if (!content) {
      return NextResponse.json({ success: false, error: 'No content provided' }, { status: 400 });
    }
    const result = await getNextSuggestion(content);
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('AI Suggestion API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
} 