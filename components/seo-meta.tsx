import Head from "next/head"

interface SEOMetaProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function SEOMeta({
  title = "Barter Adverts - Trade Your Way to Better Advertising",
  description = "India's first unified barter marketplace for advertising. Trade products and services for billboard space, influencer posts, radio ads, and more. No cash required.",
  keywords = "barter advertising, trade advertising, billboard exchange, influencer barter, advertising marketplace, no cash advertising, India advertising",
  image = "/og-image.jpg",
  url = "https://barteradverts.com",
}: SEOMetaProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Barter Adverts" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Barter Adverts" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  )
}
