import { Badge } from "@/components/ui/badge";

export function TagsDisplay({ label, tags }: { label?: string; tags: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="space-y-2">
      {label && <h5 className="font-medium text-sm">{label}</h5>}
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
