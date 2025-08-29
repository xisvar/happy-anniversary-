
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.6,
            }}
          >
            <Sparkles 
              size={Math.random() * 20 + 10} 
              className="text-birthday-gold" 
            />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-4xl mx-auto z-10"
      >
      <p className="text-xl md:text-2xl text-muted-foreground mb-3 font-serif">
        <span className="inline-block">Celebrating</span>
      </p>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-primary mb-6 tracking-tight relative">
        <span className="relative inline-block">
          <span className="relative z-10">Grandma & Grandpa</span>
          <span className="absolute bottom-0 left-0 w-full h-3 bg-accent/40 -z-10 transform translate-y-2"></span>
        </span>
      </h1>

      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-12 bg-muted-foreground/30"></div>
        <p className="text-xl md:text-2xl font-medium font-cursive text-accent-foreground">
          Happy 50th Anniversary
        </p>
        <div className="h-px w-12 bg-muted-foreground/30"></div>
      </div>

      <p className="text-sm md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
        Today we honor fifty years of love, faith, and family. A half-century of choosing each other, of building a home, of raising children and grandchildren, of creating a legacy that holds us all together. What you’ve built is more than a marriage, it’s the roots and the foundation of who we are. 
      </p>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 inline-block"
        >
          <a 
            href="#gallery" 
            className="px-8 py-4 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:shadow-md"
          >
            Celebrate With Us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
