import { IBSScannerClient } from '@/components/trading/ibs-scanner-client';

export const metadata = {
  title: 'IBS Strategy Scanner | Code Chronicles',
  description:
    'Run the IBS (Internal Bar Strength) scanner on demand. Find pullback buy signals and pick one stock for day trading.',
};

export default function TradingPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          IBS Strategy Scanner
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Run the Internal Bar Strength scanner on demand. Scans ~100 S&P 500 stocks for pullback
          buy signals. Use &quot;Pick One for Day Trading&quot; to get a random BUY signal.
        </p>
      </header>

      <IBSScannerClient />
    </div>
  );
}
