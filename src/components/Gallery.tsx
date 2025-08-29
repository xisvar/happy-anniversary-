import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const photos = [
  {
    url: "/1.jpg",
    alt: " celebration",
    rotate: "-3deg",
  },
  {
    url: "/5.jpg",
    alt: "Family gathering",
    rotate: "-3deg",
  },
  {
    url: "/6.jpg",
    alt: "Beautiful flowers",
    rotate: "1deg",
  },
  {
    url: "2.jpg",
    alt: "Happy moments",
    rotate: "-2deg",
  },
  {
    url: "3.jpg",
    alt: "Celebration",
    rotate: "3deg",
  },
  {
    url: "8.jpg",
    alt: " cake",
    rotate: "-1deg",
  },
];

interface ImageProps {
  src: string;
  alt: string;
  rotate: string;
  index: number;
}

const LazyImage: React.FC<ImageProps> = ({ src, alt, rotate, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden photo-frame rounded-md"
      style={{ "--rotate": rotate } as React.CSSProperties}
    >
      <div className="relative">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        <div
          className="ribbon"
          style={
            {
              "--ribbon-color": index % 2 === 0 ? "#EACACB" : "#F7E7CE",
              "--ribbon-rotate": index % 2 === 0 ? "25deg" : "-25deg",
            } as React.CSSProperties
          }
        ></div>

        <img
          ref={imgRef}
          src={isInView ? src : ""}
          alt={alt}
          className={`w-full h-auto aspect-[4/3] object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </div>
      <div className="px-1 py-2 text-sm font-medium text-center text-muted-foreground">
        {alt}
      </div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-3 font-serif text-3xl font-semibold text-center md:text-4xl">
          Beautiful Memories
        </h2>
        <p className="max-w-lg mx-auto mb-12 text-center text-muted-foreground">
          Captured moments that bring joy to our hearts and remind us of the
          special times we've shared.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <LazyImage
              key={index}
              src={photo.url}
              alt={photo.alt}
              rotate={photo.rotate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
