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
import Image from 'next/image';
import Link from 'next/link';

interface WelcomeDialogProps {
  onSetApiKeyClick: () => void;
  onClose: () => void;
}

export default function WelcomeDialog({
  onSetApiKeyClick,
  onClose,
}: WelcomeDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Firecrawl!</DialogTitle>
          <DialogDescription>
            To get started, please enter your Firecrawl API key. You can obtain
            one at{' '}
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
        <div className="py-4">
          <Button onClick={onSetApiKeyClick} className="w-full">
            Set API Key
          </Button>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
