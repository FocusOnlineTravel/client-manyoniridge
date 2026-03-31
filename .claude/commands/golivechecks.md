# /golivechecks

Run a comprehensive go-live technical audit for the current project. Work through each category systematically, report pass ✅ / fail ❌ / warning ⚠️ for each item, and produce a final summary with any action items required before launch.

## Instructions

You have access to the codebase and can run terminal commands. Use them to verify each check where possible rather than asking the user. Where a check requires a live URL, ask the user for the production URL if not already known.

---

## 1. XML Sitemap

- [ ] `sitemap.xml` exists and is accessible at `/sitemap.xml`
- [ ] Sitemap is referenced in `robots.txt`
- [ ] All key pages are included in the sitemap
- [ ] No noindex pages appear in the sitemap

```bash
# Check sitemap exists in project
find . -name "sitemap*" -not -path "*/node_modules/*"
```

---

## 2. Robots.txt

- [ ] `robots.txt` exists and is accessible at `/robots.txt`
- [ ] Site is NOT set to `Disallow: /` (i.e. not blocking all crawlers)
- [ ] Sitemap URL is referenced in robots.txt

```bash
find . -name "robots.txt" -not -path "*/node_modules/*"
cat public/robots.txt 2>/dev/null || cat robots.txt 2>/dev/null
```

---

## 3. Meta & SEO

- [ ] Each key page has a unique `<title>` tag
- [ ] Each key page has a unique `<meta name="description">`
- [ ] OG tags present (`og:title`, `og:description`, `og:image`)
- [ ] Favicon configured
- [ ] No duplicate H1s on any page

```bash
# Check for SEO config in Next.js
grep -r "metadata" app/ --include="*.tsx" --include="*.ts" -l 2>/dev/null | head -20
grep -r "metadataBase\|openGraph\|title\|description" app/layout.tsx 2>/dev/null
```

---

## 4. Schema Markup

- [ ] JSON-LD schema present on relevant pages
- [ ] Schema type is appropriate (e.g. `LodgingBusiness`, `Hotel`, `TouristAttraction`)
- [ ] `name`, `url`, `telephone`, `address` fields populated
- [ ] No schema validation errors

```bash
grep -r "application/ld+json\|JsonLd\|schema" app/ src/ --include="*.tsx" --include="*.ts" -l 2>/dev/null
```

---

## 5. Analytics & Tracking

- [ ] Google Analytics 4 (GA4) measurement ID present in config
- [ ] Google Tag Manager container ID present
- [ ] Meta Pixel ID present (if applicable)
- [ ] No hardcoded IDs — all pulled from environment variables

```bash
grep -r "GTM-\|G-\|GA_\|NEXT_PUBLIC_GA\|NEXT_PUBLIC_GTM\|FB_PIXEL\|META_PIXEL" . \
  --include="*.tsx" --include="*.ts" --include="*.env*" \
  -not -path "*/node_modules/*" | grep -v ".next"
```

---

## 6. Environment Variables

- [ ] `.env.production` or equivalent exists
- [ ] All required `NEXT_PUBLIC_` variables are set
- [ ] No API keys or secrets committed to the repo (check `.gitignore`)
- [ ] Vercel environment variables confirmed set for production

```bash
cat .env.example 2>/dev/null || cat .env.local 2>/dev/null | sed 's/=.*/=***/'
grep -r "NEXT_PUBLIC_" . --include="*.env*" -not -path "*/node_modules/*" | sed 's/=.*/=***/'
```

---

## 7. Forms

- [ ] All inquiry/contact forms have been identified
- [ ] Confirm form submission endpoint is configured (not pointing to localhost or staging)
- [ ] Confirmation/thank-you redirect or message is set up

```bash
grep -r "action=\|onSubmit\|fetch.*contact\|fetch.*enquir\|fetch.*form\|/api/contact\|/api/enquir" \
  app/ src/ --include="*.tsx" -l 2>/dev/null
```

---

## 8. Performance

- [ ] No unoptimised images (check for `<img>` tags instead of Next.js `<Image>`)
- [ ] Fonts loaded via `next/font` or similar (not raw @import)
- [ ] No console errors in production build

```bash
grep -r "<img " app/ src/ --include="*.tsx" -not -path "*/node_modules/*" | grep -v "// "
next build 2>&1 | tail -20
```

---

## 9. SSL & Redirects

- [ ] Site enforces HTTPS (no mixed content)
- [ ] `www` redirects to non-www (or vice versa) — consistent canonical domain
- [ ] No redirect loops

*These require live URL — prompt user if needed.*

---

## 10. WordPress / Headless CMS (if applicable)

- [ ] WordPress REST API or GraphQL endpoint is set to production URL (not local)
- [ ] ACF fields are populated with real content (not placeholder)
- [ ] Media library contains production assets (not local paths)
- [ ] WordPress admin credentials handed off to client

```bash
grep -r "WORDPRESS_API\|WP_API\|NEXT_PUBLIC_WORDPRESS\|graphqlEndpoint" . \
  --include="*.env*" --include="*.ts" -not -path "*/node_modules/*" | sed 's/=.*/=***/'
```

---

## Output Format

After running all checks, produce a report in this format:

```
## Go-Live Check Report — [Project Name]
Date: [today]

### ✅ Passed
- List all passing items

### ⚠️ Warnings (review before launch)
- List items that need attention but aren't blockers

### ❌ Failed (must fix before launch)
- List all failing items with a brief recommended fix

### Action Items
Numbered list of tasks to complete, in priority order.

### Verdict
READY TO LAUNCH / NOT READY — [one sentence summary]
```
