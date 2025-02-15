import FirecrawlApp from '@mendable/firecrawl-js';

if (!process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY) {
  console.warn(
    'NEXT_PUBLIC_FIRECRAWL_API_KEY is not defined.  API calls will fail in production.  Defaulting to empty string.'
  );
}

// Use the environment variable directly, but provide a fallback.
const firecrawl = new FirecrawlApp({
  apiKey: process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY || '', // Fallback to an empty string
});

export default firecrawl;
