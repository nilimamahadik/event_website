import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import EventCard from "@/components/events/event-card";
import EventFilters from "@/components/events/event-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

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

export default function Events() {
  const [filters, setFilters] = useState({
    dateRange: "any",
    category: "all",
    priceRange: "any",
    sortBy: "relevance",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Events</h1>
          <p className="text-xl text-muted-foreground">Discover amazing events happening around you</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 bg-card rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-events"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Location"
                className="pl-10"
                data-testid="input-location"
              />
            </div>
            <Button className="btn-primary text-primary-foreground font-medium" data-testid="button-search-events">
              <Search className="w-4 h-4 mr-2" />
              Search Events
            </Button>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-lg text-muted-foreground">
              Showing {events.length || 12} events
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-card rounded-lg p-1 shadow-sm">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}
                data-testid="button-grid-view"
              >
                <span className="w-4 h-4">⊞</span>
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-primary text-primary-foreground" : ""}
                data-testid="button-list-view"
              >
                <span className="w-4 h-4">☰</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <EventFilters filters={filters} onFiltersChange={handleFiltersChange} />

        {/* Events Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} viewMode={viewMode} />
            ))
          ) : (
            // Default events for initial display
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
                isFeatured: false,
                imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
              },
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
              <EventCard key={event.id} event={event} viewMode={viewMode} />
            ))
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 font-medium" data-testid="button-load-more">
            Load More Events
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
