import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Heart, Users } from "lucide-react";
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
  isFeatured?: boolean;
  imageUrl: string;
}

interface EventCardProps {
  event: Event;
  featured?: boolean;
  viewMode?: "grid" | "list";
}

export default function EventCard({ event, featured = false, viewMode = "grid" }: EventCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleEventClick = () => {
    // Navigate to event details page
    console.log("Navigate to event:", event.id);
  };

  const categoryColors = {
    Technology: "bg-primary/10 text-primary",
    Business: "bg-secondary/10 text-secondary",
    Music: "bg-accent/10 text-accent",
    Workshop: "bg-chart-1/20 text-chart-1",
    Fitness: "bg-chart-2/20 text-chart-2",
    Food: "bg-chart-3/20 text-chart-3",
    Literature: "bg-chart-4/20 text-chart-4",
    Gaming: "bg-chart-5/20 text-chart-5",
  };

  if (viewMode === "list") {
    return (
      <Card className="card-hover cursor-pointer" onClick={handleEventClick} data-testid={`card-event-${event.id}`}>
        <CardContent className="p-0">
          <div className="flex">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-48 h-32 object-cover rounded-l-lg"
            />
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  className={categoryColors[event.category as keyof typeof categoryColors] || "bg-muted text-muted-foreground"}
                >
                  {event.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFavoriteToggle}
                  className="text-muted-foreground hover:text-destructive"
                  data-testid={`button-favorite-${event.id}`}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? "fill-current text-destructive" : ""}`} />
                </Button>
              </div>
              
              <h4 className="text-lg font-bold text-foreground mb-2">{event.title}</h4>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-foreground">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </span>
                  {event.price > 0 && <span className="text-muted-foreground">/person</span>}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`card-hover cursor-pointer overflow-hidden ${featured ? 'shadow-lg' : 'shadow-md'}`} 
          onClick={handleEventClick}
          data-testid={`card-event-${event.id}`}>
      <img
        src={event.imageUrl}
        alt={event.title}
        className={`w-full object-cover ${featured ? 'h-48' : 'h-32'}`}
      />
      <CardContent className={featured ? 'p-6' : 'p-4'}>
        <div className="flex items-center justify-between mb-3">
          <Badge 
            className={categoryColors[event.category as keyof typeof categoryColors] || "bg-muted text-muted-foreground"}
          >
            {event.category}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            className="text-muted-foreground hover:text-destructive"
            data-testid={`button-favorite-${event.id}`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-current text-destructive" : ""}`} />
          </Button>
        </div>
        
        <h4 className={`font-bold text-foreground mb-2 ${featured ? 'text-xl' : 'text-base'}`}>
          {event.title}
        </h4>
        
        {featured && (
          <p className="text-muted-foreground mb-4">{event.description}</p>
        )}
        
        <div className={`flex items-center text-sm text-muted-foreground mb-4 ${featured ? 'space-x-4' : 'space-x-2'}`}>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{event.date}</span>
          </div>
          {featured && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{event.time}</span>
            </div>
          )}
        </div>
        
        {featured && (
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className={`font-bold text-foreground ${featured ? 'text-2xl' : 'text-lg'}`}>
              {event.price === 0 ? "Free" : `$${event.price}`}
            </span>
            {event.price > 0 && <span className="text-muted-foreground">/person</span>}
          </div>
          
          {featured ? (
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">A</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-secondary-foreground">B</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-accent border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-accent-foreground">+</span>
                </div>
              </div>
              <span className="ml-2 text-sm text-muted-foreground">{event.attendees} attending</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
