# CRITICAL FIXES REQUIRED - WorkersBD Deployment

**Status**: 🟡 BLOCKED - 7 Critical Issues Must Be Fixed Before Production Deployment

---

## 🚨 Issues Blocking Deployment

### ❌ Issue #1: npm ci in CI/CD Workflow
**File**: `.github/workflows/main.yml`  
**Lines**: 25, 54, 81

**Current Code**:
```yaml
cache: 'npm'
run: npm ci
```

**Required Fix**:
```yaml
# Remove the cache line entirely
# Change: npm ci
# To:
run: npm install --legacy-peer-deps
```

**Why**: Repository has `pnpm-lock.yaml`, not `package-lock.json`. This causes workflow to fail.

---

### ❌ Issue #2: TypeScript Missing from package.json
**File**: `package.json`  
**Section**: devDependencies

**Current State**: TypeScript is NOT listed

**Required Fix**:
Add to devDependencies:
```json
"typescript": "^5.0.0",
"@types/leaflet": "^1.9.0"
```

**Why**: Build will fail without TypeScript compiler installed

---

### ❌ Issue #3: i18n Configuration Missing
**File**: `next.config.js`  
**Section**: Configuration object

**Current State**: Only has comment about i18n

**Required Fix**:
Add i18n config:
```javascript
i18n: {
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  localeDetection: true,
},
```

**Why**: Pages need locale routing to work properly with getStaticPaths

---

### ❌ Issue #4: District Page in Wrong Directory
**File**: `/[districtSlug].jsx`  
**Problem**: File is at ROOT, should be under `/pages/district/`

**Required Fix**:
Move `/[districtSlug].jsx` → `/pages/district/[districtSlug].jsx`

**Why**: Next.js Pages Router needs dynamic routes under `/pages/` directory

---

### ❌ Issue #5: Job Page in Wrong Directory
**File**: `/[jobId].jsx`  
**Problem**: File is at ROOT, should be under `/pages/jobs/`

**Required Fix**:
Move `/[jobId].jsx` → `/pages/jobs/[jobId].jsx`

**Why**: Next.js Pages Router routing convention

---

### ❌ Issue #6: SEOHead Component Missing
**File**: Missing - referenced in `[districtSlug].jsx` line 3

**Current**: Cannot find `../../components/SEOHead`

**Required Fix**:
Create `/components/SEOHead.jsx`:
```jsx
import Head from 'next/head';

export default function SEOHead({ 
  title, 
  titlebn,
  description, 
  descriptionbn,
  canonical,
  locale,
  keywords,
  structuredData,
  ogImage 
}) {
  const isBangla = locale === 'bn';
  
  return (
    <Head>
      <title>{isBangla ? titlebn : title}</title>
      <meta name="description" content={isBangla ? descriptionbn : description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={isBangla ? titlebn : title} />
      <meta property="og:description" content={isBangla ? descriptionbn : description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={isBangla ? 'bn_BD' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={isBangla ? titlebn : title} />
      <meta name="twitter:description" content={isBangla ? descriptionbn : description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Head>
  );
}
```

**Why**: Component is required for SEO meta tags management

---

### ❌ Issue #7: Map Component Missing
**File**: Missing - referenced in `[districtSlug].jsx` line 15

**Current**: Cannot find `../../components/Map`

**Required Fix**:
Create `/components/Map.jsx`:
```jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default icons for Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function Map({ center, zoom, jobs }) {
  if (!center || !center[0] || !center[1]) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {jobs?.map(job => (
        <Marker key={job.id} position={[job.lat || 0, job.lng || 0]}>
          <Popup>{job.title} - {job.company}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

**Why**: Component is required for district job location map display

---

## ⏱️ Fix Timeline

| Issue | Time | Difficulty |
|-------|------|-----------|
| Fix workflow npm ci | 2 min | Easy |
| Add TypeScript to deps | 1 min | Easy |
| Add i18n config | 2 min | Easy |
| Move district page | 1 min | Easy |
| Move job page | 1 min | Easy |
| Create SEOHead component | 5 min | Medium |
| Create Map component | 5 min | Medium |
| **TOTAL** | **~17 minutes** | **Easy-Medium** |

---

## 📋 Checklist to Complete Deployment

- [ ] Update `.github/workflows/main.yml` (remove npm ci caching)
- [ ] Add `typescript` to `package.json` devDependencies
- [ ] Add `@types/leaflet` to `package.json` devDependencies
- [ ] Add i18n config to `next.config.js`
- [ ] Move `/[districtSlug].jsx` to `/pages/district/[districtSlug].jsx`
- [ ] Move `/[jobId].jsx` to `/pages/jobs/[jobId].jsx`
- [ ] Create `/components/SEOHead.jsx`
- [ ] Create `/components/Map.jsx`
- [ ] Test build locally: `npm install --legacy-peer-deps && npm run build`
- [ ] Commit and push to main
- [ ] Verify GitHub Actions passes
- [ ] Check workersbd.com is live

---

## 🔍 Verification Commands

After fixes, run locally:

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run linter
npm run lint

# Build project
npm run build

# Expected output: ✅ Build successful
```

---

## 🎯 Why These Fixes Matter

1. **Workflow fix**: CI/CD will work with pnpm lock file
2. **TypeScript**: Build won't fail during compilation
3. **i18n config**: Locale routing works for bilingual site
4. **File locations**: Next.js can properly route to pages
5. **SEOHead component**: Meta tags work for search engines
6. **Map component**: District pages can display location maps

---

## 📞 Support

Once all fixes are applied:
1. Push to main branch
2. GitHub Actions automatically builds
3. Vercel automatically deploys
4. Site goes live in 5-10 minutes

**Current Status**: ⏳ Awaiting fixes above

**Time to Production**: 17 minutes (fix) + 5-10 minutes (deployment) = ~25 minutes

