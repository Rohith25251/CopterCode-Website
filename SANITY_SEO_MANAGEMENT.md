# Sanity CMS SEO Management Guide

## Overview

All SEO settings for the 6 key pages (Business, Administration, Careers, Internship, Contact, Events) are now fully managed through **Sanity Studio**. Default values are built in as fallbacks, but you can customize everything directly from the CMS.

## How It Works

### Fallback Logic
Each page uses this pattern:
```javascript
// If Sanity has data → Use Sanity
// If Sanity is empty → Use Default (hardcoded in code)
<SEO
  title={sanityData?.seo?.metaTitle || "Default Title"}
  description={sanityData?.seo?.metaDescription || "Default Description"}
  keywords={sanityData?.seo?.keywords || "default keywords"}
/>
```

**Benefits:**
- ✅ Change SEO anytime without code changes
- ✅ Safe fallbacks if CMS data is missing
- ✅ Works offline with hardcoded defaults
- ✅ No frontend UI changes needed

## Sanity Studio Access

### 1. Open Sanity Studio
Navigate to your Sanity project:
```
https://coptercode.sanity.studio
(or your custom studio URL)
```

### 2. Edit Page SEO

#### **Business Page**
1. Go to **Business Page** document in Sanity
2. Scroll to **SEO Settings** section
3. Edit these fields:
   - **Meta Title:** `Business | Solutions & Services`
   - **Meta Description:** `Explore CopterCode's business verticals...`
   - **Keywords:** `business solutions, industrial drones, digital transformation...`

#### **Administration Page**
1. Go to **Administration Page** document
2. Find **SEO Settings** section
3. Update:
   - **Meta Title:** `Administration | Leadership & Governance`
   - **Meta Description:** `Meet CopterCode's executive leadership...`
   - **Keywords:** `leadership team, executive management, board of directors...`

#### **Careers Page**
1. Go to **Careers Page** document
2. Edit **SEO Settings**:
   - **Meta Title:** `Careers | Drone Tech & AI Engineering`
   - **Meta Description:** `Join CopterCode's innovative team...`
   - **Keywords:** `drone technology jobs, AI engineer, software engineering careers...`

#### **Internship Page**
1. Go to **Internship Page** document
2. Update **SEO Settings**:
   - **Meta Title:** `Internship | Real-World Tech Experience`
   - **Meta Description:** `CopterCode internship program offers real-world experience...`
   - **Keywords:** `internship program, drone technology, AI internship...`

#### **Contact Page**
1. Go to **Contact Page** document
2. Edit **SEO Settings**:
   - **Meta Title:** `Contact Us | CopterCode`
   - **Meta Description:** `Contact CopterCode for inquiries, partnerships...`
   - **Keywords:** `contact, inquiries, partnerships, support services...`

#### **Events Page**
1. Go to **Events Page** document
2. Update **SEO Settings**:
   - **Meta Title:** `Events | Conferences & Networking`
   - **Meta Description:** `Join CopterCode's global events...`
   - **Keywords:** `events, conferences, hackathons, tech summit...`

## Default Values Reference

### What happens if Sanity is empty?

Each page falls back to these default values (built into code):

| Page | Default Title | Default Keywords |
|------|---------------|-----------------|
| **Business** | Business \| Solutions & Services | business solutions, industrial drones, digital transformation, ERP systems, enterprise software, sustainable energy |
| **Administration** | Administration \| Leadership & Governance | leadership team, executive management, board of directors, company governance, administration, CopterCode leadership |
| **Careers** | Careers \| Drone Tech & AI Engineering | drone technology jobs, AI engineer, software engineering careers, industrial automation, machine learning, CopterCode careers, tech jobs |
| **Internship** | Internship \| Real-World Tech Experience | internship program, drone technology, AI internship, cybersecurity training, software development, student internship, tech training |
| **Contact** | Contact Us \| CopterCode | contact, inquiries, partnerships, drone technology support, enterprise software, support services |
| **Events** | Events \| Conferences & Networking | events, conferences, hackathons, tech summit, innovation, networking, drone technology |

## SEO Field Specifications

### Meta Title
- **Type:** String
- **Max Length:** 60 characters (ideal for Google display)
- **What it does:** Shows as the blue clickable headline in Google search results
- **Best Practice:** Include your main keyword and page focus

### Meta Description
- **Type:** Text (longer text field)
- **Max Length:** 160 characters (ideal for full Google display)
- **What it does:** Shows as the gray text under the title in search results
- **Best Practice:** Include a call-to-action, keywords, and make it compelling

### Keywords
- **Type:** String
- **Recommended:** 6-10 keywords, comma-separated
- **What it does:** Tells search engines what your page is about
- **Note:** Modern SEO relies more on content relevance than exact keyword match, but keywords still help with schema understanding

## Step-by-Step: Update SEO in Sanity

### Example: Updating Careers Page

1. **Open Sanity Studio** → Log in
2. **Navigate** → Click "Careers Page" in the documents list on the left
3. **Find SEO Settings** → Scroll down to the "SEO Settings" section
4. **Edit Meta Title:**
   - Click the field
   - Clear current text
   - Type: `Careers | Drone Tech & AI Engineering`
   - Tip: Keep under 60 characters
5. **Edit Meta Description:**
   - Click the field
   - Update text to something engaging
   - Keep under 160 characters
6. **Edit Keywords:**
   - Comma-separated list of important keywords
   - Example: `drone jobs, AI engineer, tech careers, CopterCode`
7. **Publish** → Click "Publish" button at top right
8. **Verify** → Website will update within seconds (depending on rebuild time)

## How to Check If Your Changes Worked

### 1. View Page Source
After publishing in Sanity:
```
1. Go to https://coptercode.com/careers (example)
2. Right-click → "View Page Source"
3. Search for: Ctrl+F → "meta name="description""
4. Should show your new description
```

### 2. Check Meta Tags
```
1. Go to https://coptercode.com/careers
2. Right-click → "Inspect"
3. Look in <head> section
4. Verify <meta> tags show your new content
```

### 3. Google Search Console
```
1. Go to Google Search Console
2. Select your property (coptercode.com)
3. URL Inspection → Enter your page URL
4. Check "Crawl Results" → Look for meta tags
```

### 4. Test in Google's Rich Results Test
```
1. Go to https://search.google.com/test/rich-results
2. Paste your page URL
3. Click "Test live URL"
4. Verify schema and meta tags are present
```

## Common Issues & Solutions

### Issue: Changes not showing on website

**Solution:**
1. Make sure you **Published** in Sanity (green Publish button)
2. Clear browser cache: Ctrl+Shift+Delete (Chrome) or Cmd+Shift+Delete (Mac)
3. Wait 5-10 seconds for rebuild
4. Hard refresh: Ctrl+F5

### Issue: Old title showing in Google

**This is normal!** Google takes time to recrawl pages.

**Solution:**
1. Update the page in Sanity ✓
2. Go to Google Search Console
3. Request indexing of the URL
4. Google will recrawl within 24-48 hours
5. Changes will appear in search results

### Issue: Description is truncated in search results

**This happens when:**
- Description is too long (>160 characters)
- Mobile results are narrower than desktop

**Solution:**
- Keep descriptions between 155-160 characters
- Put most important info first
- Use clear, concise language

## Advanced: Sanity Schema Overview

The SEO section in each page's Sanity schema looks like this:

```javascript
{
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    { 
      name: 'metaTitle', 
      type: 'string', 
      title: 'Meta Title',
      initialValue: 'Default Title Here' 
    },
    { 
      name: 'metaDescription', 
      type: 'text', 
      title: 'Meta Description',
      initialValue: 'Default description here...' 
    },
    { 
      name: 'keywords', 
      type: 'string', 
      title: 'Keywords',
      initialValue: 'keyword1, keyword2, keyword3' 
    }
  ]
}
```

**Key Points:**
- `initialValue` = The default value if nothing is entered
- `type: 'object'` = Grouped together as one SEO section
- All fields are optional (fallback to defaults if left empty)

## Files Modified for Sanity Integration

### Sanity Schema Files (Backend CMS Configuration):
- `src/sanity/schemas/businessPage.js` - Added keywords field
- `src/sanity/schemas/administrationPage.js` - Added keywords field
- `src/sanity/schemas/careersPage.js` - Added keywords field
- `src/sanity/schemas/internshipPage.js` - Added keywords field
- `src/sanity/schemas/contactPage.js` - Added keywords field
- `src/sanity/schemas/eventsPage.js` - Added keywords field

### React Page Files (Frontend Display):
- `src/pages/Business.jsx` - Now reads keywords from Sanity
- `src/pages/Administration.jsx` - Now reads keywords from Sanity
- `src/pages/Careers.jsx` - Now reads keywords from Sanity
- `src/pages/Internship.jsx` - Now reads keywords from Sanity
- `src/pages/Contact.jsx` - Now reads keywords from Sanity
- `src/pages/Events.jsx` - Now reads keywords from Sanity

## Best Practices for SEO in Sanity

### When Editing Meta Titles:
✅ **DO:**
- Include primary keyword
- Keep under 60 characters
- Make it descriptive and clickable
- Example: `Careers | Drone Tech & AI Engineering`

❌ **DON'T:**
- Keyword stuffing: `Careers Jobs Career Opportunities Employment`
- Making it too long: `Work at CopterCode - Careers in Drone Tech AI Engineering`
- Being vague: `Page`

### When Editing Meta Descriptions:
✅ **DO:**
- Write for humans, not robots
- Include call-to-action
- Keep under 160 characters
- Use compelling language

❌ **DON'T:**
- Just repeat the title
- Keyword stuff
- Write incomplete sentences

### When Editing Keywords:
✅ **DO:**
- Use 6-10 most relevant terms
- Comma-separated
- Related to page content
- Match user search intent

❌ **DON'T:**
- Add random keywords
- Use more than 15-20
- Use keywords not related to page

## Republishing After Changes

When you update SEO in Sanity:

1. **Never need to redeploy code**
2. **Just hit Publish in Sanity** ✓
3. Website picks up changes automatically
4. Changes live within seconds (depending on build time)

## Timeline: From CMS to Google

| Step | Time | Action |
|------|------|--------|
| Edit in Sanity | 1 minute | Update Meta Title/Description/Keywords |
| Publish | 1 second | Click Publish button |
| Website updates | 5-10 seconds | Changes appear on site |
| Google crawls | 1-7 days | Googlebot visits and indexes new content |
| Results update | 1-7 days | New title/description appear in search |

## Support & Questions

If you need to update SEO settings:
1. Log into Sanity Studio
2. Find the page document
3. Edit the SEO Settings section
4. Click Publish
5. Done! No developer needed

---

**Last Updated:** February 2026
**Status:** ✅ Full Sanity CMS Integration Complete
**Next Steps:** Publish updated SEO values in Sanity Studio
