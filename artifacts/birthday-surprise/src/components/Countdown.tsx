import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false
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
      <div className="text-center py-12" data-testid="countdown-past">
        <p className="font-display text-5xl md:text-7xl text-filmIvory drop-shadow-lg mb-6">Today is yours.</p>
        <p className="font-script text-4xl md:text-5xl text-filmGold mt-4">Happy Birthday.</p>
      </div>
    );
  }

  const Unit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 border border-filmGold/30 bg-filmBg2 rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.05)] mb-4">
        <span className="font-display text-4xl md:text-5xl text-filmGold tracking-tighter">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="font-ui text-xs sm:text-sm tracking-[0.2em] text-filmIvory/50 uppercase">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 mt-12" data-testid="countdown-active">
      <Unit value={timeLeft.days} label="Days" />
      <div className="font-display text-3xl md:text-4xl text-filmGold/20 pb-8">:</div>
      <Unit value={timeLeft.hours} label="Hrs" />
      <div className="font-display text-3xl md:text-4xl text-filmGold/20 pb-8">:</div>
      <Unit value={timeLeft.minutes} label="Min" />
      <div className="font-display text-3xl md:text-4xl text-filmGold/20 pb-8 hidden sm:block">:</div>
      <div className="hidden sm:block">
        <Unit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}