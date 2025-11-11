import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllGoldPrices } from '@/services/api';
import { GoldPriceResponse, IGoldPrice } from '@/interfaces/gold-price.interface';
import env from '@/utils/environment';

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
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery<GoldPriceResponse>({
    queryKey: ['gold-prices'],
    queryFn: fetchAllGoldPrices,
    refetchInterval: env.CACHE_TTL * 1000,
    staleTime: env.CACHE_TTL * 1000,
    retry: 2,
  });

  const memoizedValue = useMemo<GoldPriceContextType>(() => {
    const hasData = Boolean(data?.success && Array.isArray(data.data));
    const derivedError =
      error instanceof Error
        ? error.message
        : data && !data.success
          ? data.error || 'Failed to fetch gold price data'
          : null;

    const handleRefetch = async () => {
      await refetch({ throwOnError: false });
    };

    return {
      goldPrices: hasData ? data!.data : [],
      loading: isLoading || (isFetching && !hasData),
      error: derivedError,
      refetch: handleRefetch,
    };
  }, [data, error, isFetching, isLoading, refetch]);

  return (
    <GoldPriceContext.Provider value={memoizedValue}>
      {children}
    </GoldPriceContext.Provider>
  );
};
