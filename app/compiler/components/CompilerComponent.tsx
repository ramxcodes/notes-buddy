// app/compiler/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CodeEditor from '@/components/compiler/CodeEditor';
import OutputDisplay from '@/components/compiler/OutputDisplay';
import { CODE_SAMPLES } from '@/lib/code-samples';
import { Loader2 } from 'lucide-react';
import { Popup } from '../../buy-premium/components/Popup';
import { Skeleton } from '@/components/ui/skeleton';

const DAILY_LIMIT = 10;
const ERROR_MESSAGES = {
  LOGIN_REQUIRED: "Please log in to use the compiler!",
  BLOCKED_USER: "You are blocked from using the compiler.",
  RATE_LIMIT: "Daily limit exceeded (10 runs/day)",
};

export default function CompilerComponent() {
  const { resolvedTheme } = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(CODE_SAMPLES['javascript']);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState(DAILY_LIMIT);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setPopupMessage(ERROR_MESSAGES.LOGIN_REQUIRED);
      setShowPopup(true);
    }
  }, [status]);

  useEffect(() => {
    const checkBlockStatus = async () => {
      try {
        const response = await fetch('/api/user/status');
        const data = await response.json();
        setIsBlocked(data.blocked);
        if (data.blocked) router.push('/blocked');
      } catch (error) {
        console.error('Error checking block status:', error);
      }
    };

    if (status === 'authenticated') checkBlockStatus();
  }, [status, router]);

  useEffect(() => {
    const storedUsage = localStorage.getItem('compilerUsage');
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (storedUsage) {
      const { date, count } = JSON.parse(storedUsage);
      setRemaining(date === currentDate ? DAILY_LIMIT - count : DAILY_LIMIT);
    }
  }, []);

  const updateUsage = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const storedUsage = localStorage.getItem('compilerUsage');
    let newCount = 1;

    if (storedUsage) {
      const { date, count } = JSON.parse(storedUsage);
      newCount = date === currentDate ? count + 1 : 1;
    }

    localStorage.setItem('compilerUsage', JSON.stringify({
      date: currentDate,
      count: newCount
    }));

    setRemaining(DAILY_LIMIT - newCount);
    return newCount;
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(CODE_SAMPLES[value] || '');
  };

  const handleRunCode = async () => {
    if (status !== 'authenticated') {
      setPopupMessage(ERROR_MESSAGES.LOGIN_REQUIRED);
      setShowPopup(true);
      return;
    }

    if (isBlocked) {
      setPopupMessage(ERROR_MESSAGES.BLOCKED_USER);
      setShowPopup(true);
      return;
    }

    const currentCount = updateUsage();
    if (currentCount > DAILY_LIMIT) {
      setPopupMessage(ERROR_MESSAGES.RATE_LIMIT);
      setShowPopup(true);
      return;
    }

    setIsLoading(true);
    setOutput('');
    
    try {
      const response = await fetch('/api/compiler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });

      if (response.status === 403) {
        router.push('/blocked');
        return;
      }

      const result = await response.json();
      setOutput(result.error ? `Error: ${result.error}` : result.output);
    } catch (error) {
      setOutput('Failed to execute code');
    }
    setIsLoading(false);
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col h-screen p-4 space-y-4">
        <div className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="flex-1 flex gap-4">
          <Skeleton className="flex-1 h-[400px]" />
          <Skeleton className="flex-1 h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen p-4 space-y-4 bg-background">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border rounded-lg bg-card">
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={handleLanguageChange} disabled={isLoading}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(CODE_SAMPLES).map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground">
            Remaining: {remaining} runs
          </div>
        </div>
        
        <Button 
          onClick={handleRunCode} 
          disabled={isLoading || remaining <= 0}
          className="w-full md:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Compiling...
            </>
          ) : (
            'Run Code'
          )}
        </Button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        <div className="flex-1 h-[400px] md:h-[calc(100vh-180px)] border rounded-lg overflow-hidden">
          <CodeEditor 
            language={language} 
            code={code} 
            onChange={setCode}
            theme={resolvedTheme}
          />
        </div>
        
        <div className="flex-1 h-[400px] md:h-[calc(100vh-180px)]">
          <OutputDisplay output={output} isLoading={isLoading} />
        </div>
      </div>

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          showLoginButton={popupMessage === ERROR_MESSAGES.LOGIN_REQUIRED}
        />
      )}
    </div>
  );
}