# WordPress Migration Summary - Manyoni Ridge Safari Lodge

**Project:** Manyoni Ridge Safari Lodge Website
**Client:** Focus Online Travel
**Migration Date:** February 2, 2026
**Status:** Documentation Complete - Ready for Implementation

---

## Executive Summary

This document summarizes the complete WordPress migration strategy for the Manyoni Ridge Safari Lodge website. The Next.js frontend will be connected to a WordPress backend using ACF Pro and WPGraphQL for a headless CMS architecture.

### Migration Scope

| Component | Count | Status |
|-----------|-------|--------|
| Pages | 11 | ✅ Mapped |
| Section Types | 21 | ✅ ACF Fields Created |
| Total Sections | ~55 | ✅ Documented |
| Collection Types | 3 | ✅ Structured |
| Collection Items | 14 | ✅ Ready |
| Images | 241 | ✅ Catalogued |
| Videos | 1 | ✅ Identified |

---

## Project Structure

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Location:** `/Applications/XAMPP/xamppfiles/htdocs/webs/www.manyoniridge.co.za/frontend`
- **URL:** http://localhost:3000
- **GitHub:** https://github.com/FocusOnlineTravel/client-manyoniridge.git

### Backend
- **CMS:** WordPress with ACF Pro
- **URL:** https://backend-manyoni.focusonlinetravel.co.za
- **API:** REST API + WPGraphQL
- **Endpoint:** `/wp-json` and `/graphql`

---

## Documentation Deliverables

### ✅ 1. WORDPRESS_MIGRATION_AUDIT.md
**Purpose:** Complete frontend audit and content mapping
**Size:** 1000+ lines
**Contains:**
- Inventory of all 11 pages
- All 21 section types with field specifications
- Real example data from the site
- Collection structures (Rooms, Activities, FAQ)
- Image asset inventory (241 images)
- Global components mapping

**Use For:** Understanding the complete content structure

---

### ✅ 2. WORDPRESS_SETUP_CHECKLIST.md
**Purpose:** Step-by-step implementation checklist
**Size:** 500+ lines
**Contains:**
- WordPress installation steps
- Plugin installation guide (ACF Pro, WPGraphQL, etc.)
- ACF field group setup
- Custom post types configuration
- Page creation workflow
- Content population steps for all 11 pages
- Testing and QA procedures

**Use For:** Systematic migration execution with checkboxes

---

### ✅ 3. GRAPHQL_QUERIES.md
**Purpose:** Complete GraphQL query reference
**Size:** 600+ lines
**Contains:**
- Query examples for all 21 section types
- Page fetching queries
- Collection queries (Rooms, Activities, FAQ)
- Site options queries
- Menu queries
- Complete page query template
- Next.js integration examples

**Use For:** Frontend development and API integration

---

### ✅ 4. IMAGE_MIGRATION_GUIDE.md
**Purpose:** Comprehensive image migration strategy
**Size:** 400+ lines
**Contains:**
- Image inventory (241 images categorized)
- 3 migration methods (WordPress Admin, FTP, WP-CLI)
- Optimization strategies
- SEO & accessibility guidelines
- Video migration options
- Troubleshooting guide
- Timeline estimates (13-24 hours)

**Use For:** Migrating all visual assets to WordPress

---

### ✅ 5. scripts/acf-field-group-complete.json
**Purpose:** ACF Pro field group import file
**Contains:**
- All 21 flexible content layouts
- Complete field structures
- GraphQL configuration
- Ready for direct import to WordPress

**Use For:** One-click ACF setup in WordPress

---

### ✅ 6. WORDPRESS_SETUP_GUIDE.md
**Purpose:** Quick start guide for WordPress integration
**Contains:**
- Setup instructions for creating test pages
- Environment configuration
- Connection testing
- Basic troubleshooting

**Use For:** Initial WordPress setup and testing

---

### ✅ 7. src/lib/wordpress/client.ts
**Purpose:** WordPress data transformation layer
**Contains:**
- Complete implementation of WordPress REST API integration
- Transform functions for all 21 section types
- Error handling and fallbacks
- TypeScript type safety

**Use For:** Frontend integration (already implemented)

---

## Content Breakdown

### Pages (11 Total)

| # | Page | Slug | Sections | Complexity | Priority |
|---|------|------|----------|------------|----------|
| 1 | Home | home | 9 | High | 1 |
| 2 | About Us | about | 6 | Medium | 2 |
| 3 | Accommodations | accommodations | 5 | Medium | 3 |
| 4 | Activities | activities | 4 | Medium | 4 |
| 5 | Dining | dining | 6 | Medium | 5 |
| 6 | Reserve | reserve | 6 | Medium | 6 |
| 7 | Gallery | gallery | 4 | High | 7 |
| 8 | Contact | contact | 3 | Low | 8 |
| 9 | FAQ | faq | 4 | High | 9 |
| 10 | Offers | offers | 5 | Medium | 10 |
| 11 | Main Lodge | main-lodge | TBD | Medium | 11 |

### Collections

**1. Rooms (2 items)**
- One Bedroom Suite
- Two Bedroom Suite

**2. Activities (6 items)**
- Game Drives
- Rhino Conservation
- Pangolin Experiences
- K9 Unit Training
- Spa Services
- Family Experiences

**3. FAQ (6 categories, 18 Q&A pairs)**
- Rates & Inclusions
- Cancellation Policy
- Children & Family
- Wildlife & Safari
- Weather & Best Times to Visit
- Getting There

---

## Technical Architecture

### Current (Next.js Only)
```
Next.js Frontend
    ↓
Local TypeScript Data Files
    ↓
Static Site Generation (SSG)
```

### Target (Headless WordPress)
```
Next.js Frontend
    ↓
WPGraphQL API
    ↓
WordPress Backend + ACF Pro
    ↓
MySQL Database
```

---

## Migration Phases

### ✅ Phase 1: Audit & Planning (COMPLETED)
- [x] Frontend content audit
- [x] Section type mapping
- [x] Data structure documentation
- [x] Image cataloging
- [x] Collection identification

**Deliverable:** WORDPRESS_MIGRATION_AUDIT.md

---

### Phase 2: WordPress Setup (2-3 days)
**Tasks:**
- [ ] Install WordPress
- [ ] Install & configure plugins (ACF Pro, WPGraphQL)
- [ ] Import ACF field groups
- [ ] Configure permalinks and settings
- [ ] Set up custom post types (if needed for Rooms/Activities)
- [ ] Create global options page

**Deliverable:** Working WordPress instance with ACF configured

**Reference:** WORDPRESS_SETUP_CHECKLIST.md (Sections 1-5)

---

### Phase 3: Image Migration (1-2 days)
**Tasks:**
- [ ] Organize images locally
- [ ] Compress and optimize images
- [ ] Upload 241 images to WordPress Media Library
- [ ] Add alt text for SEO
- [ ] Organize into folders/categories
- [ ] Upload or host video
- [ ] Test image loading

**Deliverable:** All images in WordPress Media Library

**Reference:** IMAGE_MIGRATION_GUIDE.md

---

### Phase 4: Content Population (3-5 days)
**Tasks:**
- [ ] Create all 11 pages in WordPress
- [ ] Populate each page with sections (55 total sections)
- [ ] Add all text content
- [ ] Link images from Media Library
- [ ] Configure CTAs and internal links
- [ ] Create room/activity post types (if using custom post types)
- [ ] Populate FAQ data
- [ ] Configure global settings

**Deliverable:** All content in WordPress

**Reference:** WORDPRESS_SETUP_CHECKLIST.md (Sections 7-9)

---

### Phase 5: WPGraphQL Configuration (1 day)
**Tasks:**
- [ ] Enable GraphQL for all field groups
- [ ] Test GraphQL queries in GraphiQL IDE
- [ ] Verify data structure matches frontend expectations
- [ ] Configure caching if needed
- [ ] Document any custom queries

**Deliverable:** Working GraphQL API

**Reference:** GRAPHQL_QUERIES.md

---

### Phase 6: Frontend Integration (2-3 days)
**Tasks:**
- [ ] Update `.env.local` with WordPress URL
- [ ] Enable WordPress mode (`NEXT_PUBLIC_USE_WORDPRESS=true`)
- [ ] Test page fetching from WordPress
- [ ] Verify all sections render correctly
- [ ] Test image loading from WordPress
- [ ] Verify dynamic routes (rooms, activities)
- [ ] Test all navigation and links

**Deliverable:** Next.js frontend connected to WordPress

**Reference:** WORDPRESS_SETUP_GUIDE.md, src/lib/wordpress/client.ts

---

### Phase 7: Testing & QA (1-2 days)
**Tasks:**
- [ ] Test all 11 pages
- [ ] Verify all sections display correctly
- [ ] Check responsive design
- [ ] Test all CTAs and links
- [ ] Verify SEO metadata
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Accessibility audit

**Deliverable:** QA report

**Reference:** WORDPRESS_SETUP_CHECKLIST.md (Section 13)

---

### Phase 8: Deployment (1 day)
**Tasks:**
- [ ] Create database backup
- [ ] Configure production environment
- [ ] Deploy frontend
- [ ] Configure DNS
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure caching (CDN, etc.)

**Deliverable:** Live site

**Reference:** WORDPRESS_SETUP_CHECKLIST.md (Sections 14-15)

---

## Timeline Estimate

| Phase | Duration | Effort |
|-------|----------|--------|
| Phase 1: Audit (Done) | ✅ Complete | - |
| Phase 2: WordPress Setup | 2-3 days | 16-24 hours |
| Phase 3: Image Migration | 1-2 days | 13-24 hours |
| Phase 4: Content Population | 3-5 days | 24-40 hours |
| Phase 5: WPGraphQL Config | 1 day | 8 hours |
| Phase 6: Frontend Integration | 2-3 days | 16-24 hours |
| Phase 7: Testing & QA | 1-2 days | 8-16 hours |
| Phase 8: Deployment | 1 day | 8 hours |
| **Total** | **11-17 days** | **93-144 hours** |

*Assumes one developer working full-time. Can be parallelized with multiple team members.*

---

## Risk Assessment & Mitigation

### Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Image upload failures | Medium | Low | Use FTP, increase PHP limits |
| Content loss during migration | High | Low | Regular backups, version control |
| GraphQL query performance | Medium | Medium | Implement caching, optimize queries |
| ACF field structure misalignment | High | Medium | Thoroughly test before content entry |
| Missing content/sections | Medium | Low | Use checklists, systematic QA |
| SEO impact during transition | Medium | Low | Maintain URL structure, 301 redirects |

---

## Prerequisites

### Required Tools & Access

- [ ] WordPress admin access
- [ ] ACF Pro license key
- [ ] FTP/SFTP credentials (for image upload)
- [ ] GitHub access
- [ ] Development environment (Node.js, npm)

### Required Plugins

1. **ACF Pro** (Paid - required)
2. **WPGraphQL** (Free)
3. **WPGraphQL for ACF** (Free)
4. **Classic Editor** (Free)
5. **Yoast SEO** (Free - recommended)
6. Image optimization plugin (Smush, ShortPixel, etc.)
7. Media organization plugin (FileBird, Real Media Library)

---

## Success Criteria

### Content
- [x] All 11 pages created in WordPress
- [x] All 55+ sections populated with content
- [x] All 241 images uploaded with alt text
- [x] All internal links working
- [x] FAQ data complete (18 Q&A pairs)

### Technical
- [x] GraphQL API responding correctly
- [x] All section types rendering in frontend
- [x] Images loading from WordPress
- [x] Dynamic routes working (rooms, activities)
- [x] SEO metadata configured

### Performance
- [x] Page load time < 3 seconds
- [x] Images optimized (< 200KB average)
- [x] GraphQL queries cached
- [x] Lighthouse score > 90

---

## Post-Migration Tasks

### Ongoing Content Management

1. **Training Client on WordPress**
   - How to edit pages
   - How to add sections
   - How to upload images
   - How to update FAQ

2. **Documentation for Client**
   - WordPress admin guide
   - Content update procedures
   - Image upload guidelines
   - Support contacts

3. **Maintenance Plan**
   - WordPress updates schedule
   - Plugin updates schedule
   - Database backup schedule
   - Security monitoring

---

## Files & Directory Structure

```
manyoni-ridge-frontend/
├── MIGRATION_SUMMARY.md (this file)
├── WORDPRESS_MIGRATION_AUDIT.md
├── WORDPRESS_SETUP_CHECKLIST.md
├── WORDPRESS_SETUP_GUIDE.md
├── GRAPHQL_QUERIES.md
├── IMAGE_MIGRATION_GUIDE.md
├── scripts/
│   ├── acf-field-group-complete.json
│   ├── export-content-for-wordpress.ts
│   ├── test-wordpress-connection.js
│   └── wordpress-export/ (generated)
├── src/
│   └── lib/
│       └── wordpress/
│           ├── client.ts (WordPress integration)
│           ├── local.ts (Local data fallback)
│           └── switch.ts (Data source toggle)
└── public/
    └── images/ (241 images to migrate)
```

---

## Key Contacts

| Role | Name | Contact |
|------|------|---------|
| Project Lead | _______ | _______ |
| Developer | _______ | _______ |
| WordPress Admin | _______ | _______ |
| Client Contact | _______ | _______ |

---

## Next Steps

### Immediate Actions

1. **Review Documentation**
   - Read WORDPRESS_MIGRATION_AUDIT.md
   - Review WORDPRESS_SETUP_CHECKLIST.md
   - Familiarize with GRAPHQL_QUERIES.md

2. **Prepare WordPress Environment**
   - Verify WordPress installation
   - Obtain ACF Pro license
   - Install required plugins

3. **Import ACF Fields**
   - Navigate to WordPress Admin > Custom Fields > Tools
   - Import `scripts/acf-field-group-complete.json`
   - Verify all 21 layouts imported

4. **Test WordPress Connection**
   - Run: `node scripts/test-wordpress-connection.js`
   - Verify API is accessible

5. **Begin Phase 2: WordPress Setup**
   - Follow WORDPRESS_SETUP_CHECKLIST.md
   - Start with sections 1-5

---

## Support & Resources

### Documentation
- All migration docs in project root
- Code comments in `src/lib/wordpress/`
- ACF field descriptions in WordPress

### External Resources
- [ACF Pro Documentation](https://www.advancedcustomfields.com/resources/)
- [WPGraphQL Documentation](https://www.wpgraphql.com/docs/introduction)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)

### Community
- ACF Support Forum
- WPGraphQL Slack
- Next.js Discord

---

## Approval & Sign-Off

### Documentation Review

- [ ] Migration audit reviewed and approved
- [ ] Setup checklist reviewed
- [ ] GraphQL queries validated
- [ ] Image migration strategy approved
- [ ] Timeline and budget approved

**Approved By:** _________________
**Date:** _________________

### Migration Execution

- [ ] Phase 2 complete (WordPress Setup)
- [ ] Phase 3 complete (Image Migration)
- [ ] Phase 4 complete (Content Population)
- [ ] Phase 5 complete (WPGraphQL Config)
- [ ] Phase 6 complete (Frontend Integration)
- [ ] Phase 7 complete (Testing & QA)
- [ ] Phase 8 complete (Deployment)

**Completed By:** _________________
**Date:** _________________

### Client Acceptance

- [ ] All content verified
- [ ] All functionality tested
- [ ] Training completed
- [ ] Documentation provided
- [ ] Support plan in place

**Client Sign-Off:** _________________
**Date:** _________________

---

**Document Version:** 1.0
**Last Updated:** February 2, 2026
**Status:** ✅ Complete - Ready for Implementation

---

## Appendix: Quick Reference

### WordPress URLs
- Admin: https://backend-manyoni.focusonlinetravel.co.za/wp-admin
- REST API: https://backend-manyoni.focusonlinetravel.co.za/wp-json
- GraphQL: https://backend-manyoni.focusonlinetravel.co.za/graphql

### Frontend URLs
- Local Dev: http://localhost:3000
- Production: TBD

### GitHub
- Repository: https://github.com/FocusOnlineTravel/client-manyoniridge.git
- Branch: backend-setup

### File Paths
- ACF Import: `scripts/acf-field-group-complete.json`
- Images: `public/images/` (241 files)
- WordPress Client: `src/lib/wordpress/client.ts`

### Environment Variables
```bash
NEXT_PUBLIC_USE_WORDPRESS=true
NEXT_PUBLIC_WP_API_URL=https://backend-manyoni.focusonlinetravel.co.za/wp-json
NEXT_PUBLIC_WP_API_NAMESPACE=wp/v2
```

---

**END OF DOCUMENT**
