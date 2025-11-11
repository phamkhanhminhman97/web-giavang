import { GoldPriceResponse, ChartDataResponse, WorldGoldPriceResponse } from '../interfaces/gold-price.interface';
import { httpRequest, ApiError } from './http';

/**
 * Fetch all gold prices from the API
 * @returns Promise with gold price data
 */
export const fetchAllGoldPrices = async (): Promise<GoldPriceResponse> => {
  try {
    return await httpRequest<GoldPriceResponse>('/gold-prices');
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
    return await httpRequest<GoldPriceResponse>(`/gold-prices/${source}`);
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
    return await httpRequest<ChartDataResponse>(
      `/gold-prices/chart/${provider}?type=${encodeURIComponent(type)}&days=${days}`
    );
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
    return await httpRequest<GoldPriceResponse>('/gold-prices/craw/pnj');
  } catch (error) {
    console.error('Error crawling PNJ gold prices:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Fetch world gold prices (XAU)
 * @returns Promise with world gold price data
 */
export const fetchWorldGoldPrices = async (): Promise<WorldGoldPriceResponse> => {
  try {
    return await httpRequest<WorldGoldPriceResponse>('/gold-prices/world/XAU');
  } catch (error) {
    console.error('Error fetching world gold prices:', error);
    throw error instanceof ApiError ? error : new ApiError('Failed to fetch world gold prices');
  }
};
