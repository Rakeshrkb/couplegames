import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PaymentResult } from '@/components/PaymentResult';

export const metadata: Metadata = {
  title: 'Payment status — couplegames',
  robots: { index: false, follow: false },
};

export default function PaymentResultPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResult />
    </Suspense>
  );
}