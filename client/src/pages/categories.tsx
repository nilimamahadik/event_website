import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategoryCard from "@/components/events/category-card";
import EventCard from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Filter, TrendingUp } from "lucide-react";

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

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Default categories for initial display if API returns empty
  const defaultCategories = [
    { id: "tech", name: "Technology", icon: "laptop-code", eventCount: 142 },
    { id: "business", name: "Business", icon: "briefcase", eventCount: 89 },
    { id: "music", name: "Music", icon: "music", eventCount: 267 },
    { id: "arts", name: "Arts", icon: "palette", eventCount: 156 },
    { id: "sports", name: "Sports", icon: "running", eventCount: 198 },
    { id: "food", name: "Food", icon: "utensils", eventCount: 113 },
    { id: "health", name: "Health", icon: "heart", eventCount: 75 },
    { id: "education", name: "Education", icon: "graduation-cap", eventCount: 94 },
    { id: "travel", name: "Travel", icon: "map", eventCount: 67 },
    { id: "photography", name: "Photography", icon: "camera", eventCount: 43 },
    { id: "literature", name: "Literature", icon: "book", eventCount: 58 },
    { id: "gaming", name: "Gaming", icon: "gamepad", eventCount: 102 },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  
  const filteredCategories = displayCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredCategories = filteredCategories.slice(0, 3);
  const popularCategories = [...filteredCategories].sort((a, b) => b.eventCount - a.eventCount).slice(0, 6);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const filteredEvents = selectedCategory 
    ? events.filter(event => event.category.toLowerCase() === selectedCategory.toLowerCase())
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Event Categories
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-fade-in-up stagger-1">
            Discover events that match your interests. From technology conferences to art workshops, 
            find your perfect event category.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-in-up stagger-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                data-testid="input-search-categories"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Featured Categories</h2>
              <p className="text-xl text-muted-foreground">Most popular event categories this month</p>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">All Categories</h2>
              <p className="text-xl text-muted-foreground">
                Showing {filteredCategories.length} categories
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" data-testid="button-filter-categories">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No categories found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search term or browse all categories.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
                data-testid="button-clear-search"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Categories Stats */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Categories</h2>
            <p className="text-xl text-muted-foreground">
              Categories with the most active events and engaged communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCategories.map((category, index) => (
              <div 
                key={category.id}
                className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer card-hover"
                onClick={() => handleCategorySelect(category.id)}
                data-testid={`card-popular-category-${category.id}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full category-badge flex items-center justify-center">
                      <span className="text-xl" role="img" aria-label={category.name}>
                        {category.icon === "laptop-code" ? "💻" :
                         category.icon === "briefcase" ? "💼" :
                         category.icon === "music" ? "🎵" :
                         category.icon === "palette" ? "🎨" :
                         category.icon === "running" ? "🏃" :
                         category.icon === "utensils" ? "🍴" :
                         category.icon === "heart" ? "❤️" :
                         category.icon === "graduation-cap" ? "🎓" :
                         category.icon === "map" ? "🗺️" :
                         category.icon === "camera" ? "📷" :
                         category.icon === "book" ? "📚" :
                         category.icon === "gamepad" ? "🎮" : "📅"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.eventCount} events</p>
                    </div>
                  </div>
                  <Badge variant={index < 3 ? "default" : "secondary"}>
                    #{index + 1}
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${Math.min((category.eventCount / Math.max(...popularCategories.map(c => c.eventCount))) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Category Events */}
      {selectedCategory && (
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {filteredCategories.find(c => c.id === selectedCategory)?.name} Events
                </h2>
                <p className="text-xl text-muted-foreground">
                  {filteredEvents.length} events found
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
                data-testid="button-clear-category"
              >
                View All Categories
              </Button>
            </div>
            
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No events yet</h3>
                <p className="text-muted-foreground">
                  This category doesn't have any events yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}