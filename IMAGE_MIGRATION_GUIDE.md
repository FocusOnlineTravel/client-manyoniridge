# Image Migration Guide - Manyoni Ridge WordPress Migration

This guide covers the complete process of migrating 241 images from the Next.js frontend to the WordPress Media Library.

**Source:** `/public/images/`
**Destination:** WordPress Media Library at https://backend-manyoni.focusonlinetravel.co.za
**Total Images:** 241 images

---

## Image Inventory

### 1. Birds and Wildlife (200+ images)
**Location:** `/public/images/Birds and Wildlife/`
**Count:** ~200 images
**File Types:** JPG, JPEG
**Usage:** Used extensively across all pages for hero images, gallery, section backgrounds

**Examples:**
- `leopard 2 - ar.jpg`
- `Leopard Kruger SA AR-072 Edited.jpg`
- `DSC00844.jpeg`
- `Secretarybird Kgalagadi Transfrontier NP SA AR-061 Edited.jpg`
- `Roller, Lilac-breasted Kruger SA AR-016 Edited.jpg`

### 2. Accommodation Images (20 images)
**Location:** `/public/images/`
**Count:** 20 images

**1-Bedroom Suite (4 images):**
- `1-bed 1.jpg` (Hero/card image)
- `1-bed 2.jpg`
- `1-bed 3.jpg`
- `1-bed 4.jpg`

**2-Bedroom Suite (8 images):**
- `2-bed 1.jpg` (Hero/card image)
- `2-bed 2.jpg` through `2-bed 10.jpg`

### 3. Lodge Renders (35 images)
**Location:** `/public/images/`
**Count:** 35 images
**Pattern:** `MANYONI RIDGE CLUBHOUSE RENDERS *.jpg`

**Files:**
- `MANYONI RIDGE CLUBHOUSE RENDERS dark.jpg`
- `MANYONI RIDGE CLUBHOUSE RENDERS 22.jpg`
- `MANYONI RIDGE CLUBHOUSE RENDERS 32.jpg`
- Numbered renders 1-35

### 4. Additional Images
**Location:** `/public/images/`

- `k9.jpg` (K9 unit activities)
- `pangolin.jpg` (Pangolin experiences)
- `rhino.jpg` (Rhino conservation)

### 5. Videos
**Location:** `/public/videos/`
**Count:** 1 video

- `manynoi.mp4` (Homepage hero background video)

---

## Migration Strategy

### Option A: Bulk Upload via WordPress Admin (Recommended for Initial Upload)

#### Step 1: Prepare Images Locally

1. Navigate to your project directory:
   ```bash
   cd /Applications/XAMPP/xamppfiles/htdocs/webs/www.manyoniridge.co.za/frontend/public/images
   ```

2. Create organized ZIP files by category:
   ```bash
   # Birds and Wildlife
   cd "Birds and Wildlife"
   zip -r ~/Desktop/birds-wildlife.zip *
   cd ..

   # Accommodation images
   zip ~/Desktop/accommodation.zip 1-bed*.jpg 2-bed*.jpg

   # Lodge renders
   zip ~/Desktop/lodge-renders.zip "MANYONI RIDGE CLUBHOUSE RENDERS"*.jpg

   # Additional
   zip ~/Desktop/additional.zip k9.jpg pangolin.jpg rhino.jpg
   ```

#### Step 2: Upload to WordPress

1. Log in to WordPress: https://backend-manyoni.focusonlinetravel.co.za/wp-admin
2. Navigate to **Media > Add New**
3. Upload ZIP files (or use plugin like "Media from FTP" if WordPress has unzip limits)
4. Alternatively, drag and drop images directly (may need to do in batches)

#### Step 3: Organize in Media Library

**Option 1: Use Folders Plugin (Recommended)**
1. Install plugin: "FileBird" or "Real Media Library"
2. Create folder structure:
   - Birds and Wildlife
   - Accommodation
     - 1-Bedroom Suite
     - 2-Bedroom Suite
   - Lodge Renders
   - Activities
   - Gallery

**Option 2: Use Categories/Tags**
1. Add media categories/tags to organize
2. Tag images as: wildlife, birds, accommodation, renders, etc.

---

### Option B: FTP/SFTP Upload (Faster for Large Batches)

#### Step 1: Upload via FTP

1. Connect to your WordPress server via FTP
2. Navigate to: `/wp-content/uploads/2026/02/` (or current month)
3. Upload all images
4. Upload folders to maintain structure

#### Step 2: Import to Media Library

1. Install plugin: "Media from FTP" or "Add From Server"
2. Navigate to plugin settings
3. Click "Import" - scans upload directory
4. Select all images to import
5. Click "Import to Media Library"

---

### Option 3: WP-CLI (Fastest for Developers)

If you have command-line access to the WordPress server:

```bash
# Navigate to WordPress root
cd /path/to/wordpress

# Import all images from a directory
wp media import /path/to/images/*.jpg --post_author=1

# Import with specific titles and alt text
wp media import /path/to/image.jpg \
  --title="Leopard in Manyoni" \
  --alt="Leopard resting in African bush" \
  --post_author=1
```

---

## Image Optimization

### Before Upload

1. **Resize Large Images** (if needed)
   - Hero images: Max 1920×1080 (Full HD)
   - Content images: Max 1200×800
   - Thumbnails: 600×400

2. **Compress Images**
   - Use tools like:
     - [TinyPNG](https://tinypng.com/)
     - [Squoosh](https://squoosh.app/)
     - ImageOptim (Mac)
     - Or bulk with ImageMagick:
       ```bash
       mogrify -quality 85 -resize 1920x1080\> *.jpg
       ```

### After Upload to WordPress

1. **Install Optimization Plugin**
   - Recommended: Smush, ShortPixel, or Imagify
   - Configure to auto-optimize on upload
   - Run bulk optimization on existing images

2. **Generate Multiple Sizes**
   - WordPress auto-generates thumbnails
   - If needed, run: **Tools > Regen. Thumbnails** (plugin required)

3. **Enable WebP Conversion** (Optional)
   - Use plugin to auto-convert JPG/PNG to WebP
   - Serves lighter images to modern browsers

---

## Mapping Images to Content

After uploading, you need to reference the WordPress media URLs in your ACF fields.

### Getting WordPress Media URLs

#### Method 1: Manual (Small Sites)

1. Go to **Media Library**
2. Click on an image
3. Copy the "File URL"
4. Use this URL in ACF image fields

#### Method 2: Media ID (Preferred)

1. ACF image fields store Media ID, not URL
2. When adding an image in ACF:
   - Click "Add Image"
   - Select from Media Library
   - ACF stores ID automatically
3. WordPress/GraphQL handles URL generation

### Image Reference Table

Create a mapping table for quick reference:

| Frontend Path | WordPress Media ID | WordPress URL |
|---------------|-------------------|---------------|
| `/images/Birds and Wildlife/leopard 2 - ar.jpg` | 123 | `https://backend.../wp-content/uploads/2026/02/leopard-2-ar.jpg` |
| `/images/1-bed 1.jpg` | 124 | `https://backend.../wp-content/uploads/2026/02/1-bed-1.jpg` |

You can export this from WordPress Media Library using a plugin like "Media Library Assistant" or "WP All Export".

---

## Video Migration

### Homepage Hero Video

**Source:** `/public/videos/manynoi.mp4`

#### Option 1: Upload to WordPress Media Library

1. Go to **Media > Add New**
2. Upload `manynoi.mp4`
3. Note: WordPress has upload size limits (default 2MB-100MB)
4. If file is too large, increase limits or use Option 2

#### Option 2: External Hosting (Recommended for Large Videos)

**Vimeo:**
1. Upload video to Vimeo
2. Set privacy as needed
3. Copy embed URL
4. Use in ACF field: `videoSrc`

**YouTube:**
1. Upload to YouTube (unlisted if preferred)
2. Copy video URL
3. Use in ACF field

**Direct CDN:**
1. Upload to your CDN (Cloudflare, AWS S3, etc.)
2. Get direct video URL
3. Use in ACF field

#### Option 3: Local Server Path

1. Upload via FTP to: `/wp-content/uploads/videos/manynoi.mp4`
2. Reference as: `https://backend-manyoni.focusonlinetravel.co.za/wp-content/uploads/videos/manynoi.mp4`

---

## SEO & Accessibility

### Image Alt Text

When uploading images, add descriptive alt text:

**Good Examples:**
- "Leopard resting on tree branch in Manyoni Private Game Reserve"
- "Luxury one bedroom suite with private plunge pool at Manyoni Ridge"
- "Lilac-breasted Roller perched in African bush"

**Bad Examples:**
- "IMG_1234.jpg"
- "leopard 2 - ar"
- "DSC00844"

### Image Titles

Set meaningful titles:
- "Leopard at Manyoni Reserve"
- "One Bedroom Suite Exterior"
- "Lilac-Breasted Roller"

### File Names

WordPress will use uploaded filenames. Ideally:
- Use hyphens, not spaces: `leopard-resting.jpg` not `leopard resting.jpg`
- Use lowercase
- Be descriptive: `one-bedroom-suite-pool.jpg`

**Bulk Rename Before Upload:**
```bash
# Remove spaces
for f in *\ *; do mv "$f" "${f// /-}"; done

# Convert to lowercase
for f in *; do mv "$f" "$(echo $f | tr '[:upper:]' '[:lower:]')"; done
```

---

## Image Configuration in Next.js

### Update next.config.ts

Add WordPress domain to allowed image domains:

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-manyoni.focusonlinetravel.co.za',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
```

### Using Images in Components

```tsx
import Image from 'next/image';

// From WordPress media
<Image
  src="https://backend-manyoni.focusonlinetravel.co.za/wp-content/uploads/2026/02/leopard.jpg"
  alt="Leopard at Manyoni"
  width={1200}
  height={800}
  priority={isHero}
/>
```

---

## Troubleshooting

### Upload Size Limits

If you hit upload size limits:

1. **Increase PHP Limits** (server-level):
   ```
   upload_max_filesize = 64M
   post_max_size = 64M
   max_execution_time = 300
   ```

2. **Use .htaccess** (if on Apache):
   ```
   php_value upload_max_filesize 64M
   php_value post_max_size 64M
   ```

3. **WordPress Plugin**:
   - Install "Increase Upload Max Filesize"

### Slow Uploads

- Use FTP for bulk uploads
- Upload in smaller batches
- Use compression before upload

### Images Not Displaying in Frontend

1. Check Next.js image domain configuration
2. Verify CORS settings on WordPress
3. Check image URLs in GraphQL response
4. Verify image URLs are absolute, not relative

### Missing Images

1. Check Media Library for successful import
2. Verify file permissions on server
3. Check error logs: `/wp-content/debug.log`

---

## Checklist

### Pre-Migration

- [ ] Images organized locally
- [ ] Large images resized
- [ ] Images compressed
- [ ] File names cleaned (no spaces, lowercase)
- [ ] Backup of original images created

### Upload

- [ ] WordPress upload limits increased (if needed)
- [ ] Optimization plugin installed
- [ ] Folder structure created (if using plugin)
- [ ] Images uploaded via chosen method
- [ ] Video uploaded or hosted externally

### Post-Migration

- [ ] All images appear in Media Library
- [ ] Images organized into folders/categories
- [ ] Alt text added to all images
- [ ] Bulk optimization run
- [ ] Image references updated in ACF fields
- [ ] Next.js config updated with WordPress domain
- [ ] Frontend tested - all images loading correctly

### Quality Assurance

- [ ] All hero images displaying
- [ ] Gallery images working
- [ ] Accommodation images showing in cards
- [ ] Activity images displaying
- [ ] Image optimization working (check file sizes)
- [ ] Responsive images generating correctly
- [ ] Video playing (if embedded)

---

## Tools & Resources

### WordPress Plugins

- **Media Management:**
  - FileBird (folders)
  - Real Media Library (folders)
  - Media Library Assistant (bulk editing)

- **Optimization:**
  - Smush (free tier available)
  - ShortPixel (paid, excellent results)
  - Imagify (paid)
  - EWWW Image Optimizer (free)

- **Import:**
  - Media from FTP
  - Add From Server
  - WP All Import (advanced)

### External Tools

- **Image Compression:**
  - [TinyPNG](https://tinypng.com/) - Online batch compression
  - [Squoosh](https://squoosh.app/) - Google's image optimizer
  - ImageOptim (Mac) - Desktop app
  - ImageMagick (CLI) - Command line tool

- **Bulk Renaming:**
  - [Bulk Rename Utility](https://www.bulkrenameutility.co.uk/) (Windows)
  - [NameChanger](https://mrrsoftware.com/namechanger/) (Mac)
  - CLI: `rename` command (Linux/Mac)

### Video Hosting

- [Vimeo](https://vimeo.com/) - High quality, privacy controls
- [YouTube](https://youtube.com/) - Free, unlimited
- [Wistia](https://wistia.com/) - Business-focused
- [Bunny.net](https://bunny.net/) - CDN + video hosting

---

## Migration Timeline Estimate

| Task | Estimated Time |
|------|----------------|
| Organize & prepare images | 2-4 hours |
| Upload to WordPress | 1-2 hours (FTP) or 3-4 hours (admin) |
| Optimize images | 1-2 hours (automated) |
| Add alt text & organize | 4-6 hours |
| Update ACF fields with images | 3-5 hours |
| Test & QA | 2-3 hours |
| **Total** | **13-24 hours** |

*Time varies based on internet speed, server performance, and chosen method.*

---

## Summary

**Total Assets to Migrate:**
- 241 images
- 1 video

**Recommended Approach:**
1. FTP upload for Birds & Wildlife images (bulk)
2. WordPress Admin upload for Accommodation & Renders (organized)
3. External hosting for video (Vimeo)
4. Use FileBird plugin for organization
5. Use Smush or ShortPixel for optimization
6. Bulk add alt text using Media Library Assistant

**Critical Success Factors:**
- Proper alt text for SEO
- Image optimization for performance
- Organized folder structure
- Accurate field mapping
- Next.js configuration updated

---

**Migration Status:** [ ] Not Started / [ ] In Progress / [ ] Completed
**Date Completed:** _____________
**Migrated By:** _____________
