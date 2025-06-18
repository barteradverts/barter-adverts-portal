export async function GET() {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://barteradverts.com/sitemap.xml

# Disallow admin and private pages
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /messages/

# Allow important pages
Allow: /
Allow: /browse
Allow: /how-it-works
Allow: /pricing
Allow: /register
Allow: /login
Allow: /about
Allow: /contact
Allow: /success-stories
Allow: /help

# Crawl delay
Crawl-delay: 1`

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
