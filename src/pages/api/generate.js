import { UIGenerationAgent } from '../../lib/geminiAgent';
import { MockUIGenerationAgent } from '../../lib/mockAgent';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userIntent, existingCode } = req.body;

    if (!userIntent) {
      return res.status(400).json({ error: 'userIntent is required' });
    }

    const hasApiKey = !!process.env.GEMINI_API_KEY;
    
    const agent = hasApiKey ? new UIGenerationAgent() : new MockUIGenerationAgent();
    
    console.log(`Using ${hasApiKey ? 'GEMINI' : 'MOCK'} AI agent`);
    
    const result = await agent.generateUI(userIntent, existingCode);

    if (!result.success) {
      return res.status(500).json({ error: result.error, steps: result.steps });
    }

    return res.status(200).json({
      ...result,
      isMockMode: !hasApiKey
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
}