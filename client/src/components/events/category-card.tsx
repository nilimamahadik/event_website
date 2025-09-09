interface Category {
  id: string;
  name: string;
  icon: string;
  eventCount: number;
}

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const getIconComponent = (iconName: string) => {
    // Map of icon names to Unicode symbols or Lucide equivalents
    const iconMap: Record<string, string> = {
      "laptop-code": "💻",
      "briefcase": "💼",
      "music": "🎵",
      "palette": "🎨",
      "running": "🏃",
      "utensils": "🍴",
      "heart": "❤️",
      "graduation-cap": "🎓",
    };
    
    return iconMap[iconName] || "📅";
  };

  return (
    <div 
      className="flex flex-col items-center p-6 bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 card-hover cursor-pointer"
      onClick={onClick}
      data-testid={`card-category-${category.id}`}
    >
      <div className="w-16 h-16 rounded-full category-badge flex items-center justify-center mb-4">
        <span className="text-2xl" role="img" aria-label={category.name}>
          {getIconComponent(category.icon)}
        </span>
      </div>
      <span className="font-semibold text-foreground text-center">{category.name}</span>
      <span className="text-sm text-muted-foreground mt-1">
        {category.eventCount} events
      </span>
    </div>
  );
}
