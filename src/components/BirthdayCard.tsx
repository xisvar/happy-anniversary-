
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const BirthdayCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Auto-open the card after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasBeenOpened(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleCard = () => {
    setIsOpen(!isOpen);
    if (!hasBeenOpened) {
      setHasBeenOpened(true);
    }
  };

  if (!isClient) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {/* Card container */}
        <motion.div
          className={`glass-card rounded-xl overflow-hidden shadow-lg ${
            isOpen ? 'bg-white/80' : 'bg-primary/90'
          } transition-colors duration-300`}
          style={{ width: isOpen ? '300px' : '200px' }}
          layout
        >
          {/* Card content */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="open-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <button
                  onClick={toggleCard}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close card"
                >
                  <ChevronDown size={20} />
                </button>
                
              <div className="mb-4 text-center">
                <h3 className="text-xl font-serif font-medium text-primary mb-1">
                  Happy 50th Anniversary!
                </h3>
                <p className="text-foreground/80 text-sm">
                  To our dearest Grandma & Grandpa
                </p>
              </div>

              <div className="text-foreground/90 text-sm">
                <p className="mb-3">
                  May your love continue to shine, never ending, always rooted in Jehovah’s grace. May your days ahead be filled with joy, peace, and the happiness of cherishing one another like the very first year.
                </p>
                <p className="mb-3">
                  Thank you for the blessing of your marriage, the family you built, and the legacy of faith and love you’ve passed down to us.
                </p>
                <p className="italic">
                  “Many waters cannot quench love; rivers cannot sweep it away.” — Song of Solomon 8:7
                </p>
              </div>

              <div className="mt-4 text-right">
                <p className="text-sm font-cursive text-primary">With love,</p>
                <p className="text-xs text-muted-foreground">Your Family</p>
              </div>

              </motion.div>
            ) : (
              <motion.div
                key="closed-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 cursor-pointer"
                onClick={toggleCard}
              >
                <div className="text-center text-white">
                  <p className="text-sm font-medium mb-1">
                    {hasBeenOpened ? 'Click to reopen' : 'Special Message'}
                  </p>
                  <p className="text-xs opacity-80">
                    {hasBeenOpened ? 'Anniversary card' : 'Tap to open'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Decorative elements */}
        {!isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 bg-accent w-6 h-6 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs font-bold">!</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BirthdayCard;
