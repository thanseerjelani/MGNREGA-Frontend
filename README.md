# MGNREGA Dashboard - Frontend

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Backend running on `http://localhost:8080`

### Setup

```bash
# 1. Create project
npm create vite@latest mgnrega-frontend -- --template react-ts
cd mgnrega-frontend

# 2. Install dependencies
npm install tailwindcss @tailwindcss/vite
npm install axios @tanstack/react-query zustand lucide-react recharts
npm install -D @types/node

# 3. Copy all files from artifacts

# 4. Start development server
npm run dev
```

Visit: `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Header with language toggle
│   ├── Selection.tsx           # State/District dropdowns
│   ├── Dashboard.tsx           # Main dashboard
│   ├── PerformanceCard.tsx     # Metric cards
│   └── ComparisonChart.tsx     # Comparison visualization
├── hooks/
│   ├── useData.ts              # React Query hooks
│   └── useGeolocation.ts       # Geolocation detection
├── lib/
│   ├── api.ts                  # Axios API client
│   ├── queryClient.ts          # React Query config
│   └── translations.ts         # Bilingual support
├── store/
│   └── useStore.ts             # Zustand state management
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Tailwind CSS
```

---

## ✨ Features Implemented

### Core Features

- ✅ State/District selection (2-click navigation)
- ✅ Real-time performance dashboard
- ✅ Month-to-month comparison charts
- ✅ Color-coded performance indicators (🟢🟠🔴)

### Accessibility (Rural India)

- ✅ Large fonts (≥18px)
- ✅ High contrast colors
- ✅ Icons + text for clarity
- ✅ Touch-friendly buttons (48px min height)
- ✅ Bilingual support (English + Hindi)

### Technical Features

- ✅ React Query (caching, auto-refetch)
- ✅ Zustand (lightweight state)
- ✅ Axios (API calls with retry)
- ✅ Geolocation + OpenStreetMap
- ✅ Offline detection
- ✅ Optimized re-renders (memo, hooks)
- ✅ Responsive design (mobile-first)

---

## 🎨 Design Principles

### For Low-Literacy Users

1. **Visual First**: Icons + emojis + text
2. **Color Coding**: Green (good), Amber (moderate), Red (poor)
3. **Simple Language**: Short, clear labels
4. **Minimal Clicks**: 2 steps max to view data
5. **Large Touch Targets**: 48px minimum

### Performance Optimization

- React Query caching (5 min stale time)
- Zustand (minimal re-renders)
- Code splitting (lazy loading ready)
- Optimized bundle size

---

## 🌐 API Integration

```typescript
// Get states
GET /api/states

// Get districts
GET /api/districts/{stateId}

// Get performance
GET /api/performance/{districtId}

// Get comparison
GET /api/compare/{districtId}?year=2024-2025
```

---

## 🗺️ Geolocation Feature

```typescript
// Auto-detect user district
const { detectLocation } = useGeolocation();
const result = await detectLocation();
// Returns: { district, state, lat, lon }
```

Uses OpenStreetMap Nominatim API for reverse geocoding.

---

## 🌍 Bilingual Support

Toggle between English and Hindi:

- All UI labels translated
- Number formatting (Indian vs Western)
- Date formatting (locale-aware)

---

## 📱 Mobile Responsive

- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly (48px buttons)
- Optimized for 3G networks

---

## 🚀 Build & Deploy

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add VITE_API_URL
```

---

## 🧪 Testing Checklist

- [ ] State dropdown loads Karnataka
- [ ] District dropdown shows 30+ districts
- [ ] Performance cards display correct data
- [ ] Comparison chart shows trends
- [ ] Language toggle works (EN ↔ HI)
- [ ] Geolocation detects district
- [ ] Offline mode shows warning
- [ ] Mobile responsive on 360px width
- [ ] Color indicators match performance level

---

## 🎯 Production Checklist

- [ ] Backend URL updated to production
- [ ] Error boundaries added
- [ ] Loading states for all API calls
- [ ] SEO meta tags added
- [ ] Analytics integrated (optional)
- [ ] Performance tested (Lighthouse)
- [ ] Accessibility tested (WAVE)

---

## 📞 Environment Variables

```bash
VITE_API_URL=https://your-backend.railway.app/api
```

---

## 🆘 Troubleshooting

### API Not Connecting

```bash
# Check backend is running
curl http://localhost:8080/api/health

# Check CORS
# Backend should allow frontend origin
```

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Geolocation Not Working

- Enable location permission in browser
- Use HTTPS in production (required for geolocation)
- OpenStreetMap rate limits apply

---

**Status: Frontend Complete! ✅**  
**Ready for deployment and demo!** 🎉
