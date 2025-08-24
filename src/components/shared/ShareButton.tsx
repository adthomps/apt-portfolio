import React from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/use-share";



import type { ShareType } from "@/hooks/use-share";

interface ShareButtonProps extends Omit<React.ComponentProps<typeof Button>, "type"> {
  title: string;
  text?: string;
  label?: string; // override button text
  shareType?: ShareType;
  slug?: string;
}


export function ShareButton({ title, text, label = "Share", size = "sm", variant = "outline", className, shareType, slug, ...props }: ShareButtonProps) {
  const { share } = useShare();
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={() => share({ title, text, type: shareType, slug })}
      aria-label={label}
      {...props}
    >
      <Share2 className="h-4 w-4 mr-2" /> {label}
    </Button>
  );
}
