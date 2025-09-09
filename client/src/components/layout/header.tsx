import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Heart, Menu, User } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link href="/" data-testid="link-home">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Find E-Event
                </h1>
              </Link>
            </div>
            
            {/* Main Navigation */}
            <nav className="hidden md:flex space-x-8 ml-8">
              {navigation.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`font-medium transition-colors duration-200 ${
                    isActive(item.href) 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid={`link-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search events, categories, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
                data-testid="input-header-search"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:flex text-muted-foreground hover:text-primary"
              data-testid="button-favorites"
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            <Link href="/create-event">
              <Button 
                className="btn-primary text-primary-foreground font-medium hover:shadow-md transition-all duration-200"
                data-testid="button-create-event"
              >
                Create Event
              </Button>
            </Link>
            
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-muted-foreground hover:text-primary"
                data-testid="button-user-menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                  data-testid="input-mobile-search"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                      isActive(item.href) 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-2 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-primary"
                  data-testid="button-mobile-favorites"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
