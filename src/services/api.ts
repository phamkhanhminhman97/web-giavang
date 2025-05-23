import { GoldPriceResponse, ChartDataResponse } from '../interfaces/gold-price.interface';
import env from '../utils/environment';

// Define the base URL for the API
const API_BASE_URL = env.API_URL;

/**
 * Fetch all gold prices from the API
 * @returns Promise with gold price data
 */
export const fetchAllGoldPrices = async (): Promise<GoldPriceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/gold-prices`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching gold prices:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Fetch gold prices by source
 * @param source - The source to fetch prices for (pnj, doji, sjc)
 * @returns Promise with gold price data
 */
export const fetchGoldPricesBySource = async (source: 'pnj' | 'doji' | 'sjc'): Promise<GoldPriceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/gold-prices/${source}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${source} gold prices:`, error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Fetch chart data for a specific provider
 * @param provider - The provider to fetch chart data for (pnj, doji, sjc)
 * @param type - The gold type (default: 'SJC')
 * @param days - Number of days to look back (default: 30)
 * @returns Promise with chart data
 */
export const fetchChartData = async (
  provider: string,
  type: string = 'SJC',
  days: number = 30
): Promise<ChartDataResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/gold-prices/chart/${provider}?type=${encodeURIComponent(type)}&days=${days}`
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching chart data for ${provider}:`, error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Crawl PNJ gold prices
 * @returns Promise with gold price data
 */
export const crawlPNJGoldPrices = async (): Promise<GoldPriceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/gold-prices/craw/pnj`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error crawling PNJ gold prices:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
