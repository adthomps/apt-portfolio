import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExpandableTagsProps {
  tags: string[];
  maxVisible?: number;
  variant?: "default" | "secondary" | "outline" | "destructive";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function ExpandableTags({ 
  tags, 
  maxVisible = 3, 
  variant = "outline", 
  size = "default",
  className = "" 
}: ExpandableTagsProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayTags = showAll ? tags : tags.slice(0, maxVisible);
  const hasMore = tags.length > maxVisible;
  
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayTags.map((tag) => (
        <Badge key={tag} variant={variant} className={size === "sm" ? "text-xs" : ""}>
          {tag}
        </Badge>
      ))}
      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {showAll ? "Show less" : `+${tags.length - maxVisible} more`}
        </Button>
      )}
    </div>
  );
}