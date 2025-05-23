import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchAllGoldPrices } from '@/services/api';
import { GoldPriceResponse, IGoldPrice } from '@/interfaces/gold-price.interface';

interface GoldPriceContextType {
  goldPrices: IGoldPrice[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const GoldPriceContext = createContext<GoldPriceContextType | undefined>(undefined);

export const useGoldPrices = () => {
  const context = useContext(GoldPriceContext);
  if (context === undefined) {
    throw new Error('useGoldPrices must be used within a GoldPriceProvider');
  }
  return context;
};

interface GoldPriceProviderProps {
  children: ReactNode;
}

export const GoldPriceProvider: React.FC<GoldPriceProviderProps> = ({ children }) => {
  const [goldPrices, setGoldPrices] = useState<IGoldPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoldData = async () => {
    setLoading(true);
    try {
      const response = await fetchAllGoldPrices();
      
      if (response.success && response.data.length > 0) {
        setGoldPrices(response.data);
        setError(null);
      } else {
        setError(response.error || "Failed to fetch gold price data");
      }
    } catch (err) {
      setError("Error fetching gold price data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldData();
  }, []);

  const value = {
    goldPrices,
    loading,
    error,
    refetch: fetchGoldData
  };

  return (
    <GoldPriceContext.Provider value={value}>
      {children}
    </GoldPriceContext.Provider>
  );
};
