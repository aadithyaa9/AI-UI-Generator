import { GoogleGenerativeAI } from '@google/generative-ai';
import { PLANNER_PROMPT, GENERATOR_PROMPT, EXPLAINER_PROMPT, VALIDATION_PROMPT } from './prompts';

export class UIGenerationAgent {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async generateUI(userIntent, existingCode = null) {
    const steps = { plan: null, code: null, explanation: null, validation: null };

    try {
      console.log('Planning...');
      steps.plan = await this.executePlanner(userIntent, existingCode);

      console.log('Generating code...');
      steps.code = await this.executeGenerator(steps.plan, existingCode);

      console.log('Validating...');
      steps.validation = await this.executeValidator(steps.code);

      if (!steps.validation.valid) {
        throw new Error(`Validation failed: ${steps.validation.errors.join(', ')}`);
      }

      console.log('Step 4: Explaining...');
      steps.explanation = await this.executeExplainer(steps.plan, steps.code, userIntent);

      return { success: true, code: steps.code, explanation: steps.explanation, plan: steps.plan, validation: steps.validation };
    } catch (error) {
      console.error('Agent error:', error);
      return { success: false, error: error.message, steps };
    }
  }

  async executePlanner(userIntent, existingCode) {
    const result = await this.model.generateContent(PLANNER_PROMPT(userIntent, existingCode));
    const response = await result.response;
    let jsonStr = response.text().trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```\n?$/g, '').trim();
    }
    return JSON.parse(jsonStr);
  }

  async executeGenerator(plan, existingCode) {
    const result = await this.model.generateContent(GENERATOR_PROMPT(plan, existingCode));
    const response = await result.response;
    const content = response.text();
    const codeMatch = content.match(/```(?:jsx|javascript|js)?\n?([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : content.trim();
  }

  async executeValidator(code) {
    const result = await this.model.generateContent(VALIDATION_PROMPT(code));
    const response = await result.response;
    let jsonStr = response.text().trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```\n?$/g, '').trim();
    }
    return JSON.parse(jsonStr);
  }

  async executeExplainer(plan, code, userIntent) {
    const result = await this.model.generateContent(EXPLAINER_PROMPT(plan, code, userIntent));
    const response = await result.response;
    return response.text().trim();
  }
}