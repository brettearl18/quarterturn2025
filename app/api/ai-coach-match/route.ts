import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  // TODO: Fetch real coaches from Firestore or use mock data
  const mockCoaches = [
    { id: 'mock-1', name: 'Dr. Jane Smith', specialties: ['Physiotherapy', 'Rehabilitation'] },
    { id: 'mock-2', name: 'Mike Thompson', specialties: ['Strength & Conditioning', 'HIIT'] },
    { id: 'mock-3', name: 'Elena Rodriguez', specialties: ['Nutrition', 'Weight Loss'] },
  ];

  // Prepare prompt for OpenAI
  const systemPrompt = `You are an expert fitness coach matchmaker. Given a user's request and a list of coaches, return the best matches as an array of objects with id and match score (0-100), and a short summary explanation of why these coaches were chosen. Respond in this JSON format: { explanation: string, matches: [{ id: string, score: number }] }.`;
  const userPrompt = `User request: ${query}\n\nCoaches:\n${mockCoaches.map(c => `ID: ${c.id}, Name: ${c.name}, Specialties: ${c.specialties.join(', ')}`).join('\n')}\n\nReturn the best matching coach IDs and scores, and a summary explanation, as specified.`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 300,
        temperature: 0.2,
      }),
    });

    if (!openaiRes.ok) throw new Error('OpenAI API error');
    const data = await openaiRes.json();
    const content = data.choices?.[0]?.message?.content || '';
    // Parse the JSON response from OpenAI
    const parsed = JSON.parse(content.match(/\{[\s\S]*\}/)?.[0] || '{}');
    const matches = (parsed.matches || []).map((m: any) => {
      const coach = mockCoaches.find(c => c.id === m.id);
      return coach ? { ...coach, score: m.score } : null;
    }).filter(Boolean);
    return NextResponse.json({ explanation: parsed.explanation || '', matches });
  } catch (err) {
    // Fallback: return all mock coaches with 100% score and a generic explanation
    return NextResponse.json({
      explanation: 'These coaches were selected based on their specialties and your request.',
      matches: mockCoaches.map(c => ({ ...c, score: 100 })),
    });
  }
} 