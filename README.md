# GiaVang247 - Gold Price Tracking Platform

A modern React application for displaying and analyzing gold prices from various Vietnamese gold vendors.

## Features

- Real-time gold price updates from multiple vendors (SJC, DOJI, PNJ, etc.)
- Interactive price charts with historical data
- Comparison tools for different gold vendors and types
- Market analysis and trend predictions
- AI-powered content generation for market insights
- Responsive design for all devices
- SEO optimized with proper canonical URLs

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/giavang247.git
cd giavang247/webv2
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Copy environment variables
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` file as needed

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
webv2/
├── public/           # Static assets
├── scripts/          # Build and utility scripts
├── src/
│   ├── components/   # Reusable React components
│   │   ├── ui/       # UI components (buttons, inputs, etc.)
│   │   └── ...       # Feature-specific components
│   ├── contexts/     # React contexts for state management
│   ├── hooks/        # Custom React hooks
│   ├── interfaces/   # TypeScript interfaces
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
└── ...               # Configuration files
```

## API Integration

The application communicates with a backend API located in the `api/` directory. Here's how the API integration works:

### API Service Setup

The main API service is configured in `src/services/api.ts`:

```typescript
import axios from 'axios';
import { getEnvironmentVariable } from '@/utils/environment';

const API_URL = getEnvironmentVariable('VITE_API_URL') || 'http://localhost:3000';
const API_TIMEOUT = parseInt(getEnvironmentVariable('VITE_API_TIMEOUT') || '30000');

const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle API errors here
    return Promise.reject(error);
  }
);

export default api;
```

### API Endpoints

The application uses the following API endpoints:

#### Gold Price API

Located in `src/services/gold-price.ts`:

```typescript
import api from './api';
import { GoldPrice, GoldPriceParams } from '@/interfaces/gold-price.interface';

export const getGoldPrices = async (params?: GoldPriceParams) => {
  const response = await api.get('/gold-prices', { params });
  return response.data;
};

export const getGoldPriceHistory = async (vendor: string, type: string, days: number) => {
  const response = await api.get(`/gold-prices/history/${vendor}/${type}/${days}`);
  return response.data;
};

export const getLatestGoldPrices = async () => {
  const response = await api.get('/gold-prices/latest');
  return response.data;
};
```

#### Market Analysis API

Located in `src/services/market-analysis.ts`:

```typescript
import api from './api';

export const getMarketAnalysis = async () => {
  const response = await api.get('/market-analysis/latest');
  return response.data;
};

export const getMarketTrends = async (days: number = 30) => {
  const response = await api.get(`/market-analysis/trends/${days}`);
  return response.data;
};
```

#### AI Content Generation API

Located in `src/services/generated-content.ts`:

```typescript
import api from './api';

export const generateContent = async (prompt: string, options?: any) => {
  const response = await api.post('/generated-content', { prompt, ...options });
  return response.data;
};

export const getGeneratedContentList = async (page: number = 1, limit: number = 10) => {
  const response = await api.get('/generated-content', { params: { page, limit } });
  return response.data;
};

export const getGeneratedContentBySlug = async (slug: string) => {
  const response = await api.get(`/generated-content/${slug}`);
  return response.data;
};
```

### Using the API in Components

Example of using the API in a component:

```typescript
import { useState, useEffect } from 'react';
import { getLatestGoldPrices } from '@/services/gold-price';

const GoldPriceComponent = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const data = await getLatestGoldPrices();
        setPrices(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch gold prices');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Set up polling for real-time updates
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Render component with prices data
};
```

## Key Components

### GoldTabs Component

The `GoldTabs` component displays gold prices from different vendors in a tabbed interface:

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoldTabIcons from "./GoldTabIcons";
import GoldPriceCard from "./GoldPriceCard";
import { useContext } from "react";
import { GoldPriceContext } from "@/contexts/GoldPriceContext";

const GoldTabs = () => {
  const { goldPrices } = useContext(GoldPriceContext);
  
  return (
    <Tabs defaultValue="sjc" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-1">
        <TabsTrigger value="sjc">
          <GoldTabIcons vendor="sjc" />
          <span className="ml-2 hidden md:inline">SJC</span>
        </TabsTrigger>
        {/* Other vendors... */}
      </TabsList>
      
      <TabsContent value="sjc">
        <GoldPriceCard vendor="sjc" prices={goldPrices.sjc} />
      </TabsContent>
      {/* Other vendor content... */}
    </Tabs>
  );
};
```

### PriceChart Component

The `PriceChart` component renders interactive charts for gold price history:

```typescript
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { getGoldPriceHistory } from "@/services/gold-price";

const PriceChart = ({ vendor, type, days }) => {
  const [chartData, setChartData] = useState(null);
  
  useEffect(() => {
    const fetchChartData = async () => {
      const data = await getGoldPriceHistory(vendor, type, days);
      // Process data for chart
      setChartData({
        labels: data.map(item => item.date),
        datasets: [
          {
            label: 'Giá mua',
            data: data.map(item => item.buyPrice),
            borderColor: 'rgba(212, 175, 55, 1)',
            // Other styling...
          },
          {
            label: 'Giá bán',
            data: data.map(item => item.sellPrice),
            borderColor: 'rgba(153, 102, 51, 1)',
            // Other styling...
          }
        ]
      });
    };
    
    fetchChartData();
  }, [vendor, type, days]);
  
  return chartData ? <Line data={chartData} options={chartOptions} /> : <LoadingSpinner />;
};
```

## SEO Configuration

The application uses a comprehensive SEO setup with proper canonical URLs and structured data. The main SEO configuration is in `src/utils/seo-utils.ts`.

Key SEO features:
- Canonical URLs for all pages
- Structured data for rich snippets
- OpenGraph and Twitter card meta tags
- Proper handling of www and non-www domains

## Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create a production-ready build in the `dist/` directory.

### Server Configuration

For proper SEO and routing, ensure your server is configured to:
1. Redirect non-www to www domain
2. Handle client-side routing (all routes should serve index.html)
3. Enable HTTPS

See the `public/REDIRECT-SETUP.md` file for detailed server configuration instructions.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | API base URL | http://localhost:3000 |
| VITE_API_TIMEOUT | API request timeout (ms) | 30000 |
| VITE_ENABLE_ANALYTICS | Enable analytics | false |
| VITE_ENABLE_NOTIFICATIONS | Enable notifications | true |
| VITE_DEFAULT_THEME | Default theme | light |
| VITE_DEFAULT_LANGUAGE | Default language | vi |
| VITE_CACHE_TTL | Cache time-to-live (seconds) | 300 |
| VITE_DEFAULT_CHART_DAYS | Default days for charts | 7 |
| VITE_DEFAULT_GOLD_TYPE | Default gold type | SJC |
| VITE_DEFAULT_VENDOR | Default vendor | PNJ |
| VITE_SITE_NAME | Site name | GiaVang247 |
| VITE_SITE_URL | Site URL | https://www.giavang247.online |

## License

MIT
