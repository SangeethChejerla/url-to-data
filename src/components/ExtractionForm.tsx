// components/ExtractionForm.tsx (Client Component)
'use client';

import { extractData } from '@/actions/firecrawl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface ExtractionFormProps {
  apiKey: string;
  onExtractionStart: () => void;
  onExtractionComplete: (data: string | null) => void;
  onExtractionError: (error: string) => void;
  isLoading: boolean;
}

export default function ExtractionForm({
  apiKey,
  onExtractionStart,
  onExtractionComplete,
  onExtractionError,
  isLoading,
}: ExtractionFormProps) {
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState(
    'Extract the most important information from the page'
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onExtractionStart();

    try {
      const response = await extractData(url, prompt, apiKey); // Pass API Key
      if (response.success) {
        onExtractionComplete(JSON.stringify(response, null, 2));
      } else {
        if (
          response.error?.includes('401') ||
          response.error?.toLowerCase().includes('unauthorized') ||
          response.error?.toLowerCase().includes('invalid api key')
        ) {
          toast(`Error: ${response.error}`);
        }
        onExtractionError(response.error || 'Unknown error');
      }
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      onExtractionError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="url"
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Enter URL to extract
          </label>
          <Input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="prompt"
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Extraction Prompt
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What information would you like to extract?"
            required
            className="min-h-[100px] resize-y"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            'Extract'
          )}
        </Button>
      </form>
    </div>
  );
}
