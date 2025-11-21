# 🌐 Our Voice, Our Rights – MGNREGA Dashboard

> A simple, visual, bilingual interface to make government MGNREGA data accessible to every Indian citizen — especially rural communities with low digital literacy.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://voicesforrights.netlify.app)
[![Backend](https://img.shields.io/badge/backend-live-blue)](https://ourvoiceforrights.onrender.com)
[![License](https://img.shields.io/badge/license-proprietary-red)](#-license)

---

## 🌟 Project Vision

MGNREGA benefits **12.15+ Crore rural Indians** in 2025 — yet the official data remains inaccessible for most citizens.

The **Our Voice, Our Rights** frontend transforms complex datasets into a simple, visual, mobile-friendly dashboard that even first-time smartphone users can understand:

- ✅ **Visual-first design**
- ✅ **Minimal text, clear icons**
- ✅ **High contrast**
- ✅ **Bilingual UI** (English + Hindi)
- ✅ **Built for rural India's digital realities**

This frontend integrates with the production backend to present performance metrics for Karnataka's 30+ districts — and soon, all Indian states.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- Backend running at: `http://localhost:8080`

### Setup & Run

```bash
# 1. Create project
npm create vite@latest mgnrega-frontend -- --template react-ts
cd mgnrega-frontend

# 2. Install dependencies
npm install tailwindcss @tailwindcss/vite
npm install axios @tanstack/react-query zustand lucide-react recharts
npm install -D @types/node

# 3. Copy project files
# (Copy all source files to their respective directories)

# 4. Start locally
npm run dev
```

**Visit:** `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── Selection.tsx
│   ├── Dashboard.tsx
│   ├── PerformanceCard.tsx
│   └── ComparisonChart.tsx
├── hooks/
│   ├── useData.ts
│   └── useGeolocation.ts
├── lib/
│   ├── api.ts
│   ├── queryClient.ts
│   └── translations.ts
├── store/
│   └── useStore.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## ✨ Key Features

### Core Dashboard

- 🗺️ State & district selection
- 📊 Real-time district performance
- 📈 Month-to-month comparison charts
- 🎨 Color-coded indicators (🟢 🟠 🔴)

### Accessibility for Rural India

- 🔤 Large, readable fonts
- 🎨 High contrast palette
- 🖼️ Icons + text labels
- 👆 Touch-friendly buttons (≥48px)
- 🚀 Minimal clicks (2-step flow)

### Technical Highlights

- ⚡ React Query caching + retry
- 🗃️ Zustand lightweight state
- 🌐 Axios API wrapper
- 📡 Offline detection
- 📍 Geolocation-based district detection
- 📱 Mobile-first layout
- ⚙️ Optimized re-renders

---

## 🧠 Design Principles

### For Low-Literacy Users

| Principle | Implementation |
|-----------|----------------|
| **Visual-first interface** | Icons and colors over text |
| **Clear color cues** | Green/Orange/Red status |
| **Simple language** | Grade 5 reading level |
| **Minimal navigation** | 2-step flow maximum |
| **Large touch targets** | 48px minimum tap area |

### Performance Optimizations

- ✅ React Query cache (5 min stale)
- ✅ Memoized components
- ✅ Efficient API calls
- ✅ Lazy loading ready
- ✅ Minimal bundle footprint

---

## 🌐 API Integration

```typescript
GET /api/states
GET /api/districts/{stateId}
GET /api/performance/{districtId}
GET /api/compare/{districtId}?year=2024-2025
```

---

## 🗺️ Geolocation Detection

```typescript
const { detectLocation } = useGeolocation();
const result = await detectLocation();
// returns { district, state, lat, lon }
```

Uses **OpenStreetMap Nominatim** for reverse geocoding.

---

## 🌍 Bilingual Support

- 🇬🇧 English ↔ 🇮🇳 Hindi toggle
- 🔢 Locale-based number formatting
- 📅 India-style date formatting
- ⚡ Real-time language switching

---

## 📱 Mobile Responsive

- ✅ Fully mobile-first layout
- ✅ 360px support
- ✅ High contrast visuals
- ✅ Optimized for slow networks

---

## 🚀 Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Deploy to Vercel / Netlify

```bash
vercel
```

### Environment Variables

```env
VITE_API_URL=https://your-backend/api
VITE_OSM_API_URL=https://nominatim.openstreetmap.org
```

### Live Demo

👉 **[https://voicesforrights.netlify.app](https://voicesforrights.netlify.app)**

---

## 🧪 Testing Checklist

- [ ] State & district loading
- [ ] Performance metrics accuracy
- [ ] Comparison charts rendering
- [ ] Language toggle working
- [ ] Geolocation functioning
- [ ] Offline fallback
- [ ] Full mobile responsiveness
- [ ] Lighthouse performance ≥ 90

---

## 🎯 Production Checklist

- [ ] Replace API URL with production backend
- [ ] API error boundaries
- [ ] Loading screens
- [ ] SEO meta tags
- [ ] Optional analytics
- [ ] Accessibility tested

---

## 🆘 Troubleshooting

### API Not Connecting

```bash
curl http://localhost:8080/api/health
```

Check CORS + backend URL.

### Build Issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### Geolocation Fails

- Browser permission required
- HTTPS required in production
- Check OSM rate limits

---

## 🔒 License

**Copyright (c) 2025 Thanseer Jelani**

All rights reserved.

This project is publicly viewable for transparency and learning purposes only. Unauthorized copying, modification, distribution, or use of the codebase, in whole or in part, without express written permission, is strictly prohibited.

---

## 🤝 Contributing

This is a personal project built for public good and social impact. At this time, external code contributions are not open, but you may:

- 🐛 Open issues
- 📝 Report bugs
- 💡 Suggest improvements
- ✨ Request features

Thank you for supporting the initiative!

---

## 📞 Contact

**Developer:** Thanseer Jelani  
**Email:** thanseerjelani@gmail.com  
**LinkedIn:** [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

**Backend:** [ourvoiceforrights.onrender.com](https://ourvoiceforrights.onrender.com)  
**Frontend:** [voicesforrights.netlify.app](https://voicesforrights.netlify.app)

---

<div align="center">

**Built with ❤️ for Rural India 🇮🇳**

`#BuiltForIndia` `#DigitalIndia` `#SocialImpact`

</div>
