import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@findevent.com",
      action: "mailto:hello@findevent.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      value: "123 Event Street, San Francisco, CA 94105",
      action: "#",
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "Monday - Friday",
      value: "9:00 AM - 6:00 PM PST",
      action: "#",
    },
  ];

  const faqItems = [
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "Questions about our platform, features, or services",
    },
    {
      icon: HelpCircle,
      title: "Technical Support",
      description: "Need help with your account or experiencing technical issues",
    },
    {
      icon: Mail,
      title: "Partnership Opportunities",
      description: "Interested in partnering with Find E-Event",
    },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // API call to send contact form will go here
      console.log("Contact form submission:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      reset();
      // Show success message here
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-fade-in-up stagger-1">
            Have questions, suggestions, or need support? We'd love to hear from you. 
            Our team is here to help make your event experience amazing.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="text-center card-hover">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {info.description}
                    </p>
                    {info.action.startsWith('#') ? (
                      <p className="text-primary font-medium">{info.value}</p>
                    ) : (
                      <a 
                        href={info.action}
                        className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
                        data-testid={`link-${info.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {info.value}
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name*</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...register("firstName", { required: "First name is required" })}
                        data-testid="input-first-name"
                      />
                      {errors.firstName && (
                        <p className="text-destructive text-sm">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name*</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...register("lastName", { required: "Last name is required" })}
                        data-testid="input-last-name"
                      />
                      {errors.lastName && (
                        <p className="text-destructive text-sm">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", { required: "Email is required" })}
                      data-testid="input-email"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category*</Label>
                    <Select onValueChange={(value) => setValue("category", value)}>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="press">Press & Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject*</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      {...register("subject", { required: "Subject is required" })}
                      data-testid="input-subject"
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message*</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      {...register("message", { required: "Message is required" })}
                      data-testid="textarea-message"
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary text-primary-foreground py-3 font-medium"
                    disabled={isSubmitting}
                    data-testid="button-send-message"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Card key={index} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="mt-8 card-hover">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Need Immediate Help?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Check out our comprehensive help center for instant answers to common questions.
                  </p>
                  <Button variant="outline" data-testid="button-help-center">
                    Visit Help Center
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}