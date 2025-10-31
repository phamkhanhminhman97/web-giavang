import React, { useState, useEffect } from 'react';
import { 
  priceAlertApi, 
  activityApi, 
  statsApi, 
  apiUtils,
  type PriceAlert,
  type Activity,
  type LiveStats 
} from '../services/enhanced-api';
import { Bell, Users, Activity as ActivityIcon, TrendingUp } from 'lucide-react';

export function EnhancedDashboard() {
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [userAlerts, setUserAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize polling and load data
  useEffect(() => {
    let cleanupStats: (() => void) | undefined;
    let cleanupActivities: (() => void) | undefined;

    const initialize = async () => {
      try {
        // Load initial data
        await Promise.all([
          loadLiveStats(),
          loadRecentActivities(),
          loadUserAlerts(),
        ]);

        // Setup polling
        cleanupStats = apiUtils.createLiveStatsPolling(setLiveStats, 30000);
        cleanupActivities = apiUtils.createActivityPolling(setRecentActivities, 10000);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        setLoading(false);
      }
    };

    initialize();

    return () => {
      cleanupStats?.();
      cleanupActivities?.();
    };
  }, []);

  const loadLiveStats = async () => {
    const response = await statsApi.getLive();
    if (response.success && response.data) {
      setLiveStats(response.data);
    }
  };

  const loadRecentActivities = async () => {
    const response = await activityApi.getRecent(5);
    if (response.success && response.data) {
      setRecentActivities(response.data);
    }
  };

  const loadUserAlerts = async () => {
    // In real app, get email from user context
    const userEmail = 'user@example.com';
    const response = await priceAlertApi.getByEmail(userEmail);
    if (response.success && response.data) {
      setUserAlerts(response.data);
    }
  };

  const handlePriceCheck = async (provider: string, goldType: string) => {
    // Log activity when user checks price
    await apiUtils.logActivity('price_check', { provider, goldType });
    // Refresh activities to show the new log
    setTimeout(loadRecentActivities, 1000);
  };

  const handleCreateAlert = async (alertData: {
    email: string;
    threshold: number;
    goldType: string;
    provider: string;
  }) => {
    const response = await priceAlertApi.create(alertData);
    if (response.success) {
      // Log the alert creation activity
      await apiUtils.logActivity('alert_created', {
        provider: alertData.provider,
        goldType: alertData.goldType,
      });
      // Refresh alerts and activities
      await Promise.all([loadUserAlerts(), loadRecentActivities()]);
    }
    return response;
  };

  const handleDeleteAlert = async (alertId: string) => {
    const response = await priceAlertApi.delete(alertId);
    if (response.success) {
      await loadUserAlerts();
    }
    return response;
  };

  if (loading) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Live Stats */}
      {liveStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Người dùng online</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {liveStats.onlineUsers}
            </div>
            <div className="text-xs text-gray-500">
              {liveStats.activeUsersLast5Min} hoạt động (5 phút qua)
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">Cảnh báo hôm nay</span>
            </div>
            <div className="text-2xl font-bold text-orange-600 mt-1">
              {liveStats.totalAlertsToday}
            </div>
            <div className="text-xs text-gray-500">
              Cảnh báo mới được tạo
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center gap-2">
              <ActivityIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Kiểm tra giá</span>
            </div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {liveStats.priceChecksToday}
            </div>
            <div className="text-xs text-gray-500">
              Lần kiểm tra hôm nay
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">Trạng thái thị trường</span>
            </div>
            <div className="text-sm font-bold text-purple-600 mt-1">
              {liveStats.marketStatus}
            </div>
            <div className="text-xs text-gray-500">
              Cập nhật: {apiUtils.formatRelativeTime(liveStats.lastUpdate)}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activities */}
      <div className="bg-white rounded-lg p-6 shadow border">
        <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <ActivityIcon className="h-4 w-4 mt-0.5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">
                  {apiUtils.formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
          {recentActivities.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              Chưa có hoạt động nào
            </p>
          )}
        </div>
      </div>

      {/* User Price Alerts */}
      <div className="bg-white rounded-lg p-6 shadow border">
        <h3 className="text-lg font-semibold mb-4">Cảnh báo giá của bạn</h3>
        <div className="space-y-3">
          {userAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex-1">
                <p className="font-medium">
                  {alert.goldType} - {alert.provider}
                </p>
                <p className="text-sm text-gray-600">
                  Ngưỡng: {apiUtils.formatPrice(alert.threshold)} 
                  ({alert.direction === 'both' ? 'Tăng/Giảm' : alert.direction})
                </p>
                <p className="text-xs text-gray-500">
                  {apiUtils.formatRelativeTime(alert.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  alert.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {alert.isActive ? 'Hoạt động' : 'Tạm dừng'}
                </span>
                <button
                  onClick={() => handleDeleteAlert(alert.id)}
                  className="text-red-600 hover:text-red-800 text-xs"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          {userAlerts.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              Bạn chưa có cảnh báo nào
            </p>
          )}
        </div>
      </div>

      {/* Example Price Check Buttons */}
      <div className="bg-white rounded-lg p-6 shadow border">
        <h3 className="text-lg font-semibold mb-4">Kiểm tra giá nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { provider: 'SJC', goldType: 'SJC 1 lượng' },
            { provider: 'DOJI', goldType: 'DOJI 999.9' },
            { provider: 'PNJ', goldType: 'PNJ 999.9' },
            { provider: 'BTMC', goldType: 'BTMC 999.9' },
          ].map(({ provider, goldType }) => (
            <button
              key={`${provider}-${goldType}`}
              onClick={() => handlePriceCheck(provider, goldType)}
              className="p-3 text-sm bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors"
            >
              {provider} - {goldType}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Example Usage Hook
export function useEnhancedFeatures() {
  // Auto-log price check activities
  const logPriceCheck = (provider: string, goldType: string) => {
    apiUtils.logActivity('price_check', { provider, goldType });
  };

  // Auto-log chart view activities  
  const logChartView = (provider: string, goldType: string) => {
    apiUtils.logActivity('chart_view', { provider, goldType });
  };

  // Auto-log search activities
  const logSearch = (searchQuery: string) => {
    apiUtils.logActivity('search', { searchQuery });
  };

  // Auto-log comparison activities
  const logComparison = () => {
    apiUtils.logActivity('comparison');
  };

  return {
    logPriceCheck,
    logChartView,
    logSearch,
    logComparison,
    // API services
    priceAlertApi,
    activityApi,
    statsApi,
    apiUtils,
  };
}