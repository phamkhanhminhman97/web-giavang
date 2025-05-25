import env from '../utils/environment';
import { MarketAnalysisResponse } from './market-analysis';

// Define the base URL for the API
const API_BASE_URL = env.API_URL;

/**
 * Interface for chat completion request
 */
export interface ChatCompletionRequest {
  messages: Array<{ role: string; content: string }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

/**
 * Interface for chat completion response
 */
export interface ChatCompletionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Interface for analyze gold trend request
 */
export interface AnalyzeGoldTrendRequest {
  timeframe?: 'day' | 'week' | 'month' | 'quarter' | 'year';
  customPrompt?: string;
  temperature?: number;
}

/**
 * Interface for generate content request
 */
export interface GenerateContentRequest {
  topic: string;
  contentType?: string;
  length?: 'short' | 'medium' | 'long';
  tone?: string;
  language?: string;
  temperature?: number;
}

/**
 * Interface for generate content response
 */
export interface GenerateContentResponse {
  success: boolean;
  data?: {
    content: string;
    topic: string;
    contentType: string;
    generatedAt: string;
  };
  error?: string;
}

/**
 * Interface for answer question request
 */
export interface AnswerQuestionRequest {
  question: string;
  context?: string;
  temperature?: number;
}

/**
 * Interface for answer question response
 */
export interface AnswerQuestionResponse {
  success: boolean;
  data?: {
    question: string;
    answer: string;
    answeredAt: string;
  };
  error?: string;
}

/**
 * Fetch available models from Deepseek API
 * @returns Promise with models data
 */
export const fetchDeepseekModels = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/deepseek/models`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Deepseek models:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Send a chat completion request to Deepseek API
 * @param request Chat completion request
 * @returns Promise with chat completion response
 */
export const sendChatCompletion = async (request: ChatCompletionRequest): Promise<ChatCompletionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/deepseek/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending chat completion:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Analyze gold trend using Deepseek API
 * @param request Analyze gold trend request
 * @returns Promise with market analysis response
 */
export const analyzeGoldTrend = async (request: AnalyzeGoldTrendRequest): Promise<MarketAnalysisResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/deepseek/analyze-gold-trend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing gold trend:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Generate content using Deepseek API
 * @param request Generate content request
 * @returns Promise with generated content response
 */
export const generateContent = async (request: GenerateContentRequest): Promise<GenerateContentResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/deepseek/generate-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Answer a question using Deepseek API
 * @param request Answer question request
 * @returns Promise with answer response
 */
export const answerQuestion = async (request: AnswerQuestionRequest): Promise<AnswerQuestionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/deepseek/answer-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error answering question:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Interface for market analysis for PhanTich page response
 */
export interface MarketAnalysisForPhanTichResponse {
  success: boolean;
  data?: {
    technicalAnalysis: {
      title: string;
      description: string;
      indicators: Array<{
        name: string;
        value: string;
        interpretation: 'positive' | 'negative' | 'neutral';
      }>;
    };
    fundamentalAnalysis: {
      title: string;
      description: string;
      factors: Array<{
        name: string;
        value: string;
        interpretation: 'positive' | 'negative' | 'neutral';
      }>;
    };
    priceForecasts: {
      title: string;
      description: string;
      forecasts: Array<{
        timeframe: string;
        trend: 'up' | 'down' | 'stable';
        description: string;
      }>;
    };
    expertOpinions: Array<{
      quote: string;
      expert: string;
      title: string;
    }>;
    lastUpdated: string;
  };
  error?: string;
}

/**
 * Fetch market analysis for PhanTich page using Deepseek API
 * @returns Promise with market analysis response
 */
export const fetchMarketAnalysisForPhanTich = async (): Promise<MarketAnalysisForPhanTichResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/deepseek/market-analysis-for-phan-tich`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching market analysis for PhanTich:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
