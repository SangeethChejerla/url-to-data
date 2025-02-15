'use server';

import FirecrawlApp, { ExtractParams } from '@mendable/firecrawl-js'; // Import the class directly

export async function extractData(url: string, prompt: string, apiKey: string) {
  try {
    // Create a new instance of FirecrawlApp for each request.
    const firecrawl = new FirecrawlApp({ apiKey });

    // Define the options object with the correct type.
    const options: ExtractParams<any> = {
      prompt,
    };

    const response = await firecrawl.extract([url], options);

    if (!response.success) {
      return { success: false, error: response.error };
    }

    return response;
  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return { success: false, error: errorMessage };
  }
}
