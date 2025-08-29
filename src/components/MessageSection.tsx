
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';

const MessageSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0.5, 0.6], [50, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-birthday-rose/10" 
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(234, 202, 203, 0.3) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center staggered-fade-in"
        >
          <div className="flex justify-center mb-6">
            <Heart className="text-primary h-10 w-10 animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-foreground">
            A Golden Anniversary
          </h2>

          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6 font-serif italic">
            "Dear Grandma and Grandpa,
          </p>

          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
            Fifty years. Half a century of waking up beside each other, of arguments and forgiveness, of holding on when it was easier to let go. Of building, of losing, of rebuilding again. Through days that were light and days that were unbearably heavy, you stayed. That is the miracle.
          </p>

          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
            Your love has never been about fairy tales. It’s about choosing each other every single day. About patience, endurance, faith, and devotion that runs deeper than words. You’ve shown us that love isn’t always loud, but it lasts. 
          </p>

          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
            Because of you, we know what it means to stay. To fight for something bigger than the moment. To create a family, a history, a home that stretches beyond yourselves. And we thank you, for the blessing of your marriage, for the children you raised, for the grandchildren who carry your name forward, for the foundation of faith and love you built for all of us.
          </p>

          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
            Fifty years later, what you’ve built is more than just a marriage, it’s all of us. Happy Anniversary, Grandma and Grandpa.
          </p>

          
          <p className="text-lg md:text-xl font-cursive text-primary">With all our love,</p>
          <p className="text-lg md:text-xl font-medium">Your Family</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MessageSection;
