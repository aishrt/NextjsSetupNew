"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectTimerCompo = ({ redirectTo, countdownSeconds = 5 }: { redirectTo: string, countdownSeconds?: number }) => {
  const [counter, setCounter] = useState(countdownSeconds);
  const router = useRouter();

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    // @ts-ignore
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (counter === 0) {
      router.push(redirectTo);
    }
  }, [counter, redirectTo, router]);

  return (
    <p>Redirecting in {counter} seconds...</p>
  );
}
export default RedirectTimerCompo;
