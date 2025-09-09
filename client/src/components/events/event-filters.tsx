import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface Filters {
  dateRange: string;
  category: string;
  priceRange: string;
  sortBy: string;
}

interface EventFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function EventFilters({ filters, onFiltersChange }: EventFiltersProps) {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: "any",
      category: "all",
      priceRange: "any",
      sortBy: "relevance",
    });
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Date Range</label>
          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
            <SelectTrigger data-testid="select-date-range">
              <SelectValue placeholder="Any date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any date</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="weekend">This weekend</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger data-testid="select-category-filter">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="arts">Arts & Culture</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="food">Food & Drink</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Price Range</label>
          <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
            <SelectTrigger data-testid="select-price-range">
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any price</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="under50">Under $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="over100">Over $100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Sort By</label>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
            <SelectTrigger data-testid="select-sort-by">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <Button 
          variant="ghost" 
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground font-medium"
          data-testid="button-clear-filters"
        >
          <X className="w-4 h-4 mr-2" />
          Clear all filters
        </Button>
        <Button 
          className="btn-primary text-primary-foreground px-6 py-2 font-medium hover:shadow-md transition-all duration-200"
          data-testid="button-apply-filters"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
