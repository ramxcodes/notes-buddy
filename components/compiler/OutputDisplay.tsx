// components/compiler/OutputDisplay.tsx
'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { type FC } from 'react';

interface OutputDisplayProps {
  output: string;
  isLoading: boolean;
}

const OutputDisplay: FC<OutputDisplayProps> = ({ output, isLoading }) => {
  return (
    <Card className="h-full rounded-none p-4 overflow-auto">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[220px]" />
        </div>
      ) : (
        <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
      )}
    </Card>
  );
};

export default OutputDisplay;