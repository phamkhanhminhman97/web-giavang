# Gold Glam Makeover Project

A modern Next.js frontend for displaying gold prices from various Vietnamese gold vendors.

## Features

- Real-time gold price updates
- Interactive price charts
- Comparison tools for different gold vendors
- Responsive design for all devices
- Dark/light theme support

## Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and update the values as needed
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser

## Environment Variables

The application uses the following environment variables:

### API Configuration
- `VITE_API_URL`: API base URL (default: http://localhost:3000)
- `VITE_API_TIMEOUT`: API request timeout in milliseconds (default: 30000)

### Feature Flags
- `VITE_ENABLE_ANALYTICS`: Enable analytics (default: false)
- `VITE_ENABLE_NOTIFICATIONS`: Enable notifications (default: true)

### UI Configuration
- `VITE_DEFAULT_THEME`: Default theme (default: light)
- `VITE_DEFAULT_LANGUAGE`: Default language (default: vi)

### Cache Configuration
- `VITE_CACHE_TTL`: Cache time-to-live in seconds (default: 300)

### Chart Configuration
- `VITE_DEFAULT_CHART_DAYS`: Default number of days for charts (default: 7)
- `VITE_DEFAULT_GOLD_TYPE`: Default gold type (default: SJC)
- `VITE_DEFAULT_VENDOR`: Default vendor (default: PNJ)

### SEO Configuration
- `VITE_SITE_NAME`: Site name (default: GiaVang247)
- `VITE_SITE_DESCRIPTION`: Site description
- `VITE_SITE_URL`: Site URL (default: https://giavang247.vn)

## Project Structure

```
src/
├── components/       # React components
├── contexts/         # React contexts
├── hooks/            # Custom React hooks
├── interfaces/       # TypeScript interfaces
├── pages/            # Next.js pages
├── services/         # API services
├── styles/           # CSS styles
└── utils/            # Utility functions
```

## Available Components

- `Hero`: Hero banner with quick stats
- `GoldTabs`: Tabs for different gold vendors
- `PriceInfo`: Price information cards
- `PriceChart`: Interactive price chart
- `GoldComparison`: Tool for comparing gold prices
- `MarketTrend`: Market trend analysis
- `FaqItem`: FAQ accordion item

## License

MIT
