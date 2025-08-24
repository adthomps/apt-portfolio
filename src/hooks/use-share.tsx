import { useToast } from "@/hooks/use-toast";


export type ShareType = "section" | "blog" | "podcast" | "guide";

interface ShareData {
  title: string;
  text?: string;
  type?: ShareType;
  slug?: string; // For detail pages
}


export function useShare() {
  const { toast } = useToast();

  // Helper to build the share URL
  const buildShareUrl = (type?: ShareType, slug?: string): string => {
    if (!type || !slug) return "";
    const origin = window.location.origin;
    switch (type) {
      case "blog":
        return `${origin}/blog/${slug}`;
      case "podcast":
        return `${origin}/podcast/${slug}`;
      case "guide":
        return `${origin}/guide/${slug}`;
      default:
        return "";
    }
  };

  const share = async (data: ShareData) => {
    const url = buildShareUrl(data.type, data.slug);
    if (!url) {
      toast({
        title: "Share unavailable",
        description: "Sharing is only available for blogs, podcasts, and guides.",
        variant: "destructive",
      });
      return;
    }
    const shareData = {
      title: data.title,
      text: data.text || "",
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Content has been shared via your device's share menu.",
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          fallbackShare(shareData);
        }
      }
    } else {
      fallbackShare(shareData);
    }
  };


  // Fallback for browsers that don't support Web Share API
  const fallbackShare = async (data: { title: string; text: string; url: string }) => {
    const shareText = `${data.title}\n${data.text ? data.text + "\n" : ""}${data.url}`;
    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard",
        description: "Share content has been copied to your clipboard.",
      });
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast({
          title: "Copied to clipboard",
          description: "Share content has been copied to your clipboard.",
        });
      } catch (copyError) {
        toast({
          title: "Share failed",
          description: "Unable to share content. Please copy the URL manually.",
          variant: "destructive",
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return { share };
}