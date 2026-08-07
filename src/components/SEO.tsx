import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile' | 'directory';
  ogImage?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
  lang?: string;
}

const DEFAULT_TITLE = 'Portugal Expat & Community Portal | News, AIMA, NIF & Help Guides';
const DEFAULT_DESCRIPTION = 'Verified news, official AIMA immigration updates, NIF/NISS guides, healthcare SNS instructions, and local service directory for expats and South Asian community in Portugal.';
const DEFAULT_KEYWORDS = [
  'Portugal news',
  'AIMA Portugal',
  'Portugal immigration guide',
  'NIF Portugal',
  'NISS Portugal',
  'SNS healthcare',
  'Portugal residency',
  'South Asian in Portugal',
  'Desi community Portugal',
  'Lisbon expat services'
];
const SITE_NAME = 'Portugal Community Portal';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1200',
  author,
  publishedTime,
  modifiedTime,
  jsonLd,
  noindex = false,
  lang = 'en',
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://portugalcommunity.pt');

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="author" content={author || SITE_NAME} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType === 'directory' ? 'website' : ogType} />
      <meta property="og:url" content={currentUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Structured Data Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
