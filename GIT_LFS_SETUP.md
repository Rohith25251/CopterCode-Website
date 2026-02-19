# Git LFS Setup for Video Files

## ✅ What Was Done

1. **Updated `.gitignore`** - Removed the block on `public/mediafiles/`
2. **Created `.gitattributes`** - Configured Git LFS for video files

Now your video files will be tracked and pushed to GitHub!

---

## 🚀 How to Push Videos to GitHub

### Step 1: Install Git LFS (One-time)

**On Windows:**
```bash
# Using Chocolatey
choco install git-lfs

# Or download from: https://git-lfs.com
```

**Or manually:**
- Download from https://git-lfs.com
- Run the installer
- Restart your terminal

### Step 2: Initialize Git LFS

Run this in your project directory:
```bash
git lfs install
```

**Output should show:**
```
Git LFS initialized
```

### Step 3: Commit and Push

```bash
# Stage all changes (including videos)
git add .

# Commit with a message
git commit -m "Add video files and configure Git LFS"

# Push to GitHub
git push origin main
```

**First push may take longer** (158 MB of videos), but subsequent pushes will be faster.

---

## ✨ Video Files Being Tracked

Your videos are now managed by Git LFS:
- ✅ digital-services.mp4
- ✅ erp-software-solutions.mp4
- ✅ Home Advanced Technology.mp4
- ✅ industrial-drones-uav.mp4
- ✅ infra-security.mp4
- ✅ new-energy-materials.mp4
- ✅ retail-food-collaborations.mp4

---

## 🔧 What Is Git LFS?

Git LFS (Large File Storage) is a Git extension that:
- ✅ Efficiently handles large files (videos, images, etc.)
- ✅ Doesn't bloat your repository
- ✅ Keeps your `.git` folder small
- ✅ Makes cloning faster

**How it works:**
- Large files are stored separately
- Only pointers are stored in Git
- GitHub hosts the actual files

---

## 📋 Configuration Files

### `.gitattributes`
Tells Git which files to track with LFS. Already configured for:
- Video formats: `.mp4`, `.mov`, `.mkv`, `.avi`, `.webm`
- Image formats: `.psd`, `.tiff`

### `.gitignore`
Updated to allow `public/mediafiles/` so videos are included.

---

## ✅ Verification

After pushing, verify in GitHub:
1. Go to your GitHub repository
2. Navigate to `public/mediafiles/videos/`
3. You should see all 7 video files
4. Each file will show "Stored with Git LFS" label

---

## 🆘 Troubleshooting

### "Git LFS is not installed"
```bash
# Install Git LFS
git lfs install
```

### "File too large" error
- Make sure Git LFS is installed
- Run `git lfs install` again
- Try pushing again

### Videos not showing on GitHub
- Check that `.gitattributes` is committed
- Verify files are in `public/mediafiles/videos/`
- Check GitHub shows "Stored with Git LFS" label

---

## 📊 File Sizes

| File | Size |
|------|------|
| All Videos | ~158 MB |
| Repository (without videos) | ~15 MB |
| Total with LFS | ~173 MB |

GitHub allows up to 100 GB per LFS repository (free tier), so you're well within limits!

---

## 🎯 Next Steps

1. **Install Git LFS** (if not already installed)
2. **Run `git lfs install`** in your project
3. **Run the push commands** above
4. **Verify on GitHub** that videos are there

---

## 📚 More Information

- Git LFS Docs: https://git-lfs.com
- GitHub LFS Guide: https://docs.github.com/en/repositories/working-with-files/managing-large-files
- Vercel + LFS: Vercel automatically handles LFS files when deploying

---

**Status:** ✅ Videos ready to push to GitHub!

Once you push this, your Vercel deployment will automatically include all the video files.
