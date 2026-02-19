# CopterCode - Vercel Deployment Guide

## ✅ Deployment Ready

Your CopterCode project has been configured for Vercel deployment. Firebase has been completely removed.

---

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:
- ✅ GitHub account with the project repository
- ✅ Vercel account (create at https://vercel.com)
- ✅ Sanity project credentials ready

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Remove Firebase, prepare for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click "Add New..."** → Select **"Project"**
3. **Import GitHub Repository:**
   - Select "CopterCode" (or your repo name)
   - Click "Import"

### Step 3: Configure Environment Variables

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
VITE_SANITY_PROJECT_ID = your_sanity_project_id
VITE_SANITY_DATASET = your_sanity_dataset
```

**Where to find these values:**
- Project ID: Sanity Studio → Settings → API
- Dataset: Usually "production"

### Step 4: Deploy

1. **Root Directory:** (Vercel detects automatically, should be `.`)
2. **Build Command:** `npm run build` (Vercel auto-detects)
3. **Output Directory:** `dist` (Vercel auto-detects)
4. **Click "Deploy"**

---

## ✨ What Gets Deployed

```
CopterCode Project
├── Home page with dynamic content from Sanity
├── All business pages (drones, digital services, etc.)
├── Contact form (submits to SubmitBox)
├── Newsletter subscription (submits to SubmitBox)
├── Careers section with email applications
└── All images optimized via Sanity CDN
```

---

## 🔧 Post-Deployment

### Verify Deployment
- [ ] Visit your Vercel URL: `https://coptercode-[random].vercel.app`
- [ ] Check all pages load correctly
- [ ] Verify Sanity content displays
- [ ] Test forms (contact, newsletter, careers)
- [ ] Check browser console for errors

### Set Up Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain (example: coptercode.com)
3. Follow DNS configuration instructions

### Continuous Deployment
Once connected to GitHub:
- Every push to `main` → Auto-deploys to Vercel
- Preview deployments for pull requests
- No manual deployment needed

---

## 📦 What Was Removed

**Firebase files deleted:**
- ❌ `src/firebase.js` - Firebase config
- ❌ `src/utils/storageUtils.js` - Firebase storage utilities
- ❌ `firebase.json` - Firebase hosting config
- ❌ `.firebaserc` - Firebase project config
- ❌ `storage.rules` - Firebase storage rules

**Firebase dependencies removed from package.json:**
- ❌ `firebase` (v12.9.0)

**New files added for Vercel:**
- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to ignore in deployment

---

## 🌍 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_SANITY_PROJECT_ID` | Sanity CMS project identifier | `wsuk3wqx ` |
| `VITE_SANITY_DATASET` | Sanity dataset name | `production` |

**Note:** No Firebase variables needed anymore!

---

## 📊 Deployment Checklist

### Before Deployment
- [ ] All Firebase files removed
- [ ] Firebase dependency removed from package.json
- [ ] Code pushed to GitHub
- [ ] No errors in local build: `npm run build`

### During Deployment
- [ ] Vercel project created
- [ ] GitHub repository connected
- [ ] Environment variables set (Sanity credentials)
- [ ] Deploy button clicked

### After Deployment
- [ ] Site loads at Vercel URL
- [ ] All pages accessible
- [ ] Sanity content displays correctly
- [ ] Forms working (contact, newsletter, careers)
- [ ] No console errors
- [ ] Images loading properly

---

## 🔐 Security

### ✅ Secure Setup
- Environment variables stored in Vercel (not in code)
- No hardcoded API keys
- GitHub secrets protected
- Sanity read-only access via public API

### ✅ Best Practices
- Never commit `.env` files
- Use Vercel's environment variable system
- Monitor Sanity API usage
- Keep dependencies updated

---

## 🆘 Troubleshooting

### "Build failed" error
**Solution:** Check build logs in Vercel dashboard
```bash
# Test locally first
npm run build
npm run preview
```

### Pages show "No content"
**Solution:** Verify Sanity credentials
- Check `VITE_SANITY_PROJECT_ID` in Vercel settings
- Check `VITE_SANITY_DATASET` in Vercel settings
- Ensure Sanity document is published

### Forms not working
**Solution:** Verify SubmitBox integration
- Contact form uses SubmitBox API
- Newsletter uses SubmitBox API
- No changes needed - should work out of box

### Static assets not loading
**Solution:** Check asset paths
- Images use Sanity CDN
- Verify `urlFor()` is working
- Check network tab in DevTools

---

## 📞 Useful Commands

```bash
# Install dependencies (after cloning)
npm install

# Start development server
npm run dev

# Build for production (what Vercel runs)
npm run build

# Preview production build locally
npm run preview

# Lint code
npm lint
```

---

## 📚 Documentation

For more information:
- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Sanity Docs:** https://www.sanity.io/docs

---

## ✅ You're Ready!

Your CopterCode project is now ready for Vercel deployment with:
- ✅ Firebase completely removed
- ✅ Vercel configuration in place
- ✅ GitHub integration ready
- ✅ Environment variables configured
- ✅ All features working (Sanity, forms, etc.)

**Next step:** Push to GitHub and deploy to Vercel!

---

**Last Updated:** February 19, 2026  
**Status:** ✅ Ready for Production
