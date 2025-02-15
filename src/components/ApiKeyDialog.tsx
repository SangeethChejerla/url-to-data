'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ApiKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void; // Accepts the API key
  currentApiKey: string;
}

export default function ApiKeyDialog({
  isOpen,
  onClose,
  onSave,
  currentApiKey,
}: ApiKeyDialogProps) {
  const [apiKeyInput, setApiKeyInput] = useState(currentApiKey); // Local state for input

  const handleSaveClick = () => {
    onSave(apiKeyInput); // Call onSave with the input value
    onClose();
  };

  useEffect(() => {
    setApiKeyInput(currentApiKey);
  }, [currentApiKey]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set/Change API Key</DialogTitle>
          <DialogDescription>
            Enter your Firecrawl API key. You can find or create your API key at{' '}
            <Link
              href="https://firecrawl.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              firecrawl.dev
            </Link>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 mb-6 mt-6">
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <Image
              aria-hidden
              src="/key.svg"
              alt="Key icon"
              width={24}
              height={24}
              className="text-orange-500"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Set Your API Key
          </h3>
        </div>
        <Input
          type="text"
          value={apiKeyInput}
          onChange={(e) => setApiKeyInput(e.target.value)} // Update local state
          placeholder="fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          className="mb-4"
        />
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSaveClick}
            disabled={!apiKeyInput} // Disable if input is empty
            className="bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
