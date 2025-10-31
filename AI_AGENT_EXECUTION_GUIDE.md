# 🤖 AI AGENT EXECUTION GUIDE - GiaVang247 API Integration

## 📋 IMMEDIATE ACTION REQUIRED

### ✅ WHAT'S ALREADY DONE
- ✅ Backend API Controllers & Services created
- ✅ Database entities configured  
- ✅ Frontend enhanced-api.ts service exists
- ✅ Rate limiting implemented
- ✅ Error handling setup

### 🎯 WHAT NEEDS TO BE IMPLEMENTED

## 🚀 STEP 1: MODIFY INDEX.TSX - Price Alert Modal

**File**: `src/pages/Index.tsx`
**Action**: Replace price alert modal functionality with real API

### A. Add Required Imports
```typescript
// Add to existing imports in Index.tsx
import { priceAlertApi, apiUtils, type ApiResponse } from '../services/enhanced-api';
```

### B. Update Price Alert State
```typescript
// Replace existing alertData state
const [alertData, setAlertData] = useState({
  email: '',
  threshold: 50000,
  goldType: 'SJC 1 lượng',
  provider: 'SJC',
  direction: 'both' as 'increase' | 'decrease' | 'both'
});
```

### C. Replace handleSubmitAlert Function
```typescript
// Find and replace the existing handleSubmitAlert function
const handleSubmitAlert = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await priceAlertApi.create(alertData);
    if (response.success) {
      toast({
        title: "Thành công!",
        description: response.message || "Đã đăng ký cảnh báo thành công!",
      });
      setShowPriceAlert(false);
      setAlertData({ ...alertData, email: '', threshold: 50000 });
      
      // Log the alert creation activity
      await apiUtils.logActivity('alert_created', {
        provider: alertData.provider,
        goldType: alertData.goldType
      });
    } else {
      throw new Error(response.error || 'Đăng ký thất bại');
    }
  } catch (error: any) {
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

## 🚀 STEP 2: ADD LIVE STATS POLLING

### A. Add Live Stats State
```typescript
// Add this to Index.tsx state declarations
import { statsApi, type LiveStats } from '../services/enhanced-api';

const [liveStats, setLiveStats] = useState<LiveStats | null>(null);
```

### B. Setup Live Stats Polling
```typescript
// Add this useEffect to Index.tsx
useEffect(() => {
  // Setup live stats polling every 30 seconds
  const cleanup = apiUtils.createLiveStatsPolling(setLiveStats, 30000);
  return cleanup; // Cleanup on unmount
}, []);
```

### C. Update Live User Count Display
```typescript
// Find the existing user count display and replace with:
<div className="flex items-center gap-2">
  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
  <span className="text-sm text-gray-600">
    {liveStats?.onlineUsers || 0} người đang xem
  </span>
</div>
```

## 🚀 STEP 3: IMPLEMENT REAL-TIME ACTIVITY FEED

### A. Add Activity State
```typescript
// Add to Index.tsx state
import { activityApi, type Activity } from '../services/enhanced-api';

const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
```

### B. Setup Activity Polling
```typescript
// Add this useEffect to Index.tsx
useEffect(() => {
  // Setup activity polling every 10 seconds
  const cleanup = apiUtils.createActivityPolling(setRecentActivities, 10000);
  return cleanup;
}, []);
```

### C. Replace Static Activity Feed
```typescript
// Find the recent activities section in JSX and replace with:
<div className="space-y-2">
  {recentActivities.length > 0 ? (
    recentActivities.map((activity) => (
      <div key={activity.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
        <ActivityIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 truncate">
            {activity.message}
          </p>
          <p className="text-xs text-gray-500">
            {apiUtils.formatRelativeTime(activity.timestamp)}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500 text-center py-4">
      Chưa có hoạt động gần đây
    </p>
  )}
</div>
```

## 🚀 STEP 4: ADD AUTO-LOGGING TO COMPONENTS

### A. Modify GoldPriceCard.tsx
```typescript
// Add to imports
import { apiUtils } from '../services/enhanced-api';

// Add this to the click handler or create new one
const handlePriceCheck = (provider: string, goldType: string) => {
  // Log the price check activity
  apiUtils.logActivity('price_check', { provider, goldType });
  
  // Keep any existing click logic here
};

// Add onClick to the card wrapper
<div onClick={() => handlePriceCheck(provider, goldData.type)} className="...existing classes...">
```

### B. Modify PriceChart.tsx
```typescript
// Add to imports
import { apiUtils } from '../services/enhanced-api';

// Add this useEffect to log chart views
useEffect(() => {
  // Log chart view when component mounts
  apiUtils.logActivity('chart_view', { 
    provider: provider, 
    goldType: goldType || 'chart'
  });
}, [provider, goldType]);
```

### C. Modify GoldComparison.tsx
```typescript
// Add to imports
import { apiUtils } from '../services/enhanced-api';

// Add this useEffect to log comparison views
useEffect(() => {
  // Log comparison activity when component mounts
  apiUtils.logActivity('comparison');
}, []);
```

## 🚀 STEP 5: UPDATE ENVIRONMENT CONFIGURATION

### A. Update .env file
```bash
# Add or update in .env
VITE_API_URL=http://localhost:3001/api
```

### B. Update vite.config.ts
```typescript
// Ensure proxy is configured in vite.config.ts
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

## 🧪 STEP 6: TESTING & VALIDATION

### Backend Test
```bash
# 1. Start backend server
cd api
npm run start:dev

# 2. Test endpoints
curl http://localhost:3001/api/stats/live
curl http://localhost:3001/api/activities/recent
```

### Frontend Test
```bash
# 1. Start frontend
cd web-giavang
npm run dev

# 2. Open browser and check:
# - Price alert modal works and creates alerts
# - Live user count updates every 30 seconds  
# - Activity feed shows real activities and updates
# - Clicking gold prices logs activities
# - No console errors
```

## ✅ SUCCESS CRITERIA

After implementation, verify:
- [ ] Price alerts can be created via modal
- [ ] Live stats show real numbers and auto-update
- [ ] Activity feed displays real user actions
- [ ] All user interactions are automatically logged
- [ ] No JavaScript errors in browser console
- [ ] API calls return success responses

## 🚨 TROUBLESHOOTING

### Common Issues:
1. **CORS Error**: Ensure vite proxy is configured
2. **API Not Found**: Check backend server is running on port 3001
3. **Import Errors**: Verify enhanced-api.ts exists in src/services/
4. **Type Errors**: Ensure all interfaces are imported correctly

### Debug Commands:
```javascript
// Test API connection in browser console:
fetch('http://localhost:3001/api/stats/live').then(r => r.json()).then(console.log)
```

## 🎯 FINAL RESULT

After successful implementation:
- Users can set price alerts that persist in database
- Real-time activity feed shows live user interactions  
- Live statistics update automatically every 30 seconds
- All user actions are tracked for analytics
- Enhanced user engagement and retention features active