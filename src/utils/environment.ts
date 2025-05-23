// Environment variables for the application
// In Vite, environment variables are exposed through import.meta.env
// Only variables prefixed with VITE_ are available in the client-side code

interface Environment {
  API_URL: string;
  API_TIMEOUT: number;
  ENABLE_ANALYTICS: boolean;
  ENABLE_NOTIFICATIONS: boolean;
  DEFAULT_THEME: string;
  DEFAULT_LANGUAGE: string;
  CACHE_TTL: number;
  DEFAULT_CHART_DAYS: number;
  DEFAULT_GOLD_TYPE: string;
  DEFAULT_VENDOR: string;
  SITE_NAME: string;
  SITE_DESCRIPTION: string;
  SITE_URL: string;
}

// Default values for environment variables
const defaultEnv: Environment = {
  API_URL: 'https://api.giavang247.online',
  API_TIMEOUT: 30000,
  ENABLE_ANALYTICS: false,
  ENABLE_NOTIFICATIONS: true,
  DEFAULT_THEME: 'light',
  DEFAULT_LANGUAGE: 'vi',
  CACHE_TTL: 300,
  DEFAULT_CHART_DAYS: 7,
  DEFAULT_GOLD_TYPE: 'SJC',
  DEFAULT_VENDOR: 'PNJ',
  SITE_NAME: 'GiaVang247',
  SITE_DESCRIPTION: 'Cập nhật giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý, Huy Thanh mới nhất 24/7',
  SITE_URL: 'https://giavang247.online',
};

// Get environment variables from import.meta.env
const env: Environment = {
  API_URL: import.meta.env.VITE_API_URL || defaultEnv.API_URL,
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || defaultEnv.API_TIMEOUT,
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || defaultEnv.ENABLE_ANALYTICS,
  ENABLE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false' && defaultEnv.ENABLE_NOTIFICATIONS,
  DEFAULT_THEME: import.meta.env.VITE_DEFAULT_THEME || defaultEnv.DEFAULT_THEME,
  DEFAULT_LANGUAGE: import.meta.env.VITE_DEFAULT_LANGUAGE || defaultEnv.DEFAULT_LANGUAGE,
  CACHE_TTL: Number(import.meta.env.VITE_CACHE_TTL) || defaultEnv.CACHE_TTL,
  DEFAULT_CHART_DAYS: Number(import.meta.env.VITE_DEFAULT_CHART_DAYS) || defaultEnv.DEFAULT_CHART_DAYS,
  DEFAULT_GOLD_TYPE: import.meta.env.VITE_DEFAULT_GOLD_TYPE || defaultEnv.DEFAULT_GOLD_TYPE,
  DEFAULT_VENDOR: import.meta.env.VITE_DEFAULT_VENDOR || defaultEnv.DEFAULT_VENDOR,
  SITE_NAME: import.meta.env.VITE_SITE_NAME || defaultEnv.SITE_NAME,
  SITE_DESCRIPTION: import.meta.env.VITE_SITE_DESCRIPTION || defaultEnv.SITE_DESCRIPTION,
  SITE_URL: import.meta.env.VITE_SITE_URL || defaultEnv.SITE_URL,
};

export default env;
