export interface IGoldPrice {
  id: string;
  provider: string;
  type: string;
  buyPrice: number;
  sellPrice: number;
  unit: string;
  timestamp: string;
  change: {
    buy: number;
    sell: number;
  };
}

export interface GoldPriceResponse {
  success: boolean;
  data: IGoldPrice[];
  error?: string;
}

export interface ChartDataPoint {
  date: string;
  buyPrice: number;
  sellPrice: number;
}

export interface ChartDataResponse {
  success: boolean;
  data: ChartDataPoint[];
  error?: string;
}
