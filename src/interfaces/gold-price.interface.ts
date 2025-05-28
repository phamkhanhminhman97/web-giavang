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

export interface WorldGoldPriceResponse {
  timestamp: number;
  metal: string;
  currency: string;
  exchange: string;
  symbol: string;
  prev_close_price: number;
  open_price: number;
  low_price: number;
  high_price: number;
  open_time: number;
  price: number;
  ch: number;
  chp: number;
  ask: number;
  bid: number;
  price_gram_24k: number;
  price_gram_22k: number;
  price_gram_21k: number;
  price_gram_20k: number;
  price_gram_18k: number;
  price_gram_16k: number;
  price_gram_14k: number;
  price_gram_10k: number;
}
