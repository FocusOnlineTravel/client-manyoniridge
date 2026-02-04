# WordPress Setup Guide for Manyoni Ridge

This guide will help you create pages in WordPress that will be consumed by your Next.js frontend.

## Prerequisites

- [x] WordPress installed at https://backend-manyoni.focusonlinetravel.co.za
- [x] ACF Pro plugin installed and activated
- [x] ACF field group imported (from `scripts/acf-field-group-complete.json`)

## Step 1: Import ACF Field Group

1. Go to your WordPress Admin: https://backend-manyoni.focusonlinetravel.co.za/wp-admin
2. Navigate to **Custom Fields > Tools**
3. Click **Import Field Groups**
4. Upload the file: `scripts/acf-field-group-complete.json`
5. Click **Import**

You should now see a field group called "Page Sections" with 21 different section layouts.

## Step 2: Create a Test Page

### Create the Page

1. Go to **Pages > Add New**
2. Enter Page Title: `Test Page`
3. Set the slug to: `test` (in the Permalink section)
4. Scroll down to the "Page Sections" field group

### Add Some Test Sections

Let's add a few sections to test the integration:

#### Section 1: Hero Image

1. Click "Add Section" and select **Hero Image**
2. Fill in:
   - **Title**: `Welcome to Manyoni Ridge`
   - **Subtitle**: `Luxury Safari Lodge`
   - **Description**: `Experience the wild beauty of Africa`
   - **Size**: `Large`
   - **Vertical Alignment**: `Bottom`
   - **Show Scroll Indicator**: Checked
3. Leave the image fields empty for now (optional)

#### Section 2: Text Block

1. Click "Add Section" and select **Text Block**
2. Fill in:
   - **Title**: `About Our Lodge`
   - **Subtitle**: `Luxury Meets Wilderness`
   - **Description**: `Manyoni Ridge offers an unforgettable safari experience in the heart of South Africa.`
   - **Background**: `Cream`

#### Section 3: CTA Section

1. Click "Add Section" and select **CTA Section**
2. Fill in:
   - **Title**: `Ready to Book Your Stay?`
   - **Description**: `Contact us today to reserve your luxury safari experience`
   - **CTA Text**: `Contact Us`
   - **CTA Link**: `/contact`
   - **Background**: `Gold`

### Publish the Page

1. Click **Publish** (top right)
2. Confirm by clicking **Publish** again

## Step 3: Create a Home Page

Now let's create the actual home page:

1. Go to **Pages > Add New**
2. Enter Page Title: `Home`
3. **Important**: Set the slug to exactly: `home`
4. Add sections as desired (you can copy sections from above or create new ones)
5. Click **Publish**

### Set as Homepage (Optional)

If you want this to be your site's homepage:

1. Go to **Settings > Reading**
2. Select "A static page" under "Your homepage displays"
3. Choose "Home" from the Homepage dropdown
4. Click **Save Changes**

## Step 4: Enable WordPress Mode in Next.js

Now that you have pages in WordPress, enable WordPress mode:

1. Open `.env.local` in your frontend project
2. Change this line:
   ```
   NEXT_PUBLIC_USE_WORDPRESS=false
   ```
   To:
   ```
   NEXT_PUBLIC_USE_WORDPRESS=true
   ```
3. Save the file

## Step 5: Restart Next.js and Test

1. Stop your Next.js dev server (if running)
2. Restart it: `npm run dev`
3. Open your browser and navigate to:
   - http://localhost:3000/test (for the test page)
   - http://localhost:3000/ (for the home page)

You should now see your WordPress content rendered in your Next.js app!

## Troubleshooting

### Pages Not Showing

1. Check that WordPress is accessible: https://backend-manyoni.focusonlinetravel.co.za/wp-json
2. Run the connection test: `node scripts/test-wordpress-connection.js`
3. Check the browser console for errors
4. Check the Next.js terminal for error messages

### Sections Not Displaying

1. Make sure you imported the complete ACF field group
2. Verify sections are added in WordPress (edit the page and scroll down)
3. Check that section field names match exactly (case-sensitive)

### Images Not Loading

If you're using images from WordPress:

1. Add this to `next.config.ts`:
   ```typescript
   images: {
     domains: ['backend-manyoni.focusonlinetravel.co.za'],
   }
   ```

## Advanced: Room and Activity Cards

The `room_cards_section` and `activity_cards_section` sections reference data from your local files.

To use them in WordPress:

1. Add a **Room Cards Section** or **Activity Cards Section**
2. In the repeater field, add room/activity slugs:
   - For rooms: `one-bedroom-suite`, `two-bedroom-suite`
   - For activities: `game-drives`, `rhino-conservation`, `pangolin-experiences`, etc.

These sections will fetch the actual room/activity data from your local TypeScript files, even when using WordPress mode.

## Next Steps

1. Create all your pages in WordPress (About, Contact, Gallery, etc.)
2. Customize sections to match your design
3. Add images using WordPress Media Library
4. Set up proper navigation menus in WordPress
5. Deploy to production with `NEXT_PUBLIC_USE_WORDPRESS=true`

## Switching Back to Local Mode

To use local TypeScript files instead of WordPress:

1. Change `.env.local`: `NEXT_PUBLIC_USE_WORDPRESS=false`
2. Restart Next.js dev server

The app automatically falls back to local data if WordPress is unavailable.
