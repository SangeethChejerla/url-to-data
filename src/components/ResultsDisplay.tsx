interface ResultsDisplayProps {
  result: string | null;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Results
      </h2>
      <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <pre className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
          {result}
        </pre>
      </div>
    </div>
  );
}
