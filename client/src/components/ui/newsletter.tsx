import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API call to subscribe will go here
      console.log("Newsletter subscription:", email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold text-primary-foreground mb-4">Never Miss an Event</h3>
        <p className="text-xl text-primary-foreground/90 mb-8">
          Subscribe to our newsletter for the latest events, exclusive offers, and early access to tickets.
        </p>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex bg-white/10 rounded-xl p-2 backdrop-blur-sm">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 bg-transparent border-0 text-primary-foreground placeholder-primary-foreground/70 focus:outline-none focus:ring-0"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
                data-testid="button-newsletter-subscribe"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>
          <p className="text-sm text-primary-foreground/70 mt-3">
            No spam, unsubscribe at any time. Read our{" "}
            <a href="/privacy" className="underline hover:text-white transition-colors duration-200">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
