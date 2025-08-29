
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { sendWish } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WishForm: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please fill out all fields",
        description: "Both name and message are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      await sendWish({ name, message });

      toast({
        title: "Anniversary wish sent!",
        description: "Your message has been delivered to Grandma and Grandpa.",
      });

      // Reset form
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error sending wish:", error);
      toast({
        title: "Oops! Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="px-4 py-20 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-serif text-3xl font-semibold md:text-4xl">
            Send a Anniversary Wish
          </h2>
          <p className="text-muted-foreground">
            Add your personal annniversary message for Grandma and Grandpa.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 glass-card rounded-xl md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-foreground"
              >
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-md border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-foreground"
              >
                Your Anniversary Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all min-h-[120px] resize-y"
                placeholder="Write your anniversary wish here..."
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isSending}
                className="flex items-center justify-center w-full px-4 py-3 font-medium text-white gap-2 bg-primary rounded-md transition-all hover:shadow-md disabled:opacity-70"
              >
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Sending Wish...</span>
                  </>
                ) : (
                  <>
                    <SendHorizontal size={18} />
                    <span>Send Anniversary Wish</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default WishForm;
