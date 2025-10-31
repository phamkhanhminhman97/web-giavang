const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PriceAlert {
  id: string;
  email: string;
  threshold: number;
  goldType: string;
  provider: string;
  direction: 'increase' | 'decrease' | 'both';
  isActive: boolean;
  createdAt: string;
  lastTriggeredAt?: string;
}

export interface Activity {
  id: string;
  type: 'price_check' | 'alert_created' | 'chart_view' | 'search' | 'comparison';
  message: string;
  timestamp: string;
  provider?: string;
  goldType?: string;
}

export interface LiveStats {
  onlineUsers: number;
  activeUsersLast5Min: number;
  activeUsersLastHour: number;
  totalAlertsToday: number;
  priceChecksToday: number;
  marketStatus: string;
  lastUpdate: string;
}

export interface PriceChange {
  provider: string;
  goldType: string;
  change: number;
  changePercent: number;
  lastPrice: number;
  timestamp: string;
}

export interface SearchResult {
  id: string;
  provider: string;
  goldType: string;
  buyPrice: number;
  sellPrice: number;
  change24h: number;
  changePercent: number;
  lastUpdate: string;
}

export interface SearchSuggestion {
  type: 'provider' | 'goldType' | 'search';
  text: string;
  label: string;
}

// Price Alert APIs
export const priceAlertApi = {
  async create(alertData: {
    email: string;
    threshold: number;
    goldType?: string;
    provider?: string;
    direction?: 'increase' | 'decrease' | 'both';
  }): Promise<ApiResponse<PriceAlert>> {
    const response = await fetch(`${API_BASE_URL}/price-alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData),
    });
    return await response.json();
  },

  async getByEmail(email: string): Promise<ApiResponse<PriceAlert[]>> {
    const response = await fetch(`${API_BASE_URL}/price-alerts?email=${encodeURIComponent(email)}`);
    return await response.json();
  },

  async delete(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/price-alerts/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },

  async toggle(id: string): Promise<ApiResponse<PriceAlert>> {
    const response = await fetch(`${API_BASE_URL}/price-alerts/${id}/toggle`, {
      method: 'POST',
    });
    return await response.json();
  },

  async getStats(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/price-alerts/stats`);
    return await response.json();
  },
};

// Activity APIs
export const activityApi = {
  async log(activityData: {
    type: 'price_check' | 'alert_created' | 'chart_view' | 'search' | 'comparison';
    details?: string;
    provider?: string;
    goldType?: string;
  }): Promise<ApiResponse<Activity>> {
    const response = await fetch(`${API_BASE_URL}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...activityData,
        userAgent: navigator.userAgent,
        ip: 'client-side', // Would be set by server
      }),
    });
    return await response.json();
  },

  async getRecent(limit = 10): Promise<ApiResponse<Activity[]>> {
    const response = await fetch(`${API_BASE_URL}/activities/recent?limit=${limit}`);
    return await response.json();
  },

  async getStats(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/activities/stats`);
    return await response.json();
  },

  async getPopular(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/activities/popular`);
    return await response.json();
  },
};

// Stats APIs
export const statsApi = {
  async getLive(): Promise<ApiResponse<LiveStats>> {
    const response = await fetch(`${API_BASE_URL}/stats/live`);
    return await response.json();
  },

  async getPriceChanges(): Promise<ApiResponse<PriceChange[]>> {
    const response = await fetch(`${API_BASE_URL}/stats/price-changes`);
    return await response.json();
  },

  async getMarketSummary(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/stats/market-summary`);
    return await response.json();
  },

  async getUserAnalytics(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/stats/user-analytics`);
    return await response.json();
  },
};

// Search APIs
export const searchApi = {
  async searchGoldPrices(params: {
    q?: string;
    provider?: string;
    goldType?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{
    results: SearchResult[];
    total: number;
    query: any;
  }>> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await fetch(`${API_BASE_URL}/search?${queryParams.toString()}`);
    return await response.json();
  },

  async getSuggestions(query?: string): Promise<ApiResponse<SearchSuggestion[]>> {
    const params = query ? `?q=${encodeURIComponent(query)}` : '';
    const response = await fetch(`${API_BASE_URL}/search/suggestions${params}`);
    return await response.json();
  },

  async getFilters(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/search/filters`);
    return await response.json();
  },

  async getTrending(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/search/trending`);
    return await response.json();
  },
};

// Utility Functions
export const apiUtils = {
  // Log user activity automatically
  async logActivity(type: Activity['type'], details?: {
    provider?: string;
    goldType?: string;
    searchQuery?: string;
  }) {
    try {
      await activityApi.log({
        type,
        details: details?.searchQuery,
        provider: details?.provider,
        goldType: details?.goldType,
      });
    } catch (error) {
      console.warn('Failed to log activity:', error);
    }
  },

  // Auto-refresh live stats
  createLiveStatsPolling(callback: (stats: LiveStats) => void, intervalMs = 30000) {
    const poll = async () => {
      try {
        const response = await statsApi.getLive();
        if (response.success && response.data) {
          callback(response.data);
        }
      } catch (error) {
        console.warn('Failed to fetch live stats:', error);
      }
    };

    poll(); // Initial call
    const intervalId = setInterval(poll, intervalMs);
    return () => clearInterval(intervalId);
  },

  // Auto-refresh recent activities
  createActivityPolling(callback: (activities: Activity[]) => void, intervalMs = 10000) {
    const poll = async () => {
      try {
        const response = await activityApi.getRecent(5);
        if (response.success && response.data) {
          callback(response.data);
        }
      } catch (error) {
        console.warn('Failed to fetch activities:', error);
      }
    };

    poll(); // Initial call
    const intervalId = setInterval(poll, intervalMs);
    return () => clearInterval(intervalId);
  },

  // Format price for display
  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  },

  // Format price change
  formatPriceChange(change: number, showSign = true): string {
    const formatted = new Intl.NumberFormat('vi-VN').format(Math.abs(change));
    if (!showSign) return formatted;
    return change >= 0 ? `+${formatted}` : `-${formatted}`;
  },

  // Format percentage
  formatPercentage(percent: number, showSign = true): string {
    const formatted = Math.abs(percent).toFixed(2);
    if (!showSign) return `${formatted}%`;
    return percent >= 0 ? `+${formatted}%` : `-${formatted}%`;
  },

  // Format relative time
  formatRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Vừa xong';
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  },
};