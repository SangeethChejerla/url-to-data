// app/page.tsx (Client Component)
'use client';

import ApiKeyDialog from '@/components/ApiKeyDialog';
import ExtractionForm from '@/components/ExtractionForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import WelcomeDialog from '@/components/WelcomeDialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Load API Key
  useEffect(() => {
    const savedApiKey = localStorage.getItem('firecrawl_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeySave = (newApiKey: string) => {
    // Accepts the API key
    if (newApiKey) {
      localStorage.setItem('firecrawl_api_key', newApiKey);
      setApiKey(newApiKey); // Update the local state
    }
    setShowApiInput(false);
  };

  const onExtractionComplete = (data: string | null) => {
    setResult(data);
    setIsLoading(false);
  };

  const onExtractionStart = () => {
    setIsLoading(true);
    setResult(null);
  };

  const onExtractionError = (error: string) => {
    setIsLoading(false);
    setResult(`Error: ${error}`);
    toast(error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <main className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3 mt-12">
          Firecrawl + Next.js
          <span role="img" aria-label="fire">
            🔥
          </span>
        </h1>

        <ExtractionForm
          apiKey={apiKey}
          onExtractionStart={onExtractionStart}
          onExtractionComplete={onExtractionComplete}
          onExtractionError={onExtractionError}
          isLoading={isLoading}
        />

        <ResultsDisplay result={result} />

        {/* API Key Dialog (Conditionally Rendered) */}
        <ApiKeyDialog
          isOpen={showApiInput}
          onClose={() => setShowApiInput(false)}
          onSave={handleApiKeySave}
          currentApiKey={apiKey} // Pass current API Key
        />

        {/* Welcome Dialog */}
        {!apiKey && (
          <WelcomeDialog
            onSetApiKeyClick={() => setShowApiInput(true)}
            onClose={() => {}} // Optional: Add logic if you want a close button in the Welcome
          />
        )}
      </main>

      <footer className="mt-8 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.firecrawl.dev/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.firecrawl.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Docs
        </a>
        <Button
          variant="link"
          onClick={() => setShowApiInput(true)}
          className="flex items-center gap-2"
        >
          <Image
            aria-hidden
            src="/key.svg"
            alt="Key icon"
            width={16}
            height={16}
          />
          {apiKey ? 'Change API Key' : 'Set API Key'}
        </Button>
      </footer>
    </div>
  );
}
