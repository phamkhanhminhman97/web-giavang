import { httpRequest } from './http';

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
    return await httpRequest<MarketAnalysisResponse>('/market-analysis');
  } catch (error) {
    console.error('Error fetching market analysis:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch market analysis'
    };
  }
};
