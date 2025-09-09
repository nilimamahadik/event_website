import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Award } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe in bringing people together through meaningful events and shared experiences.",
    },
    {
      icon: Target,
      title: "Quality Events",
      description: "We curate and promote high-quality events that provide real value to attendees.",
    },
    {
      icon: Heart,
      title: "Passion Driven",
      description: "Our team is passionate about creating memorable experiences and fostering connections.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our platform to our customer service.",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Events Created" },
    { number: "1M+", label: "Happy Attendees" },
    { number: "25,000+", label: "Event Organizers" },
    { number: "100+", label: "Cities Worldwide" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            About Find E-Event
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-fade-in-up stagger-1">
            Connecting people through amazing events since 2020. We're passionate about creating 
            meaningful experiences that bring communities together.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Find E-Event, we believe that great events have the power to transform lives, 
                build communities, and create lasting memories. Our mission is to make event 
                discovery and creation seamless, accessible, and enjoyable for everyone.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're looking to attend your next favorite conference, workshop, or 
                social gathering, or you're an organizer wanting to share your passion with 
                the world, we're here to help you succeed.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="People at networking event"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center card-hover">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that showcase our growing community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Us?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're more than just an event platform. We're your partners in creating 
              unforgettable experiences and building meaningful connections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Easy to Use</h3>
                <p className="text-muted-foreground">
                  Our intuitive platform makes it simple to discover events you'll love 
                  and create events that others will remember.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Trusted Platform</h3>
                <p className="text-muted-foreground">
                  With thousands of successful events and happy users, you can trust 
                  us to deliver a reliable and secure experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Global Reach</h3>
                <p className="text-muted-foreground">
                  From local meetups to international conferences, we connect people 
                  across the globe through amazing events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}