import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSearch from "@/components/events/hero-search";
import CategoryCard from "@/components/events/category-card";
import EventCard from "@/components/events/event-card";
import EventFilters from "@/components/events/event-filters";
import Newsletter from "@/components/ui/newsletter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  attendees: number;
  isFeatured: boolean;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  eventCount: number;
}

export default function Home() {
  const [filters, setFilters] = useState({
    dateRange: "any",
    category: "all",
    priceRange: "any",
    sortBy: "relevance",
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const featuredEvents = events.filter(event => event.isFeatured).slice(0, 3);
  const allEvents = events.slice(0, 6);

  const handleSearch = (searchData: { query: string; location: string; date: string }) => {
    console.log("Search:", searchData);
  };

  const handleCategorySelect = (categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
              Discover Amazing Events
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in-up stagger-1">
              Find and join incredible events happening around you. From conferences to concerts, workshops to festivals.
            </p>
            
            <div className="animate-fade-in-up stagger-2">
              <HeroSearch onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Browse by Category</h3>
            <p className="text-xl text-muted-foreground">Explore events that match your interests</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))
            ) : (
              // Default categories for initial display
              [
                { id: "tech", name: "Technology", icon: "laptop-code", eventCount: 142 },
                { id: "business", name: "Business", icon: "briefcase", eventCount: 89 },
                { id: "music", name: "Music", icon: "music", eventCount: 267 },
                { id: "arts", name: "Arts", icon: "palette", eventCount: 156 },
                { id: "sports", name: "Sports", icon: "running", eventCount: 198 },
                { id: "food", name: "Food", icon: "utensils", eventCount: 113 },
                { id: "health", name: "Health", icon: "heart", eventCount: 75 },
                { id: "education", name: "Education", icon: "graduation-cap", eventCount: 94 },
              ].map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Featured Events</h3>
              <p className="text-xl text-muted-foreground">Don't miss these trending events</p>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80 font-semibold" data-testid="button-view-all-featured">
              View All <span className="ml-2">→</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} featured />
              ))
            ) : (
              // Default featured events for initial display
              [
                {
                  id: "1",
                  title: "Tech Innovation Summit 2024",
                  description: "Join industry leaders for cutting-edge insights into AI, blockchain, and the future of technology.",
                  category: "Technology",
                  date: "March 15, 2024",
                  time: "9:00 AM - 6:00 PM",
                  location: "San Francisco Convention Center",
                  price: 149,
                  attendees: 234,
                  isFeatured: true,
                  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
                },
                {
                  id: "2",
                  title: "Downtown Jazz Festival",
                  description: "Experience an enchanting evening of smooth jazz with world-renowned musicians under the stars.",
                  category: "Music",
                  date: "March 22, 2024",
                  time: "7:00 PM - 11:00 PM",
                  location: "Central Park Amphitheater",
                  price: 75,
                  attendees: 189,
                  isFeatured: true,
                  imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
                },
                {
                  id: "3",
                  title: "Creative Painting Workshop",
                  description: "Unleash your creativity in this hands-on workshop perfect for beginners and experienced artists alike.",
                  category: "Workshop",
                  date: "March 18, 2024",
                  time: "2:00 PM - 5:00 PM",
                  location: "Creative Arts Studio",
                  price: 45,
                  attendees: 28,
                  isFeatured: true,
                  imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
                },
              ].map((event) => (
                <EventCard key={event.id} event={event} featured />
              ))
            )}
          </div>
        </div>
      </section>

      {/* All Events Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">All Events</h3>
              <p className="text-xl text-muted-foreground">Showing {allEvents.length} events in your area</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-card rounded-lg p-1 shadow-sm">
                <Button size="sm" className="bg-primary text-primary-foreground" data-testid="button-grid-view">
                  <span className="w-4 h-4">⊞</span>
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground" data-testid="button-list-view">
                  <span className="w-4 h-4">☰</span>
                </Button>
              </div>
            </div>
          </div>
          
          <EventFilters filters={filters} onFiltersChange={handleFiltersChange} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.length > 0 ? (
              allEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              // Default events for initial display
              [
                {
                  id: "4",
                  title: "Professional Networking Night",
                  description: "Connect with professionals in your industry.",
                  category: "Business",
                  date: "Mar 20",
                  time: "6:00 PM",
                  location: "Downtown Business Center",
                  price: 25,
                  attendees: 67,
                  isFeatured: false,
                  imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
                },
                {
                  id: "5",
                  title: "Morning Fitness Bootcamp",
                  description: "Start your day with high-energy fitness.",
                  category: "Fitness",
                  date: "Mar 19",
                  time: "7:00 AM",
                  location: "City Park",
                  price: 0,
                  attendees: 45,
                  isFeatured: false,
                  imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
                },
                {
                  id: "6",
                  title: "International Food Festival",
                  description: "Taste cuisines from around the world.",
                  category: "Food",
                  date: "Mar 23",
                  time: "11:00 AM",
                  location: "Main Street Plaza",
                  price: 15,
                  attendees: 312,
                  isFeatured: false,
                  imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
                },
              ].map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="px-8 py-3 font-medium" data-testid="button-load-more">
              Load More Events
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
