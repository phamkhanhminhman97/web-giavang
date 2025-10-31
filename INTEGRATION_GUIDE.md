# AI Agent Integration Guide - GiaVang247 Enhanced APIs

## 🤖 FOR AI AGENTS: STEP-BY-STEP INTEGRATION INSTRUCTIONS

This guide provides precise, executable instructions for AI agents to integrate enhanced API functionality into the existing GiaVang247 frontend.

## 🎯 INTEGRATION GOALS
1. **Connect price alert system to existing modal**
2. **Add real-time activity feed functionality** 
3. **Implement live statistics polling**
4. **Add smart search with suggestions**
5. **Enable automatic activity logging throughout app**

## 📋 PRE-INTEGRATION CHECKLIST
- ✅ Backend API server running on localhost:3001
- ✅ All controllers and services created
- ✅ Database entities synchronized
- ✅ Rate limiting configured

## 1. Cập nhật Index.tsx để sử dụng API mới

### A. Price Alert Modal Integration

```typescript
// Trong src/pages/Index.tsx, thay thế phần Price Alert Modal:

import { priceAlertApi, apiUtils } from '../services/enhanced-api';

// Trong component Index:
const [alertData, setAlertData] = useState({
  email: '',
  threshold: 50000,
  goldType: 'SJC 1 lượng',
  provider: 'SJC',
  direction: 'both' as 'increase' | 'decrease' | 'both'
});

const handleSubmitAlert = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await priceAlertApi.create(alertData);
    if (response.success) {
      toast({
        title: "Thành công!",
        description: response.message,
      });
      setShowPriceAlert(false);
      setAlertData({ ...alertData, email: '', threshold: 50000 });
      
      // Log activity
      await apiUtils.logActivity('alert_created', {
        provider: alertData.provider,
        goldType: alertData.goldType
      });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    toast({
      title: "Lỗi",
      description: error.message || "Có lỗi xảy ra khi đăng ký cảnh báo",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

### B. Recent Activity Feed Integration

```typescript
// Thêm vào đầu component Index:
import { activityApi, type Activity } from '../services/enhanced-api';

const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

// Trong useEffect:
useEffect(() => {
  const loadActivities = async () => {
    const response = await activityApi.getRecent(5);
    if (response.success && response.data) {
      setRecentActivities(response.data);
    }
  };

  loadActivities();
  
  // Setup auto-refresh
  const cleanup = apiUtils.createActivityPolling(setRecentActivities, 10000);
  return cleanup;
}, []);

// Cập nhật phần Recent Activity trong JSX:
{recentActivities.map((activity) => (
  <div key={activity.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
    <ActivityIcon className="h-4 w-4 text-blue-600" />
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-900 truncate">
        {activity.message}
      </p>
      <p className="text-xs text-gray-500">
        {apiUtils.formatRelativeTime(activity.timestamp)}
      </p>
    </div>
  </div>
))}
```

### C. Live Stats Integration

```typescript
// Thêm state cho live stats:
import { statsApi, type LiveStats } from '../services/enhanced-api';

const [liveStats, setLiveStats] = useState<LiveStats | null>(null);

// Setup polling trong useEffect:
useEffect(() => {
  const cleanup = apiUtils.createLiveStatsPolling(setLiveStats, 30000);
  return cleanup;
}, []);

// Cập nhật phần Live User Count:
<div className="flex items-center gap-2">
  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
  <span className="text-sm text-gray-600">
    {liveStats?.onlineUsers || 0} người đang xem
  </span>
</div>
```

## 2. Tích hợp Search API

### A. Cập nhật Search Component

```typescript
// Tạo file src/components/EnhancedSearch.tsx:

import { useState, useEffect, useCallback } from 'react';
import { searchApi, type SearchSuggestion } from '../services/enhanced-api';
import { Search, Filter } from 'lucide-react';

export function EnhancedSearch({ onResults }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [filters, setFilters] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced suggestions
  const loadSuggestions = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length >= 2) {
        const response = await searchApi.getSuggestions(searchQuery);
        if (response.success && response.data) {
          setSuggestions(response.data);
        }
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query) {
      loadSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query, loadSuggestions]);

  const handleSearch = async () => {
    const response = await searchApi.searchGoldPrices({
      q: query,
      ...filters
    });

    if (response.success && response.data) {
      onResults(response.data.results);
      // Log search activity
      await apiUtils.logActivity('search', { searchQuery: query });
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Tìm kiếm giá vàng..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          
          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion.text);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

## 3. Auto-logging Activities

### A. Tích hợp vào GoldPriceCard

```typescript
// Trong src/components/GoldPriceCard.tsx:

import { useEnhancedFeatures } from './EnhancedDashboard';

export function GoldPriceCard({ provider, goldData }) {
  const { logPriceCheck } = useEnhancedFeatures();

  const handleClick = () => {
    // Log activity khi user click vào card
    logPriceCheck(provider, goldData.type);
    
    // Existing click logic...
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {/* Existing card content */}
    </div>
  );
}
```

### B. Tích hợp vào PriceChart

```typescript
// Trong src/components/PriceChart.tsx:

import { useEnhancedFeatures } from './EnhancedDashboard';

export function PriceChart({ provider, goldType }) {
  const { logChartView } = useEnhancedFeatures();

  useEffect(() => {
    // Log activity khi component mount (user xem chart)
    logChartView(provider, goldType);
  }, [provider, goldType, logChartView]);

  // Existing chart logic...
}
```

### C. Tích hợp vào GoldComparison

```typescript
// Trong src/components/GoldComparison.tsx:

import { useEnhancedFeatures } from './EnhancedDashboard';

export function GoldComparison() {
  const { logComparison } = useEnhancedFeatures();

  useEffect(() => {
    // Log activity khi user xem comparison
    logComparison();
  }, [logComparison]);

  // Existing comparison logic...
}
```

## 4. Environment Configuration

### A. Cập nhật .env

```bash
# Thêm vào .env file:
VITE_API_URL=http://localhost:3001/api
```

### B. Cập nhật vite.config.ts

```typescript
// Đảm bảo proxy được cấu hình để avoid CORS:

export default defineConfig({
  // ... existing config
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
});
```

## 5. Error Handling & Loading States

### A. Global Error Handler

```typescript
// Tạo src/hooks/useApiError.ts:

import { toast } from '@/hooks/use-toast';

export function useApiError() {
  const handleError = (error: any) => {
    const message = error?.response?.data?.error || 
                   error?.message || 
                   'Đã có lỗi xảy ra';
    
    toast({
      title: "Lỗi",
      description: message,
      variant: "destructive",
    });
  };

  return { handleError };
}
```

### B. Loading State Management

```typescript
// Tạo src/hooks/useApiState.ts:

import { useState } from 'react';

export function useApiState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (apiCall: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return result;
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute };
}
```

## 6. Testing Integration

### A. Test API Connectivity

```typescript
// Tạo src/utils/api-test.ts để test connection:

import { statsApi, activityApi } from '../services/enhanced-api';

export async function testApiConnection() {
  try {
    console.log('Testing API connection...');
    
    const statsResponse = await statsApi.getLive();
    console.log('Stats API:', statsResponse);
    
    const activityResponse = await activityApi.getRecent(1);
    console.log('Activity API:', activityResponse);
    
    return true;
  } catch (error) {
    console.error('API connection failed:', error);
    return false;
  }
}

// Call this in development:
// testApiConnection();
```

## 7. Migration Steps

### Bước 1: Start Backend
```bash
cd api
npm install
npm run start:dev
```

### Bước 2: Update Frontend
```bash
cd web-giavang
npm install
# Copy các file mới vào đúng vị trí
# Cập nhật imports trong Index.tsx
```

### Bước 3: Test Integration
```bash
# Kiểm tra browser console không có lỗi
# Test tạo price alert
# Kiểm tra activity feed có update
# Verify live stats hiển thị đúng
```

### Bước 4: Production Setup
- Cập nhật VITE_API_URL cho production
- Cấu hình CORS trên backend
- Setup database migrations cho entities mới
- Config rate limiting phù hợp với production load

## 8. Monitoring & Analytics

```typescript
// Thêm tracking cho các API calls:

const trackApiUsage = (endpoint: string, success: boolean) => {
  // Integrate với Google Analytics hoặc tracking service
  if (typeof gtag !== 'undefined') {
    gtag('event', 'api_call', {
      endpoint,
      success,
      timestamp: new Date().toISOString()
    });
  }
};
```

Các API này sẽ giúp trang web trở nên tương tác và hấp dẫn hơn với người dùng, đồng thời cung cấp insights về behavior của users để tối ưu hóa trải nghiệm.