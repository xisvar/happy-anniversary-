
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { BirthdayWish, getWishes } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WishCard: React.FC<{ wish: BirthdayWish; index: number }> = ({ wish, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-none shadow-md bg-background/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-medium text-primary">{wish.name}</h3>
          <p className="text-muted-foreground">{wish.message}</p>
          <div className="mt-2 text-xs text-muted-foreground">
            {wish.created_at && new Date(wish.created_at).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const WishesDisplay: React.FC = () => {
  const { data: wishes, isLoading, error } = useQuery({
    queryKey: ['birthdayWishes'],
    queryFn: getWishes,
  });

  if (error) {
    console.error("Error fetching wishes:", error);
  }

  return (
    <section id="wishes" className="px-4 py-20 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-3 font-serif text-3xl font-semibold text-center md:text-4xl">
          Anniversary Wishes
        </h2>
        <p className="max-w-lg mx-auto mb-12 text-center text-muted-foreground">
          See all the wonderful messages from friends and family.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-md">
                <CardContent className="p-4">
                  <Skeleton className="w-1/3 h-6 mb-2" />
                  <Skeleton className="w-full h-4 mb-1" />
                  <Skeleton className="w-full h-4 mb-1" />
                  <Skeleton className="w-2/3 h-4 mb-1" />
                  <Skeleton className="w-1/4 h-3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : wishes && wishes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishes.map((wish, index) => (
              <WishCard key={wish.id} wish={wish} index={index} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-lg text-muted-foreground">
              No wishes yet. Be the first to send Grandpa and Grandma a anniversary wish!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishesDisplay;
