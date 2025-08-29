import React from 'react';
import HeroSection from '@/components/HeroSection';
import Gallery from '@/components/Gallery';
import MessageSection from '@/components/MessageSection';
import Countdown from '@/components/Countdown';
import WishForm from '@/components/WishForm';
import WishesDisplay from '@/components/WishesDisplay';
import BirthdayCard from '@/components/BirthdayCard';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hidden autoplay audio */}
      <audio autoPlay loop style={{ display: 'none' }}>
        <source src="/song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div >
        <main
          style={{
        transform: 'scale(0.75)',
        transformOrigin: 'top center',
        margin: '0 auto',
      }}
      >
          <HeroSection />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Gallery/>
          </motion.div>
          <MessageSection />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Countdown />
          </motion.div>
          <WishForm />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <WishesDisplay />
          </motion.div>
        </main>
        <footer className="py-8 text-center text-sm text-muted-foreground">
          <p>
            Made with love for Grandma and Grandpa's special day.
          </p>
        </footer>
        <BirthdayCard />
      </div>
    </div>
  );
};

export default Index;