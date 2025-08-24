import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tag, Users } from "lucide-react";

interface TagGroupsProps {
  subjectTags?: string[];
  audienceTags?: string[];
}

export function TagGroups({ subjectTags = [], audienceTags = [] }: TagGroupsProps) {
  const total = (subjectTags?.length || 0) + (audienceTags?.length || 0);
  const [expanded, setExpanded] = useState(false);
  const collapsedCount = 3;

  const { subj, aud } = useMemo(() => {
    if (expanded) return { subj: subjectTags, aud: audienceTags };
    if (total < 4) return { subj: subjectTags, aud: audienceTags };
    let remaining = collapsedCount;
    const subj = subjectTags.slice(0, remaining);
    remaining -= subj.length;
    const aud = remaining > 0 ? audienceTags.slice(0, remaining) : [];
    return { subj, aud };
  }, [expanded, subjectTags, audienceTags, total]);

  const shown = (subj?.length || 0) + (aud?.length || 0);
  const remaining = Math.max(0, total - shown);

  if (total === 0) return null;

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {subjectTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="inline-flex items-center text-xs text-muted-foreground mr-1">
              <Tag className="h-3 w-3 mr-1" aria-hidden />
              Topics:
            </span>
            {subj.map((tag) => (
              <Badge key={`subj-${tag}`} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {audienceTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="inline-flex items-center text-xs text-muted-foreground mr-1">
              <Users className="h-3 w-3 mr-1" aria-hidden />
              Audience:
            </span>
            {aud.map((tag) => (
              <Badge key={`aud-${tag}`} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {total >= 4 && (
        <button
          type="button"
          className="text-xs text-primary hover:underline"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : `+${remaining} more`}
        </button>
      )}
    </div>
  );
}
