# RSS Feed Setup

This document explains the RSS feed implementation for the blog using the `feed` library.

## Overview

Multiple RSS feed formats have been successfully set up for your blog posts using the `feed` package (v5.1.0). The feed allows readers to subscribe to your blog in their preferred format (RSS, Atom, or JSON) and receive updates when new posts are published.

## Package Used

The implementation uses the **`feed`** npm package instead of the basic `rss` package. The `feed` library is more robust and provides:
- Support for multiple feed formats (RSS 2.0, Atom 1.0, JSON Feed 1.0)
- Better TypeScript support
- More flexible API
- Active maintenance and updates

## Files Modified/Created

### 1. `/src/app/feed.xml/route.ts` (NEW)
This is the main RSS 2.0 feed endpoint that generates the XML feed. It:
- Uses the `feed` library instead of `rss`
- Fetches all blog posts from all locales
- Sorts posts by publish date (newest first)
- Generates an RSS 2.0 compliant XML feed
- Includes post metadata: title, description, URL, publish date, categories, and images
- Caches the feed for 1 hour for performance
- Uses proper email format for author fields
- Includes a valid channel image (avatar.jpeg)
- Provides feedLinks to all feed formats

### 2. `/src/app/feed.json/route.ts` (NEW)
JSON Feed 1.0 endpoint that generates a JSON-formatted feed. It:
- Uses the same `feed` library instance
- Outputs the feed in JSON format for modern feed readers
- Shares all the same post data as the RSS feed
- Uses proper JSON content-type headers

### 3. `/src/app/atom.xml/route.ts` (NEW)
Atom 1.0 feed endpoint that generates an Atom-formatted feed. It:
- Uses the same `feed` library instance
- Outputs the feed in Atom format (preferred by some feed readers)
- Shares all the same post data as the RSS feed
- Uses proper Atom XML content-type headers

### 2. `/src/app/[locale]/layout.tsx` (MODIFIED)
Added feed auto-discovery links for all formats in the metadata:
```typescript
alternates: {
  types: {
    'application/rss+xml': `${baseURL}/feed.xml`,
    'application/atom+xml': `${baseURL}/atom.xml`,
    'application/json': `${baseURL}/feed.json`,
  },
}
```

### 3. `/src/app/[locale]/blog/page.tsx` (MODIFIED)
- Added RSS feed link to the blog page metadata
- Added visible feed format buttons on the blog page (RSS, Atom, JSON)
- Added RSS validation badge that links to W3C Feed Validator with your feed URL pre-filled

### 4. `/src/once-ui/icons.ts` (MODIFIED)
Added the RSS icon (`FaRss` from `react-icons/fa`) to the icon library for the RSS button.

## Features

✅ **Auto-discovery**: Browsers and RSS readers can automatically detect the feed  
✅ **Multi-locale support**: Includes posts from all locales  
✅ **Full metadata**: Each post includes title, summary, URL, date, categories, and images  
✅ **Caching**: Feed is cached for optimal performance (1 hour)  
✅ **SEO-friendly**: Proper XML formatting with RSS 2.0 compliance  
✅ **User-friendly**: Visible RSS button on the blog page  
✅ **Validation Badge**: W3C RSS validation badge displayed on blog page  

## RSS Validation Badge

The blog page includes a "Valid RSS" badge that:
- Links directly to the W3C Feed Validator with your feed URL pre-filled
- Uses the validation badge image stored at `/public/images/rss.png`
- Provides instant validation checking for visitors
- Demonstrates feed compliance and quality

When users click the badge, they'll be taken to:
```
https://validator.w3.org/feed/check.cgi?url=https://www.suvangs.tech/feed.xml
```

This allows them to verify the feed's validity and see detailed validation results.

## Accessing the RSS Feed

### Feed URL
```
https://suvangs.tech/feed.xml
```

### For Readers
1. Visit the blog page at `/blog`
2. Click one of the feed format buttons:
   - **RSS** - Traditional RSS 2.0 format (most widely supported)
   - **Atom** - Atom 1.0 format (preferred by some readers)
   - **JSON** - JSON Feed format (modern, easy to parse)
3. Use the feed URL in any RSS reader (Feedly, Inoreader, NetNewsWire, etc.)

### For Developers
The feed endpoints are Next.js Route Handlers that:
- Respond to GET requests at `/feed.xml`, `/atom.xml`, and `/feed.json`
- Return the appropriate format with proper content-type headers
- Include cache control headers for performance
- Use the same underlying `Feed` instance for consistency

## Feed Structure

### RSS 2.0 Format (`/feed.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Suvan GS's Blog</title>
    <description>Writing about Tech, Games and Novels</description>
    <link>https://suvangs.tech</link>
    <language>en</language>
    <lastBuildDate>...</lastBuildDate>
    
    <item>
      <title>Post Title</title>
      <description>Post summary</description>
      <link>https://suvangs.tech/blog/post-slug</link>
      <guid>https://suvangs.tech/blog/post-slug</guid>
      <pubDate>Date</pubDate>
      <category>Category</category>
      <author>suvan.gowrishanker.204@gmail.com (Suvan GS)</author>
    </item>
    <!-- More items... -->
  </channel>
</rss>
```

### Atom 1.0 Format (`/atom.xml`)
Atom format with proper XML namespace and feed elements.

### JSON Feed 1.0 Format (`/feed.json`)
Modern JSON format that's easy to parse programmatically.

## Testing

To test the RSS feed:

1. **Local Development**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/feed.xml (RSS)
   # Visit http://localhost:3000/atom.xml (Atom)
   # Visit http://localhost:3000/feed.json (JSON)
   ```

2. **Validate the Feed**:
   - Use [W3C Feed Validation Service](https://validator.w3.org/feed/)
   - Paste your feed URL to check for errors
   - The feed should pass validation with no errors

3. **Test with RSS Reader**:
   - Add any of the feed URLs to any RSS reader application
   - Verify all posts appear correctly
   - Test different formats to ensure compatibility

## Why Use the `feed` Library?

The `feed` package offers several advantages over the basic `rss` package:

1. **Multiple Formats**: Generate RSS, Atom, and JSON feeds from a single Feed instance
2. **Modern API**: Cleaner, more intuitive API with better TypeScript support
3. **Better Maintained**: Active development and regular updates
4. **Standards Compliant**: Follows RSS 2.0, Atom 1.0, and JSON Feed 1.0 specifications
5. **Flexible**: Easy to add custom elements and extensions
6. **Single Source**: One feed configuration generates all formats consistently

## Validation Fixes Applied

The RSS feed has been configured to pass W3C validation:

✅ **Email Format**: Both `managingEditor` and `webMaster` fields use the proper RFC 822 format: `email@domain.com (Name)`  
✅ **Channel Image**: Uses a valid image format (PNG) at `/images/avatar.jpeg` instead of favicon  
✅ **Self-Reference URL**: The `feed_url` is properly formatted as an absolute URL with protocol  
✅ **RSS 2.0 Compliance**: All required fields are present and properly formatted

## Customization

### Modify Feed Title/Description
Edit the feed route files (e.g., `/src/app/feed.xml/route.ts`):
```typescript
const feed = new Feed({
  title: "Your Blog Title",
  description: 'Your blog description',
  // ... other options
});
```

### Add More Feed Formats
The `feed` library also supports:
- RSS 1.0: `feed.rss1()`
- Custom formats through extensions

### Filter Posts
You can filter which posts appear in the feeds by modifying the `allPosts` array in the route handlers.

### Add More Metadata
The Feed API supports many additional fields:
```typescript
feed.addItem({
  title: 'Post Title',
  id: 'unique-id',
  link: 'url',
  description: 'summary',
  content: 'full content',
  author: [...],
  contributor: [...],
  date: new Date(),
  image: 'image-url',
  // and more...
});
```

Refer to the [feed package documentation](https://www.npmjs.com/package/feed) for all options.

## Maintenance

- The feeds automatically update when new blog posts are added
- No manual maintenance required
- Cache is set to 1 hour, so new posts will appear within 1 hour
- To clear cache immediately, restart the server
- All three feed formats stay in sync automatically since they use the same Feed instance

## Browser Auto-Discovery

Modern browsers and RSS readers will automatically detect your feeds through the `<link>` tags in the HTML head:
```html
<link rel="alternate" type="application/rss+xml" href="https://suvangs.tech/feed.xml" />
<link rel="alternate" type="application/atom+xml" href="https://suvangs.tech/atom.xml" />
<link rel="alternate" type="application/json" href="https://suvangs.tech/feed.json" />
```

This is automatically added via the Next.js metadata API in the layout and blog page files.

## Migration from `rss` Package

The implementation has been migrated from the `rss` package to the `feed` package:

**Benefits of migration:**
- ✅ Multiple format support (RSS, Atom, JSON)
- ✅ Better TypeScript support
- ✅ More active maintenance
- ✅ Cleaner, more modern API
- ✅ Better standards compliance

**Changes made:**
1. Replaced `import RSS from 'rss'` with `import { Feed } from 'feed'`
2. Updated feed configuration to use Feed API
3. Changed `feed.item()` to `feed.addItem()`
4. Changed `feed.xml()` to `feed.rss2()`, `feed.atom1()`, `feed.json1()`
5. Added separate routes for each feed format
6. Updated metadata to include all feed formats
