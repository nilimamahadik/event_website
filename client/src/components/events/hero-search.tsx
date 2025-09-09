import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";

interface HeroSearchProps {
  onSearch: (data: { query: string; location: string; date: string }) => void;
}

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    onSearch({ query, location, date });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-white/70 w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Search events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              data-testid="input-hero-search"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <MapPin className="text-white/70 w-5 h-5" />
            </div>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger 
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                data-testid="select-hero-location"
              >
                <SelectValue placeholder="Select Location" className="text-white/70" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="sydney">Sydney</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Calendar className="text-white/70 w-5 h-5" />
            </div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              data-testid="input-hero-date"
            />
          </div>
          
          <Button 
            onClick={handleSearch}
            className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg"
            data-testid="button-hero-search"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Events
          </Button>
        </div>
      </div>
    </div>
  );
}
