# Sanity CMS Connectivity Verification & Troubleshooting Guide

## ✅ Quick Verification Checklist

### 1. Environment Variables
Check that your `.env` file contains the correct values:

```bash
VITE_SANITY_PROJECT_ID=wsuk3wqx
VITE_SANITY_DATASET=production
```

**How to find these values:**
- Project ID: Log in to [Sanity Studio](https://manage.sanity.io/) → Select Project → Settings → API
- Dataset: Navigate to Sanity Studio → Settings → Datasets

### 2. Network Connection
- Ensure you have internet connection
- Check if Sanity CDN is accessible: https://api.sanity.io
- If using a proxy/VPN, verify Sanity APIs are not blocked

### 3. Build Configuration
```bash
# Ensure environment variables are loaded
npm run dev
# Check console for "✅ Sanity Client Initialized" message
```

## 🔍 Browser Console Checks

### Expected Log Output
When you load the application, you should see:

```javascript
✅ Sanity Client Initialized: {
  projectId: "wsuk3...",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03",
  timestamp: "2026-02-23T10:30:00.000Z"
}

📡 Fetching Home page data from Sanity...
✅ Home page data loaded from Sanity successfully
```

### Common Console Messages

| Message | Meaning | Action |
|---------|---------|--------|
| `✅ Sanity Client Initialized` | Client is configured correctly | ✓ Good to go |
| `⚠️ No [Page] data from Sanity` | Page exists in code but not in CMS | Add content to Sanity Studio |
| `❌ Error fetching [Page]` | Network or authentication issue | See troubleshooting below |
| `⚠️ VITE_SANITY_PROJECT_ID not properly configured` | Wrong or missing Project ID | Update `.env` file |

## 🛠️ Troubleshooting

### Issue: "Cannot read properties of undefined (reading 'fetch')"
**Problem:** Sanity client is not initialized  
**Solution:**
1. Verify `.env` file has correct values
2. Restart development server: `npm run dev`
3. Clear browser cache: Ctrl+Shift+Delete

### Issue: CORS Error (Access-Control-Allow-Origin)
**Problem:** Project ID or network configuration issue  
**Solution:**
1. Verify Project ID in `.env` is correct
2. Check Sanity Project Settings → API → CORS origins
3. Add your domain to allowed CORS origins in Sanity

### Issue: 401 Unauthorized Error
**Problem:** API token or permissions issue  
**Solution:**
1. Verify you're using a public dataset
2. For private datasets, ensure API token is valid
3. Check permissions in Sanity: Settings → API → Credentials

### Issue: Data appears but images don't show
**Problem:** Image URL builder issue or broken image path  
**Solution:**
1. Verify images are uploaded to Sanity
2. Check browser console for image URL errors
3. Verify image CDN configuration

### Issue: Stale data showing (not updating when CMS changes)
**Problem:** CDN caching  
**Solution:**
```javascript
// In src/lib/sanity.js, change:
useCdn: false  // Bypass cache for real-time updates
// Then restart server
```

## 📊 Sanity Queries Reference

### Common Query Patterns Used in the App

#### Fetch single page with nested content
```groq
*[_type == "homePage"][0]{
  ...,
  hero{ title, subtitle, backgroundImage{asset->{url}} },
  sections[]{..., image{asset->{url}}}
}
```

#### Fetch array of items with image URLs
```groq
*[_type == "careerPage"][0]{
  ...,
  trusted{
    heading,
    logos[]{asset->{url}}
  }
}
```

#### Fetch specific nested array item
```groq
*[_type == "businessVerticalsPage"][0].verticals[id == "industrial-drones"][0]{
  ...
}
```

## 🚀 Performance Tips

### 1. Optimize Image Loading
Use the `urlFor()` helper with size constraints:
```javascript
urlFor(image).width(400).height(300).url()
```

### 2. Pagination for Large Datasets
```groq
*[_type == "articles"][0:10] { ... }  // Fetch first 10
*[_type == "articles"][10:20] { ... } // Fetch next 10
```

### 3. Select Only Needed Fields
Instead of `*[_type == "page"][0]{ ... }`  
Do: `*[_type == "page"][0]{ title, seo, hero }`

## 🔐 API Security

### DO:
✅ Keep Project ID in `.env` (it's not sensitive, it's public)  
✅ Use Sanity's built-in CORS management  
✅ Use read-only access for frontend  

### DON'T:
❌ Document API tokens in code  
❌ Use write tokens in frontend code  
❌ Expose private datasets without VPN/proxy  

## 📱 Testing Sanity Connection

### Test with curl
```bash
curl "https://api.sanity.io/v2021-06-07/data/query/wsuk3wqx?query=*[_type==\"homePage\"][0]"
```

### Test in Browser DevTools
```javascript
// Open browser console and run:
await client.fetch('*[_type == "homePage"][0] | { _id, _type }')
```

## 📞 Getting Help

1. **Check Sanity Status:** https://sanity.io/status
2. **View Logs:** Sanity Studio → Settings → Activity Log
3. **Test Dataset:** Use Sanity Vision Tool to test queries
4. **Contact Support:** Sanity Dashboard → Help → Support

## 🎯 Integration Checklist

- [ ] `.env` file configured with correct Project ID and Dataset
- [ ] Sanity client initializes without errors
- [ ] At least one page loads data from Sanity successfully
- [ ] Images load correctly from Sanity CDN
- [ ] Error messages display useful debugging info
- [ ] Schema definitions match Sanity documents
- [ ] All pages have fallback data if Sanity is unavailable
- [ ] API credentials are secure and not exposed

---
**Last Updated:** February 23, 2026  
**Sanity Studio:** https://wsuk3wqx.sanity.studio  
**Documentation:** https://www.sanity.io/docs
