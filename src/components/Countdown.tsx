
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate?: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  // If no target date provided, use today's date (assuming it's the birthday today)
  const today = new Date();
  const defaultTarget = targetDate || new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const difference = defaultTarget.getTime() - new Date().getTime();
    
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    } else {
      // If the countdown is over, display zeros
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    // Initial calculation
    calculateTimeLeft();
    
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
          {targetDate 
            ? 'Countdown to the Big Day' 
            : 'Celebrating All Day Long'}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl flex flex-col items-center"
            >
              <motion.span 
                key={`${unit.label}-${unit.value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-5xl font-semibold text-primary mb-2"
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.span>
              <span className="text-sm font-medium text-muted-foreground">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
        
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          {targetDate 
            ? "It's going to be amazing! Get ready to celebrate this special occasion." 
            : "Today is all about celebrating Aunty Ify! Let's make every moment count."}
        </p>
      </div>
    </section>
  );
};

export default Countdown;
