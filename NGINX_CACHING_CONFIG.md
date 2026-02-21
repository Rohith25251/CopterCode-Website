# NGINX Image Caching Configuration

## Purpose
This document provides NGINX configuration to set HTTP cache expiration headers for image files, improving website performance and SEO by reducing bandwidth usage and faster page load times.

## Configuration Setup

### 1. Add to Your NGINX Configuration File

Edit your NGINX server configuration (usually at `/etc/nginx/sites-available/your-domain`):

```nginx
# Main server block
server {
    listen 80;
    listen [::]:80;
    server_name coptercode.com www.coptercode.com;

    # Root directory
    root /var/www/coptercode;

    # Image caching configuration
    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
        add_header Pragma "public";
        access_log off;
        log_not_found off;
    }

    # CSS & JavaScript caching (shorter duration for potential updates)
    location ~* \.(css|js)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        access_log off;
    }

    # Video files caching
    location ~* \.(mp4|webm|ogg)$ {
        expires 90d;
        add_header Cache-Control "public, max-age=7776000";
        access_log off;
    }

    # Font files caching
    location ~* \.(woff|woff2|ttf|otf|eot)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Default cache for HTML and other assets
    location ~* \.(html)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    # Disable caching for dynamic content
    location ~* \.(php|asp|jsp)$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0";
    }

    # REST API endpoints (no caching)
    location ~ ^/api/ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0";
    }
}
```

### 2. Test NGINX Configuration

```bash
# Validate syntax
sudo nginx -t

# If valid, reload NGINX
sudo systemctl reload nginx
```

### 3. Verify Headers Are Being Set

```bash
# Check image cache headers
curl -I https://coptercode.com/mediafiles/logos/MurgDur-logo.webp

# Check video cache headers
curl -I https://coptercode.com/mediafiles/videos/drone-demo.mp4

# Expected output should include:
# Cache-Control: public, immutable
# Expires: (future date)
```

## Alternative: Apache .htaccess Configuration

If you're using Apache, add this to `.htaccess` in your root directory:

```apache
<IfModule mod_expires.c>
    ExpiresActive On

    # Set default expiration time
    ExpiresDefault "access plus 2 days"

    # Images
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"

    # Videos
    ExpiresByType video/mp4 "access plus 3 months"
    ExpiresByType video/ogg "access plus 3 months"
    ExpiresByType video/webm "access plus 3 months"

    # CSS and JavaScript
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"

    # Fonts
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType font/otf "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType application/vnd.ms-fontobject "access plus 1 year"

    # HTML (no cache)
    ExpiresByType text/html "access plus 2 days"
</IfModule>

# Also add headers
<IfModule mod_headers.c>
    # Remove ETag
    Header unset ETag
    FileETag None

    # Set compression
    <FilesMatch "\\.(jpg|jpeg|png|gif|webp)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>

    <FilesMatch "\\.(css|javascript|js)$">
        Header set Cache-Control "max-age=2592000, public"
    </FilesMatch>
</IfModule>
```

## Cloudflare Configuration (If Using)

If you're using Cloudflare for DNS/CDN:

1. **Go to Caching > Cache Rules** in Cloudflare Dashboard
2. **Create a new rule:**
   - Path: `*/mediafiles/logos/*` → Cache TTL: 1 year
   - Path: `*/mediafiles/videos/*` → Cache TTL: 3 months
   - Path: `*/mediafiles/*` → Cache TTL: 1 year

3. **Browser Caching:** Set to "1 month" or "1 year" depending on content

4. **Cache Key:** Include Scheme and Host to ensure proper caching by domain

## Vercel Configuration (If Deploying on Vercel)

If you're using Vercel (preferred for React apps), add `vercel.json` configuration:

```json
{
  "headers": [
    {
      "source": "/mediafiles/logos/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, immutable, max-age=31536000"
        }
      ]
    },
    {
      "source": "/mediafiles/videos/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=7776000"
        }
      ]
    },
    {
      "source": "/:path*.(jpg|jpeg|png|gif|webp|svg)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, immutable, max-age=31536000"
        }
      ]
    }
  ]
}
```

**Note:** This is already configured in your `vercel.json`, verify it includes image caching headers.

## Performance Impact

✅ **Benefits:**
- **Reduced bandwidth:** Images cached for up to 1 year on user browsers
- **Faster page loads:** Repeat visitors see instant image loading
- **Improved SEO:** Search engines favor fast-loading pages (Core Web Vitals)
- **Better UX:** Smoother browsing experience
- **Lower server costs:** Reduced origin requests

## Browser Cache Headers Explained

| Header | Purpose | Value |
|--------|---------|-------|
| `Cache-Control` | Tells browser how long to cache | `public, max-age=31536000` |
| `Expires` | Absolute expiration date | `Tue, 19 Jan 2026 23:59:59 GMT` |
| `Pragma` | Legacy cache control | `public` |
| `immutable` | Indicates content won't change | Used with versioned assets |

## Testing & Monitoring

### 1. Test Cache Headers
```bash
curl -I https://coptercode.com/_optimized/mediafiles/logos/MurgDur-logo.webp
```

### 2. Monitor with Chrome DevTools
- Open Developer Tools → Network tab
- Reload page
- Check "Size" column → Should show "from disk cache" for repeat loads

### 3. Check PageSpeed Insights
Visit: https://pagespeed.web.dev/?url=https://coptercode.com

Look for recommendations section - caching should improve your score.

## Updating Cached Images

When you need to update an image:

### Option 1: Query Parameter (Recommended)
```html
<!-- Instead of: -->
<img src="logo.png" />

<!-- Use versioning: -->
<img src="logo.png?v=2" />
```

### Option 2: Rename the File
```
logo.png → logo-v2.png
```

### Option 3: Content Delivery Network (CDN)
Use Cloudflare or similar CDN to serve images with automatic cache busting.

## Canonical Links

All pages should have a canonical link tag to prevent duplicate content issues:

```jsx
<SEO 
  canonicalUrl="https://coptercode.com/investors"
  ...
/>
```

Verify in PageHeader and all page components that canonical URLs are being set correctly.

## Checklist

- [ ] NGINX/Apache caching configured
- [ ] Cache headers verified (curl test)
- [ ] Vercel headers configured (if using Vercel)
- [ ] Cloudflare rules set (if using Cloudflare)
- [ ] Browser DevTools shows cached images
- [ ] PageSpeed Insights score improved
- [ ] All pages have canonical links
- [ ] All images optimized to WebP format
- [ ] All pages have H1 tags
- [ ] All pages have H2 subheadings

## Next Steps

1. Deploy this configuration to your production server
2. Run `curl -I` tests to verify headers
3. Check Google PageSpeed Insights
4. Monitor Core Web Vitals in Google Search Console
5. Track improvements in SEO rankings over 4-6 weeks

---

**Created:** February 21, 2026
**CopterCode SEO Enhancement Project**
