import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isPast: true }));
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isPast: false
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <div className="text-center py-8" data-testid="countdown-past">
        <p className="font-script text-4xl text-primary">Today is yours.</p>
        <p className="font-serif text-xl text-foreground/80 mt-2">Happy Birthday.</p>
      </div>
    );
  }

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="text-3xl sm:text-5xl font-serif text-primary mb-1">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs sm:text-sm font-sans tracking-widest text-foreground/60 uppercase">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8" data-testid="countdown-active">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-2xl sm:text-4xl text-primary/40 font-serif pb-6">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-2xl sm:text-4xl text-primary/40 font-serif pb-6">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className="text-2xl sm:text-4xl text-primary/40 font-serif pb-6">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
