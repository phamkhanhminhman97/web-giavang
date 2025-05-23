import env from '../utils/environment';

export interface MarketAnalysis {
  marketTrend: {
    title: string;
    description: string;
    factors: {
      text: string;
      impact: 'positive' | 'negative' | 'neutral';
    }[];
  };
  forecast: {
    shortTerm: {
      title: string;
      trend: 'up' | 'down' | 'stable';
      description: string;
    };
    midTerm: {
      title: string;
      trend: 'up' | 'down' | 'stable';
      description: string;
    };
    longTerm: {
      title: string;
      trend: 'up' | 'down' | 'stable';
      description: string;
    };
  };
  investmentTips: {
    title: string;
    description: string;
  };
  lastUpdated: string;
}

export interface MarketAnalysisResponse {
  success: boolean;
  data?: MarketAnalysis;
  error?: string;
}

export const fetchMarketAnalysis = async (): Promise<MarketAnalysisResponse> => {
  try {
    const API_BASE_URL = env.API_URL;
    const response = await fetch(`${API_BASE_URL}/market-analysis`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching market analysis:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch market analysis'
    };
  }
};
